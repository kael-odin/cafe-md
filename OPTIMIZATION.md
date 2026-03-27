# Cafe MD 优化方案文档

## 已完成的优化 ✅

### 1. 思维导图优化
- ✅ 修复SVG错误
- ✅ 优化颜色显示（深色文字，清晰可见）
- ✅ 添加节点展开/折叠功能（点击节点）
- ✅ 默认展开2级节点
- ✅ 添加使用提示
- ✅ 优化加载状态

### 2. 用户体验优化
- ✅ 添加拖拽引导提示
- ✅ 工具栏添加中英文文字
- ✅ 添加目录导航按钮
- ✅ 添加PDF导出功能
- ✅ 优化按钮响应式显示

---

## 待优化问题及解决方案

### 问题1: 图片上传显示大量base64代码

**问题描述**：
- 上传图片后在Markdown中显示大量base64代码
- 无法控制图片大小
- 影响文档可读性

**解决方案**：

#### 方案A：使用图床服务（推荐）
```typescript
// 1. 使用免费图床（如 imgbb、imgur）
// 2. 上传图片到图床
// 3. 返回图片URL
// 4. 在Markdown中插入 ![](url)
```

**优点**：
- Markdown代码简洁
- 图片可控制大小
- 不占用本地存储

**缺点**：
- 依赖第三方服务
- 需要网络连接

#### 方案B：使用Vercel Blob存储
```typescript
// 1. 配置Vercel Blob
// 2. 上传图片到Blob
// 3. 返回公开URL
// 4. 支持图片压缩
```

**优点**：
- 官方支持
- 稳定可靠
- 支持private/public

**缺点**：
- 免费额度有限

#### 方案C：本地存储 + 压缩
```typescript
// 1. 压缩图片（使用browser-image-compression）
// 2. 存储到IndexedDB
// 3. 使用缩略图预览
// 4. 导出时打包图片
```

**推荐实现**：
```bash
npm install browser-image-compression
```

```typescript
import imageCompression from 'browser-image-compression';

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  
  const compressedFile = await imageCompression(file, options);
  return compressedFile;
};
```

---

### 问题2: Vercel国内访问问题

**问题描述**：
- Vercel在国内访问速度慢或无法访问
- 需要代理才能访问

**解决方案**：

#### 方案A：使用Cloudflare Pages（推荐）
```bash
# 1. 安装Wrangler
npm install -g wrangler

# 2. 登录Cloudflare
wrangler login

# 3. 部署
wrangler pages deploy ./out
```

**优点**：
- 国内访问速度快
- 免费额度充足
- 支持自定义域名
- 不需要备案

**缺点**：
- 需要Cloudflare账号

#### 方案B：使用Netlify
```bash
# 1. 安装Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 部署
netlify deploy --prod
```

**优点**：
- 国内访问相对较好
- 免费额度充足
- 支持自定义域名

**缺点**：
- 速度不如Cloudflare

#### 方案C：使用国内平台
1. **阿里云OSS + CDN**
   - 需要备案
   - 速度快
   - 成本较低

2. **腾讯云COS + CDN**
   - 需要备案
   - 速度快
   - 成本较低

3. **七牛云**
   - 需要备案
   - 有免费额度
   - 速度快

#### 方案D：多平台部署
```json
// package.json
{
  "scripts": {
    "deploy:vercel": "vercel --prod",
    "deploy:cloudflare": "wrangler pages deploy ./out",
    "deploy:netlify": "netlify deploy --prod",
    "deploy:all": "npm run deploy:vercel && npm run deploy:cloudflare"
  }
}
```

**推荐方案**：
1. **首选**：Cloudflare Pages（国内访问快，免费）
2. **备选**：Netlify（备用访问地址）
3. **国内**：阿里云/腾讯云（如需备案）

---

### 问题3: 深色模式下目录导航显示问题

**解决方案**：
```css
/* 添加深色模式样式 */
.dark .vditor-outline {
  background: #18181b !important;
  border-right: 1px solid #3f3f46 !important;
}

.dark .vditor-outline__item {
  color: #d4d4d8 !important;
}

.dark .vditor-outline__item--current {
  color: #60a5fa !important;
  background: #27272a !important;
}
```

---

### 问题4: 目录链接跳转问题

**问题描述**：
- 点击目录链接会新开tab
- 应该页内跳转

**解决方案**：
```typescript
// 修改Vditor配置
vditor = new Vditor(vditorRef.current, {
  // ... 其他配置
  preview: {
    markdown: {
      toc: true,
    },
  },
  // 添加锚点处理
  link: {
    isOpen: false, // 禁止新窗口打开
    click: (bom: Element) => {
      const href = bom.getAttribute('href');
      if (href && href.startsWith('#')) {
        // 页内跳转
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
});
```

---

### 问题5: 添加更多主题样式

**解决方案**：

#### 1. 代码主题
```typescript
// 支持的代码高亮主题
const codeThemes = [
  'github',
  'github-dark',
  'monokai',
  'monokai-sublime',
  'atom-one-dark',
  'atom-one-light',
  'vs',
  'vs2015',
  'gradient-dark',
  'railscasts',
  'color-brewer',
  'zenburn',
  'agate',
  'androidstudio'
];
```

#### 2. 内容主题
```typescript
// 支持的内容主题
const contentThemes = [
  'light',      // 亮色
  'dark',       // 暗色
  'wechat',     // 微信
  'ant-design', // Ant Design
  'github',     // GitHub
  'medium',     // Medium
  'notion',     // Notion
];
```

---

## 推荐的部署方案

### 最佳方案：Cloudflare Pages

**步骤**：
1. 注册Cloudflare账号（免费）
2. 连接GitHub仓库
3. 配置构建设置
4. 自动部署

**优势**：
- ✅ 国内访问速度快
- ✅ 免费额度充足
- ✅ 支持自定义域名
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ 不需要备案

**部署命令**：
```bash
# 安装Wrangler
npm install -g wrangler

# 登录
wrangler login

# 构建
npm run build

# 部署
wrangler pages deploy .next
```

---

## 下一步行动计划

### 立即执行（优先级：高）
1. ✅ 修复思维导图问题（已完成）
2. ⏳ 优化图片上传（压缩 + 图床）
3. ⏳ 部署到Cloudflare Pages
4. ⏳ 修复深色模式显示问题
5. ⏳ 修复目录跳转问题

### 后续优化（优先级：中）
1. 添加更多主题样式
2. 优化移动端体验
3. 添加快捷键支持
4. 添加文档模板
5. 添加AI功能

---

## 技术债务清单

1. **图片管理**
   - 需要实现图片压缩
   - 需要实现图床上传
   - 需要优化图片预览

2. **性能优化**
   - 代码分割
   - 懒加载
   - 缓存策略

3. **用户体验**
   - 快捷键支持
   - 自动保存
   - 版本历史

4. **国际化**
   - 完善翻译
   - 添加更多语言

---

## 总结

当前版本已完成核心功能优化，主要问题集中在：
1. 图片管理优化
2. 国内访问速度
3. 深色模式显示
4. 目录跳转优化

**推荐立即行动**：
1. 部署到Cloudflare Pages（解决国内访问问题）
2. 实现图片压缩（解决base64问题）
3. 修复深色模式和目录跳转

**GitHub**: https://github.com/kael-odin/cafe-md
