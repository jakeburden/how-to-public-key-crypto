const fs = require('fs')
const sodium = require('sodium').api

const keypair = sodium.crypto_sign_keypair()
const publicKey = keypair.publicKey

const dest = {
  client: 'keys.json',
  server: '../server/publicKey.json'
}

fs.writeFile(dest.client, JSON.stringify(keypair), err => {
  if (err) console.error(err)
})

fs.writeFile(dest.server, JSON.stringify(publicKey), err => {
  if (err) console.error(err)
})
