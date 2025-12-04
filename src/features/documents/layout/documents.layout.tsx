
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import useGlobal from '@/hooks/use-global';
import { FilePlus } from 'lucide-react';

export default function DocumentsLayout() {
  const { dispatch: globalDispatch } = useGlobal();

  return (
    <>
      <Topbar content='Documents' toolset={<Button onClick={() => globalDispatch({ type: 'TOGGLE_DOCUMENT_DIALOG' })}><FilePlus /> New Document</Button>} />
      <div className='main-content'>
        <Outlet />
      </div>
    </>
  )
}


