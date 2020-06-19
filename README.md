# hirez-signature

_This project has no affiliation with Hirez studios_

A lightweight 0 dependency signature generator for the [Official hirez API](https://docs.google.com/document/d/1OFS-3ocSx-1Rvg4afAnEHlT3917MAK_6eJTR6rzr-BM/edit#), it's essential just a wrapper for the [crypto hash object](https://nodejs.org/api/crypto.html#crypto_class_hash)

## Examples

```javascript
const createHirezSignature = require('hirez-signature');
const fetch = require('node-fetch');

async function fetchMethod(methodName, devId, authKey, session) {
  const { signature, timestamp } = await createHirezSignature(devId, methodName, authKey);
  const res = await fetch(`http://api.smitegame.com/smitgame.svc/${methodName}Json/${devId}/${signature}/${session ? `${session}/` : ''}${timestamp}`);
  return await res.json();
}

async function createSession(devId, authKey) {
  return await fetchMethod('createsession', devId, authKey);
}
```

## Documentation

## Functions

<dl>
<dt><a href="#createTimestamp">createHirezSignature.createTimestamp()</a> ⇒ <code>string</code></dt>
<dd><p>Create a timestamp as defined in hirez API docs</p>
</dd>
<dt><a href="#createHirezSignature">createHirezSignature(devId, methodName, authKey, [timestamp])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Create a hirez signature</p>
</dd>
</dl>

## createHirezSignature.createTimestamp() ⇒ <code>string</code>
Create a timestamp as defined in hirez API docs

**Kind**: global function
**Returns**: <code>string</code> - timestamp
<a name="createHirezSignature"></a>

## createHirezSignature(devId, methodName, authKey, [timestamp]) ⇒ <code>Promise.&lt;Object&gt;</code>
Create a hirez signature

**Kind**: global function
**Returns**: <code>Promise.&lt;Object&gt;</code> - A promise that resolves to an object containing signature and timestamp

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| devId | <code>string</code> \| <code>number</code> |  | Your API devId |
| methodName | <code>string</code> |  | The name of the api method being called (without type) |
| authKey | <code>string</code> |  | You API authKey |
| [timestamp] | <code>string</code> | <code>&quot;Current timestamp&quot;</code> | (Optional) The timestamp to use |
