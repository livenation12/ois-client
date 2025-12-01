import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import { getOfficeRevertedDocuments } from "@/features/documents/services/document.service";
import useFetch from "@/hooks/use-fetch";

export default function OfficeRevertedList() {
       const { data, loading, refresh } = useFetch(getOfficeRevertedDocuments, { auto: true });
  return (
          <DocumentList data={data} loading={loading}>
            <DocumentItemActionGroupMenu
            />
          </DocumentList>
  )
}
