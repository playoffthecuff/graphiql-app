import Authorization from '~/components/authorization/authorization';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

export default function SignInRoute() {
  return (
    <ProtectedRoute>
      <Authorization />
    </ProtectedRoute>
  );
}
