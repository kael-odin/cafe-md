# Cafe MD Browser Extension

Chrome/Edge 浏览器扩展，支持拖拽打开 Markdown 文件，自动渲染本地 .md 文件。

## 功能

- **拖拽打开** - 将 .md 文件拖拽到浏览器任意页面，自动在 Cafe MD 中打开
- **本地预览** - 直接打开本地 .md 文件时自动渲染预览
- **点击图标** - 点击扩展图标打开 Cafe MD
- **右键菜单** - 选中文本后右键可「Open with Cafe MD」
- **设置页面** - 可配置自动渲染、语言等选项

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

1. 打开扩展管理页面：`chrome://extensions/`
2. 开启右上角的「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择 `extension` 文件夹（**不是** `extension\icons` 子文件夹）

### Edge 浏览器

1. 打开扩展管理页面：`edge://extensions/`
2. 开启左侧的「开发人员模式」
3. 点击「加载解压缩的扩展」
4. 选择 `extension` 文件夹

## 使用方法

### 方法一：直接打开本地 .md 文件
1. 在 Chrome 中按 `Ctrl+O`（Mac: `Cmd+O`）
2. 选择一个 `.md` 文件
3. 自动渲染预览，可点击「在编辑器中打开」编辑

### 方法二：拖拽文件到浏览器
1. 将 .md 文件拖拽到浏览器窗口
2. 出现蓝色覆盖层时松开鼠标
3. 自动在 Cafe MD 中打开

### 方法三：点击扩展图标
- 点击工具栏中的 Cafe MD 图标
- 打开在线编辑器

### 方法四：右键菜单
- 选中任意文本
- 右键 → 「Open with Cafe MD」

### 方法五：设置浏览器主页
1. 打开 Chrome 设置：`chrome://settings/`
2. 找到「启动时」→「打开特定网页」
3. 添加：`file:///D:/path/to/cafe-md/extension/launcher.html`

## 扩展设置

点击扩展图标 → 右键 → 「选项」可打开设置页面：

| 设置项 | 说明 |
|--------|------|
| 自动渲染本地 Markdown | 打开 .md 文件时自动渲染预览 |
| 将 .txt 文件视为 Markdown | 渲染 .txt 文件内容 |
| 启用拖拽打开 | 拖拽文件到浏览器打开 |
| 默认语言 | 界面语言设置 |

## 支持的文件类型

- `.md` - Markdown 文件
- `.markdown` - Markdown 文件
- `.txt` - 纯文本文件（可在设置中开启渲染）

## 故障排除

### 本地文件不渲染
- 确保扩展已启用
- 在扩展详情页开启「允许访问文件网址」
- 刷新页面

### 拖拽文件没反应
- 确保扩展已启用
- 刷新页面后重试
- 检查浏览器是否阻止了弹窗

### 扩展无法加载
- 确保已开启「开发者模式」
- 确保选择了正确的 `extension` 文件夹

## 更新扩展

1. 下载最新的 `extension` 文件夹
2. 打开 `chrome://extensions/`
3. 找到 Cafe MD 扩展，点击刷新按钮 🔄

## 隐私说明

- 扩展只在拖拽文件或打开本地文件时读取内容
- 文件内容通过 URL 参数传递给 Cafe MD
- 不会收集或上传任何用户数据
