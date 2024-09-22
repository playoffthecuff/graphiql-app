import {useState} from 'react';

type ErrorDetail = {
  message: string;
};

type Errors = {
  [key: string]: ErrorDetail;
};

function useGraphqlErrors(initialErrors = {}) {
  const [errors, setErrors] = useState(initialErrors);

  const setError = (name: string, errorMessage: string) => {
    setErrors((prevErrors: Errors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const clearError = (name: string) => {
    setErrors((prevErrors: Errors) => {
      const errors = {...prevErrors};
      delete errors[name];
      return errors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
  };
}

export default useGraphqlErrors;
