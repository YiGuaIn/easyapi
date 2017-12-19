let http = require('http');
let fs = require('fs');
let path = require('path')

function initService(conf = {}) {
    let server = http.createServer((req, res) => {
        // let file = fs.readFileSync(path.resolve(__dirname,'index.js'))
        // console.log(file.toString())
        res.end('okay')
    })
    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    server.listen(8021, '127.0.0.1', () =>{
        console.log('yes...')
    })
    server.on('error', (err) =>{
        console.warn('连接错误....')
        throw err
    })
}

module.exports = initService;
initService()