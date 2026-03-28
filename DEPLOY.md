# 部署指南

## 1. Supabase 配置

### 创建数据库表

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 **SQL Editor**
4. 执行 `supabase/schema.sql` 中的 SQL 脚本

### 创建存储桶

1. 进入 **Storage**
2. 点击 **New bucket**
3. 创建名为 `images` 的存储桶
4. 设置为 **Public bucket**

### 获取 API 密钥

1. 进入 **Settings** → **API**
2. 复制以下信息：
   - **Project URL**: `https://swuwlubjayyduhpfngaj.supabase.co`
   - **anon public key**: 已配置在 `.env.local` 中

## 2. Cloudflare Workers 部署

### 前置要求

- Cloudflare 账号
- Wrangler CLI（已安装）

### 部署步骤

1. **登录 Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **部署到 Cloudflare Workers**
   ```bash
   npm run deploy
   ```

### 本地预览

```bash
npm run preview
```

## 3. 环境变量

项目已配置以下环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

## 4. 功能说明

### 已实现功能

- ✅ Markdown 编辑器（三种模式）
- ✅ 文件拖拽上传
- ✅ 图片压缩上传
- ✅ 分享功能（客户端直连 Supabase）
- ✅ 思维导图
- ✅ 多格式导出
- ✅ 国际化（中英文）
- ✅ 暗色模式

### 技术栈

- **框架**: Next.js 15.2.9
- **编辑器**: Vditor
- **数据库**: Supabase
- **部署**: Cloudflare Workers (OpenNext)
- **样式**: Tailwind CSS 4

## 5. 免费额度

### Supabase 免费额度

- 数据库：500 MB
- 存储：1 GB
- 带宽：5 GB/月

### Cloudflare Workers 免费额度

- 请求数：100,000 次/天
- 计算：10 ms CPU 时间/请求

完全够用！✅
