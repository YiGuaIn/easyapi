
let fs = require('fs')
let path = require('path')
let exec = require('child_process').exec;
let { generatorHtml, genServiceFile } = require('./parserHtml')

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
function includeGenHtml (conf) {
    return new Promise((resolve, reject) => { 
        try{
            generatorHtml(conf)
            resolve('ok...')  
        }catch(e){
            console.log(e)
            // reject(e)
        }
    })
}
function createService(conf){
    return new Promise((resolve, reject) => {
        try {
            // 1. 生成一个配置文件，以便用户修改
            genServiceFile({dir: conf.fdir, file: 'config.json'}, `{"host": "${conf.host}", "port":${conf.port}, "rootDir": "${conf.fdir.replace(/\\/g, '\\\\')}", "file": "${conf.fname}"}`)
            
            // 2. 生成服务脚本
            let service = `
            let http = require('http');
            let fs = require('fs');
            let config = require('./config.json')
            let exec = require('child_process').exec;
            function initService() {
                console.log('%s', '*******<<<<< 正在启动服务 >>>>>*******')
                console.log('%s', '******* host: ' + config.host)
                console.log('%s', '******* port: ' + config.port)
                console.log('%s', '----------------------------')
                let server = http.createServer((req, res) => {
                    let file = fs.readFileSync(config.rootDir + '/' + config.file)
                    res.end(file)
                })
                server.on('clientError', (err, socket) => {
                    socket.end('HTTP/1.1 400 Bad Request');
                });
                server.listen(config.port, config.host, () =>{
                    console.log('%s', '*******<<<<< 服务已启动 >>>>>*******')
                    switch (process.platform) {
                        case 'win32':
                            exec('cmd /c start http://' + config.host + ':' + config.port)
                            break
                        case 'linux':
                            exec('x-www-browser http://' + config.host + ':' + config.port)
                            break
                        default:
                            exec('open http://' + config.host + ':' + config.port)
                            break
                    }
                })
                server.on('error', ()=>{
                    console.log('service error...')
                })
            }
            initService()`
            genServiceFile({dir: conf.fdir, file: 'http.js'}, service)
            resolve('ok...')
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

async function init (conf) {
    try {
        // await createConfig(filename, conf)
        await includeGenHtml(conf)
        await createService(conf)
        if(conf.run) await isRunService(conf)
    } catch (err) {
        console.log(err)
        throw err
    }    
}

function isRunService(conf){
    return new Promise((resolve, reject) => {
        switch (process.platform) {
            case 'win32':
                exec(`node ${conf.fdir + '\\http.js'}`)
                break
            case 'linux':
                exec(`node ${conf.fdir + '/http.js'}`)
                break
            default:
                exec(`node ${conf.fdir + '/http.js'}`)
                break
        }
        resolve('ok...')
    })
}

module.exports = init
