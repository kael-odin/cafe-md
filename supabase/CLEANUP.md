# 图片清理机制

## 清理策略

| 策略 | 触发条件 | 说明 |
|------|----------|------|
| **过期清理** | 每天凌晨3点 | 清理已过期的分享及其图片 |
| **定期清理** | 每周日凌晨4点 | 清理30天前的图片 |
| **存储满清理** | 存储超过75%时 | 删除最旧的1/4图片 |

## 方案一：Supabase pg_cron（推荐）

Supabase 内置了 pg_cron 扩展，可以定期执行清理任务。

### 配置步骤

1. 打开 Supabase Dashboard → SQL Editor
2. 运行 `supabase/cleanup.sql` 中的脚本
3. 启用 pg_cron 扩展：

```sql
-- 启用 pg_cron 扩展
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 每天凌晨 3 点清理过期分享
SELECT cron.schedule(
  'cleanup-expired-shares',
  '0 3 * * *',
  'SELECT cleanup_expired_shares();'
);

-- 每周日凌晨 4 点清理 30 天前的图片
SELECT cron.schedule(
  'cleanup-old-images',
  '0 4 * * 0',
  'SELECT cleanup_old_images(30);'
);

-- 每小时检查存储是否满，满了就清理
SELECT cron.schedule(
  'cleanup-when-full',
  '0 * * * *',
  'SELECT cleanup_when_full();'
);
```

### 查看已设置的定时任务

```sql
SELECT * FROM cron.job;
```

### 取消定时任务

```sql
SELECT cron.unschedule('cleanup-expired-shares');
SELECT cron.unschedule('cleanup-old-images');
SELECT cron.unschedule('cleanup-when-full');
```

## 方案二：手动清理

当存储空间不足时，手动执行：

```sql
-- 清理过期分享
SELECT cleanup_expired_shares();

-- 清理 30 天前的图片
SELECT cleanup_old_images(30);

-- 清理 7 天前的图片（更激进）
SELECT cleanup_old_images(7);

-- 存储满时自动清理最旧的1/4
SELECT cleanup_when_full();
```

## 存储监控

查看当前存储使用情况：

```sql
-- 查看图片数量
SELECT COUNT(*) FROM storage.objects WHERE bucket_id = 'images';

-- 查看分享数量
SELECT COUNT(*) FROM shares;

-- 查看过期分享数量
SELECT COUNT(*) FROM shares 
WHERE expires_at IS NOT NULL AND expires_at < NOW();

-- 查看存储大小（字节）
SELECT SUM(size) FROM storage.objects WHERE bucket_id = 'images';
```

## Supabase 免费额度提醒

| 资源 | 免费额度 | 建议 |
|------|----------|------|
| 数据库 | 500MB | 文本内容很小，足够使用 |
| Storage | 1GB | 定期清理，压缩图片 |
| 带宽 | 5GB/月 | 中小规模使用足够 |

当接近额度上限时，Supabase 会发送邮件通知。
