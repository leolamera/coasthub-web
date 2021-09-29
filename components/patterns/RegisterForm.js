import { useState } from 'react'
import FormSubmit from './FormSubmit'
import ButtonSelect from '../atoms/ButtonSelect'

export default function RegisterForm() {

    const [type, setType] = useState('client')
    const [step, setStep] = useState(1)
  
    return (
      <div className="space-y-6">
        <div>
          <Stepper selected={{ type: { value: type }, step: { value: step } }} />
        </div>
        <div className="space-y-5">
          {step === 1 && <ButtonSelect selected={{ value: type, function: setType }} />}
          {/* {type === 'client' ? <h1>Cliente</h1> : <h1>Bussines</h1>} */}
          <FormSubmit selected={{ type: { value: type }, step: { value: step, function: setStep } }} />
        </div>
      </div>
    )
  
  }

  