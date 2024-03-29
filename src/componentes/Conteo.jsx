
import useLongPolling from '../hooks/UseLongPoll'
export default function Conteo() {
    const data = useLongPolling('http://localhost:8000/conexion');
  return (
    <>
     <div className="stats shadow shadow-primary w-[12rem]">
  
  <div className="stat">
    <div className="stat-title">usuarios conectados</div>
    <div className="stat-value">

        {data ? data.totalAlumnos : 1}
    </div>

  </div>
  
</div>
    </>
   
  )
}
