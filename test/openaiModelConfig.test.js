import assert from "node:assert/strict";
import test from "node:test";
import {
  buildGenerationOptions,
  isGpt56Model
} from "../lib/openaiModelConfig.js";

test("identifies GPT-5.6 family model IDs", () => {
  assert.equal(isGpt56Model("gpt-5.6"), true);
  assert.equal(isGpt56Model("gpt-5.6-luna"), true);
  assert.equal(isGpt56Model("gpt-5.6-terra"), true);
  assert.equal(isGpt56Model("gpt-5.2"), false);
});

test("uses explicit low reasoning without sampling fields for GPT-5.6 Luna", () => {
  const options = buildGenerationOptions("gpt-5.6-luna", {
    temperature: 0.8,
    presencePenalty: 0.2,
    reasoningEffort: "low"
  });

  assert.deepEqual(options, {
    reasoning: {
      effort: "low"
    }
  });
  assert.equal("temperature" in options, false);
  assert.equal("presence_penalty" in options, false);
});

test("preserves the existing sampling settings for GPT-5.2", () => {
  assert.deepEqual(
    buildGenerationOptions("gpt-5.2", {
      temperature: 0.8,
      presencePenalty: 0.2
    }),
    {
      temperature: 0.8,
      presence_penalty: 0.2
    }
  );
});
