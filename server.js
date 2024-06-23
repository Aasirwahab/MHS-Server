// Import necessary modules and configurations
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cloudinary from 'cloudinary';
import app from './app.js';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Express app
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Email Sending Endpoint
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wahabaasir@gmail.com',
      pass: 'svtgjlfgclwlivdg',
    },
  });

  let mailOptions = {
    from: 'wahabaasir@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});