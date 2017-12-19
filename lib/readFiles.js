'use strict'

let fs = require('fs')
let path = require('path')
let glob = require('glob')
let config = require('./config.json')
let { Readable } = require('stream')

class FileTool {
    /**
     * 判断文件是否存在
     * @param {String} name 
     */
    isFile (name) {
        if (!fs.existsSync(name)) return false
        return fs.statSync(name).isFile()
    }
    /**
     * 生成Html业务
     * @param {String} name 
     * @param {Buffer} buff 
     */
    mkFile (name, buff) {
        if (name === 'undefined' || name == null || name === '') throw Error
        return new Promise((resolve, reject) => {
            let per = path.parse(name) 
            let dir = per.dir
            let filename = per.base
            let spilts = dir.split(/[/\\]/)
            let mkDir = name || process.cwd()
            let fn = ''
            spilts.forEach(elem => {
                if (elem === '') return false
                fn = path.join(fn, elem + '\\')
                if (fs.existsSync(fn)) return false
                fs.mkdir(fn, (err, files) => {
                    if (err) throw err
                })
            })
            
            filename = path.join(fn, filename)
            buff = Buffer.from(buff)
            let writeStream = fs.createWriteStream(filename)
            writeStream.on('open', _ => {
                writeStream.write(buff)
                writeStream.end()
            })
            writeStream.on('finish', _ => {
                writeStream.close()
            })
            writeStream.on('error', err => {
                console.log(err)
            })
            resolve(1)
        })
    }
    /**
     * @param {String} name - 文件名
     */
    readFile (name) { // 读取文件
        if (!fs.existsSync(name)) return
        let file
        try {
            file = fs.readFileSync(name, 'utf-8')
        } catch (e) {
            throw new Error(e)
        }
        return file
    }
    readMutipleFile () {
        let files = this.getFiles() || []
        if (files.length === 0) throw new Error('找不到文件...')
        let buff = ''
        files.forEach(file => {
            let str = fs.readFileSync(file)
            buff += Buffer.from(str)
        })
        return buff
    }
    /**
     * 获取指定文件名的所有文件
     * @returns Array
     * @memberof FileTool
     */
    getFiles () {
        let files = []
        let dir = config.filedir === '' ? process.cwd() : config.filedir
        let fileLastName = config.filename === '' ? '*.api.js' : config.filename
        let pattern = path.join(dir, fileLastName)
        try {
            files = glob.sync(pattern)
            console.log(files)
        } catch (e) {
            throw new Error(e)
        }
        return files
    }
    /**
     * 获取指定文件的数量
     * @param {Array} pattern
     */
    getFilesTotal (pattern) {
        return this.getFiles(pattern).length
    }
    /**
     * 异步执行生成HTML文件
     */
    async generatorHtml (name, buff) {
        await this.mkFile(name, buff)
    }
}

module.exports = new FileTool()
