const GPT_5_6_MODEL_PREFIX = "gpt-5.6";

export function isGpt56Model(model) {
  const normalizedModel = String(model || "").trim().toLowerCase();

  return normalizedModel === GPT_5_6_MODEL_PREFIX ||
    normalizedModel.startsWith(`${GPT_5_6_MODEL_PREFIX}-`);
}

export function buildGenerationOptions(
  model,
  {
    temperature = 0.8,
    presencePenalty = 0.2,
    reasoningEffort = "low"
  } = {}
) {
  if (isGpt56Model(model)) {
    return {
      reasoning: {
        effort: reasoningEffort
      }
    };
  }

  return {
    temperature,
    presence_penalty: presencePenalty
  };
}
