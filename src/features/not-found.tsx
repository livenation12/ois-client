import { Button } from '@/components/ui/button'
import Icon404 from '../assets/404.svg'
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[40%] pb-5 flex flex-col justify-center items-center relative">
        <img src={Icon404} alt="404" />
        <Link to="/">
          <Button size="lg" className='absolute bottom-8 left-1/2 -translate-x-1/2'>
            <Home /> Go home
          </Button>
        </Link>
      </div>
    </div>
  )
}