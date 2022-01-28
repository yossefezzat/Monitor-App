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

const sendDownCheckEmail = (check) => {
  const options = {
    from: username,
    to: check.email,
    subject: `${check.name} service is Down `,
    text: `
      Service Name: ${check.name} \n
    `
  }
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('sent' + info.response)
  })
}

module.exports = {
  sendVerificationMail,
  sendDownCheckEmail
}
