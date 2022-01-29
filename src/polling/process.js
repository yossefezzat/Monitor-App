const pollingProcess = require('./processController')
const {
  sendDownCheckEmail
} = require('../controllers/emailController')
const axios = require('axios')

let startProcess = async () => {
  axios.interceptors.request.use((reqConfig) => {
    reqConfig.headers["startTime"] = process.hrtime()
    return reqConfig
  });

  axios.interceptors.response.use((res) => {
    const startProcess = res.config.headers["startTime"]
    // hrTime => [seconds , nanoseconds]
    const endProcess = process.hrtime(startProcess)
    const durationMS = Math.round((endProcess[0] * 1000) + (endProcess[1] / 1000000))
    res.headers["duration"] = durationMS
    res.headers["status"] = res.status
    return res
  });
}

const upCase = async (check, res) => {
  await pollingProcess.updateStatusCode(check.name, check.email, res.headers["status"])
  await pollingProcess.updateUpTime(check.name, check.email)
  await pollingProcess.updateResponseTime(check.name, check.email, res.headers['duration'])
  await pollingProcess.updateUpPeriod(check.name, check.email, check.timeInterval)
  await pollingProcess.updateAvailibilty(check.name, check.email)
  await pollingProcess.avgResonseTime(check.name, check.email, res.headers['duration'])
  await pollingProcess.history(check)
}

const downCase = async (check, err) => {
  await pollingProcess.updateStatusCode(check.name, check.email, "404")
  await pollingProcess.updateDownTime(check.name, check.email)
  await pollingProcess.updateDownPeriod(check.name, check.email, check.timeInterval)
  await pollingProcess.updateAvailibilty(check.name, check.email)
  //await pollingProcess.avgResonseTime(check.name, check.email, check.timeOut * 1000)
  await pollingProcess.history(check)
  // Apply Threshold to the downTimes to send an notify email
  // if (await pollingProcess.getDowntimes(check.name, check.email) % check.threshold === 0) {
  //   await sendDownCheckEmail(check)
  //   await pollingProcess.sendToWebHook(check.name, check.email, instance = undefined)
  // }
}

const runCheck = async (check) => {
  if (check.status) {
    console.log(check.URL)
    const res = await axios.get(check.URL, {
      timeout: (check.timeOut * 1000) // ms
    }).then(async (res) => {
      await upCase(check, res)
    }).catch(async (err) => {
      await downCase(check, err)
    })
  }
}

const run = async () => {
  startProcess();
  let checks = await pollingProcess.getAllChecks();
  checks.forEach(async (check) => {
    let interval = setInterval(async () => {
      await runCheck(check);
      let checked = await pollingProcess.checkNewChecks(checks);
      if (checked) {
        clearInterval(interval)
        run()
      } else {}
    }, (check.timeInterval) * 1000 * 60)
  });
  if (checks.length === 0) {
    run()
  }
}

module.exports = {
  run
}
