import { CosmosClient } from '@azure/cosmos';
import { config } from 'dotenv';
config();

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || 'InvoicesDB';
const containerId = process.env.COSMOS_CONTAINER || 'Invoices';

if (!endpoint || !key) {
  console.warn('COSMOS_ENDPOINT or COSMOS_KEY not set. Make sure to configure .env');
}

const client = new CosmosClient({ endpoint, key });

async function getContainer() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId, partitionKey: { kind: 'Hash', paths: ['/id'] } });
  return container;
}

export default { client, getContainer };
