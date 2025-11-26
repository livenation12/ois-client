import { lazy, useEffect, useState } from "react";
import DocumentDialog from "./components/document-dialog";
import DocTabs from "@/components/doc-tabs";
import { useNavContext } from "@/hooks/use-nav";
const EncodedList = lazy(() => import("./components/encoded-list"));
const ForwardedList = lazy(() => import("./components/forwarded-list"));
const AllList = lazy(() => import("./components/all-list"));

export default function DocumentsIndex() {
  const [openDialog, setOpenDialog] = useState(false);
  const { dispatch, state } = useNavContext();


  useEffect(() => {
    dispatch({ type: 'HIDE_BACK_BUTTON' })
  }, [state.toolset.isBackButtonUsed]);

  const tabs = [
    { path: "encoded", label: "Encoded", component: <EncodedList /> },
    { path: "forwarded", label: "Forwarded", component: <ForwardedList /> },
    { path: "all", label: "All", component: <AllList /> },
  ]

  return (
    <div>
      <DocTabs tabs={tabs} />
      <DocumentDialog open={openDialog} setOpen={setOpenDialog} />

    </div>
  )
}
