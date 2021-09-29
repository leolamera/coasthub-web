

export default function InputLabels({ children, type, data, id, onBlur, value }) {

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
            // insert mask in inputs
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