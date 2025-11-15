// src/services/auth.service.js
import { supabase } from '../lib/supabase';

export const authService = {
  // Sign up a new therapist
  signUpTherapist: async (email, password, name) => {
    // 1. Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 2. Create user record
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        role: 'therapist'
      });

    if (userError) throw userError;

    // 3. Create therapist profile
    const { data: profile, error: profileError } = await supabase
      .from('therapist_profiles')
      .insert({
        user_id: authData.user.id,
        name
      })
      .select()
      .single();

    if (profileError) throw profileError;

    return { user: authData.user, profile };
  },

  /**
   * Sign up a new client
   */
  signUpClient: async (email, password, name, age, therapistId, consentGiven = false) => {
    // 1. Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 2. Create user record
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        role: 'client'
      });

    if (userError) throw userError;

    // 3. Create client profile
    const { data: profile, error: profileError } = await supabase
      .from('client_profiles')
      .insert({
        user_id: authData.user.id,
        therapist_id: therapistId,
        name,
        age,
        consent_given: consentGiven
      })
      .select()
      .single();

    if (profileError) throw profileError;

    // 4. Create default preferences
    await supabase
      .from('client_preferences')
      .insert({
        client_id: authData.user.id,
        category_weights: {},
        difficulty_preference: 'medium'
      });

    return { user: authData.user, profile };
  },

  /**
   * Sign in (works for both roles)
   */
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user role
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    // Get profile based on role
    if (user.role === 'therapist') {
      const { data: profile } = await supabase
        .from('therapist_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
      
      return { ...data, role: 'therapist', profile };
    } else {
      const { data: profile } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
      
      return { ...data, role: 'client', profile };
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};