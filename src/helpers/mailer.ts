import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'e4fb8109738cfc',
        pass: 'd17c2f888b2ddb',
      },
    })

    const mailOptions = {
      from: 'martinntuwa.api@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }
       or copy and paste the link below in your browser. <br> ${
         process.env.DOMAIN
       }/verifyemail?token=${hashedToken}
      </p>`,
    }

    const mailresponse = await transport.sendMail(mailOptions)

    return mailresponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
