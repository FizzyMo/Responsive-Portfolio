const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST route to EmailJS
app.post('/send-email', async (req, res) => {
  const { name, subject, message } = req.body;

  try {
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC,
      template_params: {
        name,
        subject,
        message
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('EmailJS error:', error?.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
