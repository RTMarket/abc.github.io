-- 创建本土合伙人申请表
CREATE TABLE IF NOT EXISTS partner_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Section 1: Basic Info
  title TEXT,
  full_name_en TEXT,
  full_name_cn TEXT,
  dob DATE,
  nationality TEXT,
  identity_type TEXT,
  residence_state TEXT,
  residence_city TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  telegram TEXT,
  whatsapp TEXT,
  emergency_contact_name TEXT,
  emergency_contact_relation TEXT,
  emergency_contact_phone TEXT,

  -- Section 2: Qualifications & Experience
  has_us_mx_company TEXT,
  company_name TEXT,
  company_type TEXT,
  company_reg_date DATE,
  company_reg_state TEXT,
  company_business TEXT,
  has_physical_business TEXT,
  annual_revenue TEXT,
  has_bank_account TEXT,
  has_ecommerce_exp TEXT,
  ecommerce_exp_detail TEXT,
  has_warehouse_logistics TEXT,
  warehouse_logistics_detail TEXT,
  has_accounting_legal TEXT,
  accounting_legal_detail TEXT,

  -- Section 3: Cooperation Intent
  target_seller_type TEXT[],
  expected_store_count TEXT,
  expected_coop_model TEXT[],
  expected_profit_share TEXT,
  accept_monthly_subsidy TEXT,
  weekly_available_time TEXT,
  coop_duration TEXT,

  -- Section 4: Other Info
  how_found_us TEXT,
  additional_questions TEXT,
  cv_sent TEXT,

  -- Section 5: Confirmation
  confirm_info BOOLEAN,
  agree_privacy BOOLEAN
);

-- 启用 RLS
ALTER TABLE partner_submissions ENABLE ROW LEVEL SECURITY;

-- 创建策略允许所有操作（因为使用 service_role key）
CREATE POLICY "Allow all operations on partner_submissions" ON partner_submissions
  FOR ALL
  USING (true)
  WITH CHECK (true);
