const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Sample microservices URLs
const DASHBOARD_SERVICE_URL = 'http://dashboard-service:4000';
const USER_SERVICE_URL = 'http://user-service:5000';
const GRAFANA_SERVICE_URL = 'http://grafana-service:6000';

// Middleware for logging incoming requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
});

// Route to handle dashboard-related requests
app.all('/dashboard*', (req, res) => {
    // Forward the request to the Dashboard Service
    req.pipe(request(`${DASHBOARD_SERVICE_URL}${req.url}`)).pipe(res);
});

// Route to handle user-related requests
app.all('/user*', (req, res) => {
    // Forward the request to the User Service
    req.pipe(request(`${USER_SERVICE_URL}${req.url}`)).pipe(res);
});

// Route to handle Grafana-related requests
app.all('/grafana*', (req, res) => {
    // Forward the request to the Grafana Service
    req.pipe(request(`${GRAFANA_SERVICE_URL}${req.url}`)).pipe(res);
});

// Start the API Gateway
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});