import { createClient } from '@supabase/supabase-js';

// Supabase 配置 - 使用 service_role key 来允许所有数据库操作
// 注意：这个 key 只用于管理后台，不会在公开的表单页面中使用
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ogiakelldmfwhcafukmv.supabase.co';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naWFrZWxsZG1md2hjYWZ1a212Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM4ODU5NiwiZXhwIjoyMDg4OTY0NTk2fQ.JZH0yDFerZ5RR0XVicaCwmb6Acv8e2GCWxLtfVmXFSM';

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 表名常量
export const TABLE_NAMES = {
  SELLER_SUBMISSIONS: 'seller_submissions',
  FACTORY_SUBMISSIONS: 'factory_submissions',
} as const;
