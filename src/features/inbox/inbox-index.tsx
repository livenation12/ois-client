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
  ]
  return (
    <>
      {/* <Tabs defaultValue="office-inbox">
        <div className="flex items-center justify-between">
          <TabsList className="*:min-w-32">
            <TabsTrigger value="office-inbox">Office Inbox</TabsTrigger>
            <TabsTrigger value="my-inbox">My Inbox</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="office-inbox"></TabsContent>
        <TabsContent value="my-inbox">Change your password here.</TabsContent>
      </Tabs> */}
      <DocTabs tabs={tabs} />

    </>
  )
}
