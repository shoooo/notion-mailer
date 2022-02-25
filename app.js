const express = require("express");
const { getData, getTemp, updatePage } = require("./api/notion");
const { sendEmail } = require("./api/nodemailer");

const app = express();
require("dotenv").config();

const run = () => {
    getData().then(async(data) => {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].email || !data[i].plan) {
                updatePage(data[i].data.id, "情報不足");
            } else {
                const name = data[i].name
                const email = data[i].email
                const page_id = data[i].data.id
                const temp = await getTemp(data[i].plan);
                const text = `${name}<br>${temp.text}`;
                sendEmail(email, temp.title, text)
                    .then(updatePage(page_id, "連絡済み"))
            }
        }
    });
};

run();

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));