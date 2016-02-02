# how to public key crypto
> Rule of Silence: When a program has nothing surprising to say, it should say nothing.

### a short introduction to public key cryptography using Node.js


##### Disclaimer: I am not a crypto expert (I'm just okay with JavaScript). Pull request welcome!

---

#### Getting Started

1. Clone this repo.
2. Make sure you have [lib sodium](https://github.com/jedisct1/libsodium) installed on your machine.
3. Make sure you have a recent version of Node.js (v4 or greater should be good).
4. cd into this repo and run `npm install` (this will install [node-sodium](https://github.com/paixaop/node-sodium))

----

This walkthrough follows a client-server model.  The goal is to see how a client can send a message to the server, and how the server can trust that the message had come from the client (without usernames or passwords)!

For brevity, we are not setting up a real server.  Instead, this repo just contains a "client" directory and a "server" directory. They interact with each other through the file system.

----

#### generating your keypair

1. cd into `client`
2. inspect `gen.js`
3. run `node gen`

Here we are generating a key pair, which consists of a public key and a secret (or private) key. Everyone is allowed to know your public key, but you have to keep your secret key a secret.

`gen.js` stores your keypair in the `client` directory and sends your public key to the `server` directory.  The server will use your public key to verify any messages you send it that are signed with your secret key.

#### creating a digital signature

1. inspect `sign.js`
2. run `node sign`

In `sign.js`, we pull your secret key from your keypair.  I also wrote a small message; you can change it if you want.  With your secret key and your message `sign.js` will generate a detached digital signature.  Anyone with you public key can verify that you sent that message by testing it against your digital signature.  After your signature has been created a payload object containing your message and signature is sent to the server.

#### server verifying your message

1. cd into `server`
2. inspect `verify.js`
3. run `node verify`

The server can verify the message in the payload object by testing the detached digital signature against the public key the client had sent earlier. If the signature is verified, then the server will trust that the message in the payload had truly come from the client.  If the signature can not be verified, the server will not trust and reject that message.
