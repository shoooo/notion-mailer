const express = require('express')
const { getData } = require('./api/notion')
const { sendEmail } = require('./api/nodemailer')

const app = express();
require('dotenv').config();

const run = async () => {
  const data = await getData();

  for (let i=0; data.length; i++) {
    if (data[i]) {

    }
  }

  const text = `${data[0].name}様、これはテストです。Vibin Marketingの${data[0].plan}に加入しませんか？`
  sendEmail(data[0].email, text)
}

run();

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`))