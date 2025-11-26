import useFetch from "@/hooks/use-fetch"
import { getForwardedDocuments } from "../services/document.service";
import type { Document } from "@/types/document.types";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";

export default function ForwardedList() {
  const { data, loading } = useFetch<Document[]>(getForwardedDocuments, { auto: true });
  return (
    <DocumentList data={data} loading={loading}>
      <DocumentItemActionGroupMenu />
    </DocumentList>

  )
}
