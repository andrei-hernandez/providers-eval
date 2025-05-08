import { DATA_STORAGE_KEYS } from "../shared/constants.ts";

export const getEvaluations = (): EvaluationData[] => {
  const evaluations = localStorage.getItem(DATA_STORAGE_KEYS.EVALUATIONS);
  if (evaluations) {
    return JSON.parse(evaluations);
  }
  return [];
};
