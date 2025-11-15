import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// Initialize Supabase client with AsyncStorage for persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Helper function to get user role (therapist or client)
export const getUserRole = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  // Check if user exists in therapists table
  const { data: therapist, error: therapistError } = await supabase
    .from('therapists')
    .select('therapist_id')
    .eq('therapist_id', user.id)
    .single();

  if (therapist && !therapistError) {
    return { role: 'therapist', id: therapist.therapist_id };
  }

  // Check if user exists in clients table
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('client_id, therapist_id')
    .eq('client_id', user.id)
    .single();

  if (client && !clientError) {
    return { role: 'client', id: client.client_id, therapistId: client.therapist_id };
  }

  return null;
};

// Sign out helper
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};