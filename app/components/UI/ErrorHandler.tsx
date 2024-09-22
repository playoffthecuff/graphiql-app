import React, {useEffect, useRef} from 'react';
import {toast} from 'react-toastify';

interface Errors {
  [key: string]: string;
}

interface Props {
  errors: Errors;
  clearError: (name: string) => void;
}

const ErrorHandler: React.FC<Props> = ({errors, clearError}) => {
  const prevErrorsRef = useRef(errors);

  useEffect(() => {
    if (errors !== prevErrorsRef.current) {
      const lastErrorKey = Object.keys(errors).pop();
      if (lastErrorKey && errors[lastErrorKey]) {
        toast.error(errors[lastErrorKey], {
          onClose: () => clearError(lastErrorKey),
        });
      }
      prevErrorsRef.current = errors;
    }
  }, [errors, clearError]);

  return null;
};

export default ErrorHandler;
