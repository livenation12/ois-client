import MainLayout from "@/components/layout/main-layout";
import Login from "@/features/auth/Login";
import DocumentsIndex from "@/features/documents/document-index";
import { createBrowserRouter } from "react-router-dom";
import Register from "@/features/auth/Register";
import NotFound from "@/features/not-found";
import { rootLoader } from "./root-loader";
import InboxIndex from "@/features/inbox/inbox-index";
import InboxLayout from "@/features/inbox/layouts/inbox.layout";
import OfficeInbox from "@/features/inbox/office-inbox";
import DocumentDetails, { documentDetailsLoader } from "@/features/documents/document-details";
import AuthProvider from "./contexts/auth-context";
import { DocumentProvider } from "@/features/documents/contexts/document-context";
import NotReady from "@/features/not-ready";
import HomeIndex from "@/features/home/home-index";
import { GlobalProvider } from "./contexts/global-context";
import RoutingsIndex from "@/features/documents/routings/routings-index";
import DocumentsLayout from "@/features/documents/layout/documents.layout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element:
      <AuthProvider>
        <GlobalProvider>
          <MainLayout />
        </GlobalProvider>
      </AuthProvider>,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomeIndex />
      },
      {
        path: "documents",
        element: <DocumentProvider />,
        children: [
          {
            element: <DocumentsLayout />,
            children: [
              {
                index: true,
                element: <DocumentsIndex />,
              },
              {
                path: "",
                element: <DocumentsIndex />,
              },
            ]
          },
          {
            path: "routings",
            element: <RoutingsIndex />,
          },
          {
            path: ":documentId",
            loader: documentDetailsLoader,
            element: <DocumentDetails />,
          }
        ]
      },
      {
        path: "inbox",
        element: <InboxLayout />,
        children: [
          {
            index: true,
            element: <InboxIndex />,
          },
          {
            path: "personal",
            element: <InboxIndex />,
          },
          {
            path: "office",
            element: <OfficeInbox />,
          },
          {
            path: "documents/:documentId",
            loader: documentDetailsLoader,
            element: <DocumentDetails />,
          },
        ]
      },
      {
        path: "manage",
        element: <div>Manage</div>
      },
      {
        path: "settings",
        element: <NotReady />
      },
      {
        path: "calendar",
        element: <NotReady />
      },

    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;