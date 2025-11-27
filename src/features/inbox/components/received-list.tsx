import useFetch from "@/hooks/use-fetch"
import { DocumentActionType, type Document, type DocumentActionDialog } from "@/types/document.types";
import { Forward } from "lucide-react";
import DocumentList, { DocumentItemActionGroupMenu } from "@/components/document-list";
import { getUserReceivedDocuments } from "../services/inbox.service";
import DocumentForwardDialog from "@/features/documents/components/document-forward-dialog";
import { useState } from "react";
import RoutingSlipDialog from "./routing-slip-dialog";
import RevertDialog from "./revert-dialog";

const dialogs: DocumentActionDialog = {
  open: undefined,
  documentId: ''
}

const forwardAction = { label: 'Forward', icon: Forward, action: DocumentActionType.FORWARD };

export default function ReceivedList() {
  const [openDialog, setOpenDialog] = useState(dialogs);
  const { data, loading, refresh } = useFetch<Document[]>(getUserReceivedDocuments, { auto: true });

  const handleMenuClick = (id: string, menu: string) => {
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
        <DocumentItemActionGroupMenu
          enabledItems={[DocumentActionType.ATTACH_ROUTING, DocumentActionType.REVERT]}
          primaryActionButton={forwardAction}
          onActionMenuClick={handleMenuClick}
        />
      </DocumentList>

      <DocumentForwardDialog
        open={openDialog.open === DocumentActionType.FORWARD}
        setOpen={(open) => handleDialogOpenChange(open, DocumentActionType.FORWARD)}
        documentId={openDialog.documentId}
        onForward={() => refresh()}
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
