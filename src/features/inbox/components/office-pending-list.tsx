import useFetch from "@/hooks/use-fetch"
import { DocumentActionType, type Document } from "@/types/document.types";
import { MailCheck } from "lucide-react";

import { getOfficePendingDocuments, doReceiveOfficePendingDocument } from "../services/office-inbox.service";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import { useState } from "react";



export default function OfficePendingList() {
    const [receivingItem, setReceivingItem] = useState<string | null>(null);
  
  const { data, loading, refresh } = useFetch<Document[]>(getOfficePendingDocuments, { auto: true });
  const { execute } = useFetch(doReceiveOfficePendingDocument, {
    onSuccess: (res) => {
      if (res.success) {
        refresh();
      }
    },
    onFinish: () => setReceivingItem(null)
  });

  const receiveAction = { label: 'Receive', icon: MailCheck, action: 'receive' };

  const handleReceiveClick = (id: string, menu: string) => {
    if (menu === DocumentActionType.RECEIVE) {
      execute(id);
    }
    setReceivingItem(id);
  }

  return (
    <>
      <DocumentList data={data} loading={loading}>
        <DocumentItemActionGroupMenu
          onActionMenuClick={handleReceiveClick}
          primaryActionButton={receiveAction}
          primaryActionProps={(id) => ({ loading: receivingItem ? id === receivingItem : false, loadingText: 'Receiving...' })} />
      </DocumentList>
    </>
  )
}
