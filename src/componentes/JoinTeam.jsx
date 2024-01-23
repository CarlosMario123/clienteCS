import { Link } from 'react-router-dom'



export default function JoinTeam() {
  return (
    <div className='w-full mt-4'>
        <h2 className='w-full text-center'>Unirme a un equipo</h2>
        <div className='flex mt-2 justify-evenly'>
            <Link to={"/rooms"} className='btn btn-outline btn-primary'>Unirme a una sala</Link>
      
        </div>
    </div>
  )
}