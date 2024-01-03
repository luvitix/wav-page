exports.handler = async (event, context) => {
    // Netlify Function 로직 추가
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from Netlify Function!" }),
    };
};