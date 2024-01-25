import { useForm } from "../hooks/useForm"
import useRegistration from "../hooks/userRegistration";
import { Link } from "react-router-dom";


export default function Register() {

    const {formState,inputChange} = useForm({correo:"",password: ""});
   const {registrar} = useRegistration();
    const enviar = (event)=>{
        event.preventDefault();
        registrar(formState);

    }
  return (
    <div className="min-h-screen hero bg-base-200">
    <div className="flex-col hero-content lg:flex-row-reverse">

      <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Correo</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required name="correo" onChange={inputChange}/>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" required name="password" onChange={inputChange} />
        
          </div>
          <div className="mt-6 form-control">
            <button className="btn btn-primary" onClick={enviar}>Registrar</button>
          </div>
          <Link to={"/login"} className="w-full text-center">Logearse</Link>
        </form>
      </div>
    </div>
  </div>
  )
}
