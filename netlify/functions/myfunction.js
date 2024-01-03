// netlify/functions/myFunction.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join('public')));

exports.handler = async (event, context) => {
  const { id1 } = event.params;
  const dynamicHtmlPath = path.join('views', 'server.html');

  return new Promise((resolve, reject) => {
    // 서버에서 server.html 파일 읽기
    fs.readFile(dynamicHtmlPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        resolve({
          statusCode: 500,
          body: 'Internal Server Error',
        });
      } else {
        // 읽어온 HTML 코드에 동적인 부분을 userId로 대체
        const dynamicHtml = data.replace(/{{objektId}}/g, id1);
        resolve({
          statusCode: 200,
          body: dynamicHtml,
        });
      }
    });
  });
};