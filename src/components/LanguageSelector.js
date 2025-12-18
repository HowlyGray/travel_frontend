import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography
} from '@mui/material';
import { Language } from '@mui/icons-material';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    
    // Sauvegarder la préférence dans localStorage
    localStorage.setItem('language', newLang);
  };

  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id="language-select-label">
        <Box display="flex" alignItems="center" gap={1}>
          <Language fontSize="small" />
          {t('language.title')}
        </Box>
      </InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={i18n.language}
        onChange={handleLanguageChange}
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <Language fontSize="small" />
            {t('language.title')}
          </Box>
        }
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <Box display="flex" alignItems="center" gap={1}>
              <span>{lang.flag}</span>
              <Typography variant="body2">{lang.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}