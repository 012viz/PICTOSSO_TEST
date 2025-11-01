/**
 * AI Pictosso Generator
 * Uses AI to generate Pictosso configurations from natural language
 */

import { OpenRouterClient, OpenRouterMessage } from './openrouter';
import { PeriodType } from '@/types';

export interface GeneratedPictosso {
    title: string;
    subtitle?: string;
    startDate: string;
    endDate: string;
    periodType: PeriodType;
    mainIcon: {
        path: string;
        name: string;
    };
    events: {
        date: string;
        title: string;
        emoji: string;
        iconifyId: string;
    }[];
}

export class PictossoGenerator {
    private client: OpenRouterClient;

    constructor(apiKey: string) {
        this.client = new OpenRouterClient(apiKey);
    }

    /**
     * Generate a Pictosso configuration from a user prompt
     */
    async generate(prompt: string): Promise<GeneratedPictosso> {
        const systemPrompt = `Tu es un assistant spécialisé dans la création de "Pictosso" - des frises chronologiques visuelles représentant la vie ou la carrière de personnes célèbres.

IMPORTANT: Pictosso utilise une collection d'icônes artistiques locales. Voici les 22 icônes disponibles et leur usage :

1. Love & Life - Amour, romance, passion, relations
2. Adventure - Voyages, explorations, découvertes
3. Birth - Naissances, nouveaux-nés
4. Car - Voitures, véhicules, achats automobiles
5. Financial milestone - Succès financiers, investissements, richesse
6. Studies & Graduation - Diplômes, études, université
7. Holidays - Vacances, détente, plage
8. New Home - Déménagement, nouvelle maison/appartement
9. First Kiss - Premier baiser, romance
10. Meeting someone - Rencontres importantes, nouvelles personnes
11. Musical - Musique, concerts, albums, chansons
12. New business - Entreprises, startups, fondations
13. Promotion & New Job - Carrière, promotions, nouveaux emplois
14. Personal achievement - Réussites personnelles, accomplissements
15. Pet - Animaux de compagnie (chiens, chats)
16. Retirement - Retraite
17. Significant event - Événements majeurs importants
18. Spiritual event - Religion, foi, spiritualité
19. Sport event - Sports, victoires, compétitions
20. Wedding - Mariages, unions
21. Adventure - Aventures, explorations
22. Holidays - Vacances, repos

Ton rôle est de :
1. Identifier la personne ou le sujet mentionné
2. Rechercher les événements clés de sa vie/carrière (dates importantes)
3. Mapper chaque événement à l'icône Pictosso la plus appropriée
4. Choisir une icône principale représentative de la personne
5. Déterminer les dates de début et fin appropriées
6. Choisir le type de période (DAY, MONTH, YEAR)

Format de réponse OBLIGATOIRE (JSON strict) :
{
  "title": "Nom de la personne",
  "subtitle": "Description courte (ex: Musicien jamaïcain)",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "periodType": "DAY" | "MONTH" | "YEAR",
  "mainIcon": {
    "path": "any-emoji-for-display",
    "name": "Nom descriptif court (musical, love, sport, etc.)"
  },
  "events": [
    {
      "date": "YYYY-MM-DD",
      "title": "Description de l'événement (ex: 'Premier album', 'Rencontre avec sa femme')",
      "emoji": "🎵",
      "iconifyId": "placeholder-only-for-display"
    }
  ]
}

Règles importantes :
- Sélectionne 15-30 événements clés espacés dans le temps
- Pour chaque événement, le "title" doit contenir des mots-clés qui permettront de mapper vers nos icônes locales
  * Utilise "birth", "born", "naissance" pour icône Birth
  * Utilise "wedding", "marriage", "mariage" pour icône Wedding  
  * Utilise "album", "concert", "music", "song" pour icône Musical
  * Utilise "graduated", "university", "degree" pour icône Graduation
  * Etc. (sois explicite dans les titres)
- Choisis le periodType en fonction de la durée totale :
  * DAY : pour moins de 3 mois
  * MONTH : pour 3 mois à 10 ans
  * YEAR : pour plus de 10 ans
- Assure-toi que les dates sont chronologiques
- mainIcon.name doit être un mot simple qui aide au mapping (ex: "musical" pour chanteur, "sport" pour athlète, "love" pour relation)

Réponds UNIQUEMENT avec le JSON, sans texte avant ou après.`;

        const messages: OpenRouterMessage[] = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
        ];

        const response = await this.client.chat(messages, 'anthropic/claude-3.5-sonnet', 0.7);
        
        // Parse the JSON response
        try {
            // Extract JSON from markdown code blocks if present
            let jsonStr = response.trim();
            const jsonMatch = jsonStr.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
            if (jsonMatch) {
                jsonStr = jsonMatch[1];
            }
            
            const result = JSON.parse(jsonStr) as GeneratedPictosso;
            
            // Validate the structure
            if (!result.title || !result.startDate || !result.endDate || !result.mainIcon || !result.events) {
                throw new Error('Invalid response structure from AI');
            }
            
            return result;
        } catch (error) {
            console.error('Failed to parse AI response:', response);
            throw new Error(`Failed to parse AI response: ${error}`);
        }
    }

    /**
     * Search for specific information about a person/topic
     */
    async search(query: string): Promise<string> {
        const messages: OpenRouterMessage[] = [
            {
                role: 'system',
                content: 'Tu es un assistant de recherche. Fournis des informations factuelles et chronologiques sur le sujet demandé.'
            },
            {
                role: 'user',
                content: query
            }
        ];

        return await this.client.chat(messages, 'anthropic/claude-3.5-sonnet', 0.3);
    }
}
