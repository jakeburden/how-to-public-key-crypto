const fs = require('fs')
const sodium = require('sodium').api

fs.readFile('payload.json', (err, data) => {
  if (err) console.error(err)
  const payload = JSON.parse(data)
  const message = new Buffer(payload.message)
  const signature = new Buffer(payload.signature_detached)
  fs.readFile('publicKey.json', (err, data) => {
    if (err) console.error(err)
    const publicKey = new Buffer(JSON.parse(data))
    const verified = sodium.crypto_sign_verify_detached(signature, message, publicKey)
    if (verified) {
      console.log('verified: ', verified)
      console.log('message: ', message.toString())
    } else console.log('signature not verified. DO NOT TRUST.')
  })
})
