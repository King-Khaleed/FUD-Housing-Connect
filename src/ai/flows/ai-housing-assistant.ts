'use server';

/**
 * @fileOverview This file defines the AI Housing Assistant flow, which provides personalized property recommendations to students based on their preferences.
 *
 * @fileOverview
 * - `aiHousingAssistant`: A function that takes user preferences as input and returns a list of property recommendations.
 * - `AiHousingAssistantInput`: The input type for the `aiHousingAssistant` function.
 * - `AiHousingAssistantOutput`: The output type for the `aiHousingAssistant` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiHousingAssistantInputSchema = z.object({
  budgetMin: z.number().describe('The minimum budget for the property in Naira.'),
  budgetMax: z.number().describe('The maximum budget for the property in Naira.'),
  roomType: z.string().describe('The preferred room type (e.g., self-contain, 2-bedroom).'),
  preferredAmenities: z.array(z.string()).describe('A list of preferred amenities (e.g., WiFi, security).'),
  maxDistanceFromCampus: z.string().describe('The maximum distance from campus (e.g., 5 minutes, walking distance).'),
});

export type AiHousingAssistantInput = z.infer<typeof AiHousingAssistantInputSchema>;

const AiHousingAssistantOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      propertyId: z.number().describe('The ID of the recommended property.'),
      reason: z.string().describe('The reason why this property is recommended.'),
    })
  ).describe('A list of property recommendations with reasons.'),
});

export type AiHousingAssistantOutput = z.infer<typeof AiHousingAssistantOutputSchema>;

export async function aiHousingAssistant(input: AiHousingAssistantInput): Promise<AiHousingAssistantOutput> {
  return aiHousingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHousingAssistantPrompt',
  input: {schema: AiHousingAssistantInputSchema},
  output: {schema: AiHousingAssistantOutputSchema},
  prompt: `You are a helpful AI assistant that recommends properties to students based on their preferences.

  Consider the following user preferences:
  Budget: ₦{{{budgetMin}}} - ₦{{{budgetMax}}}
  Room Type: {{{roomType}}}
  Preferred Amenities: {{#each preferredAmenities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Maximum Distance from Campus: {{{maxDistanceFromCampus}}}

  Based on these preferences, recommend a few properties from the available listings. Provide a brief reason for each recommendation.
  Respond in JSON format.`,
});

const aiHousingAssistantFlow = ai.defineFlow(
  {
    name: 'aiHousingAssistantFlow',
    inputSchema: AiHousingAssistantInputSchema,
    outputSchema: AiHousingAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
