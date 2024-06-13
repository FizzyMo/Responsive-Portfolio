const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer'); 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()); 

app.use('/assets', express.static(path.join(__dirname, 'assets'))); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});

app.post('/send-email', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT, 
      secure: process.env.SMTP_SECURE === 'true', 
      auth: {
        user: process.env.SMTP_USERNAME, 
        pass: process.env.SMTP_PASSWORD  
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM, 
      to: process.env.EMAIL_TO,    
      subject: subject,
      html: `
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p> 
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('OK'); 

  } catch (error) {
    console.error('Error sending email (Server Error):', error);
    res.status(500).send('Error sending email'); 
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});