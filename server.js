const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Message buffer (in-memory for demo)
let lastMessage = null;

// POST /send — device or web app sends data here
app.post('/send', (req, res) => {
  lastMessage = req.body;
  console.log('Received:', lastMessage);
  res.json({ status: 'ok', received: lastMessage });
});

// GET /receive — web app or device polls for latest message
app.get('/receive', (req, res) => {
  res.json(lastMessage || { message: 'No message yet' });
});

app.listen(PORT, () => {
  console.log(`Relay server running on port ${PORT}`);
});
