import { lazy, useEffect } from "react";
import DocumentTabs from "@/components/document-tabs";
import { useNavContext } from "@/hooks/use-nav";
const EncodedList = lazy(() => import("./components/encoded-list"));
const ForwardedList = lazy(() => import("./components/forwarded-list"));
const AllList = lazy(() => import("./components/all-list"));

export default function DocumentsIndex() {
  const { dispatch: navDispatch } = useNavContext();
  const tabs = [
    { path: "encoded", label: "Encoded", component: <EncodedList /> },
    { path: "forwarded", label: "Forwarded", component: <ForwardedList /> },
    { path: "all", label: "All", component: <AllList /> },
  ]

  useEffect(() => {
    navDispatch({ type: "HIDE_BACK_BUTTON" });

  }, [])
  return (
    <DocumentTabs tabs={tabs} />
  )
}
