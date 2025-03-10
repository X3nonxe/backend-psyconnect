// const mailgun = require('mailgun-js');
// const dotenv = require('dotenv');

// dotenv.config();
// const DOMAIN = process.env.MAILGUN_DOMAIN;
// const apiKey = process.env.MAILGUN_API_KEY;

// console.log(apiKey);

// const mg = mailgun({ apiKey, domain: DOMAIN });

// const sendEmail = (to, subject, text) => {
//   const data = {
//     from: 'your-email@your-domain.com', // Ganti dengan email pengirim Anda
//     to,
//     subject,
//     text,
//   };

//   mg.messages().send(data, (error, body) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', body);
//     }
//   });
// };

// module.exports = { sendEmail };
