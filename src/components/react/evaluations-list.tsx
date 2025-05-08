import React, { useEffect, useState } from 'react'
import { getEvaluations } from '../../api/get-evaluations.ts'

export const EvaluationsList: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([])

  useEffect(() => {
    const evaluations = getEvaluations()
    setEvaluations(evaluations)
  }, [])

  return (
    <div className="w-2xl flex flex-col gap-5">
      <div className="w-full mb-5 flex flex-row justify-between text-center items-center">
        <h1 className="text-xl">Evaluaciones guardadas</h1>
        <div className="flex flex-row gap-5">
          <a
            href="/evaluation-form"
            className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm focus:outline-none"
          >
            Crear una nueva evaluación
          </a>
          <a
            type="button"
            href="/admin-login"
            className="px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Gestionar datos
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {evaluations.map((evaluation: EvaluationData) => (
          <div className="w-full p-6 gap-5 flex flex-row justify-center items-center text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">
              {evaluation.eventName} - {evaluation.evaluationDate} -{' '}
              {evaluation.providerToEvaluate} - {evaluation.serviceToEvaluate} -{' '}
              {evaluation.evaluationScore}%
            </span>
            <div className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm focus:outline-none">
              Ver evaluación
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
