import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Only initialize AI if API key is available
const googleAIKey = process.env.GOOGLE_AI_API_KEY;

export const ai = genkit({
  plugins: googleAIKey ? [googleAI()] : [],
  model: googleAIKey ? 'googleai/gemini-2.0-flash' : undefined,
});
