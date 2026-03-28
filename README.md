<div align="center">

# ☕ Cafe MD

**极简但强大的 Markdown 在线编辑器**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare)](https://workers.cloudflare.com/)

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 🎯 项目简介

**Cafe MD** 是一个免费、开源的 Markdown 在线编辑器，无需登录即可使用。支持实时预览、思维导图、多格式导出、云端分享等功能。文档内容仅保存在本地浏览器，保护你的隐私安全。

🔗 **在线体验**: [https://cafe-md.t445481611.workers.dev](https://cafe-md.t445481611.workers.dev)

### ✨ 核心特性

| 功能 | 描述 |
|------|------|
| 📝 **三种编辑模式** | 所见即所得、即时渲染、分屏预览 |
| 🌍 **国际化支持** | 原生支持中英文切换 |
| 🎨 **暗色模式** | 支持亮色/暗色/跟随系统 |
| 🔒 **数据安全** | 文档仅保存在本地浏览器 |
| 📤 **多格式导出** | HTML、Markdown、PDF、DOCX、微信样式 |
| 🔗 **云端分享** | 生成公开/私密分享链接 |
| 🗺️ **思维导图** | 一键生成并导出 SVG |
| 🖼️ **图片上传** | 自动压缩并上传到云端 |
| 📂 **拖拽上传** | 拖拽 .md 文件直接打开编辑 |

### 🚀 快速开始

#### 在线使用

直接访问 [cafe-md.t445481611.workers.dev](https://cafe-md.t445481611.workers.dev) 即可使用，无需安装。

#### 本地开发

```bash
# 克隆仓库
git clone https://github.com/kael-odin/cafe-md.git
cd cafe-md

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 🛠️ 技术栈

- **框架**: Next.js 15.2 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **编辑器**: Vditor 3.11
- **思维导图**: markmap
- **国际化**: next-intl
- **存储**: Supabase
- **部署**: Cloudflare Workers

### 📁 项目结构

```
cafe-md/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── lib/              # 工具库
│   └── i18n/             # 国际化配置
├── messages/             # 语言文件
├── supabase/             # 数据库脚本
└── public/               # 静态资源
```

### 🔧 环境变量（可选）

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 📝 开发计划

- [x] Vditor 编辑器集成
- [x] 中英文国际化
- [x] 暗色模式
- [x] 云端分享（公开/私密）
- [x] 图片上传
- [x] 思维导图
- [x] 多格式导出
- [x] 拖拽上传
- [ ] 用户系统（可选）
- [ ] 文档管理
- [ ] AI 辅助写作

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📄 许可证

[MIT License](LICENSE)

---

## English

### 🎯 Introduction

**Cafe MD** is a free, open-source Markdown online editor. No login required. Features real-time preview, mind maps, multi-format export, and cloud sharing. Your documents are stored locally in your browser for privacy protection.

🔗 **Live Demo**: [https://cafe-md.t445481611.workers.dev](https://cafe-md.t445481611.workers.dev)

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 **Three Editing Modes** | WYSIWYG, Instant Rendering, Split View |
| 🌍 **i18n Support** | Native Chinese and English |
| 🎨 **Dark Mode** | Light/Dark/System themes |
| 🔒 **Data Security** | Documents stored locally only |
| 📤 **Multi-format Export** | HTML, Markdown, PDF, DOCX, WeChat style |
| 🔗 **Cloud Sharing** | Generate public/private share links |
| 🗺️ **Mind Map** | One-click generation with SVG export |
| 🖼️ **Image Upload** | Auto-compress and upload to cloud |
| 📂 **Drag & Drop** | Drag .md files to open directly |

### 🚀 Quick Start

#### Online Usage

Visit [cafe-md.t445481611.workers.dev](https://cafe-md.t445481611.workers.dev) to use instantly, no installation needed.

#### Local Development

```bash
# Clone the repository
git clone https://github.com/kael-odin/cafe-md.git
cd cafe-md

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

### 🛠️ Tech Stack

- **Framework**: Next.js 15.2 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Editor**: Vditor 3.11
- **Mind Map**: markmap
- **i18n**: next-intl
- **Storage**: Supabase
- **Deployment**: Cloudflare Workers

### 📝 Roadmap

- [x] Vditor editor integration
- [x] Chinese/English i18n
- [x] Dark mode
- [x] Cloud sharing (public/private)
- [x] Image upload
- [x] Mind map
- [x] Multi-format export
- [x] Drag & drop upload
- [ ] User system (optional)
- [ ] Document management
- [ ] AI writing assistant

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📄 License

[MIT License](LICENSE)

---

## 🙏 Acknowledgments

- [Vditor](https://github.com/Vanessa219/vditor) - Powerful Markdown editor
- [markmap](https://github.com/markmap/markmap) - Markdown mind map
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing

---

<div align="center">

**Made with ❤️ by [kael-odin](https://github.com/kael-odin)**

⭐ If you like this project, please give it a star! ⭐

</div>
