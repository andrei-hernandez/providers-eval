import React, { useEffect, useState } from 'react'
import { getEvaluations } from '../../api/get-evaluations.ts'

export const EvaluationsList: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([])

  useEffect(() => {
    const evaluations = getEvaluations()
    setEvaluations(evaluations)
  }, [])

  console.log('evaluations', evaluations)

  return (
    <div className="w-2xl flex flex-col gap-5">
      <div className="mb-5">Evaluaciones guardadas</div>
      <a
        href="/evaluation-form"
        className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm focus:outline-none"
      >
        Crear una nueva evaluación
      </a>
      <div className="flex flex-col gap-5">
        {evaluations.map((evaluation: EvaluationData) => (
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {evaluation.eventName} - {evaluation.evaluationDate} -{' '}
            {evaluation.providerToEvaluate} - {evaluation.serviceToEvaluate} -{' '}
            {evaluation.evaluationScore}%
          </div>
        ))}
      </div>
    </div>
  )
}
