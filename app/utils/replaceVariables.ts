import {Variable} from '~/components/VariablesEditor/models/variable';

export const replaceVariables = (body: string, variables: Variable[]): string => {
  const variableMap: Record<string, string> = variables.reduce(
    (acc, variable) => {
      if (variable.checked) {
        acc[variable.name] = variable.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return body.replace(/{{(.*?)}}/g, (_, variable) => {
    if (variableMap[variable] === undefined) throw new ReferenceError('Non-existent or inactive variable');
    return `${variableMap[variable]}`;
  });
};

export const replaceJsonVariables = (body: string, variables: Variable[]): string => {
  const variableMap: Record<string, string> = variables.reduce(
    (acc, variable) => {
      if (variable.checked) {
        acc[variable.name] = variable.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return body.replace(/{{(.*?)}}/g, (_, variable) => {
    if (variableMap[variable] === undefined) throw new ReferenceError('Non-existent or inactive variable');
    return `"${variableMap[variable]}"`;
  });
};
