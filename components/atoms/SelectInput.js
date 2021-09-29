

export default function SelectInput({ children, data, id, options, filters }) {



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