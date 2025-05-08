interface EvaluationFormShape {
  eventName: string;
  providerToEvaluate: string;
  serviceToEvaluate: string;
  evaluationDate: string;
}

interface EvaluationCriteriaFormShape {
  cleanse: string;
  temperature: string;
  illumination: string;
  odorization: string;
  mobiliary: string;
  installationsQuality: string;
  electricInstallation: string;
  impressionQuality: string;
  structures: string;
  presentation: string;
  hygiene: string;
  punctuality: string;
  quantity: string;
  responseTime: string;
  serviceAttitude: string;
  additionalRequestsFlexibility: string;
  inconvenienceAttentionResponse: string;
}
interface EvaluationData extends EvaluationFormShape {
  evaluationCriteria: EvaluationCriteriaFormShape;
  evaluationScore: number;
}
