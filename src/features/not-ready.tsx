
import NotReadyIcon from '@/assets/not-ready.svg'
export default function NotReady() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:text-lg lg:text-2xl text-muted-foreground">This page is not ready yet</div>
      <div className="w-[40%] pb-5 flex flex-col justify-center items-center relative">
        <img src={NotReadyIcon} alt="Not ready yet" />
      </div>
    </div>

  )
}
