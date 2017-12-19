#!/usr/bin/env node

function run(){
    return new Promise((resolve, reject) => {
        try {
            let argv = require('yargs')
            .option('run', {alias: 'r', describe: '是否运行服务'})
            .option('sdir', {alias: 'sd', describe: '请配置搜索的目录'})
            .option('sname', {alias: 'sn', describe: '请配置搜索的文件名'})
            .option('fdir', {alias: 'fd', describe: '请配置生成的根目录'})
            .option('fname', {alias: 'fn', describe: '请配置生成文件的名称'})
            .option('host', {describe: '服务地址'})
            .option('port', {describe: '服务端口'})
            .demandOption(['sdir', 'sname', 'fdir', 'fname'], '请检查配置的参数')
            .help()
            .argv;
            
            let easyInit = require('../lib/index.js');
            
            let config = {
                run: argv.run || false,
                sdir: argv.sdir || 'src/routes',
                sname: argv.sname || '*.route.js',
                fdir: argv.fdir || 'doc',
                fname: argv.fname || 'api.html',
                host: argv.host || '127.0.0.1',
                port: argv.port || 8088
            };
            
            console.log(config);
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
            easyInit(config);
            resolve('ok...')
        } catch (error) {
            console.log('2124545')
            reject(error)
        }
    })
}

async function init(){
    await run();
}

init();