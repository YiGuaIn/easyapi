'use strict'

let fileTool = require('./readFiles') // 文件工具类
let regex = require('./regexp') // 正则枚举类
let Enums = require('./fieldEnum') // 解析对应标记枚举
let { ApiModel, ParamModel } = require('./models')

/**
 * 解析接口文件
 * @param {String} file 
 * @returns {Array}
 */
function parseByFile (conf) {
    let arrs = []
    let stream = fileTool.readMutipleFile(conf)
    if (stream === null || stream === 'undefined' || stream === '') throw new Error('没找到文件')
    stream = stream.replace(regex.MATCH_R_N, regex.REPLACE_EMPTY).replace(regex.MATCH_SPACES, regex.REPLACE_EMPTY)
    arrs = stream.toString().match(regex.SLICE_STAR_INNER)
    if (!arrs || arrs.length <= 0) {
        throw new Error('没找到文件')
    }
    arrs.map((item, index) => { 
        arrs[index] = replaceByApiText(item)
    })
    return splitByApiText(arrs)
}
/**
 * 正则替换分解方法
 * @param {any} item 接口字符串
 * @returns {Array}
 */
function replaceByApiText (item) {
    if (typeof (item) === 'undefined' || item == null) return regex.REPLACE_EMPTY
    item = item.replace(regex.SPACE_STAT, regex.REPLACE_EMPTY)
    item = item.replace(regex.NOTE_BEGIN, regex.REPLACE_EMPTY)
    item = item.replace(regex.NOTE_END, regex.REPLACE_EMPTY)
    item = item.replace(regex.MATCH_SPACES, regex.REPLACE_EMPTY)
    item = item.replace(regex.NOTE_PARAM, regex.NOTE_FLAG)
    return item
}
/**
 * 切割接口文本
 * @param {any} list 接口集
 * @returns {Array} 返回一个二维数组
 */
function splitByApiText (list) {
    if (typeof (list) === 'undefined' || list == null) return
    let apiList = []
    list.forEach(function (elem) {
        apiList.push(elem.split(regex.SPLIT_FLAG))
    }, this)
    return parseByApiText(apiList)
}
/**
 * 解析参数，生成接口对象
 * @param {any} apiText 
 * @returns {Array}
 */
function parseByApiText (list) {
    let apiList = []
    list.forEach((item, index) => {
        apiList.push(generatorObject(item))
    })
    return apiList
}
/**
 * 生成标准api对象数组
 * @param {Array} params 
 */
function generatorObject (params) {
    let api = Object.assign({}, ...ApiModel)
    api.reqParams = []
    api.resParams = []
    params.forEach((param, index) => {
        if (param.indexOf('@') < 0) {
            api.name = param
        } else {
            let fileds = param.match(regex.NOTE_FIELD)
            if (fileds === null || fileds === 'undifined' || fileds.length <= 0) return
            let flag = fileds[0].replace('@', regex.REPLACE_EMPTY).trim()
            if (typeof (flag) === 'undefined' || flag == null) return regex.REPLACE_EMPTY
            switch (flag) {
            case Enums.NAME:
                api.name = getFieldText(param)
                break
            case Enums.DESCRIPTION:
                api.descript = getFieldText(param)
                break
            case Enums.LINK:
                api.hostname = getFieldText(param)
                break
            case Enums.METHOD:
                api.method = getFieldText(param)
                break
            case Enums.PARAM:
                api.reqParams.push(JSON.stringify(getParamField(param)))
                break
            case Enums.RESPONE:
                api.resParams.push(JSON.stringify(getParamField(param)))
                break
            default:
                break
            }
        }
    })
    return api
}
/**
 * 功能参数转换
 * @param {String} param 
 */
function getFieldText (param) {
    let arr = param.match(/\s.*/g)
    if (arr.length <= 0) return regex.REPLACE_EMPTY
    return arr[0].trim()
}
/**
 * 解析请求参数/响应参数
 * @param {any} param - 参数
 */
function getParamField (param) {
    let fieldName, fieldType, fieldDesc
    let paramModel = Object.assign({},...ParamModel)
    // fieldName = param.match(/\}(.*?)\s?-/g)[0].replace(/\}\s(.*?)\s-/, '$1')
    // fieldType = param.match(/\{(.*?)\}/g)[0].replace(/\{|\}/g, regex.REPLACE_EMPTY)
    // fieldDesc = param.match(/-\s.*/g)[0].replace(/-\s/g, regex.REPLACE_EMPTY)
    fieldName = /\}\s(.*?)\s?-/g.exec(param)
    fieldType = /\{(.*?)\}/g.exec(param)
    fieldDesc = /-\s.*/g.exec(param)
    paramModel.fieldName = fieldName == null ? '' : fieldName[0].replace(/\}\s(.*?)\s-/, '$1').trim()
    paramModel.fieldType = fieldType == null ? '' : fieldType[0].replace(/\{|\}/g, regex.REPLACE_EMPTY).trim()
    paramModel.fieldDesc = fieldDesc == null ? '' : fieldDesc[0].replace(/-\s(.*?)/g, '$1').trim()
    return paramModel
}

exports.parseByFile = parseByFile
