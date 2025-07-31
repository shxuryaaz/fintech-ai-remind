import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useBorrowers() {
  return useQuery({
    queryKey: ['borrowers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('borrowers')
        .select(`
          *,
          loans (
            *,
            risk_assessments (*)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useRiskAssessments() {
  return useQuery({
    queryKey: ['risk_assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select(`
          *,
          borrowers (*),
          loans (*)
        `)
        .order('assessment_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useReminders() {
  return useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reminders')
        .select(`
          *,
          borrowers (*),
          loans (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useWorkflowTemplates() {
  return useQuery({
    queryKey: ['workflow_templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useSystemSettings() {
  return useQuery({
    queryKey: ['system_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard_stats'],
    queryFn: async () => {
      const [borrowersRes, loansRes, remindersRes, riskRes] = await Promise.all([
        supabase.from('borrowers').select('*', { count: 'exact', head: true }),
        supabase.from('loans').select('*'),
        supabase.from('reminders').select('*').eq('status', 'sent'),
        supabase.from('risk_assessments').select('*').eq('risk_level', 'high')
      ]);

      const totalLoans = loansRes.data?.reduce((sum, loan) => sum + Number(loan.loan_amount), 0) || 0;
      
      return {
        totalUsers: borrowersRes.count || 0,
        totalLoans,
        remindersSent: remindersRes.data?.length || 0,
        highRiskLoans: riskRes.data?.length || 0
      };
    },
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reminder: any) => {
      const { data, error } = await supabase
        .from('reminders')
        .insert(reminder)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
}

type ReminderStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'responded';

export function useUpdateReminderStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, blockchainTxHash }: { id: string; status: ReminderStatus; blockchainTxHash?: string }) => {
      const { data, error } = await supabase
        .from('reminders')
        .update({ 
          status, 
          sent_at: status === 'sent' ? new Date().toISOString() : undefined,
          blockchain_tx_hash: blockchainTxHash 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
}