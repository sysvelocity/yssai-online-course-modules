# project-yss

Vercel backend for the Sysvelocity YSS AI chat.

## Files

- `api/chat.js`: Streaming chat endpoint for Wix
- `lib/systemPrompt.js`: YSS system prompt
- `vercel.json`: Vercel function settings

## Environment variables

Set these in Vercel:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`, optional, recommended `gpt-5.2`

## Local development

```bash
npm install
npx vercel dev
```

The local endpoint will be:

```text
http://localhost:3000/api/chat
```

## Request format

POST JSON:

```json
{
  "message": "Bridge Line: ...",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

## Response format

Server-Sent Events stream:

- `delta`: incremental text chunk
- `done`: stream complete
- `error`: streaming error

## Next step

Deploy this to Vercel, then update the Wix HTML chat UI to stream from the deployed `/api/chat` endpoint.
