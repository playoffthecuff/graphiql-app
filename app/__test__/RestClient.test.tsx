import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {jest} from '@jest/globals';
import RestClient from '~/components/RESTfullClient/RestClient/RestClient';
import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import {useLocation, useNavigate} from '@remix-run/react';
import prettifyJson from '~/utils/prettifyJson';

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useState: jest.fn(),
}));

jest.mock('~/utils/prettifyJson', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('~/utils/replaceVariables', () => ({
  __esModule: true,
  replaceVariables: jest.fn(),
  replaceJsonVariables: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'page.rest.title': 'REST Client',
        'page.rest.placeholder': 'Enter URL',
        'page.rest.send': 'Send',
        'page.rest.setVariables': 'Set Variables',
        'page.rest.setHeaders': 'Set Headers',
        'editors.headersTitle': 'Headers',
        'editors.variablesTitle': 'Variables',
        'editors.queryTitle': 'Query',
        'editors.bodyTitle': 'Body',
        'jsonEditor.text': 'TEXT',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(() => jest.fn()),
  useLocation: jest.fn(() => jest.fn()),
}));

jest.mock('@fontsource/roboto-mono', () => {});

describe('RestClient Snapshot Tests', () => {
  const mockUseNavigate = jest.fn();
  const mockReplaceVariables = jest.fn();
  const mockCreateRestEncodedUri = jest.fn();
  const mockReplaceState = jest.fn();

  beforeEach(() => {
    const mockLocation = {
      pathname: '/rest/GET',
      state: null,
    };

    (useNavigate as jest.Mock).mockReturnValue(mockUseNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (prettifyJson as jest.Mock).mockImplementation(jsonString => ({
      json: jsonString,
      error: null,
    }));

    window.history.replaceState = mockReplaceState;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {asFragment} = render(<RestClient initialBody="" initialUri="" initialHeaders={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with populated props', () => {
    const {asFragment} = render(
      <RestClient
        initialBody='{"key": "value"}'
        initialUri="http://example.com"
        initialHeaders={[{key: 'Authorization', value: 'Bearer token', checked: true}]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with different tab selected', () => {
    const {asFragment} = render(
      <RestClient
        initialBody='{"key": "value"}'
        initialUri="http://example.com"
        initialHeaders={[{key: 'Authorization', value: 'Bearer token', checked: true}]}
      />,
    );

    fireEvent.change(screen.getByRole('tab', {name: /Query/i}), {target: {value: 1}});
    expect(asFragment()).toMatchSnapshot();
  });

  test('changes method when selected from dropdown', () => {
    render(<RestClient />);
    const selectMethod = screen.getByRole('combobox');
    fireEvent.mouseDown(selectMethod);
    const postOption = screen.getByText(HTTPMethods.POST);
    fireEvent.click(postOption);
    expect(mockUseNavigate).toHaveBeenCalledWith('/rest/POST');
  });

  test('displays error when URL is invalid', () => {
    mockReplaceVariables.mockImplementation(() => {
      throw new ReferenceError('Invalid URL');
    });
    render(<RestClient />);
    const urlInput = screen.getByPlaceholderText('Enter URL');
    fireEvent.change(urlInput, {target: {value: 'invalid-url'}});
    waitFor(() => {
      expect(screen.getByText("Failed to construct 'URL': Invalid URL")).toBeInTheDocument();
    });
  });

  test('sends a request when Send button is clicked', async () => {
    mockCreateRestEncodedUri.mockReturnValue('encoded-uri');
    render(<RestClient initialUri="http://example.com" />);

    const sendButton = screen.getByRole('button', {name: 'Send'});
    fireEvent.click(sendButton);

    waitFor(() => {
      const history = JSON.parse(localStorage.getItem('history') || '[]');
      expect(history.length).toBeGreaterThan(0);
      expect(mockCreateRestEncodedUri).toHaveBeenCalled();
      expect(mockUseNavigate).toHaveBeenCalledWith('encoded-uri');
    });
  });

  it('should fill all sections and send the request', () => {
    render(<RestClient initialBody="" initialUri="" initialHeaders={[]} />);
    const selectMethod = screen.getByRole('combobox');
    fireEvent.mouseDown(selectMethod);
    const postOption = screen.getByText(HTTPMethods.POST);
    fireEvent.click(postOption);

    const urlInput = screen.getByPlaceholderText('Enter URL');
    fireEvent.change(urlInput, {target: {value: 'https://api.example.com/resource'}});

    waitFor(() => {
      const addVariableButton = screen.getByText('Add');
      fireEvent.click(addVariableButton);
      const variableKeyInput = screen.getByPlaceholderText('Key');
      const variableValueInput = screen.getByPlaceholderText('Value');
      fireEvent.change(variableKeyInput, {target: {value: 'myVariable'}});
      fireEvent.change(variableValueInput, {target: {value: 'myValue'}});
    });

    let tab = screen.getByRole('tab', {name: 'Query'});
    fireEvent.click(tab);

    waitFor(() => {
      const addQueryParamButton = screen.getByText('Add');
      fireEvent.click(addQueryParamButton);
      const queryParamKeyInput = screen.getByPlaceholderText('Key');
      const queryParamValueInput = screen.getByPlaceholderText('Value');
      fireEvent.change(queryParamKeyInput, {target: {value: 'param1'}});
      fireEvent.change(queryParamValueInput, {target: {value: 'value1'}});
    });

    tab = screen.getByRole('tab', {name: 'Headers'});
    fireEvent.click(tab);

    waitFor(() => {
      const headerKeyInput = screen.getByPlaceholderText('Key');
      const headerValueInput = screen.getByPlaceholderText('Value');
      fireEvent.change(headerKeyInput, {target: {value: 'Content-Type'}});
      fireEvent.change(headerValueInput, {target: {value: 'application/json'}});
    });

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/rest/POST');
  });

  test('should update url on focus body', async () => {
    render(<RestClient initialBody="" initialUri="" initialHeaders={[]} />);
    const selectMethod = screen.getByRole('combobox');
    fireEvent.mouseDown(selectMethod);
    const postOption = screen.getByText(HTTPMethods.POST);
    fireEvent.click(postOption);

    const tab = screen.getByRole('tab', {name: 'Body'});
    fireEvent.click(tab);

    const body = screen.getByText('Body');
    expect(body).toBeInTheDocument();

    const urlInput = screen.getByPlaceholderText('Enter URL');
    fireEvent.change(urlInput, {target: {value: 'https://api.example.com/resource'}});

    const bodyTextarea = screen.getAllByRole('textbox')[1];
    fireEvent.change(bodyTextarea, {
      target: {value: '{"id": 1,"title": {{title}},"body": "bar","userId": 1}'},
    });

    fireEvent.blur(bodyTextarea);

    await waitFor(() => {
      expect(global.history.replaceState).toHaveBeenCalled();
    });
  });
});

describe('RestClient useEffect', () => {
  it.skip('should update state based on location.state', async () => {
    const mockNavigate = jest.fn();
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/rest/POST',
      state: {
        method: HTTPMethods.POST,
        uri: 'http://example.com/api',
        headers: [{key: 'Content-Type', value: 'application/json'}],
        body: '{"key":"value"}',
        params: [{key: 'id', value: '123'}],
      },
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<RestClient initialBody="" initialHeaders={[]} initialUri="" />);

    await waitFor(() => {
      expect(screen.getByText('POST')).toBeInTheDocument();
    });
  });
});

describe('RestClient handleVariablesChange', () => {
  const mockReplaceVariables = jest.fn();
  const mockReplaceJsonVariables = jest.fn();
  const mockPrettifyJson = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update body and handle errors correctly when variables change', () => {
    const replacedBody = `{
      "id": 1,
      "title": "foo",
      "body": "bar",
      "userId": 1
    }`;
    const prettifiedBody = {error: {message: ''}};

    mockReplaceJsonVariables.mockReturnValue(replacedBody);
    mockPrettifyJson.mockReturnValue(prettifiedBody);
    mockReplaceVariables.mockReturnValue('http://example.com?param=value');

    render(<RestClient initialBody="" initialHeaders={[]} initialUri="" />);

    const addVariableButton = screen.getByRole('button', {name: /Add/i});
    fireEvent.click(addVariableButton);

    const tab = screen.getByRole('tab', {name: 'Body'});
    fireEvent.click(tab);

    const bodyTextarea = screen.getAllByRole('textbox')[1];
    fireEvent.change(bodyTextarea, replacedBody);

    expect(screen.queryByText('Error message')).toBeNull();
  });
});
