type Variables = {
  [key: string]: number | string;
};

export function extractVariablesFromGraphQLQuery(query: string): {updatedQuery: string; variables: string} {
  const variablesObject: Variables = {};
  const variableDefinitionRegex = /\$([\w]+):\s*([\w!]+)/g;

  let match;
  while ((match = variableDefinitionRegex.exec(query)) !== null) {
    const variableName = match[1].toLowerCase();
    query = query.replace(new RegExp(`\\b${variableName}\\b`, 'g'), `${variableName}`);
    variablesObject[variableName] = '';
  }

  const updatedQuery = query.replace(/(\w+):\s*(\d+|"[^"]+")/g, (match, key, value) => {
    const variableName = key.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(variablesObject, variableName)) {
      variablesObject[variableName] = isNaN(Number(value)) ? value.replace(/"/g, '') : Number(value);
      return `${key}: $${variableName}`;
    }
    return match;
  });

  const variables = JSON.stringify(variablesObject);
  return {updatedQuery, variables};
}
