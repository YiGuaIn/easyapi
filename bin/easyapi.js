#!/usr/bin/env node
let exec = require('child_process').exec;

function install() {
    return new Promise((resolve, reject)){
        try {
            console.log('---------运行中-----------')
            console.log('----------正在安装依赖包，请稍等-----------')
            console.log('*****************************************')
            exec("npm install")
            console.log('----------安装完成，正在生成````-----------')
            resolve('ok...')
        } catch (error) {
            reject(error)
        }
    }
}

function run(){
    return new Promise((resolve, reject) => {
        try {
            let argv = require('yargs')
            .option('run', {alias: 'r', describe: '是否运行服务'})
            .option('sdir', {alias: 'sd', describe: '请配置搜索的目录'})
            .option('sname', {alias: 'sn', describe: '请配置搜索的文件名'})
            .option('fdir', {alias: 'fd', describe: '请配置生成的根目录'})
            .option('fname', {alias: 'fn', describe: '请配置生成文件的名称'})
            .option('host', {describe: '请配置生成的根目录'})
            .option('port', {describe: '请配置生成文件的名称'})
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
            
            console.log(argv);
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
            reject(error)
        }
    })
}

async function init(){
    await install();
    await run();
}