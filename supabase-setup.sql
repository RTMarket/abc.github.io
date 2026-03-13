-- =====================================================
-- 香港佳和供应链 CRM 数据库表结构
-- 请在 Supabase SQL 编辑器中执行此脚本
-- =====================================================

-- 1. 创建卖家提交表 (seller_submissions)
CREATE TABLE IF NOT EXISTS seller_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  company_name_cn TEXT,
  company_name_en TEXT,
  unified_code TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  wechat TEXT,
  current_platforms TEXT[],
  target_platforms TEXT[],
  us_store_count TEXT,
  mx_store_count TEXT,
  need_partner TEXT,
  need_us_bank TEXT,
  need_mx_bank TEXT,
  monthly_sales TEXT,
  product_categories TEXT[],
  overseas_warehouse TEXT,
  warehouse_funds TEXT,
  need_supply_chain TEXT,
  need_mcn TEXT,
  need_logistics TEXT,
  need_payment TEXT,
  service_plan TEXT,
  budget TEXT,
  other_needs TEXT,
  status TEXT DEFAULT 'new'
);

-- 2. 创建工厂提交表 (factory_submissions)
CREATE TABLE IF NOT EXISTS factory_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  factory_name_en TEXT,
  factory_name_cn TEXT,
  register_country TEXT,
  register_address TEXT,
  tax_id TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  product_categories TEXT[],
  product_desc TEXT,
  has_cert TEXT,
  certificates JSONB,
  moq TEXT,
  lead_time TEXT,
  capacity TEXT,
  has_local_stock TEXT,
  shipping_methods TEXT[],
  sample_order TEXT,
  brand_service TEXT,
  other_info TEXT,
  status TEXT DEFAULT 'new'
);

-- 3. 启用行级安全策略 (RLS)
ALTER TABLE seller_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_submissions ENABLE ROW LEVEL SECURITY;

-- 4. 设置访问策略 - 允许匿名用户提交
CREATE POLICY "Allow public insert seller" ON seller_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert factory" ON factory_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- 5. 设置访问策略 - 允许认证用户读取
CREATE POLICY "Allow authenticated read seller" ON seller_submissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read factory" ON factory_submissions
  FOR SELECT TO authenticated
  USING (true);

-- 6. 验证表创建成功
SELECT '卖家表 (seller_submissions)' as table_name, count(*) as exists FROM seller_submissions;
SELECT '工厂表 (factory_submissions)' as table_name, count(*) as exists FROM factory_submissions;
