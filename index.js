const crypto = require('crypto');

/**
* Convert number to string and pad its left with 0s
* @param {number} n - Number to convert
* @param {number} l - Length to pad up to
* @returns {string} Padded number
*/
function padN(n, l) {
  return n.toString().padStart(l, '0');
}

/**
* Create a timestamp as defined in hirez API docs
* @return {string} timestamp
*/
const createTimestamp = function() {
  const d = new Date();
  return `${padN(d.getUTCFullYear(),4)}${padN(d.getUTCMonth(),2)}${padN(d.getUTCDay(),2)}${padN(d.getUTCHours(),2)}${padN(d.getUTCMinutes(),2)}${padN(d.getUTCSeconds(),2)}`;
}

/**
* Create a hirez signature
* @param {(string|number)} devId - Your API devId
* @param {string} methodName - The name of the api method being called (without type)
* @param {string} authKey - You API authKey
* @param {string} [timestamp=Current timestamp] - (Optional) The timestamp to use
* @returns {Promise<Object>} A promise that resolves to an object containing signature and timestamp
*/
const createHirezSignature = function(devId, methodName, authKey, timestamp) {
  return new Promise((resolve, reject) => {
    if (!timestamp) timestamp = createTimestamp();
    const hash = crypto.createHash('md5');
    hash.on('error', reject);
    hash.on('readable', () => {
      const data = hash.read();
      if (!data) return reject(new Error('No hash data'));
      return resolve({ signature: data.toString('hex'), timestamp });
    });
    hash.write(`${devId}${methodName.toLowerCase()}${authKey}`);
    hash.end();
  })
}

createHirezSignature.createTimestamp = createTimestamp;
module.exports = createHirezSignature;
