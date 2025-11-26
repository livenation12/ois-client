import useFetch from "@/hooks/use-fetch"
import { getCreatedDocuments } from "../services/document.service";
import type { Document } from "@/types/document.types";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";

export default function AllList() {
     const { data, loading } = useFetch<Document[]>(getCreatedDocuments, {
          auto: true,
     });


     return (
          <DocumentList data={data} loading={loading}>
               <DocumentItemActionGroupMenu />
          </DocumentList>
     )
}
