const transporter = require("../config/auth").transporter;

const sendEmail = async (to, text) => {
    const message = {
        from: process.env.EMAIL,
        to: `${to}`,
        subject: "字幕英訳に関するご提案",
        html: `${text}`,
    };

    transporter.sendMail(message, async (err, response) => {
        console.log(err || response);
    });
};

module.exports = { sendEmail };