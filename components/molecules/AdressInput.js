

export default function AdressInputs({ data }) {

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
                    <InputLabels id="cep" data={data} value={data.value['state']} type="cpf">
                        Estado
                    </InputLabels>
                    <InputLabels id="cep" data={data} value={data.value['city']} type="cpf">
                        Cidade
                    </InputLabels>
                    <InputLabels id="cep" data={data} value={data.value['adress']} type="cpf">
                        Logradouro
                    </InputLabels>
                    <InputLabels id="cep" data={data} type="cpf">
                        Numero
                    </InputLabels>
                    <InputLabels id="cep" data={data} type="cpf">
                        Complemento
                    </InputLabels>
                </div>
            )}
        </div>
    )
}