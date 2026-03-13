import { createClient } from '@supabase/supabase-js';

// Supabase 配置 - 从环境变量读取
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ogiakelldmfwhcafukmv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naWFrZWxsZG1md2hjYWZ1a212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzODg1OTYsImV4cCI6MjA4ODk2NDU5Nn0.7AmaO-zENZOv493A2SLqeQto8Ir8rAXKd00Rvi6e5pk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 表名常量
export const TABLE_NAMES = {
  SELLER_SUBMISSIONS: 'seller_submissions',
  FACTORY_SUBMISSIONS: 'factory_submissions',
} as const;
