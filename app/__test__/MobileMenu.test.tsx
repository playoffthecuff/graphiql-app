import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {MobileMenu} from '../components/MobileMenu';
import {AuthProvider} from '~/hooks/Authorization/AuthProvider';

jest.mock('@remix-run/react', () => ({
  Link: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useState: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string | Record<number, {name: string}>> = {
        'links.signIn': 'Sign in',
        'links.signOut': 'Sign out',
        'links.signUp': 'Sign up',
        'links.mainPage': 'Main page',
        'links.history': 'History',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

interface WhiteButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

jest.mock('../components/UI/WhiteButton', () => {
  const MockedWhiteButton: React.FC<WhiteButtonProps> = ({children, onClick}) => {
    return <button onClick={onClick}>{children}</button>;
  };

  return MockedWhiteButton;
});

describe('Test MobileMenu component', () => {
  const mockClose = jest.fn();

  beforeEach(() => {
    mockClose.mockClear();
  });

  test('Check if renders the menu when open', () => {
    render(
      <AuthProvider>
        <MobileMenu anchorEl={document.createElement('div')} open={true} onClose={mockClose} />
      </AuthProvider>,
    );

    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('Check if does not render the menu when not open', () => {
    render(
      <AuthProvider>
        <MobileMenu anchorEl={null} open={false} onClose={mockClose} />
      </AuthProvider>,
    );

    expect(screen.queryByText('Main page')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  test('Check if calls onClose when menu items are clicked', () => {
    render(
      <AuthProvider>
        <MobileMenu anchorEl={document.createElement('div')} open={true} onClose={mockClose} />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText('Main page'));
    expect(mockClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Sign in'));
    expect(mockClose).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByText('Sign up'));
    expect(mockClose).toHaveBeenCalledTimes(3);
  });
});
