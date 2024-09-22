type Variables = {
  [key: string]: number | string;
};

export function processGraphQLQuery(query: string, variablesString: string): string {
  let variables: Variables;
  try {
    variables = JSON.parse(variablesString);
    if (JSON.stringify(variables) !== '{}') {
      return query.replace(/(\w+):\s*\$(\w+)/g, (match, key, variableName) => {
        if (variableName in variables) {
          return `${key}: ${JSON.stringify(variables[variableName])}`;
        }
        return match;
      });
    } else {
      return query;
    }
  } catch (error) {
    if (error) {
      return query;
    }
  }
  return query;
}
