# n8n-nodes-promptforge-ai

This is an n8n community node. It lets you use **PromptForge AI** in your n8n workflows.

PromptForge AI generates optimized, structured prompts for ChatGPT, Claude, Gemini, Grok, and other LLMs from a small set of simple inputs.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```
npm install n8n-nodes-promptforge-ai
```

## Operations

PromptForge AI takes the following inputs and returns a single structured item:

- **Role** – the persona the target model should assume
- **Task** – what the model should do
- **Target LLM** – ChatGPT, Claude, Gemini, Grok, or Other
- **Tone** – Professional, Casual, Friendly, Formal, Persuasive, Technical, Humorous
- **Output Format** – Plain Text, Markdown, JSON, Bullet Points, Step-by-Step, Table
- **Additional Instructions** – any extra constraints or context

### Output

```json
{
  "role": "senior copywriter",
  "task": "Write a product launch announcement",
  "llm": "ChatGPT",
  "tone": "Persuasive",
  "format": "Markdown",
  "additionalInstructions": "Keep it under 150 words",
  "prompt": "You are an expert senior copywriter.\nTask:\nWrite a product launch announcement\nTarget Model:\nChatGPT\nTone:\nPersuasive\nOutput Format:\nMarkdown\nAdditional Instructions:\nKeep it under 150 words"
}
```

## Compatibility

Requires n8n version 1.0 or later. Tested against n8n `n8nNodesApiVersion` 1.

## Usage

Add the **PromptForge AI** node from the **AI** category, fill in the fields, and connect its `prompt` output to any LLM node (OpenAI, Anthropic, Google Gemini, etc.).

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Repository](https://github.com/justphase/n8n-nodes-promptforge-ai)
