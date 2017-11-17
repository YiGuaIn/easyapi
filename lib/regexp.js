module.exports = {
    SLICE_STAR_INNER: /\/\*\*(.*?)\*\//g, // 匹配/** */内容
    MATCH_R_N: /[\r\n]/g, // 匹配换行符
    MATCH_SPACES: /^(\s*)/g, // 匹配开始为空格
    MATCH_ALL_SPACES: /\s+/gm, // 匹配所有空格
    SPACE_STAT: /\s+\*/gm, // 匹配空格+*号
    NOTE_BEGIN: /^\/\*\*+/g, // 匹配注释的开始标记
    NOTE_END: /\/$/, // 匹配注释的结束标记
    NOTE_PARAM: /@(\S)/g, // 匹配注释的参数
    NOTE_FIELD: /^@(.*?)\s/g, // 截取参数字符
    NOTE_FLAG: '\\Z@$1', // 参数切割标记
    SPLIT_FLAG: '\\Z', // 切割标记
    REPLACE_EMPTY: '' // 替换的空
}
