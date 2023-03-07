const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");

const sendMail = async ({
  to,
  subject,
  text,
  fullName,
  origin_client,
  verifyLink,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ACCOUNT_GMAIL,
      pass: process.env.APP_PASSWORD_GMAIL,
    },
  });

  const data = await ejs.renderFile(
    path.join(__dirname, "../publics/", "mail.public.ejs"),
    {
      fullName,
      origin_client,
      verifyLink,
    }
  );

  const info = await transporter.sendMail({
    from: '"Zumi Đồ dùng gia đình" duccdht123@gmail.com',
    to,
    subject,
    text,
    html: data,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendMail;
