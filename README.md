# 生成Api文档简易工具
---
## 使用方法
1. npm install git+https://github.com/YiGuaIn/easyapi.git
2. 可在package.json添加配置项
    * filedir: 扫描的目录, 默认为根目录
    * filename: 扫描的文件， 默认为 *.api.js
    * htmldir: 生成html的指定目录, 默认是根目录, 且为doc
    * htmlname: 生成html的名称, 默认是api.html
3. 引入生成 
    * let {compiler} = require('easyapi') 
    * 在需要生成的地方调用compiler()

---
## 解析格式
```
/**
 * 接口名称
 * @ description 接口描述
 * @ method 接口方法
 * @ link 接口地址
 * @ req {类型} filed1 - 参数描述(请求)
 * @ req {类型} filed2 - 参数描述(请求)
 * @ res {类型} filed1 - 参数描述(响应)
 * @ res {类型} filed2 - 参数描述(响应)
 */
```