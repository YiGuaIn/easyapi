#!/usr/bin/env node
let yargs = require('yargs');
yargs.option('run', {alias: 'r', describe: '是否运行服务'});
yargs.option('sdir', {alias: 'sd', describe: '请配置搜索的目录'});
yargs.option('sname', {alias: 'sn', describe: '请配置搜索的文件名'});
yargs.option('fdir', {alias: 'fd', describe: '请配置生成的根目录'});
yargs.option('fname', {alias: 'fn', describe: '请配置生成文件的名称'});
yargs.option('host', {describe: '请配置生成的根目录'});
yargs.option('port', {describe: '请配置生成文件的名称'});
yargs.help();
let argv = yargs.argv;

let easyInit = require('../lib/index.js');

console.log(argv);
let config = {
    run: argv.r,
    sdir: argv.sd || 'src/routes',
    sname: argv.sn || '*.route.js',
    fdir: argv.fd || 'doc',
    fname: argv.fn || 'api.html',
    host: argv.host || '127.0.0.1',
    port: argv.port || 8088
};

let argvs = process.argv
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

easyInit(config);