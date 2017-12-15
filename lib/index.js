
let fs = require('fs')
let path = require('path')
let filename = path.join(__dirname, 'config.json')
let config = {
    'filename': '',
    'filedir': '',
    'htmlname': '',
    'htmldir': ''
}
let argvs = process.argv
argvs.forEach(el => {
    if (!el.includes('=')) return false
    let argv = el.split('=')
    switch (argv[0].toLowerCase()) {
    case 'filename'.toLowerCase():
        config.filename = argv[1]
        break
    case 'fileDir'.toLowerCase():
        config.filedir = argv[1]
        break
    case 'htmlname'.toLowerCase():
        config.htmlname = argv[1]
        break
    case 'htmldir'.toLowerCase():
        config.htmldir = argv[1]
        break
    } 
})
function createConfig (name, conf) {
    return new Promise((resolve, reject) => {
        let buff = Buffer.from(JSON.stringify(conf))
        let stream = fs.createWriteStream(name)
        stream.on('open', _ => {
            stream.write(buff)
            stream.end()
        })
        stream.on('error', err => {
            throw err
        })
        stream.on('finish', _ => {
            stream.close()
            resolve()         
        })
    })
}
function includeGenHtml () {
    return new Promise((resolve, reject) => {
        let { generatorHtml } = require('./parserHtml')
        generatorHtml()
    })
}

async function init (conf, service) {
    try {
        await createConfig(filename, conf)
        await includeGenHtml()
        let service = `
            let http = require('http');
            function initService(conf = {}) {
                console.log('%c%s', 'color: green', '*******<<<<< 正在启动服务 >>>>>*******')
                let server = http.createServer((req, res) => {
                    let file = fs.readFileSync('${conf.htmldir}/http.js')
                    res.end(file)
                })
                server.on('clientError', (err, socket) => {
                    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
                });
                server.listen(conf.port, conf.host, () =>{
                    console.log('%c%s', 'color: green', '*******<<<<< 服务已启动 >>>>>*******')
                })
                server.on('error', ()=>{

                })
            }
            initService()
        `
    } catch (err) {
        console.log(err)
        throw err
    }    
}

module.exports = init
// init()
