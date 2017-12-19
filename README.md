# 生成Api文档简易工具

## 安装插件

1. 全局安装
    * `npm install git+https://github.com/YiGuaIn/easyapi.git -g`

2. 局部安装
    * `npm install git+https://github.com/YiGuaIn/easyapi.git`

---

## 使用配置

1. 使用示例(打开命令行，运行 easyapi 命令, 如下配置使用)
    * `easyapi --r --sd=E:\\webroot\\web--sn=**/*.routes.js --fd=E:\\web\\api --fn=index.html`

2. 参数说明
    * `easyapi`: 工具命令
    * `--r`: 是否生成并运行服务, true/false: 运行/不运行(--run的简写);
    * `--run`: 同上;
    * `--sd`: (必填)指定查询的目录(--sdir的简写);
    * `--sdir`: 同上;
    * `--sn`: (必填)指定查询的文件格式，* 代表任意字符(--sname的简写);
    * `--sname`：同上;
    * `--fd`: (必填)指定生成保存的目录(--sdir的简写);
    * `--fdir`: 同上;
    * `--fn`: 生成api文档的名称(--fname的简写);
    * `--fname`：同上;
    * `--h`：服务地址(--host的简写), 默认 http://127.0.0.1;
    * `--host`：同上;
    * `--p`：服务端口(--port的简写), 默认 8088;
    * `--port`：同上;
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
