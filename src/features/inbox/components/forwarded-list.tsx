import useFetch from "@/hooks/use-fetch"
import { type Document } from "@/types/document.types";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import { getUserForwardedDocuments } from "../services/inbox.service";

export default function ForwardedList() {
  const { data, loading } = useFetch<Document[]>(getUserForwardedDocuments, { auto: true });


  return (
    <>
      <DocumentList data={data} loading={loading}>
        <DocumentItemActionGroupMenu />
      </DocumentList>
    </>
  )
}
