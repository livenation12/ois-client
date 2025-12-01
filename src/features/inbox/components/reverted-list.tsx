import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import { getUserRevertedDocuments } from "@/features/documents/services/document.service";
import useFetch from "@/hooks/use-fetch";

export default function RevertedList() {
       const { data, loading } = useFetch(getUserRevertedDocuments, { auto: true });
  return (
          <DocumentList data={data} loading={loading}>
            <DocumentItemActionGroupMenu
            />
          </DocumentList>
  )
}
