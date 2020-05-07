---
 title: vscode使用REST Client
 date: 2019-06-08
 tags:
  - VSCODE
  - 编辑器
 categories:
  - 前端
---

### vscode REST Client 使用

1.根目录新建.http后缀的文件

2.语法说明

* 我们可以在 http 文件中直接定义变量,使用 '@' 符号开头,以 "variable name" 的格式来使用

```bash
    @url = http://localhost:4000/api/
    @json = Content-Type: application/json
    POST {{url}}register
    {{json}}

    {
      "userName":"admin2",
      "passWord":"123"
    }
```

> 普通请求
![31e95147.png](:storage\a9cdaf59-9c60-43cb-8719-cfeae22dd7bc\31e95147.png)
> 发送文件请求
![ca22d622.png](:storage\a9cdaf59-9c60-43cb-8719-cfeae22dd7bc\ca22d622.png)