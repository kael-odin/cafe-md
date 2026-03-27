# Cafe MD ☕

**极简但强大的 Markdown 在线工具**

[English](#english) | [中文](#中文)

---

## 中文

### 🎯 项目简介

Cafe MD 是一个基于 Next.js 15+ 构建的现代化 Markdown 在线编辑器，集成了强大的编辑、预览、分享和思维导图功能。

### ✨ 核心特性

- 📝 **强大的编辑器**：基于 Vditor，支持三种编辑模式（所见即所得、即时渲染、分屏预览）
- 🌍 **国际化支持**：原生支持中英文切换
- 🎨 **主题切换**：支持亮色/暗色/跟随系统三种主题
- 📤 **文件导入**：支持拖放本地 .md 文件
- 💾 **自动保存**：本地 localStorage 自动保存，防止内容丢失
- 🔗 **分享功能**：生成公开/私密分享链接，支持过期时间设置
- 🗺️ **思维导图**：一键生成 Markdown 思维导图并导出 SVG
- 📊 **图表支持**：支持 Mermaid、数学公式、代码高亮等
- 🚀 **快速部署**：支持 Vercel 一键部署

### 🛠️ 技术栈

- **框架**: Next.js 15+ (App Router)
- **语言**: TypeScript 5+
- **样式**: Tailwind CSS 3+
- **编辑器**: Vditor 3.10+
- **思维导图**: markmap
- **国际化**: next-intl
- **存储**: Supabase (可选) / 内存存储
- **部署**: Vercel

### 📦 安装

```bash
# 克隆仓库
git clone <your-repo-url>
cd cafe-md

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 🚀 快速开始

1. **编辑 Markdown**: 在编辑器中直接编写或粘贴内容
2. **导入文件**: 拖放本地 .md 文件到编辑器
3. **切换主题**: 点击右上角主题选择器
4. **切换语言**: 点击右上角语言选择器
5. **生成思维导图**: 点击工具栏"思维导图"按钮
6. **分享文档**: 点击"分享"按钮生成分享链接

### 📁 项目结构

```
cafe-md/
├── src/
│   ├── app/
│   │   ├── [locale]/          # 国际化路由
│   │   │   ├── layout.tsx     # 根布局
│   │   │   └── page.tsx       # 首页
│   │   ├── api/               # API 路由
│   │   │   ├── share/         # 分享 API
│   │   │   └── upload/        # 上传 API
│   │   └── s/[slug]/          # 分享页面
│   ├── components/            # React 组件
│   │   ├── VditorEditor.tsx   # 编辑器组件
│   │   ├── Toolbar.tsx        # 工具栏
│   │   ├── MindmapModal.tsx   # 思维导图弹窗
│   │   ├── ShareDialog.tsx    # 分享对话框
│   │   ├── LanguageSwitcher.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── i18n/                  # 国际化配置
│   └── middleware.ts          # 中间件
├── messages/                  # 语言文件
│   ├── zh-CN.json
│   └── en-US.json
└── public/                    # 静态资源
```

### 🎨 功能演示

#### 编辑器模式
- **所见即所得 (WYSIWYG)**: 类似 Word 的富文本编辑体验
- **即时渲染 (IR)**: 类似 Typora 的实时渲染模式
- **分屏预览 (SV)**: 左侧编辑，右侧预览

#### 工具栏功能
- 标题、粗体、斜体、删除线
- 引用、列表、代码、链接、表格
- 撤销、重做
- 导出（HTML/Markdown/Text）
- 思维导图
- 分享

### 🔧 配置

#### 环境变量（可选）

创建 `.env.local` 文件：

```env
# Supabase 配置（用于持久化存储）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 📝 开发计划

#### V1.0 (当前版本) ✅
- [x] Vditor 编辑器集成
- [x] 中英文国际化
- [x] 主题切换
- [x] 本地文件拖放
- [x] localStorage 自动保存
- [x] 分享功能（内存存储）
- [x] 思维导图生成
- [x] 导出功能

#### V2.0 (计划中)
- [ ] Supabase 持久化存储
- [ ] 用户系统
- [ ] 我的文档管理
- [ ] 文档历史版本
- [ ] 图片上传到云存储
- [ ] AI 功能集成

#### V3.0 (未来)
- [ ] 团队协作
- [ ] 实时协作编辑
- [ ] 私有化部署
- [ ] 商业化功能

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📄 许可证

MIT License

---

## English

### 🎯 Introduction

Cafe MD is a modern Markdown online editor built with Next.js 15+, featuring powerful editing, preview, sharing, and mind map capabilities.

### ✨ Key Features

- 📝 **Powerful Editor**: Based on Vditor, supports three editing modes (WYSIWYG, Instant Rendering, Split View)
- 🌍 **Internationalization**: Native support for Chinese and English
- 🎨 **Theme Switching**: Light/Dark/System themes
- 📤 **File Import**: Drag and drop local .md files
- 💾 **Auto Save**: Local localStorage auto-save
- 🔗 **Sharing**: Generate public/private share links with expiration
- 🗺️ **Mind Map**: One-click Markdown mind map generation with SVG export
- 📊 **Chart Support**: Mermaid, math formulas, code highlighting
- 🚀 **Fast Deployment**: One-click Vercel deployment

### 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Editor**: Vditor 3.10+
- **Mind Map**: markmap
- **i18n**: next-intl
- **Storage**: Supabase (optional) / In-memory
- **Deployment**: Vercel

### 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cafe-md

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

### 🚀 Quick Start

1. **Edit Markdown**: Write or paste content directly in the editor
2. **Import File**: Drag and drop local .md files into the editor
3. **Switch Theme**: Click the theme selector in the top right
4. **Switch Language**: Click the language selector in the top right
5. **Generate Mind Map**: Click the "Mind Map" button in the toolbar
6. **Share Document**: Click the "Share" button to generate a share link

### 📝 Roadmap

#### V1.0 (Current) ✅
- [x] Vditor editor integration
- [x] Chinese/English i18n
- [x] Theme switching
- [x] Local file drag & drop
- [x] localStorage auto-save
- [x] Share feature (in-memory)
- [x] Mind map generation
- [x] Export functionality

#### V2.0 (Planned)
- [ ] Supabase persistent storage
- [ ] User system
- [ ] Document management
- [ ] Version history
- [ ] Cloud image upload
- [ ] AI integration

#### V3.0 (Future)
- [ ] Team collaboration
- [ ] Real-time collaborative editing
- [ ] Self-hosted deployment
- [ ] Commercial features

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📄 License

MIT License

---

## 🙏 致谢 / Acknowledgments

- [Vditor](https://github.com/Vanessa219/vditor) - 强大的 Markdown 编辑器
- [markmap](https://github.com/markmap/markmap) - Markdown 思维导图
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [next-intl](https://next-intl-docs.vercel.app/) - 国际化方案

---

**Made with ❤️ by Cafe MD Team**
