-- Create enum types for the application
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.reminder_method AS ENUM ('sms', 'voice', 'whatsapp', 'email');
CREATE TYPE public.reminder_status AS ENUM ('pending', 'sent', 'delivered', 'failed', 'responded');
CREATE TYPE public.loan_status AS ENUM ('active', 'paid', 'overdue', 'defaulted');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'analyst',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create borrowers table
CREATE TABLE public.borrowers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  employment_status TEXT,
  annual_income DECIMAL(15,2),
  credit_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loans table
CREATE TABLE public.loans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_id UUID NOT NULL REFERENCES public.borrowers(id) ON DELETE CASCADE,
  loan_amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  term_months INTEGER NOT NULL,
  monthly_payment DECIMAL(15,2) NOT NULL,
  status loan_status NOT NULL DEFAULT 'active',
  disbursed_at TIMESTAMP WITH TIME ZONE,
  due_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create risk_assessments table
CREATE TABLE public.risk_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_id UUID NOT NULL REFERENCES public.borrowers(id) ON DELETE CASCADE,
  loan_id UUID REFERENCES public.loans(id) ON DELETE CASCADE,
  risk_score DECIMAL(5,2) NOT NULL,
  risk_level risk_level NOT NULL,
  factors JSONB,
  assessment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reminders table
CREATE TABLE public.reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_id UUID NOT NULL REFERENCES public.borrowers(id) ON DELETE CASCADE,
  loan_id UUID REFERENCES public.loans(id) ON DELETE CASCADE,
  method reminder_method NOT NULL,
  message TEXT NOT NULL,
  status reminder_status NOT NULL DEFAULT 'pending',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  blockchain_tx_hash TEXT,
  response_received BOOLEAN DEFAULT false,
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workflow_templates table
CREATE TABLE public.workflow_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  trigger_conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system_settings table
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(user_id),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrowers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for borrowers (authenticated users can access all)
CREATE POLICY "Authenticated users can view borrowers" ON public.borrowers
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert borrowers" ON public.borrowers
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update borrowers" ON public.borrowers
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for loans
CREATE POLICY "Authenticated users can view loans" ON public.loans
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert loans" ON public.loans
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update loans" ON public.loans
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for risk_assessments
CREATE POLICY "Authenticated users can view risk assessments" ON public.risk_assessments
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert risk assessments" ON public.risk_assessments
  FOR INSERT TO authenticated WITH CHECK (true);

-- Create RLS policies for reminders
CREATE POLICY "Authenticated users can view reminders" ON public.reminders
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert reminders" ON public.reminders
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update reminders" ON public.reminders
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for workflow_templates
CREATE POLICY "Authenticated users can view workflow templates" ON public.workflow_templates
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert workflow templates" ON public.workflow_templates
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update workflow templates" ON public.workflow_templates
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for system_settings
CREATE POLICY "Authenticated users can view system settings" ON public.system_settings
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update system settings" ON public.system_settings
  FOR UPDATE TO authenticated USING (true);

-- Create function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_borrowers_updated_at
  BEFORE UPDATE ON public.borrowers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loans_updated_at
  BEFORE UPDATE ON public.loans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at
  BEFORE UPDATE ON public.reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workflow_templates_updated_at
  BEFORE UPDATE ON public.workflow_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for demo
INSERT INTO public.borrowers (email, phone, full_name, date_of_birth, address, employment_status, annual_income, credit_score) VALUES
('john.doe@email.com', '+1-555-0101', 'John Doe', '1985-03-15', '123 Main St, NYC', 'Employed', 75000, 720),
('jane.smith@email.com', '+1-555-0102', 'Jane Smith', '1990-07-22', '456 Oak Ave, LA', 'Self-Employed', 85000, 680),
('mike.johnson@email.com', '+1-555-0103', 'Mike Johnson', '1982-11-08', '789 Pine Rd, Chicago', 'Employed', 95000, 750),
('sarah.wilson@email.com', '+1-555-0104', 'Sarah Wilson', '1988-02-14', '321 Elm St, Houston', 'Unemployed', 0, 580),
('david.brown@email.com', '+1-555-0105', 'David Brown', '1975-09-30', '654 Maple Dr, Phoenix', 'Employed', 120000, 800);

