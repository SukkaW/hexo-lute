'use strict';

const https = require('https');
const { writeFile } = require('fs').promises;
const { join } = require('path');

function get(hostname, path) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname,
        path,
        method: 'GET'
      },
      (res) => {
        const body = [];
        res.on('data', (chunk) => {
          body.push(chunk);
        });
        res.on('end', () => {
          try {
            resolve(Buffer.concat(body).toString());
          } catch (e) {
            reject(e);
          }
        });
        req.on('error', (err) => {
          reject(err);
        });
      }
    );

    req.end();
  });
}

get('raw.githubusercontent.com', '/88250/lute/master/javascript/lute.min.js')
  .then(text => writeFile(join(__dirname, 'lib/lute.min.js'), text))
  .catch(console.error);
