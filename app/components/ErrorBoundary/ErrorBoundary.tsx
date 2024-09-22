import {useRouteError, isRouteErrorResponse} from '@remix-run/react';
import {ReactNode, useState} from 'react';
import ErrorSnackbar from './ErrorSnackbar';

export function ErrorBoundaryWrapper(props: {children: ReactNode}) {
  const [open, setOpen] = useState(true);
  const handleChange = (v: boolean) => {
    setOpen(v);
  };
  const error = useRouteError();
  const message =
    isRouteErrorResponse(error) && error.statusText
      ? error.statusText
      : isRouteErrorResponse(error)
        ? error.data
        : error instanceof Error
          ? error.message
          : 'unknown error';
  return (
    <ErrorSnackbar title={message} isOpen={open} onChange={handleChange}>
      {props.children}
    </ErrorSnackbar>
  );
}
