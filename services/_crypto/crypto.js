const crypto = require("crypto");
const logger = require("../logger");

const gen_hash = async function(password) {
    
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex")

        // def cost: 16384
        crypto.scrypt(password, salt, 32, {cost: 4096}, (err, derivedKey) => {
    
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    }).catch(e=>logger.error(e))
}

const verify = async function(password, hash) {

    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
    
        crypto.scrypt(password, salt, 32, {cost: 4096}, (err, derivedKey) => {
    
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    }).catch(e=>logger.error(e))
}

module.exports = { gen_hash, verify }