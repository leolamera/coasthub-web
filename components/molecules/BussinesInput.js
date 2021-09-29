

export default function BussinesInputs({ data }) {


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