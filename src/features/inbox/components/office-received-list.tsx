import useFetch from "@/hooks/use-fetch"

import { getOfficeReceivedDocuments } from "../services/office-inbox.service";
import DocumentForwardDialog from "@/features/documents/components/document-forward-dialog";
import { useState } from "react";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";

import { DocumentActionType, type Document } from "@/types/document.types";
import RoutingSlipDialog from "./routing-slip-dialog";
import RevertDialog from "./revert-dialog";
import { Forward } from "lucide-react";

interface Dialogs {
  open?: string | null;
  documentId: string;
}

const dialogs: Dialogs = {
  open: undefined,
  documentId: ''
}

const forwardAction = { label: 'Forward', icon: Forward, action: 'forward' };
const enabledItems = [
  DocumentActionType.FORWARD,
  DocumentActionType.ATTACH_ROUTING,
  DocumentActionType.REVERT
]

export default function OfficeReceivedList() {
  const [openDialog, setOpenDialog] = useState(dialogs);
  const { data, loading } = useFetch<Document[]>(getOfficeReceivedDocuments, { auto: true });

  const handleActionMenuClick = (id: string, menu: string) => {
    setOpenDialog({
      open: menu,
      documentId: id
    });
  }

  const handleDialogOpenChange = (open: boolean, dialog: string) => {
    const documentId = open ? openDialog.documentId : '';
    setOpenDialog({
      open: open ? dialog : null,
      documentId
    })
  }

  return (
    <>
      <DocumentList data={data} loading={loading}>
        <DocumentItemActionGroupMenu enabledItems={enabledItems} onActionMenuClick={handleActionMenuClick} primaryActionButton={forwardAction} />
      </DocumentList>

      <DocumentForwardDialog
        open={openDialog.open === DocumentActionType.FORWARD}
        setOpen={(open) => handleDialogOpenChange(open, DocumentActionType.FORWARD)}
        documentId={openDialog.documentId}
      />

      <RoutingSlipDialog
        open={openDialog.open === DocumentActionType.ATTACH_ROUTING}
        setOpen={(open) => handleDialogOpenChange(open, DocumentActionType.ATTACH_ROUTING)}
        documentId={openDialog.documentId}
      />

      <RevertDialog 
        open={openDialog.open === DocumentActionType.REVERT} 
        setOpen={(open) => handleDialogOpenChange(open, DocumentActionType.REVERT)} 
        documentId={openDialog.documentId} />
    </>
  )
}
