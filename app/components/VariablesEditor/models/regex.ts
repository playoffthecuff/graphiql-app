const variableNamePattern = new RegExp(/^[A-Za-z_][A-Za-z0-9_]*$/);
const variableValuePattern = new RegExp(/^.*$/);
const queryParamNamePattern = new RegExp(/^[A-Za-z0-9._~-]+$/);
const queryParamValuePattern = new RegExp(/^[A-Za-z0-9._~-]+$/);

export {variableNamePattern, variableValuePattern, queryParamNamePattern, queryParamValuePattern};
