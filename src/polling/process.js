const pollingProcess = require('./processController')
const axios = require('axios')

async function startProcessConfig() {
  axios.interceptors.request.use((reqConfig) => {
    reqConfig.headers["startTime"] = process.hrtime()
    return reqConfig
  });

  axios.interceptors.response.use((res) => {
    const startProcess = res.config.headers["startTime"]
    // hrTime => [seconds , nanoseconds]
    const endProcess = process.hrtime(startProcess)
    const duration = (endProcess[0] * 1000) + (endProcess[1] / 1000000)
    const durationMS = Math.round(duration)
    res.headers["duration"] = durationMS
    res.headers.status = res.status
    return res
  });
}
const upCase = async (check, res) => {
  //await pollingProcess.updateStatusCode(check.name, check.email, res.status)
  await pollingProcess.updateUpTime(check.name, check.email)
  await pollingProcess.updateUpPeriod(check.name, check.email, check.timeInterval * 60)
  await pollingProcess.updateResponseTime(check.name, check.email, res.headers['duration'])
  await pollingProcess.updateAvailibilty(check.name, check.email)
  await pollingProcess.avgResonseTime(check.name, check.email, res.headers['duration'])
}

const downCase = async (check, err) => {
  //await pollingProcess.updateStatusCode(check.name, check.email, err.status)
  await pollingProcess.updateDownTime(check.name, check.email)
  await pollingProcess.updateDownPeriod(check.name, check.email, check.timeInterval * 60)
  await pollingProcess.updateAvailibilty(check.name, check.email)
  await pollingProcess.avgResonseTime(check.name, check.email, check.timeOut * 1000)

}

const runCheck = async (check) => {
  console.log(check.URL)
  if (check.status) {
    const res = await axios.get(check.URL, {
      timeout: check.timeOut * 1000
    }).then((res) => {
      upCase(check, res)
    }).catch((err) => {
      downCase(check, err)
    })
  }
}

const run = async () => {
  await startProcessConfig()
  const checks = await pollingProcess.getAllChecks()
  checks.forEach((check) => {
    let interval = setInterval(async () => {
      runCheck(check)
    }, check.timeInterval * 1000 * 60)
  })

}

module.exports = {
  run
}
