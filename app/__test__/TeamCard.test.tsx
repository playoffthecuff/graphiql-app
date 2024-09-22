import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {TeamCard} from '../components/TeamCard';
import {Team} from '../models/index';

jest.mock('@remix-run/react', () => ({
  Link: jest.fn(),
}));

const mockTeam: Team = {
  name: 'Test Team',
  role: 'Developer',
  description: 'This is a test team description.',
  image: 'https://example.com/image.jpg',
  git: 'https://github.com/test-team',
};

describe('Test TeamCard component', () => {
  test('Check if renders team name, role, and description', () => {
    const {getByText} = render(<TeamCard team={mockTeam} key={1} />);
    expect(getByText(mockTeam.name)).toBeInTheDocument();
    expect(getByText(mockTeam.role)).toBeInTheDocument();
    expect(getByText(mockTeam.description)).toBeInTheDocument();
  });

  test('Check if renders correctly', () => {
    const {asFragment} = render(<TeamCard team={mockTeam} key={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
