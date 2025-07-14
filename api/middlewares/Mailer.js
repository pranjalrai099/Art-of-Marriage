// File: api/middlewares/Mailer.js
import nodemailer from 'nodemailer';
import axios from 'axios';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pranjalkrai2004@gmail.com",
    pass: "srin jprk mafl kigv",
  },
});

const sendAppointmentMail = async (email, plannerName, slotDate, slotTime) => {
  console.log(email);
  try {
    const info = await transporter.sendMail({
      from: '"Art of Marriage 💍" <pranjalkrai2004@gmail.com>',
      to: email,
      subject: "Booking Confirmed - Art of Marriage",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: auto; border: 1px solid #e0c7c7; border-radius: 12px; padding: 24px; background: #fff7f7;">
          <h2 style="color: #b86b77; text-align: center;">💐 Booking Confirmation</h2>
          <p style="font-size: 16px;">Dear Guest,</p>
          <p style="font-size: 16px;">We are thrilled to confirm your service booking. Here are the details:</p>
          <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Planner:</td>
              <td style="padding: 8px;">${plannerName}</td>
            </tr>
            <tr style="background-color: #fce6e6;">
              <td style="padding: 8px; font-weight: bold;">Date:</td>
              <td style="padding: 8px;">${slotDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Time:</td>
              <td style="padding: 8px;">${slotTime}</td>
            </tr>
          </table>
          <p style="font-size: 16px;">Thank you for choosing us to be part of your special journey.</p>
          <p style="font-size: 14px; color: gray;">Need changes? Visit your dashboard to reschedule or contact support.</p>
          <p style="text-align: center; margin-top: 30px; font-weight: bold; color: #b86b77;">– Art of Marriage Team</p>
        </div>
      `,
    });

    console.log("Mail sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

const CancelAppointmentMail = async (email, plannerName, slotDate, slotTime) => {
  console.log(email);
  try {
    const info = await transporter.sendMail({
      from: '"Art of Marriage 💍" <pranjalkrai2004@gmail.com>',
      to: email,
      subject: "Booking Cancelled - Art of Marriage",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: auto; border: 1px solid #f7d1d1; border-radius: 12px; padding: 24px; background: #fff0f0;">
          <h2 style="color: #cc5c5c; text-align: center;">❌ Booking Cancelled</h2>
          <p style="font-size: 16px;">Dear Guest,</p>
          <p style="font-size: 16px;">We regret to inform you that the following booking has been cancelled:</p>
          <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Planner:</td>
              <td style="padding: 8px;">${plannerName}</td>
            </tr>
            <tr style="background-color: #ffe0e0;">
              <td style="padding: 8px; font-weight: bold;">Date:</td>
              <td style="padding: 8px;">${slotDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Time:</td>
              <td style="padding: 8px;">${slotTime}</td>
            </tr>
          </table>
          <p style="font-size: 16px;">You are welcome to reschedule your service anytime via your dashboard.</p>
          <p style="font-size: 14px; color: gray;">Need help? Reach out to our support team.</p>
          <p style="text-align: center; margin-top: 30px; font-weight: bold; color: #cc5c5c;">– Art of Marriage Team</p>
        </div>
      `,
    });

    console.log("Mail sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

const sendOtpMail = async (email) => {
  const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

  try {
    const info = await transporter.sendMail({
      from: '"Art of Marriage 💍" <pranjalkrai2004@gmail.com>',
      to: email,
      subject: "Your OTP for Art of Marriage Verification",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 500px; margin: auto; border: 1px solid #ecd4d4; border-radius: 10px; padding: 24px; background: #fff6f6;">
          <h2 style="color: #c96b85; text-align: center;">🔐 One-Time Password (OTP)</h2>
          <p style="font-size: 16px;">Dear Guest,</p>
          <p style="font-size: 16px;">Use the following OTP to complete your verification:</p>
          <h1 style="text-align: center; font-size: 40px; color: #c96b85;">${otp}</h1>
          <p style="font-size: 14px; color: gray; text-align: center;">Please do not share this code with anyone. It is valid for a short time only.</p>
          <p style="text-align: center; margin-top: 30px; font-weight: bold; color: #c96b85;">– Art of Marriage Team</p>
        </div>
      `,
    });

    console.log("OTP mail sent:");
    await axios.post(`https://art-of-marriage-backend.onrender.com/apiback/user/store-otp`, {
      email,
      otp,
    });

    console.log("OTP sent to backend.");
  } catch (err) {
    console.error("Failed to send OTP:", err);
  }
};

export { sendAppointmentMail, CancelAppointmentMail, sendOtpMail };
