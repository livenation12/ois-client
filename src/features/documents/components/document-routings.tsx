import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemHeader, } from "@/components/ui/item";
import { Avatar } from "@/components/ui/avatar";
import useFetch from "@/hooks/use-fetch";
import { getDocumentRoutings } from "../services/document.service";

export default function DocumentRoutings({ documentId }: { documentId: string }) {
     const { data } = useFetch(getDocumentRoutings, { auto: true, params: [documentId] });
     console.log(data);

     return (
          <Card>
               <CardHeader>
                    <CardTitle>Routings</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                    {
                         <Item>
                              <ItemHeader>
                                   <Avatar>

                                   </Avatar>
                              </ItemHeader>
                         </Item>
                    }
               </CardContent>
          </Card>
     )
}
