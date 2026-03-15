-- 创建联系表单提交表
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 RLS（可选）
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 创建策略允许所有操作
CREATE POLICY "Allow all" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
