import { Skeleton } from "./ui/skeleton";

export default function ListSkeleton() {
     return (
          <div className="flex flex-col items-center gap-3">
               {Array.from({ length: 3 }).map((_, index) => (

                    <div className="border rounded-md w-full p-3" key={index}>
                         <div className="space-y-2">
                              <div className="inline-flex gap-2">
                                   <Skeleton className="h-4 w-[100px]" />
                                   <Skeleton className="h-4 w-[150px]" />
                              </div>
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-12 w-full" />
                              <div className="inline-flex gap-2">
                                   <Skeleton className="size-8 rounded-full" />
                                   <Skeleton className="w-[200px]" />
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     )
}
