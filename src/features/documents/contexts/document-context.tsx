import { createContext, useContext, useReducer } from "react";

interface DocumentReducerState {
     refresh: {
          all: number,
          received: number,
          forwarded: number
     }
}
interface DocumentContextType {
     state: DocumentReducerState,
     dispatch: React.Dispatch<DocumentReducerAction>
}

type DocumentReducerAction = { type: "REFRESH_ALL_LIST" } | { type: "REFRESH_RECEIVED_LIST" }



export const DocumentContext = createContext<DocumentContextType | null>(null);


const reducer = (state: DocumentReducerState, action: DocumentReducerAction) => {
     switch (action.type) {
          case "REFRESH_ALL_LIST":
               return {
                    ...state,
               };
          case "REFRESH_RECEIVED_LIST":
               return {
                    ...state,
                    refresh: {
                         ...state.refresh,
                         received: state.refresh.received + 1
                    }
               };
          default:
               return state;
     }
}

const initialState = {
     refresh: {
          all: 0,
          received: 0,
          forwarded: 0
     }
}

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
     const [state, dispatch] = useReducer(reducer, initialState);
     return <DocumentContext value={{ state, dispatch }}>{children}</DocumentContext>
}

export const useDocumentContext = () => {
     const context = useContext(DocumentContext);
     if (!context) {
          throw new Error("useDocument must be used within a DocumentProvider.");
     }
     return context;
}