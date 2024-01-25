import { useForm } from "../hooks/useForm"
import useAccess from "../hooks/useAccess";
import { Link } from "react-router-dom";

export default function Login() {
    const {formState,inputChange} = useForm({correo:"",password: ""});
    const {loggearse} = useAccess()


    const enviar = (event)=>{
        event.preventDefault();
        loggearse(formState);
    }
  return (
    <div className="min-h-screen hero bg-base-200">
    <div className="flex-col gap-0 hero-content lg:flex-row-reverse">
    <img src="https://as1.ftcdn.net/v2/jpg/02/79/60/64/1000_F_279606416_Qj70VYvzUnm65QtThfujOcmpN6WXv3qC.jpg" alt="" className="w-96 h-[19.84rem]"/>
      <div className="w-full max-w-sm rounded-none shadow-2xl card shrink-0 bg-base-100">
        <form className="card-body ">
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
            <button className="btn btn-primary" onClick={enviar}>Login</button>
            
          </div>
          <Link to={"/"} className="w-full text-center">Registrarse</Link>
        </form>
      </div>


    </div>
  </div>
  )
}
