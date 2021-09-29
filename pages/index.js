import Head from 'next/head'
import { useState } from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../public/email.json'
import { mask } from 'remask'
import axios from 'axios'

import Stepper from '../components/atoms/Stepper'
import ButtonSelect from '../components/atoms/ButtonSelect'
import Select from 'react-select'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-200">
      <Head>
        <title>CoastHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <RegisterForm />
      </main>

    </div>
  )
}

// patterns
function RegisterForm() {

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

function FormSubmit({ selected }) {

  const [formState, setFormState] = useState({})

  async function changeStepClick() {
    const setpFunction = selected.step.function
    setpFunction(selected.step.value + 1)

    if (selected.step.value === 2 && selected.type.value == 'client') {
      
      const response = await axios({
        method: 'POST',
        url: 'https://coasthub-apis.herokuapp.com/users',
        data: formState
      })

    }


    if (selected.step.value === 3 && selected.type.value == 'bussines') {
      
      const response = await axios({
        method: 'POST',
        url: 'https://coasthub-apis.herokuapp.com/users/bussines',
        data: formState
      })

    }
  }

  return (
    <div className="space-y-6">
      {selected.type.value == 'client' ? <FormInputClient data={{ value: formState, function: setFormState }} step={selected.step.value} /> : <FormInputBussines data={{ value: formState, function: setFormState }} step={selected.step.value} />}
      {(selected.step.value !== 3 && selected.type.value == 'client') || (selected.step.value !== 4 && selected.type.value == 'bussines') ? <button onClick={changeStepClick} className="bg-purple-400 w-full rounded-md py-2">Próximo</button> : null}
    </div>
  )
}

// molecules

function BussinesInputs({ data }) {


  const setDataFunction = data.function

  async function getReceitaFederal() {
    if (data.value['document'] !== undefined && data.value['document'].length === 14) {
      const response = await axios.get(`/api/${data.value['document']}`)
      const bussinesObject = { bussinesName: response.data.name }

      const updateObject = { ...data.value, ...bussinesObject }
      setDataFunction(updateObject)
    }
  }

  return (
    <div className="space-y-4">
      <InputLabels onBlur={{ function: getReceitaFederal }} id="document" data={data} type="text">
        CNPJ
      </InputLabels>
      <InputLabels id="bussinesName" data={data} value={data.value['bussinesName']} type="text">
        Razão Social
      </InputLabels>
    </div>
  )
}


function AdressInputs({ data }) {

  const [showAllAdress, setShowAllAdress] = useState(false)

  const setDataFunction = data.function

  async function onBluerShow() {
    if (data.value['cep'] !== undefined && data.value['cep'].length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${data.value['cep']}/json/`)
      const adressObject = { adress: response.data['logradouro'], city: response.data['localidade'], state: response.data['uf'] }
      const updateObject = { ...data.value, ...adressObject }
      setDataFunction(updateObject)
      setShowAllAdress(true)

    }
  }

  return (
    <div className="space-y-4">
      <InputLabels onBlur={{ function: onBluerShow }} id="cep" data={data} type="cep">
        CEP
      </InputLabels>
      {showAllAdress && (
        <div className="space-y-4">
          <InputLabels id="state" data={data} value={data.value['state']} type="cpf">
            Estado
          </InputLabels>
          <InputLabels id="city" data={data} value={data.value['city']} type="cpf">
            Cidade
          </InputLabels>
          <InputLabels id="adress" data={data} value={data.value['adress']} type="cpf">
            Logradouro
          </InputLabels>
          <InputLabels id="number" data={data} type="cpf">
            Numero
          </InputLabels>
          <InputLabels id="obs" data={data} type="cpf">
            Complemento
          </InputLabels>
        </div>
      )}
    </div>
  )
}

function PaswordInputs({ data }) {

  const [confirm, setConfirm] = useState('')
  const [showError, setError] = useState(true)

  function errorInScreen(event) {

    const { value } = event.target
    setConfirm(value)

    const needSeError = value === data.value['password'] ? false : true
    setError(needSeError)
  }

  return (
    <div className="space-y-4">
      <InputLabels id="password" data={data} type="password">
        Senha
      </InputLabels>
      <div className="text-left w-full">
        <label>Confirmar senha</label>
        <input onChange={errorInScreen} type="password" value={confirm} className="w-full rounded-md py-1 px-2"></input>
      </div>
      <div className="space-y-4">
        {confirm !== '' && showError && <label className="text-red-600">As senhas devem ser iguais.</label>}
      </div>
    </div>
  )
}

function FormInputClient({ step, data }) {

  const defaultOptionsAnimation = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      {step === 1 && (
        <div className="space-y-4">
          <InputLabels data={data} id="email" type="email">
            E-mail
          </InputLabels>
          <PaswordInputs data={data} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <InputLabels id="firstName" data={data} type="text">
            Nome
          </InputLabels>
          <InputLabels id="lastName" data={data} type="text">
            Sobrenome
          </InputLabels>
          <InputLabels id="document" data={data} type="cpf">
            CPF
          </InputLabels>
          <AdressInputs data={data} />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Lottie
            height={250}
            width={250}
            options={defaultOptionsAnimation}
          />
          <h1 className="text-2xl text-justify">Enviamos um E-mail, por favor confirme sua conta para continuar.</h1>
        </div>
      )}
    </div>
  )
}

function FormInputBussines({ step, data }) {

  const [selectedOption, setSelectedOption] = useState('')

  const defaultOptionsAnimation = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const optionsCategories = {
    categories: [
      { value: 'restaurants', label: 'Restaurantes' },
      { value: 'stores', label: 'Comércio' },
      { value: 'others', label: 'Outros' }
    ]
  }

  const optionsSubcategories = {
    restaurants: [
      { value: 'italian', label: 'Cozinha Italiana' },
      { value: 'fastfood', label: 'Lanches' },
      { value: 'oriental', label: 'Comida Orienta' },
      { value: 'arab', label: 'Cozinha Árabe' },
      { value: 'others', label: 'Outros' },

    ],
    stores: [
      { value: 'restaurants', label: 'Cosméticos' },
      { value: 'restaurants', label: 'Vestuário' },
      { value: 'restaurants', label: 'Eletrônicos' },
      { value: 'restaurants', label: 'Tabacaria' },
      { value: 'others', label: 'Outros' },
    ]
  }



  return (
    <div>
      <div>
        {step === 1 && (
          <div className="space-y-4">
            <InputLabels data={data} id="email" type="email">
              E-mail
            </InputLabels >
            <PaswordInputs data={data} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <BussinesInputs data={data} />
            <InputLabels id="comercialName" data={data} type="text">
              Nome Comercial
            </InputLabels>
            <span className="text-sm">* estes é o nome que aparecerá no app</span>
            <SelectInput filters={{ function: setSelectedOption, value: 'categories' }} options={optionsCategories} data={data} id="categorie">
              Categoria
            </SelectInput>
            {selectedOption === 'others' ? <InputLabels id="subcategorie" data={data} type="text">
              Informe sua Categoria
            </InputLabels> : <SelectInput filters={{ function: setSelectedOption, value: selectedOption }} options={optionsSubcategories} data={data} id="subcategorie">
              Subcategoria
            </SelectInput>}
            <AdressInputs data={data} />
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <InputLabels id="openTime" data={data} type="time">
              Horário de Abertura
            </InputLabels>
            <InputLabels id="closeTime" data={data} type="time">
              Horário de Fechamento
            </InputLabels>
            <InputRange coef={20} id="deliveryRangeLimit" data={data} sufix="kms">
              Entrega disponível até 
            </InputRange>
            <InputRange id="deliveryTimeLimit" data={data} sufix="minutos">
              Preparação e entrega em  
            </InputRange>
            <InputLabels id="deliveryPrice" data={data} type="money">
              Preço da entrega
            </InputLabels>
            <InputLabels id="minimiumDeliveryPrice" data={data} type="money">
              Preço do pedido mínimo
            </InputLabels>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Lottie
              height={250}
              width={250}
              options={defaultOptionsAnimation}
            />
            <h1 className="text-2xl text-justify">Enviamos um E-mail, por favor confirme sua conta para continuar.</h1>
          </div>
        )}
      </div>
    </div>
  )
}

// atoms

function SelectInput({ children, data, id, options, filters }) {



  const setFunction = data.function
  const setFilter = filters.function


  const optionsArray = options[filters.value]


  function handleChange(option) {
    setFilter(option.value)

    data.value[id] = option.value
    setFunction(data.value)
  }

  return (
    <div className="text-left">
      <label>{children}</label>
      <Select options={optionsArray} onChange={handleChange} />
    </div>
  )

}

function InputRange({ children, sufix, data, id, coef=1 }) {

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

export function InputLabels({ children, type, data, id, onBlur, value }) {

  const maskObject = {
    cpf: '999.999.999-99',
    cep: '99999-99'
  }

  const finalType = maskObject[type]
  const setFunction = data.function
  const needBlur = onBlur ? true : false

  function onChangeHandler(event) {

    const { value } = event.target
    data.value[id] = value

    setFunction(data.value)


    if (!!finalType) {
      // insert mask input
    }

  }

  function onBlurFunction() {
    if (needBlur) {
      const functionBluer = onBlur.function
      functionBluer()

    }
  }

  return (
    <div className="text-left w-full">
      <label>{children}</label>
      <input onBlur={onBlurFunction} onChange={onChangeHandler} type={type} value={value} className="w-full rounded-md py-1 px-2"></input>
    </div>
  )
}


