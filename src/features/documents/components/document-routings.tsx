import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { getDocumentRoutings } from "../services/document.service";

export default function DocumentRoutings({ documentId }: { documentId: string }) {
     const { data } = useFetch(getDocumentRoutings, { auto: true, params: [documentId] });


     return (
          <Card>
               <CardHeader>
                    <CardTitle>Routings</CardTitle>
               </CardHeader>
               <CardContent>
                    <div className="space-y-4 grid md:grid-cols-2 lg:grid-cols-4">
                         {data?.map((routing) => (
                              <section className="flex flex-col rounded-sm border" key={routing.id}>
                                   <div className="w-full border-b-1 p-2 min-h-10">
                                        <h6 className="font-semibold">{routing.docTin}</h6>
                                   </div>
                                   <div className="p-2">
                                        <p>{routing.subject}</p>
                                   </div>
                              </section>
                         ))}
                    </div>
               </CardContent>
          </Card>
     )
}
