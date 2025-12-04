import GlobalContext from '@/app/contexts/global-context';
import  { useContext } from 'react'

export default function useGlobal() {
     const context = useContext(GlobalContext);
     if (!context) {
          throw new Error("useGlobal must be used within a GlobalProvider.");
     }
     return context;
}
