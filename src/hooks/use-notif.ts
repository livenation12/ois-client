import NotifContext from '@/app/contexts/notif-context';
import  { useContext } from 'react'

export default function useNotif() {
     const context = useContext(NotifContext);
     if (!context) {
          throw new Error("useNotif must be used within a NotifProvider.");
     }
     return context;
}
