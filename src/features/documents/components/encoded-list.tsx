import { Forward } from "lucide-react";
import { useState } from "react"
import { getEncodedDocuments } from "../services/document.service";
import type { Document } from "@/types/document.types";
import DocumentForwardDialog from "./document-forward-dialog";

import useFetch from "@/hooks/use-fetch";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import { useDocumentContext } from "../contexts/document-context";
import useGlobal from "@/hooks/use-global";

export default function EncodedList() {
  const { state: globalState } = useGlobal();
  const { state, dispatch } = useDocumentContext();
  const { data, loading } = useFetch<Document[]>(getEncodedDocuments
    , {
      auto: true
      , dependencies: [
        state.refresh.received
        , globalState.document.newDocumentCount
      ]
    });
  const [openForwardDialog, setOpenForwardDialog] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState("");

  const forwardAction = { label: 'Forward', icon: Forward, action: 'forward' } as const;

  const handleDocumentForward = (id: string) => {
    setSelectedDocumentId(id);
    setOpenForwardDialog(true);
  }

  const handleDocumentForwading = () => {
    dispatch({ type: 'REFRESH_RECEIVED_LIST' });
  }

  const handleActionMenuClick = (id: string, menu: string) => {
    if (menu === 'forward') {
      handleDocumentForward(id);
    }
  }

  return (
    <>
      <DocumentList data={data} loading={loading}>
        <DocumentItemActionGroupMenu onActionMenuClick={handleActionMenuClick} primaryActionButton={forwardAction} />
      </DocumentList>


      <DocumentForwardDialog
        open={openForwardDialog}
        setOpen={setOpenForwardDialog}
        documentId={selectedDocumentId}
        onForward={handleDocumentForwading}
      />

    </>
  )
}
