import React, { useMemo, useState } from 'react'
import { RangeSlider } from './range-slider.tsx'
import { saveEvaluation } from '../../api/save-evaluation.ts'

export const EvaluationForm: React.FC = () => {
  const [evaluationFormData, setEvaluationFormData] = useState<
    Partial<EvaluationFormShape>
  >({})
  const [evaluationCriteriaFormData, setEvaluationCriteriaFormData] = useState<
    Partial<EvaluationCriteriaFormShape>
  >({})

  const onBaseDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setEvaluationFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onCriteriaDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEvaluationCriteriaFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const scorePercentage = useMemo<number>((): number => {
    const criteria = evaluationCriteriaFormData
    if (!criteria) return 0

    const totalScore = Object.values(criteria).reduce((acc, score) => {
      if (score === 'N/A') return acc
      return acc + Number(score)
    }, 0)

    const maxScore = 51
    const currentScore = (totalScore / maxScore) * 100
    return Math.round(currentScore)
  }, [evaluationCriteriaFormData])

  const onSaveEvaluation = () => {
    const evaluationData: EvaluationData = {
      ...(evaluationFormData as unknown as EvaluationFormShape),
      evaluationCriteria:
        evaluationCriteriaFormData as unknown as EvaluationCriteriaFormShape,
      evaluationScore: scorePercentage
    }

    saveEvaluation(evaluationData)
  }

  console.log('scorePercentage', scorePercentage)

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center gap-5">
      <form className="flex flex-col gap-5 w-2xl">
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-5 text-xl">
            AT/R-M8.4-02 Evaluación de proveedores
          </h1>
          <h2 className="mb-5 text-lg">Instrucciones de llenado</h2>
          <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
            <li>
              <span>
                Llenar el encabezado del formulario con los datos del evento.
              </span>
            </li>
            <li>
              <span>
                Asignar el valor que considere adecuado en cada criterio
                considerando{' '}
                <strong className="font-medium text-gray-900 dark:text-white">
                  1
                </strong>{' '}
                como malo,{' '}
                <strong className="font-medium text-gray-900 dark:text-white">
                  2
                </strong>{' '}
                como regular y{' '}
                <strong className="font-medium text-gray-900 dark:text-white">
                  3
                </strong>{' '}
                como bueno y{' '}
                <strong className="font-medium text-gray-900 dark:text-white">
                  N/A
                </strong>{' '}
                en caso de no aplicar.
              </span>
            </li>
          </ol>
        </div>
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-5 text-xl">Información básica</h2>
          <div className="mb-5">
            <label
              htmlFor="evaluation-date"
              className="block mb-2 text-sm font-medium"
            >
              Fecha de evaluación
            </label>
            <input
              type="date"
              id="evaluation-date"
              name="evaluationDate"
              onChange={onBaseDataChange}
              autoComplete="off"
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="event-name"
              className="block mb-2 text-sm font-medium"
            >
              Evento
            </label>
            <input
              type="text"
              id="event-name"
              name="eventName"
              defaultValue=""
              autoComplete="off"
              onChange={onBaseDataChange}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="provider-to-evaluate"
              className="block mb-2 text-sm font-medium"
            >
              Proveedor a evaluar
            </label>
            <input
              type="text"
              id="provider-to-evaluate"
              name="providerToEvaluate"
              autoComplete="off"
              defaultValue=""
              onChange={onBaseDataChange}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="service-to-evaluate"
              className="block mb-2 text-sm font-medium"
            >
              Servicio a evaluar
            </label>
            <select
              id="service-to-evaluate"
              name="serviceToEvaluate"
              autoComplete="off"
              onChange={onBaseDataChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Hospedaje</option>
              <option>Recinto</option>
              <option>Alimentos y bebidas</option>
              <option>Audio y video</option>
              <option>Expocomercial</option>
              <option>Transporte</option>
              <option>Escenografía</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="mb-5 flex flex-row gap-5">
            <div className="flex-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Area que evalúa
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Logística</option>
                <option>Alimentos y bebidas</option>
              </select>
            </div>
            <div className="flex-auto">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium"
              >
                Nombre de quien evalúa
              </label>
              <input
                type="text"
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 pt-2 py-[9px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow -sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="mb-5 text-xl">Criterios de evaluación</h3>
          <RangeSlider
            inputLabel="Limpieza"
            inputName="cleanse"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Temperatura"
            inputName="temperature"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Iluminación"
            inputName="illumination"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Odorización"
            inputName="odorization"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Mobiliario"
            inputName="mobiliary"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Estado de instalaciones"
            inputName="installationsQuality"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Instalación eléctrica"
            inputName="electricInstallation"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Calidad de impresión"
            inputName="impressionQuality"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Estructuras"
            inputName="structures"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Presentación (Alimentos y Bebidas)"
            inputName="presentation"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Higiene (Alimentos y Bebidas)"
            inputName="higiene"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Puntualidad de entrega en producto/servicio"
            inputName="punctuality"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Cantidad correcta de producto/servicio"
            inputName="quantity"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Rapidez en tiempos de respuesta"
            inputName="responseTime"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Actitud de servicio"
            inputName="serviceAttitude"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Flexibilidad en solicitudes adicionales"
            inputName="additionalRequestsFlexibility"
            onChange={onCriteriaDataChange}
          />
          <RangeSlider
            inputLabel="Capacidad de atención a inconvenientes"
            inputName="inconvenienceAttentionResponse"
            onChange={onCriteriaDataChange}
          />
        </div>
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow -sm dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-5">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Observaciones
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
        </div>
      </form>
      <article className="w-xl flex flex-col gap-5 sticky self-start top-5">
        <div className="w-full flex flex-row justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h2 className="mb-5 text-xl">Calificación</h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center">
                <svg
                  className={`w-3.5 h-3.5 me-2 ${
                    scorePercentage <= 40
                      ? 'text-green-500 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                </svg>
                De 0 a 40 puntos: el proveedor es malo
              </li>
              <li className="flex items-center">
                <svg
                  className={`w-3.5 h-3.5 me-2 ${
                    scorePercentage >= 41 && scorePercentage <= 60
                      ? 'text-green-500 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                </svg>
                De 41 a 60 puntos: el proveedor es regular
              </li>
              <li className="flex items-center">
                <svg
                  className={`w-3.5 h-3.5 me-2 ${
                    scorePercentage >= 61 && scorePercentage <= 80
                      ? 'text-green-500 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                </svg>
                De 61 a 80 puntos: el proveedor es bueno
              </li>
              <li className="flex items-center">
                <svg
                  className={`w-3.5 h-3.5 me-2 ${
                    scorePercentage >= 81 && scorePercentage <= 100
                      ? 'text-green-500 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                </svg>
                De 81 a 100 puntos: el proveedor es excelente
              </li>
            </ul>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Puntaje total</div>
              <div className="stat-value">{scorePercentage}%</div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <a
            href="/form-saved"
            className="btn btn-block btn-primary py-6 text-xl rounded-lg"
            onClick={onSaveEvaluation}
          >
            Guardar evaluación
          </a>
        </div>
      </article>
    </div>
  )
}
