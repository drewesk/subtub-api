import { Client as WorkflowClient } from '@upstash/workflow';

import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
});

console.log('QStash Client URL:', QSTASH_URL);
console.log('QStash Client Token:', QSTASH_TOKEN);
