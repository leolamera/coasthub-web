import { useState } from 'react'
import * as animationData from '../../public/email.json'
export default function FormInputBussines({ step, data }) {

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