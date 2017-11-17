
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

async function init () {
    try {
        await createConfig(filename, config)
        await includeGenHtml()
    } catch (err) {
        console.log(err)
        throw err
    }    
}

exports.compiler = init
