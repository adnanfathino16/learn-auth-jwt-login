const nodemailer = require("nodemailer");

exports.kirimEmail = (templateEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "szlibero16@gmail.com",
      pass: "myzjggdhelybruta",
    },
  });
  return transporter
    .sendMail(templateEmail)
    .then((info) => console.log(`Email Terkirim: ${info.message}`))
    .catch((err) => console.log(`Terjadi Kesalahan: ${err}`));
};
