import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail", // Path to sendmail
  });

  export default transporter;