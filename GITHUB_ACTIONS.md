# GitHub Actions 自动部署配置

## 配置步骤

### 1. 在 GitHub 仓库中配置 Secrets

访问您的 GitHub 仓库：https://github.com/kael-odin/cafe-md

进入 **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

添加以下 Secrets：

#### 必需的 Secrets

1. **CLOUDFLARE_API_TOKEN**
   - 获取方式：
     1. 访问 https://dash.cloudflare.com/profile/api-tokens
     2. 点击 **Create Token**
     3. 选择 **Edit Cloudflare Workers** 模板
     4. 复制生成的 Token
   - 值：`your_cloudflare_api_token`

2. **CLOUDFLARE_ACCOUNT_ID**
   - 获取方式：
     1. 访问 https://dash.cloudflare.com
     2. 在右侧栏找到 **Account ID**
     3. 复制 Account ID
   - 值：`your_cloudflare_account_id`

3. **NEXT_PUBLIC_SUPABASE_URL**
   - 值：`https://swuwlubjayyduhpfngaj.supabase.co`

4. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - 值：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dXdsdWJqYXl5ZHVocGZuZ2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NDE2NDQsImV4cCI6MjA5MDIxNzY0NH0.Egn9AqaVvK62clZfkWTYHvfFX2cdykVPyaVcirRd7HU`

### 2. 推送代码触发部署

```bash
git add .
git commit -m "feat: 配置 GitHub Actions 自动部署"
git push origin main
```

### 3. 查看部署状态

访问：https://github.com/kael-odin/cafe-md/actions

您可以看到部署进度和日志。

### 4. 访问部署的应用

部署成功后，您可以在 Cloudflare Workers 控制台找到应用的 URL：

https://dash.cloudflare.com → Workers & Pages → cafe-md

---

## 手动部署

如果需要手动部署，可以在 Actions 页面点击 **Run workflow** 按钮。

---

## 注意事项

1. **Windows 兼容性问题**
   - OpenNext 在 Windows 上有兼容性问题
   - GitHub Actions 使用 Linux 环境，可以正常部署

2. **免费额度**
   - Cloudflare Workers：100,000 请求/天
   - GitHub Actions：2,000 分钟/月
   - 完全够用！

3. **自动部署**
   - 每次推送到 `main` 分支都会自动部署
   - 可以在 Actions 页面查看部署历史

---

## 故障排查

如果部署失败，请检查：

1. **Secrets 是否正确配置**
   - 确保所有 4 个 Secrets 都已添加
   - 确保值没有多余的空格或换行

2. **Cloudflare API Token 权限**
   - 确保 Token 有 Workers 的编辑权限

3. **查看 Actions 日志**
   - 在 Actions 页面查看详细的错误信息
