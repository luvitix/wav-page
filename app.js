const express = require('express');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const App = require('./src/App'); // App.js에는 위에서 제공한 React Router 예제를 포함해야 합니다.

const app = express();

app.use(express.static(path.join('public')));

app.get('/:id1', (req, res) => {
    const id1 = req.params.id1;
    const context = {};

    // React 컴포넌트를 서버에서 렌더링
    const appHtml = ReactDOMServer.renderToString(
        <StaticRouter location={`/${id1}`} context={context}>
            <App />
        </StaticRouter>
    );

    // 서버에서 server.html 파일 읽기
    const dynamicHtmlPath = path.join('views', 'server.html');
    fs.readFile(dynamicHtmlPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // 읽어온 HTML 코드에 동적인 부분을 userId로 대체
            const dynamicHtml = data.replace(/{{objektId}}/g, id1);
            // React 애플리케이션의 렌더링 결과를 동적인 부분에 추가
            const finalHtml = dynamicHtml.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
            res.send(finalHtml);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});