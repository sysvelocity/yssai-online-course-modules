// YSS_UPLOAD_KNOWLEDGE_V1

import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const filePath = process.argv[2];

if (!apiKey) {
  console.error("Set OPENAI_API_KEY before running this script.");
  process.exit(1);
}

if (!filePath) {
  console.error("Pass the knowledge file path as the first argument.");
  process.exit(1);
}

const resolvedPath = path.resolve(filePath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`File not found: ${resolvedPath}`);
  process.exit(1);
}

const client = new OpenAI({ apiKey });

const vectorStore = await client.vectorStores.create({
  name: "project-yss-knowledge"
});

const uploadedFile = await client.files.create({
  file: fs.createReadStream(resolvedPath),
  purpose: "assistants"
});

await client.vectorStores.files.createAndPoll(vectorStore.id, {
  file_id: uploadedFile.id
});

console.log(`Vector store created: ${vectorStore.id}`);
console.log(`File uploaded: ${uploadedFile.id}`);
console.log("Add the vector store ID to Vercel as OPENAI_VECTOR_STORE_ID.");
