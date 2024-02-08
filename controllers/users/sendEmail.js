import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, token) {
  const message = {
    to,
    from: 'anya.istochnikova@gmail.com',
    subject: 'Verify Your Email',
    text: `Hello! To get started, please click on the following link to verify your email and activate your account: http://localhost:3000/users/verify/${token}`,
    html: `<h2>Hello! </h2>
           <p>To get started, please click on the following link to verify your email and activate your account:<button type="button"><a href="http://localhost:3000/users/verify/${token}">activate account</a></button></p>
    `,
  };
  sgMail.send(message);
}
