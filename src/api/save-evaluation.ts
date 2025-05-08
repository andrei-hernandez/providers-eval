import { DATA_STORAGE_KEYS } from "../shared/constants.ts";

export const saveEvaluation = (evaluationData: EvaluationData) => {
  const previousEvaluations = localStorage.getItem(
    DATA_STORAGE_KEYS.EVALUATIONS,
  );
  const evaluations = previousEvaluations
    ? JSON.parse(previousEvaluations)
    : [];
  evaluations.push(evaluationData);
  localStorage.setItem(
    DATA_STORAGE_KEYS.EVALUATIONS,
    JSON.stringify(evaluations),
  );
};
