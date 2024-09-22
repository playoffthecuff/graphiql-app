import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import JsonEditor from '~/components/JsonEditor/JsonEditor';

jest.mock('@fontsource/roboto-mono', () => {});
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'jsonEditor.format': 'Format',
        'jsonEditor.jsonContent': 'JSON Content',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Testing JSON-Editor component', () => {
  it('renders without props with default values', async () => {
    render(<JsonEditor />);
    const heading = await screen.findByText('JSON Content');
    const formatButton = await screen.findByText('Format');
    const numeration = await screen.findByText('1');
    const input = await screen.findByRole('textbox');
    expect(heading).toBeInTheDocument();
    expect(formatButton).toBeInTheDocument();
    expect(numeration).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  it('update the input in the editor mode', async () => {
    const user = userEvent.setup();
    const startValue = 'start';
    const endValue = 'end';
    render(<JsonEditor type="text" mode="edit" defaultValue={startValue} />);
    const input = await screen.findByText(startValue);
    await user.click(input);
    await user.keyboard(endValue);
    expect(input.textContent).toBe(startValue + endValue);
  });
  it("don't format default value for JSON type", async () => {
    const startValue = `{"message": "Welcome to Thunder Client","about": "Lightweight Rest API Client for VSCode","features": {"git": "Save data to Git Workspace","themes": "Supports VSCode Themes"}}`;
    const callback = jest.fn();
    render(<JsonEditor type="JSON" mode="edit" defaultValue={startValue} onChange={callback} />);
    const input = await screen.findByRole('textbox');
    expect(input.textContent).toBe(startValue);
  });
  it('format content for JSON type by clicking "Format" button', async () => {
    const user = userEvent.setup();
    const startValue = `{"message": "Welcome to Thunder Client","about": "Lightweight Rest API Client for VSCode","features": {"git": "Save data to Git Workspace","themes": "Supports VSCode Themes"}}`;
    const formattedValue = `{
  "message": "Welcome to Thunder Client",
  "about": "Lightweight Rest API Client for VSCode",
  "features": {
    "git": "Save data to Git Workspace",
    "themes": "Supports VSCode Themes"
  }
}`;
    const callback = jest.fn();
    render(<JsonEditor type="JSON" mode="edit" onChange={callback} />);
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, {target: {value: startValue}});
    const formatButton = await screen.findByText('Format');
    await user.click(formatButton);
    expect(input.textContent).toBe(formattedValue);
  });
  it('executes a callback on change', async () => {
    const user = userEvent.setup();
    const startValue = 'start';
    const endValue = 'end';
    const callback = jest.fn();
    render(<JsonEditor type="text" mode="edit" defaultValue={startValue} onChange={callback} />);
    const input = await screen.findByRole('textbox');
    await user.click(input);
    await user.keyboard(endValue);
    expect(callback).toHaveBeenCalledWith(startValue + endValue);
  });
});
