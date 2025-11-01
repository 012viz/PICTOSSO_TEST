# AI Pictosso Generator 🤖

## Vue d'ensemble

Ce module permet de générer automatiquement des Pictossos à partir de descriptions en langage naturel en utilisant l'IA (via OpenRouter).

## Architecture

```
/src/app/ai-pictosso/
├── openrouter.ts           # Client pour l'API OpenRouter
├── pictosso-generator.ts   # Logique de génération AI
├── AIPictossoChat.tsx      # Interface utilisateur du chatbot
├── page.tsx                # Page principale du générateur
└── README.md               # Documentation

/src/app/api/ai-pictosso/
└── generate/
    └── route.ts            # API endpoint pour la génération
```

## Fonctionnalités

### 1. Génération Automatique
- L'utilisateur décrit une personne ou un événement
- L'IA recherche les informations clés
- Génère automatiquement :
  - Titre et sous-titre
  - Dates de début et fin
  - Type de période (jour/mois/année)
  - Icône principale représentative
  - 15-30 événements clés avec emojis appropriés

### 2. Sélection Intelligente d'Emojis
- Utilise la collection Iconify (noto, circle-flags)
- Choix contextuel basé sur le sujet
- Exemples :
  - 🎵 pour musiciens
  - ⚽ pour footballeurs
  - 🏆 pour victoires
  - 🎬 pour acteurs

### 3. Chronologie Intelligente
- Détection automatique du type de période approprié
- Espacement logique des événements
- Validation des dates

## Configuration

### 1. Clé API OpenRouter

Vous devez obtenir une clé API sur [OpenRouter.ai](https://openrouter.ai/keys)

**Option A: Variable d'environnement**
```bash
# .env.local
OPENROUTER_API_KEY=sk-or-v1-...
```

**Option B: Saisie directe dans l'interface**
L'utilisateur peut entrer sa clé directement dans le formulaire.

### 2. Modèle AI

Par défaut, le système utilise `anthropic/claude-3.5-sonnet`.

Vous pouvez changer le modèle dans `openrouter.ts` :
```typescript
await this.client.chat(messages, 'openai/gpt-4-turbo', 0.7);
```

## Utilisation

### Interface Web

1. Accédez à `/ai-pictosso`
2. Entrez votre clé API OpenRouter
3. Décrivez la personne ou l'événement
4. Cliquez sur "Générer le Pictosso"
5. Vérifiez les résultats
6. Cliquez sur "Appliquer ce Pictosso"

### Exemples de prompts

```
"Fais-moi le Pictosso de la vie de Bob Marley"
"Crée un Pictosso pour la carrière de Lionel Messi"
"Génère un Pictosso de la vie de Marie Curie"
"Fais le Pictosso de l'histoire d'Apple"
"Pictosso de la carrière de Picasso"
```

### API Programmatique

```typescript
import { PictossoGenerator } from '@/app/ai-pictosso/pictosso-generator';

const generator = new PictossoGenerator(apiKey);
const result = await generator.generate("Fais-moi le Pictosso de Bob Marley");

console.log(result.title);        // "Bob Marley"
console.log(result.events.length); // 20-30 événements
```

### API REST

```bash
curl -X POST http://localhost:3000/api/ai-pictosso/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Fais-moi le Pictosso de Bob Marley",
    "apiKey": "sk-or-v1-..."
  }'
```

## Structure de réponse

```typescript
interface GeneratedPictosso {
    title: string;              // "Bob Marley"
    subtitle?: string;          // "Musicien jamaïcain"
    startDate: string;          // "1945-02-06"
    endDate: string;            // "1981-05-11"
    periodType: PeriodType;     // "YEAR"
    mainIcon: {
        path: string;           // "noto:microphone"
        name: string;           // "Microphone"
    };
    events: [{
        date: string;           // "1963-01-01"
        title: string;          // "Formation des Wailers"
        emoji: string;          // "🎵"
        iconifyId: string;      // "noto:musical-note"
    }];
}
```

## Prompt Engineering

Le système utilise un prompt structuré pour garantir :
- Précision historique
- Sélection appropriée d'emojis
- Chronologie cohérente
- Format JSON strict

Le prompt système complet se trouve dans `pictosso-generator.ts`.

## Intégration avec le projet

Une fois généré, le Pictosso est automatiquement appliqué aux signals globaux :
- `mainIcon.value`
- `startDate.value`
- `endDate.value`
- `selectedPeriodType.value`
- `lifeEvents.value`

L'utilisateur est redirigé vers `/project` pour visualiser et personnaliser.

## Limitations & Améliorations futures

**Limitations actuelles :**
- Dépend de la connaissance de l'IA (pas de recherche web en temps réel)
- Limité aux personnes/événements connus
- Dates approximatives pour événements anciens

**Améliorations possibles :**
1. Intégration avec API de recherche web (Bing, Google)
2. Recherche d'images pour l'icône principale
3. Vérification de dates via Wikipedia API
4. Support multilingue
5. Sauvegarde de l'historique des générations
6. Mode "affiner" pour régénérer certains événements

## Coûts

Coût approximatif par génération (avec Claude 3.5 Sonnet) :
- ~3000-5000 tokens par génération
- ~$0.01-0.02 par Pictosso généré

## Sécurité

⚠️ **Important :**
- Ne jamais commiter de clés API dans le code
- Utiliser des variables d'environnement en production
- Valider et sanitiser les inputs utilisateurs
- Limiter le nombre de requêtes par utilisateur (rate limiting)

## Licence

Ce module fait partie du projet Pictosso.
