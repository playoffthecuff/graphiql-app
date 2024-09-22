import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';
import {GraphiqlRequest} from '../components/GraphiqlClient/GraphiqlClientRequest';

export default function GraphqlRoute() {
  return (
    <ProtectedRoute>
      <GraphiqlRequest />
    </ProtectedRoute>
  );
}
