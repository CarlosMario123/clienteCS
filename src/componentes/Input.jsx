import React from 'react'

export default function InputB({value,onChange,onEnviar}) {
  return (
    <div className='flex px-1 gap-x-2'>
 <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" value={value} onChange={onChange}/>
 <button className="btn btn-active btn-primary w-16" onClick={onEnviar}>Enviar</button>
    </div>
   
  )
}
