import DocTabs from "@/components/doc-tabs";
import { lazy } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PendingList = lazy(() => import("./components/pending-list"));
const ReceivedList = lazy(() => import("./components/received-list"));
const ForwardedList = lazy(() => import("./components/forwarded-list"));

export default function InboxIndex() {
  const tabs = [
    { path: "pending", label: "Pending", component: <PendingList /> },
    { path: "received", label: "Received", component: <ReceivedList /> },
    { path: "forwarded", label: "Forwarded", component: <ForwardedList /> },
    { path: "reverted", label: "Reverted", component: <ForwardedList /> },
  ]
  return (
    <>
      <DocTabs tabs={tabs} />
    </>
  )
}
