import { Skeleton } from './ui/skeleton'

export default function NotifListSkeleton() {
     return (
          <div className="flex flex-col items-center gap-3">
               {Array.from({ length: 8 }).map((_, index) => (
                    <div className="flex gap-2 w-full" key={index}>
                         <Skeleton className="size-8 rounded-full" />
                         <Skeleton className="flex-grow" />
                    </div>
               ))}
          </div>
     )
}
