import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {AboutTeam} from '../components/AboutTeam';

interface MockedTeamItem {
  team: {
    name: string;
  };
}

jest.mock('../../public/logo.svg', () => 'svg-mock');
jest.mock('@remix-run/react', () => ({
  Link: jest.fn(),
}));

jest.mock('../components/TeamCard', () => {
  return {
    TeamCard: ({team}: MockedTeamItem) => <div>{team.name}</div>,
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string | Record<number, {name: string}>> = {
        'page.main.aboutUsTitle': 'About Us',
        'page.main.aboutText1': 'This is the first about text.',
        'page.main.aboutText2': 'This is the second about text.',
        'page.main.team': {
          0: {name: 'Team Member 1'},
          1: {name: 'Team Member 2'},
        },
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Test AboutTeam Component', () => {
  test('Check if renders the title', () => {
    render(<AboutTeam />);

    const titleElement = screen.getByText(/About Us/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('Check if renders about text', () => {
    render(<AboutTeam />);

    const text1Element = screen.getByText(/This is the first about text./i);
    const text2Element = screen.getByText(/This is the second about text./i);

    expect(text1Element).toBeInTheDocument();
    expect(text2Element).toBeInTheDocument();
  });

  test('Check if renders team cards', () => {
    render(<AboutTeam />);

    const teamMember1 = screen.getByText(/Team Member 1/i);
    const teamMember2 = screen.getByText(/Team Member 2/i);

    expect(teamMember1).toBeInTheDocument();
    expect(teamMember2).toBeInTheDocument();
  });

  test('Check if renders multiple team cards', () => {
    render(<AboutTeam />);

    const teamCards = screen.getAllByText(/Team Member/i);
    expect(teamCards).toHaveLength(2);
  });
});
