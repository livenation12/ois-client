import DocumentTabs from '@/components/document-tabs';
import { lazy } from 'react';
import RevertedList from './components/reverted-list';

const PendingList = lazy(() => import('./components/pending-list'));
const ReceivedList = lazy(() => import('./components/received-list'));
const ForwardedList = lazy(() => import('./components/forwarded-list'));

const tabs = [
  { path: 'pending', label: 'Pending', component: <PendingList /> },
  { path: 'received', label: 'Received', component: <ReceivedList /> },
  { path: 'forwarded', label: 'Forwarded', component: <ForwardedList /> },
  { path: 'reverted', label: 'Reverted', component: <RevertedList /> },
]

export default function InboxIndex() {
  return (
    <DocumentTabs tabs={tabs} />
  )
}

