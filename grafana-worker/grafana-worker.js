const amqp = require('amqplib');

// Function to process the received event
function processEvent(event) {
    const eventType = event.eventType;
    const eventData = event.data;

    // Handle different event types
    if (eventType === 'DashboardValidated') {
        // Process the validated dashboard configuration (eventData)
        console.log('Dashboard validated:', eventData);
        // Perform actions with the validated dashboard configuration, e.g., create the dashboard in Grafana
    }

    // Handle different event types
    if (eventType === 'UserValidated') {
        // Process the validated dashboard configuration (eventData)
        console.log('Dashboard validated:', eventData);
        // Perform actions with the validated dashboard configuration, e.g., create the dashboard in Grafana
    }
}

// Function to set up the RabbitMQ consumer
async function setupConsumer() {
    try {
        // Establish a connection to RabbitMQ server
        const connection = await amqp.connect('amqp://your-rabbitmq-server');
        // Create a channel
        const channel = await connection.createChannel();
        // Declare a queue
        const queue = 'dashboard_validated';
        await channel.assertQueue(queue);
        // Set up consumer for the queue
        channel.consume(queue, (message) => {
            if (message !== null) {
                // Parse and process the received event data
                const event = JSON.parse(message.content.toString());
                processEvent(event);
                // Acknowledge the message to RabbitMQ
                channel.ack(message);
            }
        });
        console.log('Consumer is waiting for events...');
    } catch (error) {
        console.error('Error setting up consumer:', error);
    }
}

// Set up the RabbitMQ consumer
setupConsumer();