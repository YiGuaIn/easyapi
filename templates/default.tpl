<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Api文档生成工具</title>
        <meta http-equiv="X-UA-Compatible" content="chrome=1,IE=edge">
        <meta name="renderer" content="webkit">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Cache-control" content="no-cache">
        <meta http-equiv="Cache" content="no-cache">
        <style>
            body, div, ul{
                padding: 0;
                margin: 0;
            }
            a { text-decoration: none;}
            ul {
                padding: 30px 0;
                text-align: center;
                box-sizing: border-box;
                max-height: 100%;
                overflow-y: auto;
            }
            li {
                list-style: none;
                padding: 12px 5px;
            }
            li:hover { background-color: #1abc9c; }
            header {
                position: relative;
                height: 80px;
                width: 100%;
                font-size: 28px;
                line-height: 80px;
                padding-left: 48px;
                font-weight: 600;
                color: #337777;
                z-index: 1;
                background-color: #B8E1E1;
                box-sizing: border-box;
            }
            aside {
                position: absolute;
                padding-top: 80px;
                top: 0;
                left: 0;
                width: 270px;
                height: 100%;
                background-color: #B8E1E1;
                box-sizing: border-box;
            }
            .content {
                margin-left: 270px;
                height: 100%;
                max-height: 768px;
                overflow-y: auto;
                padding: 30px;
            }
            .parag { margin-bottom: 40px; }
            .parag:last-of-type { margin-bottom: 200px; }
            p { color: #333 }
            p.title{
                font-size: 18px;
                color: #419BF9;
            }
            table,table tr th, table tr td { border:1px solid #B8E1E1; color: #333333; }
            table { text-align: center; border: 1px solid #B8E1E1; box-sizing: border-box; border-collapse: collapse; }
            tr { height: 36px;}
            th { font-weight: 500; padding: 0 30px;}
        </style>
    </head>
    <body>
        <header>Mouse Tool</header>
        <div class="container">
            <aside>
                <ul>
                    <li><a href="#接口1">接口1</a></li>
                    <li><a href="#接口2">接口2</a></li>
                    <li><a href="#接口3">接口3</a></li>
                </ul>
            </aside>
            <div class="content">
                <div class="parag">
                    <a href="#接口1">
                        <h2 id="接口1">接口1</h2>
                    </a>
                    <p>我是接口1的内容</p>
                </div>
                <div class="parag">
                    <a href="#接口2">
                        <h2 id="接口2">接口2</h2>
                    </a>
                    <p>我是接口2的内容</p>
                </div>
                <div class="parag">
                    <a href="#接口3">
                        <h2 id="接口3">接口3</h2>
                    </a>
                    <p>我是接口3的内容</p>
                </div>
            </div>
        </div>
        <footer></footer>
    </body>
</html>