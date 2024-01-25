import { Link } from 'react-router-dom'



export default function JoinTeam() {
  return (
    <div className='w-full mt-4'>
        <h2 className='w-full text-center'>Unirme a un equipo</h2>
        <div className='flex mt-2 justify-evenly gap-x-4'>
            <Link to={"/rooms/1"} className='btn btn-outline btn-primary'>Unirme a una sala 1</Link>
            <Link to={"/rooms/2"} className='btn btn-outline btn-primary'>Unirme a una sala 2</Link>
            <Link to={"/rooms/3"} className='btn btn-outline btn-primary'>Unirme a una sala 3</Link>
        </div>
    </div>
  )
}