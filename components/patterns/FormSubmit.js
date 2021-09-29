import { useState, useEffect} from 'react'
import FormInputClient from '../molecules/FormInputClient'
import FormInputBussines from '../molecules/FormInputBussines'

export default function FormSubmit(props) {

    const [formState, setFormState] = useState({})


    function changeStepClick() {
        const setpFunction = selected.step.function
        setpFunction(selected.step.value + 1)

    }

    return (
        <div className="space-y-6">
            {selected.type.value == 'client' ? <FormInputClient data={{ value: formState, function: setFormState }} step={selected.step.value} /> : <FormInputBussines data={{ value: formState, function: setFormState }} step={selected.step.value} />}

            {(selected.step.value !== 3 && selected.type.value == 'client') || (selected.step.value !== 4 && selected.type.value == 'bussines') ? <button onClick={changeStepClick} className="bg-blue-400 w-full rounded-md py-2">Próximo</button> : null}
        </div>
    )
}