# 生成Api文档简易工具
---
## 使用方法
1. npm install git+https://github.com/YiGuaIn/easyapi_yi.git
2. 可在package.json添加配置项
    * filedir: 扫描的目录, 默认为根目录
    * filename: 扫描的文件， 默认为 *.api.js
    * htmldir: 生成html的指定目录, 默认是根目录, 且为doc
    * htmlname: 生成html的名称, 默认是api.html
3. 引入生成 
    * let {compiler} = require('mousetool') 
    * 在需要生成的地方调用compiler()
