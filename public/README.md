
hosts切换插件可以轻松创建多套hosts方案，并快速进行切换。

**插件说明**

- 您可添加其他自定义方案，公共配置会和自定义方案合并，一起写入系统hosts文件中。
	
	> 公共配置：首次使用插件时读取系统现有hosts文件中的内容

- 如果 提示 hosts 文件不可写，请查看 `C:\Windows\System32\drivers\etc\hosts`文件属性，取消文件只读属性

- 如果不想每次都弹出授权窗口，或360拦截窗口，可以在 hosts 文件属性中切换到「安全」标签，点击「编辑」，选择你当前的登录用户名，在权限列表中勾选「写入」，保存退出

- `双击`自定义方案 更新hosts文件

- 自定义方案 支持单选/多选

- 自定义方案支持右键菜单进行管理

- 支持 明亮/黑暗 两种配色

- 支持vim模式编辑

**如何清理浏览器缓存**

插件暂时无法自动清理dns缓存，如果hosts切换后解析不正确，可以新打开一个无痕浏览标签，或参考以下方法清空dns缓存

chrome浏览器

> 地址栏中输入 chrome://net-internals/#dns
> 
> 右上角下拉菜单中选择：`Clear cache` 和 `Flush sockets`

firefox浏览器

> 地址栏中输入 about:config 
> 
> 搜索network.dnsCacheExpirationGracePeriod，编辑此项值为0

**系统hosts 文件位置**

> widnows: C:\Windows\System32\drivers\etc\hosts
   
> macOS/linux: /etc/hosts
