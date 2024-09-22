type ContentObject = {
  json: string;
  error: SyntaxError | null;
};

export default function prettifyJson(json: string): ContentObject {
  try {
    return {json: JSON.stringify(JSON.parse(json), null, 2), error: null};
  } catch (e: unknown) {
    if (e instanceof SyntaxError) return {json: '', error: e};
    return {json: '', error: null};
  }
}
