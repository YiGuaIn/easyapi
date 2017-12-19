let argv = require('yargs')
    .option('run', {alias: 'r', describe: '是否运行服务'})
    .option('sdir', {alias: 'sd', describe: '请配置搜索的目录'})
    .option('sname', {alias: 'sn', describe: '请配置搜索的文件名'})
    .option('fdir', {alias: 'fd', describe: '请配置生成的根目录'})
    .option('fname', {alias: 'fn', describe: '请配置生成文件的名称'})
    .option('host', {describe: '请配置生成的根目录'})
    .option('port', {describe: '请配置生成文件的名称'})
    .demandOption(['run', 'sdir'], '请检查配置的参数')
    .help()
    .argv

let easyInit = require('../lib/index.js')

console.log(argv)
let config = {
    run: argv.r,
    sdir: argv.sd || 'src/routes',
    sname: argv.sn || '*.route.js',
    fdir: argv.fd || 'doc',
    fname: argv.fn || 'api.html',
    host: argv.host || '127.0.0.1',
    port: argv.port || 8088,
}

// let argvs = process.argv
// argvs.forEach(el => {
//     if (!el.includes('=')) return false
//     let argv = el.split('=')
//     switch (argv[0].toLowerCase()) {
//         case 'filename'.toLowerCase():
//             config.filename = argv[1]
//             break
//         case 'fileDir'.toLowerCase():
//             config.filedir = argv[1]
//             break
//         case 'htmlname'.toLowerCase():
//             config.htmlname = argv[1]
//             break
//         case 'htmldir'.toLowerCase():
//             config.htmldir = argv[1]
//             break
//     } 
// })

easyInit(config)