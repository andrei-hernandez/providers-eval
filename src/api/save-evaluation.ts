import { DATA_STORAGE_KEY } from "../shared/constants.ts";

export const saveEvaluation = (evaluationData: EvaluationData) => {
  const previousEvaluations = localStorage.getItem(DATA_STORAGE_KEY);
  const evaluations = previousEvaluations
    ? JSON.parse(previousEvaluations)
    : [];
  evaluations.push(evaluationData);
  localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(evaluations));
};
