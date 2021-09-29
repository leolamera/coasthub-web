import { useState } from 'react'

export default function ButtonSelect({ selected }) {

    const [internalValue, setInternalValue] = useState(selected.value)
  
    function setValueHandle(event) {
      const { id } = event.target
      const formFunction = selected.function
  
      setInternalValue(id)
      formFunction(id)
    }
  
    return (
      <div className="flex flex-row  text-xl bg-gray-200 px-3 py-2 md:mx-40 justify-center rounded-xl">
        <button
          className={internalValue === "client" ? "bg-purple-400 px-5 py-4 text-center rounded-xl w-30" : "px-5 py-4 text-center rounded-xl w-30"}
          onClick={setValueHandle}
          id="client"
        >
          Cliente
        </button>
        <button
          className={internalValue === "bussines" ? "bg-purple-400 px-5 py-4 text-center rounded-xl w-30" : "px-5 py-4 text-center rounded-xl w-30"}
          onClick={setValueHandle}
          id="bussines"
        >
          Empresa
        </button>
      </div>
    )
  }