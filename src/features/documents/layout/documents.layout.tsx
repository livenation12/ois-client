import { Button } from '@/components/ui/button';
import { useNavContext } from '@/hooks/use-nav';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DocumentDialog from '../components/document-dialog';
import { useDocumentContext } from '../contexts/document-context';

export default function DocumentsLayout() {
  const [openDialog, setOpenDialog] = useState(false);
  const { dispatch } = useNavContext();
  const { dispatch: dispatchDocument } = useDocumentContext();

  useEffect(() => {
    dispatch({
      type: 'SET_CONTENT', payload: <span className=''>Documents</span>
    });
    dispatch({
      type: "SET_TOOLSET", payload: (
        <div className='flex gap-2'>
          <Button onClick={() => setOpenDialog(true)}>Add Document</Button>
        </div>
      )
    })
  }, []);

  const handleDocumentCreate = () => {
    dispatchDocument({ type: 'REFRESH_RECEIVED_LIST' });
  }
  return (
    <>
      <DocumentDialog open={openDialog} setOpen={setOpenDialog} onDocumentCreate={handleDocumentCreate} />
      <Outlet />
    </>
  )
}
