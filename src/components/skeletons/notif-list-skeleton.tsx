import { Skeleton } from '../ui/skeleton'

export default function NotifSkeleton({ length = 8 }: { length?: number }) {
     return (
          <div className="flex flex-col items-center gap-3">
               {Array.from({ length }).map((_, index) => (
                    <div className="flex gap-2 w-full" key={index}>
                         <Skeleton className="size-8 rounded-full" />
                         <div className="flex flex-col flex-grow gap-1">
                              <Skeleton className='w-full h-5'/>
                              <Skeleton className='w-3/5 h-5'/>
                         </div>
                    </div>
               ))}
          </div>
     )
}
