-- 卖家提交表
CREATE TABLE IF NOT EXISTS seller_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name_cn TEXT,
  company_name_en TEXT,
  unified_code TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  wechat TEXT,
  current_platforms JSONB,
  target_platforms JSONB,
  us_store_count TEXT,
  mx_store_count TEXT,
  need_partner TEXT,
  need_us_bank TEXT,
  need_mx_bank TEXT,
  monthly_sales TEXT,
  product_categories JSONB,
  overseas_warehouse TEXT,
  warehouse_funds TEXT,
  need_supply_chain TEXT,
  need_mcn TEXT,
  need_logistics TEXT,
  need_payment TEXT,
  service_plan TEXT,
  budget TEXT,
  other_needs TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 工厂提交表
CREATE TABLE IF NOT EXISTS factory_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_name_en TEXT,
  factory_name_cn TEXT,
  register_country TEXT,
  register_address TEXT,
  tax_id TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  product_categories JSONB,
  product_desc TEXT,
  has_cert TEXT,
  certificates JSONB,
  moq TEXT,
  lead_time TEXT,
  capacity TEXT,
  has_local_stock TEXT,
  shipping_methods JSONB,
  sample_order TEXT,
  brand_service TEXT,
  other_info TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 启用RLS但允许所有操作（开发阶段）
ALTER TABLE seller_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_submissions ENABLE ROW LEVEL SECURITY;

-- 创建允许所有插入/选择的策略
CREATE POLICY "Allow all for seller_submissions" ON seller_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for factory_submissions" ON factory_submissions FOR ALL USING (true) WITH CHECK (true);
