const express = require('express');
const app = express();
const port = 3000; // Set your desired port

app.use(express.json());

const flights = []; 

// List all flights
app.get('/flights', (req, res) => {
  res.json(flights);
});

// Get flight by flight number
app.get('/flights/:flightNumber', (req, res) => {
  const { flightNumber } = req.params;
  const flight = flights.find((f) => f.flightNumber === flightNumber);
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  res.json(flight);
});

// Add a new flight
app.post('/flights', (req, res) => {
  const newFlight = req.body;
  flights.push(newFlight);
  res.status(201).json({ message: `Flight ${newFlight.flightNumber} added successfully.` });
});

// Update flight details
app.put('/flights/:flightNumber', (req, res) => {
  const { flightNumber } = req.params;
  const updateFlight = req.body;
  const flightIndex = flights.findIndex((f) => f.flightNumber === flightNumber);
  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  flights[flightIndex] = { ...flights[flightIndex], ...updateFlight };
  res.json({ message: `Flight ${flightNumber} updated successfully.` });
});

// Delete a flight
app.delete('/flights/:flightNumber', (req, res) => {
  const { flightNumber } = req.params;
  const flightIndex = flights.findIndex((f) => f.flightNumber === flightNumber);
  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  flights.splice(flightIndex, 1);
  res.json({ message: `Flight ${flightNumber} deleted successfully.` });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});