import React from 'react'

interface RangeSliderProps {
  inputName: string
  inputLabel: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  inputName,
  inputLabel,
  onChange
}) => {
  return (
    <div className="w-full mb-5">
      <label htmlFor={inputName} className="block mb-2 text-sm font-medium">
        {inputLabel}
      </label>
      <input
        onChange={onChange}
        onLoad={(event) => console.log('loaded', event)}
        autoComplete="off"
        id={inputName}
        name={inputName}
        type="range"
        min="0"
        max="3"
        defaultValue="0"
        step="1"
        className="w-full range range-sm range-primary"
      />
      <div className="w-full flex justify-between mt-2 text-xs">
        <span>N/A</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </div>
  )
}
