let path = require('path')
let fsTool = require('./readFiles')
let cheerio = require('cheerio')
let rootDir = process.cwd()
let name = path.join(__dirname, '../templates/default.tpl')
let sidebarTpl = path.join(__dirname, '../templates/sidebar.tpl')
let contentTpl = path.join(__dirname, '../templates/parag.tpl')
let sidebar = cheerio.load(fsTool.readFile(sidebarTpl), {decodeEntities: false})
let content = cheerio.load(fsTool.readFile(contentTpl), {decodeEntities: false})
let $ = cheerio.load(fsTool.readFile(name), {decodeEntities: false})
let {parseByFile} = require('./parser')

function generatorHtml (conf) {
    let apiList = [];
    try {
        let apiList = parseByFile(conf) // 解析文件
        if (typeof (list) === 'undefined' || apiList.length <= 0) {
            throw '生成html失败';
        }
    } catch (error) {
        console.log(error)
    }
    let sidebarText = ''
    let contentText = ''
    apiList.forEach((item, index) => { // 赋值
        sidebar('a').attr('href', '#' + item.name.trim())
        sidebar('a').attr('name', item.name.trim())
        sidebar('a').text(item.name.trim())
        content('a').attr('href', '#' + item.name.trim())
        content('a').attr('name', item.name.trim()) 
        content('a h2').attr('id', item.name.trim())
        content('a h2').text(item.name.trim())
        content('.descript').text(item.descript.trim())
        content('.hostname').text(item.hostname.trim())
        content('.method').text(item.method.trim())
        let reqTr = ''
        let resTr = ''
        item.reqParams.forEach(el => {
            el = JSON.parse(el)
            reqTr += `<tr><td>${el.fieldName}</td><td>${el.fieldDesc}</td><td>${el.fieldType}</td><td></td></tr>`
        })
        item.resParams.forEach(el => {
            el = JSON.parse(el)
            resTr += `<tr><td>${el.fieldName}</td><td>${el.fieldDesc}</td><td>${el.fieldType}</td><td></td></tr>`
        })
        content('.request tbody').html(reqTr)
        content('.respone tbody').html(resTr)
        sidebarText += sidebar('ul').html()
        contentText += content('body').html()
    })
    sidebarText = '<ul>' + sidebarText + '</ul>'
    $('aside').text(sidebarText)
    $('.content').text(contentText)
    let apiFile = megrePath(conf.fdir, conf.fname)
    fsTool.generatorHtml(apiFile, $.html()) // 生成html页面
}

// 生成文件
function genServiceFile(conf, jsonstr) {
    let serverPath = megrePath(conf.dir, conf.file)
    console.log(serverPath)
    fsTool.mkFile(serverPath, jsonstr)
}
// 组合路径
function megrePath(dir, file){
    let pstr = '';
    switch (process.platform) {
        case 'win32':
            pstr = dir + '\\' + file
            break
        case 'linux':
            pstr = dir + '/' + file
            break
        default:
            break
        }
    return pstr
}

exports.genServiceFile = genServiceFile
exports.generatorHtml = generatorHtml
