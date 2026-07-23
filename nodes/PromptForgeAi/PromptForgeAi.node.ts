import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
	NodeApiError,
	JsonObject,
} from 'n8n-workflow';

export class PromptForgeAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PromptForge AI',
		name: 'promptForgeAi',
		icon: { light: 'file:promptforgeai.light.svg', dark: 'file:promptforgeai.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["task"]}}',
		description: 'Generate optimized prompts for ChatGPT, Claude, Gemini, Grok and other LLMs.',
		defaults: {
			name: 'PromptForge AI',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Miscellaneous'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://github.com/justphase/n8n-nodes-promptforge-ai',
					},
				],
			},
		},
		properties: [
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				placeholder: 'e.g. senior copywriter',
				description: 'The role/persona the AI model should assume',
				required: true,
			},
			{
				displayName: 'Task',
				name: 'task',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				placeholder: 'Describe what the model should do',
				description: 'The task the AI model should perform',
				required: true,
			},
			{
				displayName: 'Target LLM',
				name: 'llm',
				type: 'options',
				options: [
					{ name: 'ChatGPT', value: 'ChatGPT' },
					{ name: 'Claude', value: 'Claude' },
					{ name: 'Gemini', value: 'Gemini' },
					{ name: 'Grok', value: 'Grok' },
					{ name: 'Other', value: 'Other' },
				],
				default: 'ChatGPT',
				description: 'The target LLM the prompt is optimized for',
			},
			{
				displayName: 'Tone',
				name: 'tone',
				type: 'options',
				options: [
					{ name: 'Casual', value: 'Casual' },
					{ name: 'Formal', value: 'Formal' },
					{ name: 'Friendly', value: 'Friendly' },
					{ name: 'Humorous', value: 'Humorous' },
					{ name: 'Persuasive', value: 'Persuasive' },
					{ name: 'Professional', value: 'Professional' },
					{ name: 'Technical', value: 'Technical' },
				],
				default: 'Professional',
				description: 'The tone the generated response should have',
			},
			{
				displayName: 'Output Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'Bullet Points', value: 'Bullet Points' },
					{ name: 'JSON', value: 'JSON' },
					{ name: 'Markdown', value: 'Markdown' },
					{ name: 'Plain Text', value: 'Plain Text' },
					{ name: 'Step-by-Step', value: 'Step-by-Step' },
					{ name: 'Table', value: 'Table' },
				],
				default: 'Plain Text',
				description: 'The desired output format of the response',
			},
			{
				displayName: 'Additional Instructions',
				name: 'additionalInstructions',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				placeholder: 'Any extra constraints, context, or examples',
				description: 'Any additional instructions to include in the prompt',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const role = this.getNodeParameter('role', itemIndex) as string;
				const task = this.getNodeParameter('task', itemIndex) as string;
				const llm = this.getNodeParameter('llm', itemIndex) as string;
				const tone = this.getNodeParameter('tone', itemIndex) as string;
				const format = this.getNodeParameter('format', itemIndex) as string;
				const additionalInstructions = this.getNodeParameter(
					'additionalInstructions',
					itemIndex,
				) as string;

				const prompt = [
					`You are an expert ${role}.`,
					'Task:',
					task,
					'Target Model:',
					llm,
					'Tone:',
					tone,
					'Output Format:',
					format,
					'Additional Instructions:',
					additionalInstructions,
				].join('\n');

				returnData.push({
					json: {
						role,
						task,
						llm,
						tone,
						format,
						additionalInstructions,
						prompt,
					},
					pairedItem: { item: itemIndex },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: itemIndex },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject);
			}
		}

		return [returnData];
	}
}