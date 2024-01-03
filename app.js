
const path = require('path');
const fs = require('fs');
const app = express();
// const port = 3000;

app.use(express.static(path.join('public')));


app.get('/:id1', (req, res) => {
    const id1 = req.params.id1;
    const dynamicHtmlPath = path.join('views', 'server.html');

    // 서버에서 server.html 파일 읽기
    fs.readFile(dynamicHtmlPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // 읽어온 HTML 코드에 동적인 부분을 userId로 대체
            const dynamicHtml = data.replace(/{{objektId}}/g, id1);
            res.send(dynamicHtml);
        }
    });
    // fs.readFile(`${masterfile}/tx_${id2}.txt`, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         // 파일 읽기 실패 시 에러 처리 로직을 추가하세요.
    //     } else {
    //         const fileContentLines = data.split('\n');
    //         const firstLine = fileContentLines[0];
    //         console.log(firstLine);
    //         // 파일 읽기 성공 시 콘솔에 데이터 출력
    //     }
    // });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });