import Authorization from '~/components/authorization/authorization';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

export default function SignUpRoute() {
  return (
    <ProtectedRoute>
      <Authorization />
    </ProtectedRoute>
  );
}
