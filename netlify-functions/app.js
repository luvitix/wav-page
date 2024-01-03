
const path = require('path');
const fs = require('fs');

exports.handler = async (event) => {
  const id1 = event.path.split('/').pop(); // 경로에서 id1 추출
  const dynamicHtmlPath = path.join(__dirname, '..', 'views', 'server.html');

  try {
    // server.html 파일 읽기
    const data = fs.readFileSync(dynamicHtmlPath, 'utf8');

    // 동적 컨텐츠 교체
    const dynamicHtml = data.replace(/{{objektId}}/g, id1);

    // 응답 반환
    return {
      statusCode: 200,
      body: dynamicHtml,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};