const { execSync } = require('child_process');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(__dirname, '..', '.env.local') });

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const command = `npx openapi-typescript-codegen -i ${apiUrl}/api-docs/openapi.json --client fetch -o ./src/api/openapi`;

console.log(`Generating API client from ${apiUrl}/api-docs/openapi.json...`);
try {
  execSync(command, { stdio: 'inherit' });
  console.log('API client generated successfully!');
} catch (error) {
  console.error('Failed to generate API client');
  process.exit(1);
}