const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());              // allow your local webapp
app.use(express.json());      // parse JSON bodies

// In-memory queues (demo only)
let appQueue = [];
let deviceQueue = [];

// Web app → send
app.post('/api/app/send', (req, res) => {
  const { payload } = req.body;
  deviceQueue.push({ payload, ts: Date.now() });
  res.sendStatus(204);
});

// Web app → receive
app.get('/api/app/receive', (req, res) => {
  res.json({ messages: appQueue });
  appQueue = [];
});

// Device → send
app.post('/api/device/send', (req, res) => {
  const { payload } = req.body;
  appQueue.push({ payload, ts: Date.now() });
  res.sendStatus(204);
});

// Device → receive
app.get('/api/device/receive', (req, res) => {
  res.json({ messages: deviceQueue });
  deviceQueue = [];
});

// Health check
app.get('/', (req, res) => res.send('OK'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
