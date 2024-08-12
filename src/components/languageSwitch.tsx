import { styled } from '@mui/material/styles'
import { Switch, SwitchProps } from '@mui/material'
import '../styles/globals.scss'

interface LanguageSwitchProps extends SwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  language: string;
}

export const LanguageSwitch = styled(({ language, ...props }: LanguageSwitchProps) => (
  <Switch {...props} />
))(({ theme, language }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      backgroundColor: '#42414D',
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        content: language === "ca" ? '"CA"' : language === "es" ? '"ES"': '"EN"',
        fontSize: '12px',
        lineHeight: '15px',
        position: "absolute",
        left: 12,
        color: "#fefce6",
      },
      '&:after': {
        content: language === "ca" ? '"CA"' : language === "es" ? '"ES"': '"EN"',
        fontSize: '12px',
        lineHeight: '15px',
        right: 12,
        color: "#fefce6",
      },
    },
    '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#211C47!important', 
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
      backgroundColor: "#fefce6",
    },
  }));