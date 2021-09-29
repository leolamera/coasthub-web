

export default function Stepper({ selected }) {

    return (
      <div>
        {
          selected.type.value === 'client' ? (
            <div className="flex justify-between px-2">
              <label className={selected.step.value === 1 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>1</label>
              <label className={selected.step.value === 2 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>2</label>
              <label className={selected.step.value === 3 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>3</label>
            </div>
          ) : (
            <div className="flex justify-between px-2">
              <label className={selected.step.value === 1 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>1</label>
              <label className={selected.step.value === 2 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>2</label>
              <label className={selected.step.value === 3 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>3</label>
              <label className={selected.step.value === 4 ? "text-xl bg-purple-400 py-1 px-3 rounded-full" : "text-xl py-1 px-3 rounded-full"}>4</label>
  
            </div>
          )
        }
      </div>
    )
  }