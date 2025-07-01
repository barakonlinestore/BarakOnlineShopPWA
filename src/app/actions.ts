'use server';

import { suggestSearchTerms, type SuggestSearchTermsInput } from "@/ai/flows/suggest-search-terms";

export async function getAiSuggestions(input: SuggestSearchTermsInput) {
    try {
        const result = await suggestSearchTerms(input);
        return result.suggestions;
    } catch (error) {
        console.error("Error fetching AI suggestions:", error);
        return [];
    }
}
