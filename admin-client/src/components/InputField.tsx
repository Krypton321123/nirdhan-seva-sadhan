interface inputFieldInterface {
    label: string, 
    placeholder: string
}

const InputField = ({label="Email", placeholder="Email"}: inputFieldInterface) => {
  return (
    <div className='w-16 h-24'>
        <label className='text-[#b4b9c2]'>{label}</label>
        <input type='text' placeholder={placeholder} className='text-lg mt-2 border-b-2 pb-2 focus:border-slate-950 focus:outline-none'></input>
    </div>
  )
}

export default InputField