import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {AboutApp} from '../components/AboutApp';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Test AboutApp component', () => {
  beforeEach(() => {
    render(<AboutApp />);
  });

  test('Check if renders the about project title', () => {
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('page.main.aboutProjectTitle');
  });

  test('Check if renders the aboutRS School text', () => {
    expect(screen.getByText('page.main.aboutRSSchool')).toBeInTheDocument();
  });

  test('Check if renders the about Course text', () => {
    expect(screen.getByText('page.main.aboutCourse')).toBeInTheDocument();
  });

  test('Check if renders the about Team text', () => {
    expect(screen.getByText('page.main.aboutTeam')).toBeInTheDocument();
  });
});
