import useFetch from "@/hooks/use-fetch";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import type { Document } from "@/types/document.types";
import { getOfficeForwardedDocuments } from "@/features/documents/services/document.service";


export default function OfficeForwardedList() {
  const { data, loading } = useFetch<Document[]>(getOfficeForwardedDocuments, { auto: true });

  return (
    <>
      <DocumentList data={data} loading={loading}>
        <DocumentItemActionGroupMenu />
      </DocumentList>
    </>
  )
}
