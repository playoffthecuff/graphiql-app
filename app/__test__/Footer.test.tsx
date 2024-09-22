import {render, screen} from '@testing-library/react';
import {Footer} from '../components/Footer';
import '@testing-library/jest-dom';

describe('Test Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('Check if render the footer element', () => {
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  test('Check if display the correct year in the copyright text', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear}`);
    expect(copyrightText).toBeInTheDocument();
  });

  test('Check if render the RSS logo link', () => {
    const rssLogoLink = screen.getByRole('link', {name: /RSSchool logo/i});
    expect(rssLogoLink).toHaveAttribute('href', 'https://rs.school/react/');
    expect(rssLogoLink).toContainHTML('<img');
  });
});
