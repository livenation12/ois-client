import { lazy } from "react";
import DocTabs from "@/components/doc-tabs";

const OfficePendingList = lazy(() => import("./components/office-pending-list"));
const OfficeReceivedList = lazy(() => import("./components/office-received-list"));
const OfficeForwardedList = lazy(() => import("./components/office-forwarded-list"));

export default function OfficeInbox() {
     const tabs = [
          { path: "pending", label: "Pending", component: <OfficePendingList /> },
          { path: "received", label: "Received", component: <OfficeReceivedList /> },
          { path: "forwarded", label: "Forwarded", component: <OfficeForwardedList /> },
          { path: "reverted", label: "Reverted", component: <OfficeForwardedList /> },
     ]
     return (
          <>
               <DocTabs tabs={tabs} />
          </>
     )
}
