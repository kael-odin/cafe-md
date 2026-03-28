-- 创建分享表
CREATE TABLE IF NOT EXISTS shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  password TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_shares_slug ON shares(slug);
CREATE INDEX IF NOT EXISTS idx_shares_expires_at ON shares(expires_at);

-- 设置 RLS (Row Level Security)
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
CREATE POLICY "Allow public read" ON shares
  FOR SELECT USING (is_public = true OR password IS NOT NULL);

-- 允许公开插入
CREATE POLICY "Allow public insert" ON shares
  FOR INSERT WITH CHECK (true);

-- 允许公开更新（用于增加查看次数）
CREATE POLICY "Allow public update" ON shares
  FOR UPDATE USING (true);
