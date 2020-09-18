## code

[后端接口参考](https://github.com/boot-vue/app)

```bash
 401: 认证失败/没有认证
 400: 参数错误
 403: 没有权限
 601: 用户名或密码错误
 602: access token无效
 603: refresh token无效
```

## Menu

> 动态生成的话 结构大概这样子  key与path last '/' 之后保持一致

```json
[
    {
        "name": "首页",
        "path": "/index",
        "key": "index",
        "icon": "apple"
    },
    {
        "name": "嘿嘿嘿",
        "path": "/test",
        "key": "test",
        "icon": "android"
    },
    {
        "name": "用户管理",
        "path": "/user",
        "key": "user",
        "icon": "inbox",
        "sub": [
            {
                "key": "userList",
                "name": "用户列表",
                "path": "/user/userList"
            },
            {
                "key": "xxx",
                "name": ".....",
                "path": "/user/xxx"
            }
        ]
    }
]
```

## todo
- [ ] 踢掉moment.js
- [ ] 升级到vue3  坐等正式发布...
