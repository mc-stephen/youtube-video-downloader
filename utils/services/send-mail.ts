import transporter from "../config/mail";

//=================================
// Note: This method is using 
// Sendmail or Postfix (Server-Installed Mail Transfer Agents)
// directly from the browser
//=================================
const sendEmail = async ({
  subject,
  message,
  senderEmail,
}: {
  subject: string;
  message: string;
  senderEmail: string;
}) => {
  try {
    await transporter.sendMail({
      to: "stephenugo939@gmail.com",
      from: `"VideoMax" <${senderEmail}>`,
      text: message,
      subject: subject,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
