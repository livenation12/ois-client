import DocumentDialog from "@/features/documents/components/document-dialog";
import { createContext, lazy, Suspense, useReducer } from "react";

interface GlobalState {
     messages: string[];
     unreadCount: number;
     document: {
          openDialog: boolean;
          newDocumentCount: number
     }
}

type GlobalReducerAction =
     | { type: "ADD_NOTIF"; payload: string }
     | { type: "MARK_AS_READ" }
     | { type: "MARK_ALL_AS_READ" }
     | { type: "SET_UNREAD_COUNT", payload: number }
     | { type: "OPEN_DOCUMENT_DIALOG" }
     | { type: "TOGGLE_DOCUMENT_DIALOG" }
     | { type: "NEW_DOCUMENT_ADDED" }

type GlobalContextType = {
     state: GlobalState
     dispatch: React.Dispatch<GlobalReducerAction>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);


const reducer = (state: GlobalState, action: GlobalReducerAction) => {
     switch (action.type) {
          case 'ADD_NOTIF':
               return {
                    ...state,
                    messages: [...state.messages, action.payload],
                    unreadCount: state.unreadCount + 1,
               };
          case 'SET_UNREAD_COUNT':
               return {
                    ...state,
                    unreadCount: action.payload,
               };
          case 'MARK_ALL_AS_READ':
               return {
                    ...state,
                    unreadCount: 0,
               };
          case 'TOGGLE_DOCUMENT_DIALOG':
               return {
                    ...state,
                    document: {
                         ...state.document,
                         openDialog: !state.document.openDialog
                    }
               }
          case 'NEW_DOCUMENT_ADDED':
               return {
                    ...state,
                    document: {
                         ...state.document,
                         newDocumentCount: state.document.newDocumentCount++
                    }
               }
          default:
               return state;
     }
}

const initialState: GlobalState = {
     messages: [],
     unreadCount: 0,
     document: {
          openDialog: false,
          newDocumentCount: 0
     }
}

const DocusmentDialog = lazy(() => import("@/features/documents/components/document-dialog"))

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
     const [state, dispatch] = useReducer(reducer, initialState);

     const setOpen = () => {
          dispatch({ type: 'TOGGLE_DOCUMENT_DIALOG' });
     };
     
     return (
          <>
               <GlobalContext value={{ state, dispatch }}>
                    <Suspense fallback={null}>
                         <DocusmentDialog open={state.document.openDialog} setOpen={setOpen} />
                    </Suspense>
                    {children}
               </GlobalContext>
          </>
     )
}

export default GlobalContext;