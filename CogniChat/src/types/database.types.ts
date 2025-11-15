export interface User {
  id: string; // uuid
  email: string;
  role: 'therapist' | 'client';
  created_at: string;
  updated_at: string;
}

export interface TherapistProfile {
  user_id: string; // uuid, PK
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ClientProfile {
  user_id: string; // uuid, PK
  therapist_id: string; // uuid
  name: string;
  age: number | null;
  consent_given: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientPreferences {
  preference_id: string; // uuid
  client_id: string; // uuid
  category_weights: Record<string, number>; // jsonb
  difficulty_preference: string;
  updated_at: string;
}

export interface Question {
  question_id: string; // uuid
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  tags: string[]; // text[]
  created_at: string;
  updated_at: string;
}

export interface QuestionSet {
  set_id: string; // uuid
  therapist_id: string | null; // nullable!
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuestionSetItem {
  set_id: string; // uuid
  question_id: string; // uuid
  sequence: number;
  created_at: string;
}

export interface Session {
  session_id: string; // uuid
  client_id: string; // uuid
  set_id: string; // uuid
  started_at: string;
  ended_at: string | null;
}

export interface Response {
  response_id: string; // uuid
  session_id: string; // uuid
  question_id: string; // uuid
  correct: boolean;
  answered_at: string;
}

export interface Metric {
  metric_id: string; // uuid
  client_id: string; // uuid
  question_id: string; // uuid
  session_id: string | null;
  smoothed_accuracy: number | null; // numeric
  next_due: string | null;
  last_updated: string;
}