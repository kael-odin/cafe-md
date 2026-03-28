-- 图片清理机制 SQL 脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 创建图片记录表（追踪上传的图片）
CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  share_slug TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- 2. 创建索引
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at);
CREATE INDEX IF NOT EXISTS idx_images_expires_at ON images(expires_at);

-- 3. 设置 RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON images
  FOR SELECT USING (true);

-- 4. 创建清理过期分享的函数
CREATE OR REPLACE FUNCTION cleanup_expired_shares()
RETURNS void AS $$
DECLARE
  expired_share RECORD;
BEGIN
  -- 删除过期的分享记录
  FOR expired_share IN 
    SELECT slug FROM shares 
    WHERE expires_at IS NOT NULL 
    AND expires_at < NOW()
  LOOP
    -- 删除关联的图片
    DELETE FROM storage.objects 
    WHERE bucket_id = 'images' 
    AND path LIKE 'images/%';
    
    -- 删除分享记录
    DELETE FROM shares WHERE slug = expired_share.slug;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. 创建清理旧图片的函数（保留最近30天的图片）
CREATE OR REPLACE FUNCTION cleanup_old_images(days_to_keep INTEGER DEFAULT 30)
RETURNS void AS $$
BEGIN
  DELETE FROM storage.objects 
  WHERE bucket_id = 'images' 
  AND created_at < NOW() - INTERVAL '1 day' * days_to_keep;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 手动执行清理（可选）
-- SELECT cleanup_expired_shares();
-- SELECT cleanup_old_images(30);
