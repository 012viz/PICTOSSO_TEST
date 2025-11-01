/**
 * Maps AI-generated event descriptions to our local Pictosso icons
 */

import { IIcon } from "@/types";
import { icons, iconsByKey, defaultColor } from "@/icons";

/**
 * Maps an AI-generated event to the most appropriate local Pictosso icon
 * Based on semantic similarity of the event title/description
 */
export function mapEventToLocalIcon(eventTitle: string): IIcon {
    const title = eventTitle.toLowerCase();
    
    // Define keyword mappings for each icon category
    const mappings: { [key: string]: string[] } = {
        'Birth': ['birth', 'born', 'naissance', 'né', 'baby', 'bébé', 'naît'],
        'Love & Life': ['love', 'amour', 'heart', 'coeur', 'romance', 'passion', 'relationship', 'couple'],
        'Wedding': ['wedding', 'marriage', 'mariage', 'épouse', 'mari', 'married', 'spouse', 'fiancé'],
        'First Kiss': ['kiss', 'first kiss', 'bisou', 'baiser', 'premier baiser'],
        'Meeting someone': ['meet', 'meeting', 'rencontre', 'découvre', 'encounter', 'introduced'],
        'New Home': ['home', 'house', 'apartment', 'maison', 'appartement', 'moved', 'déménage', 'emménage'],
        'New business': ['business', 'company', 'startup', 'entreprise', 'founded', 'launch', 'fonde', 'lance'],
        'Promotion & New Job': ['job', 'work', 'promoted', 'promotion', 'career', 'hired', 'emploi', 'travail', 'embauche'],
        'Studies & Graduation': ['graduation', 'graduate', 'degree', 'diploma', 'university', 'college', 'school', 'diplôme', 'université', 'étude', 'study'],
        'Financial milestone': ['money', 'financial', 'wealth', 'investment', 'rich', 'fortune', 'argent', 'finance', 'investissement'],
        'Adventure': ['travel', 'adventure', 'trip', 'journey', 'explore', 'voyage', 'aventure', 'expedition'],
        'Holidays': ['holiday', 'vacation', 'vacances', 'rest', 'getaway', 'beach', 'plage'],
        'Sport event': ['sport', 'win', 'victory', 'champion', 'game', 'match', 'competition', 'victoire', 'gagné'],
        'Musical': ['music', 'concert', 'song', 'album', 'musique', 'chanson', 'performance', 'release'],
        'Personal achievement': ['achievement', 'success', 'accomplished', 'goal', 'réussite', 'succès', 'accomplissement'],
        'Spiritual event': ['spiritual', 'religion', 'faith', 'prayer', 'church', 'temple', 'mosque', 'spirituel', 'foi', 'prière'],
        'Retirement': ['retirement', 'retired', 'retire', 'retraite'],
        'Car': ['car', 'vehicle', 'drive', 'voiture', 'automobile', 'bought car'],
        'Pet': ['pet', 'dog', 'cat', 'animal', 'chien', 'chat', 'animaux'],
        'Significant event': ['important', 'significant', 'major', 'event', 'milestone', 'important', 'majeur', 'événement']
    };

    // Find the best matching icon
    for (const [iconName, keywords] of Object.entries(mappings)) {
        for (const keyword of keywords) {
            if (title.includes(keyword)) {
                const icon = iconsByKey[iconName];
                if (icon) {
                    return { ...icon, color: defaultColor };
                }
            }
        }
    }

    // Default fallback - use "Significant event" icon
    return { ...iconsByKey['Significant event'], color: defaultColor };
}

/**
 * Maps an AI-generated main icon emoji to a representative local Pictosso icon
 */
export function mapMainEmojiToLocalIcon(emojiName: string): IIcon {
    const name = emojiName.toLowerCase();
    
    const mappings: { [key: string]: string } = {
        'music': 'Musical',
        'guitar': 'Musical',
        'microphone': 'Musical',
        'singer': 'Musical',
        'heart': 'Love & Life',
        'love': 'Love & Life',
        'baby': 'Birth',
        'trophy': 'Sport event',
        'soccer': 'Sport event',
        'football': 'Sport event',
        'basketball': 'Sport event',
        'artist': 'Personal achievement',
        'star': 'Personal achievement',
        'book': 'Studies & Graduation',
        'graduation': 'Studies & Graduation',
        'business': 'New business',
        'money': 'Financial milestone',
        'adventure': 'Adventure',
        'travel': 'Adventure',
        'home': 'New Home',
        'house': 'New Home',
        'ring': 'Wedding',
        'car': 'Car',
        'pet': 'Pet',
        'dog': 'Pet',
        'cat': 'Pet',
    };

    for (const [keyword, iconName] of Object.entries(mappings)) {
        if (name.includes(keyword)) {
            const icon = iconsByKey[iconName];
            if (icon) {
                return { ...icon, color: defaultColor };
            }
        }
    }

    // Default fallback - use the first icon (Love & Life)
    return { ...icons[0], color: defaultColor };
}
