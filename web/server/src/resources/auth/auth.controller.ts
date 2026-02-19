import { Request, Response } from "express";
import { supabaseAdmin } from "../../lib/supabase";
import { SignInPayload, SignUpPayload } from "./auth.schema";

export const signIn = async (
  req: Request<Record<string, string>, unknown, SignInPayload>,
  res: Response,
) => {
  const { email, password } = req.body;

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(401).json({ error: error.message });
    return;
  }

  res.json({
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
    expires_at: data.session?.expires_at,
    user: data.user,
  });
};

export const signUp = async (
  req: Request<Record<string, string>, unknown, SignUpPayload>,
  res: Response,
) => {
  const { email, password, redirectTo } = req.body;

  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(201).json({
    user: data.user,
    session: data.session
      ? {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        }
      : null,
  });
};

export const signOut = async (_req: Request, res: Response) => {
  res.json({ message: "Signed out" });
};
