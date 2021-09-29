import { useState } from 'react'

export default function InputRange({ children, sufix, data, id, coef = 1 }) {

    const [valueRange, setValueRange] = useState(0)

    const setFunction = data.function
    function onChangeHandler(event) {

        const { value } = event.target
        const newValue = value / coef
        setValueRange(newValue)

        data.value[id] = newValue
        setFunction(data.value)

    }

    return (
        <div className="text-left w-full">
            <label>{children} {valueRange} {sufix}</label>
            <input onChange={onChangeHandler} type="range" className="w-full rounded-md py-1 px-2"></input>
        </div>
    )
}