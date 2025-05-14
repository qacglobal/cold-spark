// pages/api/subscribe.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { email } = req.body;
  const { error } = await supabase.from('waitlist').insert([{ email }]);
  if (error) return res.status(500).json({ error: 'Subscription failed' });
  res.status(200).json({ message: 'Subscribed successfully' });
}
