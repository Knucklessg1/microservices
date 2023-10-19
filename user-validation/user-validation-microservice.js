const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Middleware for logging incoming requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
});

// Route to validate user configurations
app.post('/validate-user', (req, res) => {
    const userConfig = req.body;

    // Validate user configuration
    if (isValidUserConfig(userConfig)) {
        try {
            // Establish a connection to RabbitMQ server
            const connection = await amqp.connect('amqp://your-rabbitmq-server');
            // Create a channel
            const channel = await connection.createChannel();
            // Declare a queue
            const queue = 'user_validated';
            await channel.assertQueue(queue);
            // Publish the event to the queue
            channel.sendToQueue(queue, Buffer.from(JSON.stringify({ eventType: 'UserValidated', data: userConfig })));
            console.log('Event published to RabbitMQ:', { eventType: 'UserValidated', data: userConfig });
            // Close the channel and connection
            await channel.close();
            await connection.close();
            // Respond to the client
            res.status(200).json({ message: 'User configuration is valid.' });
        } catch (error) {
            console.error('Error publishing event to RabbitMQ:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Invalid user configuration.' });
    }
});

// Function to validate user configurations (example validation logic)
function isValidUserConfig(userConfig) {
    // Implement your validation logic here
    // For example, ensure required fields are present, validate data types, etc.
    // Return true if the user configuration is valid, false otherwise
    return true;
}

// Start the User Validation microservice
app.listen(PORT, () => {
    console.log(`User Validation microservice is running on port ${PORT}`);
});