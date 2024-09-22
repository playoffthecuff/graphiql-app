import {History} from '~/components/History';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

export default function HistoryRoute() {
  return (
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  );
}
