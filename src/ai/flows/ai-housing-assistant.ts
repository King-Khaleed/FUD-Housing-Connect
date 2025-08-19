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
      reason: z.string().describe('A detailed explanation of why this property is a good match based on the user\'s criteria (budget, location, amenities, etc.).'),
    })
  ).describe('A list of up to 3 property recommendations with detailed reasons. Only recommend properties from the provided list.'),
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

  **Core Instructions:**
  1.  **Be Conversational:** Greet the user warmly. Ask clarifying questions one-by-one to understand their needs. Cover budget (in Naira), room type, distance from campus (e.g., "walking distance"), and must-have amenities.
  2.  **Analyze User Needs:** Carefully read the user's message and the conversation history to extract their preferences.
  3.  **Analyze Property Data:** You have been provided a JSON list of available properties. You MUST use this list as your only source of information. Do not invent properties.
  4.  **Score and Recommend:** Based on the user's preferences, find the best 1-3 matches from the list. Prioritize properties that are a close match for budget, room type, and location.
  5.  **Provide Detailed Reasons:** For each recommendation, you MUST provide a detailed `reason` explaining *why* it's a good fit. For example: "This one is great because it's a Self-contain right in your budget at ₦80,000, and it's within walking distance of campus, which you mentioned was important."
  6.  **Summarize and Conclude:** If you are providing recommendations, end your conversational `response` with a summary of what you've found. If no properties are a good match, apologize and suggest they adjust their criteria.
  7.  **Do not ask for all criteria at once.** Engage in a back-and-forth conversation.

  **Available Properties:**
  {{{json properties}}}

  **Conversation History:**
  {{#if conversationHistory}}
  {{#each conversationHistory}}
  {{this.role}}: {{this.content}}
  {{/each}}
  {{/if}}

  **User's Latest Message:**
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
    // This helps keep the prompt concise and focused.
    const propertiesForPrompt = allProperties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        priceType: p.priceType,
        roomType: p.roomType,
        location: p.location.area,
        distanceFromCampus: p.location.distanceFromCampus,
        amenities: p.amenities,
        verified: p.verified,
    }));

    const {output} = await prompt({ ...input, properties: propertiesForPrompt });
    return output!;
  }
);
