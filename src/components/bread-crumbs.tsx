import { Link, useLocation } from "react-router-dom";
import {
     Breadcrumb,
     BreadcrumbItem,
     BreadcrumbLink,
     BreadcrumbList,
     BreadcrumbPage,
     BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
     const location = useLocation();
     const pathnames = location.pathname.split("/").filter(Boolean);

     return (
          <Breadcrumb>
               <BreadcrumbList>
                    <BreadcrumbItem>
                         <BreadcrumbLink asChild>
                              <Link to="/">Home</Link>
                         </BreadcrumbLink>
                    </BreadcrumbItem>

                    {pathnames.map((segment, index) => {
                         const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                         const isLast = index === pathnames.length - 1;

                         return (
                              <div key={routeTo} className="flex items-center gap-2">
                                   <BreadcrumbSeparator />
                                   <BreadcrumbItem>
                                        {isLast ? (
                                             <BreadcrumbPage className="capitalize">
                                                  {segment.replace(/-/g, " ")}
                                             </BreadcrumbPage>
                                        ) : (
                                             <BreadcrumbLink asChild>
                                                  <Link
                                                       to={routeTo}
                                                       className="capitalize"
                                                  >
                                                       {segment.replace(/-/g, " ")}
                                                  </Link>
                                             </BreadcrumbLink>
                                        )}
                                   </BreadcrumbItem>
                              </div>
                         );
                    })}
               </BreadcrumbList>
          </Breadcrumb>
     );
}
