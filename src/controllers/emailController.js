const nodemailer = require('nodemailer')
const config = require('config')

host = config.get('email.host')
service = config.get('email.service')
username = config.get('email.username')
password = config.get('email.password')

const transporter = nodemailer.createTransport({
  host: host,
  service: service,
  secure: true,
  auth: {
    user: username,
    pass: password
  },
  tls: {
    rejectUnauthorized: false
  }
})

const sendVerificationMail = (user, host) => {
  const options = {
    from: username,
    to: user.email,
    subject: 'Verify your email',
    text: `Welcome to Monitor app, Please Copy and paste the address below to verify your account 
            http://${host}/verify-email?token=${user.email_token}`
  }
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('sent' + info.response)
  })
}

// const sendCancelationEmail = (name, email) => {
//   const options = {
//     from: username,
//     to: email,
//     subject: 'Oops, Sorry to see you go',
//     text: `Goodbye, ${name}. I hope to see you back sometime soon`
//   }
//   transporter.sendMail(options, (err, info) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log('sent' + info.response)
//   })
// }

module.exports = {
  sendVerificationMail
}
