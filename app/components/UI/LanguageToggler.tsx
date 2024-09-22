import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

export default function LanguageToggler() {
  const {i18n} = useTranslation();
  const [language, setLanguage] = useState('en');
  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    if (newLanguage != null) {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={language}
      exclusive={true}
      onChange={handleChange}
      aria-label="Language"
      size="small"
      style={{backgroundColor: 'white'}}>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="es">ES</ToggleButton>
    </ToggleButtonGroup>
  );
}
