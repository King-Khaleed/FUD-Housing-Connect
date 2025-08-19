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
import { properties as allProperties } from '@/lib/data';
import type { Property } from '@/lib/types';

const AiHousingAssistantInputSchema = z.object({
  userMessage: z.string().describe("The user's message containing their housing preferences."),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe("The history of the conversation so far."),
});

export type AiHousingAssistantInput = z.infer<typeof AiHousingAssistantInputSchema>;

const AiHousingAssistantOutputSchema = z.object({
  response: z.string().describe("The AI's conversational response to the user."),
  recommendations: z.array(
    z.object({
      propertyId: z.number().describe('The ID of the recommended property.'),
      reason: z.string().describe('The reason why this property is recommended.'),
    })
  ).describe('A list of property recommendations with reasons. Only recommend properties from the provided list.'),
});

export type AiHousingAssistantOutput = z.infer<typeof AiHousingAssistantOutputSchema>;

export async function aiHousingAssistant(input: AiHousingAssistantInput): Promise<AiHousingAssistantOutput> {
  return aiHousingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHousingAssistantPrompt',
  input: {schema: z.object({
    userMessage: z.string(),
    conversationHistory: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })).optional(),
    properties: z.array(z.any()),
  })},
  output: {schema: AiHousingAssistantOutputSchema},
  prompt: `You are a friendly and helpful AI Housing Assistant for students of Federal University Dutse (FUD). Your goal is to have a natural conversation and help them find the perfect off-campus housing.

  - Start by greeting the user and asking what they are looking for.
  - Ask clarifying questions one by one to understand their needs. Cover budget (in Naira), room type, distance from campus, preferred amenities, and move-in timeline.
  - Be conversational. For example, instead of just asking "Budget?", say "Great! What's your budget like? Are we looking for something super affordable or more premium?"
  - Once you have enough information, use the provided list of properties to find the best matches.
  - Present your recommendations clearly. For each recommendation, provide the property ID and a short, compelling reason it fits their needs.
  - If you provide recommendations, end your conversational response with a summary of what you've found for them.
  - If no properties match, apologize and suggest they adjust their criteria.
  - Only recommend properties from the JSON list provided below. Do not invent properties.

  Here are the available properties:
  {{{json properties}}}

  Here is the conversation history:
  {{#if conversationHistory}}
  {{#each conversationHistory}}
  {{this.role}}: {{this.content}}
  {{/each}}
  {{/if}}

  Here is the user's latest message:
  {{userMessage}}
  `,
});

const aiHousingAssistantFlow = ai.defineFlow(
  {
    name: 'aiHousingAssistantFlow',
    inputSchema: AiHousingAssistantInputSchema,
    outputSchema: AiHousingAssistantOutputSchema,
  },
  async (input) => {
    // Select relevant fields from properties to pass to the model
    const propertiesForPrompt = allProperties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        roomType: p.roomType,
        location: p.location,
        amenities: p.amenities,
        description: p.description.substring(0, 100) + '...' // Keep it brief
    }));

    const {output} = await prompt({ ...input, properties: propertiesForPrompt });
    return output!;
  }
);
