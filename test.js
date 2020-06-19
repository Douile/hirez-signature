const createHirezSignature = require('./index.js');

const TESTS = [
  {
    devId: '1004',
    methodName: 'getPlayer',
    authKey: '23DF3C7E9BD14D84BF892AD206B6755C0',
    timestamp: '20120927183145',
    signature: 'f50729227aedee6b390f13b289b06e7b'
  }
];

async function test() {
  for (let t of TESTS) {
    const { signature, timestamp } = await createHirezSignature(t.devId, t.methodName, t.authKey, t.timestamp);
    if (signature !== t.signature) throw new Error(`Signature for ${t.methodName}[${t.devId}] is wrong ${signature}!=${t.signature}`);
  }
  console.log('All tests passed');
}

if (!require.parent) test().then(null,console.error);

module.exports = test;
