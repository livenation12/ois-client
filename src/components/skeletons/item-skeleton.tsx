import { Skeleton } from '../ui/skeleton'

export default function ItemSkeleton({ length = 5 }: { length?: number }) {
     return (
          <div className="flex flex-col items-center gap-3">
               {Array.from({ length }).map((_, index) => (

                    <div className="border rounded-md w-full p-3" key={index}>
                         <div className="space-y-2">
                              <div className="inline-flex gap-2">
                                   <Skeleton className="h-6 w-[50px]" />
                                   <Skeleton className="h-6 w-[50px]" />
                              </div>
                              <div className='flex justify-between'>
                                   <Skeleton className="h-8 w-[250px]" />
                                   <Skeleton className="float-end h-8 w-[30px]" />
                              </div>
                              <div className="flex justify-between gap-2">
                                   <Skeleton className="h-4 w-[150px]" />
                                   <Skeleton className="h-4 w-[50px]" />
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     )
}
