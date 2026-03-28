# Cafe MD Browser Extension

Chrome/Edge 浏览器扩展，支持拖拽打开 Markdown 文件。

## 功能

- **拖拽打开** - 将 .md 文件拖拽到浏览器任意页面，自动在 Cafe MD 中打开
- **点击图标** - 点击扩展图标打开 Cafe MD
- **右键菜单** - 选中文本后右键可「Open with Cafe MD」

## 从 GitHub 下载安装

### 方法一：下载 ZIP

1. 访问 [GitHub 仓库](https://github.com/kael-odin/cafe-md)
2. 点击绿色的 **Code** 按钮
3. 选择 **Download ZIP**
4. 解压 ZIP 文件
5. 找到 `extension` 文件夹

### 方法二：Git Clone

```bash
git clone https://github.com/kael-odin/cafe-md.git
cd cafe-md/extension
```

## 安装到浏览器

### Chrome 浏览器

1. 打开扩展管理页面
   - 在地址栏输入：`chrome://extensions/`
   - 或者：菜单 → 更多工具 → 扩展程序

2. 开启开发者模式
   - 右上角开关打开「开发者模式」

3. 加载扩展
   - 点击左上角「加载已解压的扩展程序」
   - 选择 `extension` 文件夹（**注意：不是 `extension\icons` 子文件夹**）

4. 完成！
   - 扩展图标会出现在工具栏
   - 现在可以将 .md 文件拖拽到浏览器中打开了

### Edge 浏览器

1. 打开扩展管理页面
   - 在地址栏输入：`edge://extensions/`

2. 开启开发人员模式
   - 左侧开关打开「开发人员模式」

3. 加载扩展
   - 点击「加载解压缩的扩展」
   - 选择 `extension` 文件夹

## 设置浏览器主页（可选）

### 方法一：设置启动页

1. 打开 Chrome 设置：`chrome://settings/`
2. 找到「启动时」
3. 选择「打开特定网页」
4. 点击「添加新网页」
5. 输入：`file:///D:/path/to/cafe-md/extension/launcher.html`
   （将路径替换为你的实际路径）

### 方法二：使用 New Tab Redirect 扩展

1. 安装 [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect) 扩展
2. 设置重定向 URL 为本地文件路径

## 使用方法

### 方法一：拖拽文件（推荐）
1. 在电脑上找到 .md 文件
2. 将文件拖拽到浏览器窗口
3. 出现蓝色覆盖层时松开鼠标
4. 自动在新标签页打开 Cafe MD

### 方法二：点击图标
- 点击浏览器工具栏中的 Cafe MD 图标
- 自动打开新标签页进入编辑器

### 方法三：右键菜单
- 在网页中选中任意文本
- 右键 → 「Open with Cafe MD」
- 选中的内容会在编辑器中打开

### 方法四：设置浏览器主页
- 按照「设置浏览器主页」步骤设置
- 每次打开浏览器或新标签页都会显示拖拽页面
- 直接拖拽文件即可打开

## 支持的文件类型

- `.md` - Markdown 文件
- `.markdown` - Markdown 文件
- `.txt` - 纯文本文件

## 故障排除

### 扩展无法加载
- 确保已开启「开发者模式」
- 确保选择了正确的 `extension` 文件夹（不是 `icons` 子文件夹）
- 检查图标文件是否存在

### 拖拽文件没反应
- 确保扩展已启用
- 刷新页面后重试
- 确保文件是 .md、.markdown 或 .txt 格式
- 检查浏览器是否阻止了弹窗

### 右键菜单不显示
- 刷新页面后重试
- 检查扩展是否已启用

### 图标显示异常
- 确保 `icons` 文件夹中有正确尺寸的图标文件

## 更新扩展

当有新版本时：

1. 下载最新的 `extension` 文件夹
2. 打开 `chrome://extensions/`
3. 找到 Cafe MD 扩展
4. 点击刷新按钮 🔄

## 隐私说明

- 扩展只在拖拽文件时读取文件内容
- 文件内容通过 URL 参数传递给 Cafe MD
- 不会收集或上传任何用户数据
