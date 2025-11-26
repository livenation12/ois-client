import useFetch from "@/hooks/use-fetch"
import { DocumentActionType, type Document } from "@/types/document.types";
import { MailCheck } from "lucide-react";

import { getOfficePendingDocuments, doReceiveOfficePendingDocument } from "../services/office-inbox.service";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";



export default function OfficePendingList() {
  const { data, loading, refresh } = useFetch<Document[]>(getOfficePendingDocuments, { auto: true });
  const { execute, loading: receiving } = useFetch(doReceiveOfficePendingDocument, {
    onSuccess: (res) => {
      if (res.success) {
        refresh();
      }
    }
  });

  const receiveAction = { label: 'Receive', icon: MailCheck, action: 'receive' };

  const handleReceiveClick = (id: string, menu: string) => {
    if (menu === DocumentActionType.RECEIVE) {
      execute(id);
    }
  }

  return (
    <>
      <DocumentList data={data} loading={loading}>
        <DocumentItemActionGroupMenu
          onActionMenuClick={handleReceiveClick}
          primaryActionButton={receiveAction}
          primaryActionProps={{ loading: receiving, loadingText: 'Receiving...' }} />
      </DocumentList>
    </>
  )
}
