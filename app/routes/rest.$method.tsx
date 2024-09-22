import {Outlet} from '@remix-run/react';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';
import RestClient from '~/components/RESTfullClient/RestClient/RestClient';

export function ErrorBoundary() {
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message="You can start over" />
    </ErrorBoundaryWrapper>
  );
}

export default function RESTMethodRoute() {
  return (
    <ProtectedRoute>
      <RestClient>
        <Outlet />
      </RestClient>
    </ProtectedRoute>
  );
}
