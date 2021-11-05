const express = require("express");
const { getData, getTemp, updatePage } = require("./api/notion");
const { sendEmail } = require("./api/nodemailer");

const app = express();
require("dotenv").config();

const run = async () => {
  const data = await getData();
  const template = await getTemp("プレミアム");

  for (i = 0; i < data.length; i++) {
    if (data[i].email) {
      const text = `${data[i].name}<br>${template.text}`;

      sendEmail(data[i].email, template.title, text)
        .then(updatePage(data[i].data.id));
    }
  }
};

run();

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
