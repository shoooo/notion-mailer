const express = require("express");
const { getData, updatePage } = require("./api/notion");
const { sendEmail } = require("./api/nodemailer");
const fs = require("fs");

const app = express();
require("dotenv").config();

const run = async () => {
  const data = await getData();
  const mainText = fs.readFileSync(__dirname + "/text.html").toString();
  
  for (i = 0; i < data.length; i++) {
    if (data[i].status === "新規見込み客") {
      if (data[i].email) {
        const text = `${data[i].name}<br>${mainText}`;
        sendEmail(data[i].email, "オンラインでの集客を実現！SNS＋ウェブサイト運用サービスに関するご提案", text);
        updatePage(data[i].data.id);
      }
    }
  }
};

run();

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
