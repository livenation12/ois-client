import { createContext, useReducer } from "react";

interface NotifState {
     messages: string[];
     unreadCount: number;
}

type NotifReducerAction =
     | { type: "ADD_NOTIF"; payload: string }
     | { type: "MARK_AS_READ" }
     | { type: "SET_UNREAD_COUNT", payload: number }

type NotifContextType = {
     state: NotifState
     dispatch: React.Dispatch<NotifReducerAction>;
}

const NotifContext = createContext<NotifContextType | null>(null);


const reducer = (state: NotifState, action: NotifReducerAction) => {
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
          default:
               return state;
     }
}

const initialState: NotifState = {
     messages: [],
     unreadCount: 0,
}

export const NotifProvider = ({ children }: { children: React.ReactNode }) => {
     const [state, dispatch] = useReducer(reducer, initialState)
     return (
          <NotifContext value={{ state, dispatch }}>
               {children}
          </NotifContext>
     )
}

export default NotifContext;