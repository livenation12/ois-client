import React, { createContext, useReducer } from "react"

export const NavContext = createContext<NavContextType | null>(null);

type NavReducerAction =
     | { type: "SET_CONTENT"; payload: React.ReactNode }
     | { type: "UNINCLUDE_BREADCRUMB" }
     | { type: "SET_TOOLSET"; payload: React.ReactNode }
     | { type: "HIDE_BACK_BUTTON" };


interface NavReducerState {
     content: React.ReactNode
     toolset: {
          content: React.ReactNode
          isBackButtonUsed: boolean
     }
     breadcrumb: boolean
}

export interface NavContextType {
     state: NavReducerState;
     dispatch: React.Dispatch<NavReducerAction>;
}


const reducer = (state: NavReducerState, action: NavReducerAction) => {
     switch (action.type) {
          case "SET_CONTENT":
               return {
                    ...state,
                    content: action.payload,
               };
          case "UNINCLUDE_BREADCRUMB":
               return {
                    ...state,
                    breadcrumb: false,
               };
          case "SET_TOOLSET":
               return {
                    ...state,
                    toolset: {
                         ...state.toolset,
                         content: action.payload
                    }
               }
          case "HIDE_BACK_BUTTON":
               return {
                    ...state,
                    toolset: {
                         ...state.toolset,
                         isBackButtonUsed: false
                    }
               }
          default:
               return state;
     }
}

const initialState = {
     content: null,
     breadcrumb: true,
     toolset: {
          content: null,
          isBackButtonUsed: true
     }

}

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
     const [state, dispatch] = useReducer(reducer, initialState);
     return (
          <NavContext value={{ state, dispatch }}>
               {children}
          </NavContext >
     )
}