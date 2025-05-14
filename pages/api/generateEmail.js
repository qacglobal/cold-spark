// pages/api/generateEmail.js
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, jobTitle, company, topic } = req.body;
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Write a cold email to ${firstName}, a ${jobTitle} at ${company} who posted about ${topic}. Offer a ColdSpark demo.`,
          },
        ],
      });
      res.status(200).json({ email: response.choices[0].message.content });
    } catch (err) {
      res.status(500).json({ error: 'OpenAI error' });
    }
  } else {
    res.status(405).end();
  }
}
