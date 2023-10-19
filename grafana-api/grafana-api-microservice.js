const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

// Grafana API base URL and authentication token
const GRAFANA_API_URL = 'http://your-grafana-instance/api';
const GRAFANA_API_KEY = 'your-grafana-api-key';

// Middleware to set Grafana API key in headers for every request
app.use((req, res, next) => {
    req.headers['Authorization'] = `Bearer ${GRAFANA_API_KEY}`;
    next();
});

// Create a new dashboard route
app.post('/create-dashboard', (req, res) => {
    const dashboardConfig = req.body; // Assuming the request body contains the dashboard configuration

    // Send a POST request to create a new dashboard
    request.post({
        url: `${GRAFANA_API_URL}/dashboards/db`,
        json: true,
        body: {
            dashboard: dashboardConfig,
            overwrite: false // Set to true if you want to overwrite an existing dashboard with the same name
        }
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error creating dashboard');
        } else {
            console.log('Dashboard created successfully:', body);
            res.status(200).send('Dashboard created successfully');
        }
    });
});

// Route to update a user
app.put('/update-user/:userId', (req, res) => {
    const userId = req.params.userId;
    const userUpdateData = req.body; // Assuming the request body contains user update data

    // Send a PUT request to update the user
    request.put({
        url: `${GRAFANA_API_URL}/admin/users/${userId}`,
        json: true,
        body: userUpdateData
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating user');
        } else {
            console.log('User updated successfully:', body);
            res.status(200).send('User updated successfully');
        }
    });
});

// Route to update a role
app.put('/update-role/:roleId', (req, res) => {
    const roleId = req.params.roleId;
    const roleUpdateData = req.body; // Assuming the request body contains role update data

    // Send a PUT request to update the role
    request.put({
        url: `${GRAFANA_API_URL}/admin/roles/${roleId}`,
        json: true,
        body: roleUpdateData
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating role');
        } else {
            console.log('Role updated successfully:', body);
            res.status(200).send('Role updated successfully');
        }
    });
});

// Route to update an organization
app.put('/update-organization/:orgId', (req, res) => {
    const orgId = req.params.orgId;
    const orgUpdateData = req.body; // Assuming the request body contains organization update data

    // Send a PUT request to update the organization
    request.put({
        url: `${GRAFANA_API_URL}/orgs/${orgId}`,
        json: true,
        body: orgUpdateData
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating organization');
        } else {
            console.log('Organization updated successfully:', body);
            res.status(200).send('Organization updated successfully');
        }
    });
});

// Route to update a team
app.put('/update-team/:teamId', (req, res) => {
    const teamId = req.params.teamId;
    const teamUpdateData = req.body; // Assuming the request body contains team update data

    // Send a PUT request to update the team
    request.put({
        url: `${GRAFANA_API_URL}/teams/${teamId}`,
        json: true,
        body: teamUpdateData
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating team');
        } else {
            console.log('Team updated successfully:', body);
            res.status(200).send('Team updated successfully');
        }
    });
});

// Route to create a new team
app.post('/create-team', (req, res) => {
    const teamData = req.body; // Assuming the request body contains team data

    // Send a POST request to create a new team
    request.post({
        url: `${GRAFANA_API_URL}/teams`,
        json: true,
        body: teamData
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error creating team');
        } else {
            console.log('Team created successfully:', body);
            res.status(200).send('Team created successfully');
        }
    });
});

// Route to delete a team
app.delete('/delete-team/:teamId', (req, res) => {
    const teamId = req.params.teamId;

    // Send a DELETE request to delete the team
    request.delete({
        url: `${GRAFANA_API_URL}/teams/${teamId}`
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error deleting team');
        } else {
            console.log('Team deleted successfully');
            res.status(200).send('Team deleted successfully');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Grafana API service is running on port ${PORT}`);
});