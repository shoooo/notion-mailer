const transporter = require("../config/auth").transporter;

const sendEmail = async (to, subject, text) => {
    const message = {
        from: process.env.EMAIL,
        to: `${to}`,
        subject: `${subject}`,
        html: `<div style="white-space: pre">${text}`,
    };

    transporter.sendMail(message, async (err, response) => {
        console.log(err || response);
    });
};

module.exports = { sendEmail };