-- Insert sample loans
INSERT INTO public.loans (borrower_id, loan_amount, interest_rate, term_months, monthly_payment, status, due_date) 
SELECT 
  id,
  CASE 
    WHEN full_name = 'John Doe' THEN 25000
    WHEN full_name = 'Jane Smith' THEN 35000
    WHEN full_name = 'Mike Johnson' THEN 50000
    WHEN full_name = 'Sarah Wilson' THEN 15000
    WHEN full_name = 'David Brown' THEN 75000
  END,
  CASE 
    WHEN credit_score > 750 THEN 3.5
    WHEN credit_score > 700 THEN 4.2
    WHEN credit_score > 650 THEN 5.8
    ELSE 8.9
  END,
  60,
  CASE 
    WHEN full_name = 'John Doe' THEN 450
    WHEN full_name = 'Jane Smith' THEN 650
    WHEN full_name = 'Mike Johnson' THEN 900
    WHEN full_name = 'Sarah Wilson' THEN 300
    WHEN full_name = 'David Brown' THEN 1350
  END,
  CASE 
    WHEN full_name = 'Sarah Wilson' THEN 'overdue'::loan_status
    ELSE 'active'::loan_status
  END,
  CASE 
    WHEN full_name = 'Sarah Wilson' THEN '2024-01-15'::date
    ELSE (CURRENT_DATE + INTERVAL '30 days')::date
  END
FROM public.borrowers;

-- Insert sample risk assessments
INSERT INTO public.risk_assessments (borrower_id, loan_id, risk_score, risk_level, factors)
SELECT 
  b.id,
  l.id,
  CASE 
    WHEN b.credit_score > 750 THEN 15.5
    WHEN b.credit_score > 700 THEN 35.2
    WHEN b.credit_score > 650 THEN 65.8
    ELSE 89.3
  END,
  CASE 
    WHEN b.credit_score > 750 THEN 'low'::risk_level
    WHEN b.credit_score > 700 THEN 'medium'::risk_level
    WHEN b.credit_score > 650 THEN 'high'::risk_level
    ELSE 'critical'::risk_level
  END,
  jsonb_build_object(
    'credit_score', b.credit_score,
    'income_to_debt_ratio', ROUND(RANDOM() * 100, 2),
    'employment_stability', CASE WHEN b.employment_status = 'Employed' THEN 'stable' ELSE 'unstable' END,
    'payment_history', CASE WHEN b.credit_score > 700 THEN 'good' ELSE 'poor' END
  )
FROM public.borrowers b
JOIN public.loans l ON b.id = l.borrower_id;

-- Insert sample reminders
INSERT INTO public.reminders (borrower_id, loan_id, method, message, status, scheduled_at, sent_at, blockchain_tx_hash, response_received)
SELECT 
  b.id,
  l.id,
  'sms'::reminder_method,
  'Your loan payment of $' || l.monthly_payment::text || ' is due in 3 days. Please ensure timely payment.',
  CASE 
    WHEN b.full_name = 'Sarah Wilson' THEN 'sent'::reminder_status
    ELSE 'pending'::reminder_status
  END,
  CURRENT_TIMESTAMP + INTERVAL '1 day',
  CASE 
    WHEN b.full_name = 'Sarah Wilson' THEN CURRENT_TIMESTAMP - INTERVAL '2 days'
    ELSE NULL
  END,
  CASE 
    WHEN b.full_name = 'Sarah Wilson' THEN '0x1234567890abcdef1234567890abcdef12345678'
    ELSE NULL
  END,
  CASE 
    WHEN b.full_name = 'Sarah Wilson' THEN false
    ELSE false
  END
FROM public.borrowers b
JOIN public.loans l ON b.id = l.borrower_id;

-- Insert sample workflow templates
INSERT INTO public.workflow_templates (name, description, trigger_conditions, actions, is_active) VALUES
(
  'High Risk Voice Reminder',
  'Automated voice call for high-risk borrowers 7 days before due date',
  '{"risk_level": "high", "days_before_due": 7}',
  '[{"type": "voice_call", "template": "high_risk_voice", "priority": "high"}]',
  true
),
(
  'SMS Warning After 7 Days',
  'SMS reminder sent 7 days after missed payment',
  '{"days_overdue": 7, "payment_missed": true}',
  '[{"type": "sms", "template": "overdue_warning", "escalation": true}]',
  true
),
(
  'WhatsApp Gentle Reminder',
  'Friendly WhatsApp message 3 days before due date',
  '{"days_before_due": 3, "risk_level": "low"}',
  '[{"type": "whatsapp", "template": "gentle_reminder", "tone": "friendly"}]',
  true
);

-- Insert system settings
INSERT INTO public.system_settings (key, value, description) VALUES
('risk_thresholds', '{"low": 30, "medium": 60, "high": 80}', 'Risk score thresholds for classification'),
('reminder_intervals', '{"first": 7, "second": 3, "final": 1}', 'Days before due date to send reminders'),
('blockchain_enabled', 'true', 'Enable blockchain logging for reminders'),
('ai_model_settings', '{"provider": "openai", "model": "gpt-4", "temperature": 0.7}', 'AI model configuration for risk assessment');