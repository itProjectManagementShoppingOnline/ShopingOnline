const express = require('express');

const app = express();
const fs = require('fs');
const Mock = require('mockjs');
const path = require('path');

const DIR_PATH = __dirname;
const JSON_PATH = path.join(DIR_PATH, 'datas');

const apis = require(path.join(DIR_PATH, 'config/apis.js'));
console.log(apis);

for (const api in apis) {
  app.all(api, (req, res) => {
    const data = fs.readFileSync(path.join(JSON_PATH, apis[api]), 'utf-8');
    objData = Mock.mock(JSON.parse(data));
    res.send(objData);
  });
}

var server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Mock listening at port %s', host, port);
});
