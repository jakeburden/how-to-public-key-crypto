const fs = require('fs')
const sodium = require('sodium').api

fs.readFile('keys.json', (err, data) => {
  if (err) console.error(err)
  const keypair = JSON.parse(data)
  const secretKey = new Buffer(keypair.secretKey)
  const message = new Buffer('test message wow such crypto')
  const signature = new Buffer(sodium.crypto_sign_detached(message, secretKey))
  const payload = {
    message: message,
    signature_detached: signature
  }
  fs.writeFile('../server/payload.json', JSON.stringify(payload), err => {
    if (err) console.error(err)
  })
})
