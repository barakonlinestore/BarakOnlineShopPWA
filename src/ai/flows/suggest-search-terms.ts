'use server';

/**
 * @fileOverview An AI agent to suggest search terms based on the store's inventory.
 *
 * - suggestSearchTerms - A function that handles the search term suggestion process.
 * - SuggestSearchTermsInput - The input type for the suggestSearchTerms function.
 * - SuggestSearchTermsOutput - The return type for the suggestSearchTerms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSearchTermsInputSchema = z.object({
  searchTerm: z
    .string()
    .describe('The current search term entered by the user.'),
  storeInventoryUrl: z
    .string()
    .url()
    .describe('URL of the online store inventory.'),
});
export type SuggestSearchTermsInput = z.infer<typeof SuggestSearchTermsInputSchema>;

const SuggestSearchTermsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested search terms.'),
});
export type SuggestSearchTermsOutput = z.infer<typeof SuggestSearchTermsOutputSchema>;

export async function suggestSearchTerms(input: SuggestSearchTermsInput): Promise<SuggestSearchTermsOutput> {
  return suggestSearchTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSearchTermsPrompt',
  input: {schema: SuggestSearchTermsInputSchema},
  output: {schema: SuggestSearchTermsOutputSchema},
  prompt: `You are an AI assistant that suggests search terms for an online store.

The store inventory is located at: {{{storeInventoryUrl}}}.

Based on the current search term "{{searchTerm}}" and the store inventory, suggest a list of search terms that the user might be looking for. Only suggest terms that are relevant to the store's inventory. Return the suggestions as a JSON array of strings.

Example:
{
  "suggestions": ["term1", "term2", "term3"]
}
`,
});

const suggestSearchTermsFlow = ai.defineFlow(
  {
    name: 'suggestSearchTermsFlow',
    inputSchema: SuggestSearchTermsInputSchema,
    outputSchema: SuggestSearchTermsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
