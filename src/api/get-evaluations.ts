import { DATA_STORAGE_KEY } from "../shared/constants.ts";

export const getEvaluations = (): EvaluationData[] => {
  const evaluations = localStorage.getItem(DATA_STORAGE_KEY);
  if (evaluations) {
    return JSON.parse(evaluations);
  }
  return [];
};
