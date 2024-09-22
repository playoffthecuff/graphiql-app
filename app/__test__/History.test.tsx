import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {History} from '../components/History';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@remix-run/react', () => ({
  Link: (props: {children: React.ReactNode; to: string}) => <a href={props.to}>{props.children}</a>,
}));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('Test History Component', () => {
  test('Check if renders no requests message when there is no history in localStorage', () => {
    render(<History />);

    expect(screen.getByTestId('text-norequests')).toHaveTextContent('page.history.noRequests');
  });

  test('Check if renders history requests when there are requests in localStorage', () => {
    const mockHistoryData = [
      {
        method: 'GRAPHQL',
        uri: 'https://countries.trevorblades.com/graphql',
        sdl: 'https://countries.trevorblades.com/graphql?sdl',
        body: `query Query { country(code: "BR") {
                        name
                        native
                        capital
                        emoji
                        currency
                        languages {
                        code
                        name
                        }
                    }
                    }`,
        headers: {},
        variables: '',
        encoded:
          '/GRAPHQL/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2dyYXBocWw=/cXVlcnkgR2V0Q2hhcmFjdGVycygkcGFnZTogSW50ISkgewogIGNoYXJhY3RlcnMocGFnZTogMikgewogICAgaW5mbyB7CiAgICAgIGNvdW50CiAgICB9CiAgICByZXN1bHRzIHsKICAgICAgbmFtZQogICAgfQogIH0KfQ==',
      },
      {
        method: 'GRAPHQL',
        uri: 'https://rickandmortyapi.com/graphql',
        sdl: 'https://rickandmortyapi.com/graphql/?sdl',
        body: `query GetCharacters($page: Int!) {
                            characters(page: $page) {
                                info {
                                    count
                                }
                                results {
                                    name
                                }
                            }
                        }`,
        headers: {},
        variables: '{"page": 2}',
        encoded:
          '/GRAPHQL/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2dyYXBocWw=/cXVlcnkgR2V0Q2hhcmFjdGVycygkcGFnZTogSW50ISkgewogIGNoYXJhY3RlcnMocGFnZTogMikgewogICAgaW5mbyB7CiAgICAgIGNvdW50CiAgICB9CiAgICByZXN1bHRzIHsKICAgICAgbmFtZQogICAgfQogIH0KfQ==',
      },
    ];

    localStorage.setItem('history', JSON.stringify(mockHistoryData));

    render(<History />);

    expect(screen.getAllByText('GRAPHQL')).toHaveLength(2);
    expect(screen.getByText('https://rickandmortyapi.com/graphql')).toBeInTheDocument();
  });
});
