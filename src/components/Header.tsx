import { useContext, useRef } from 'react'
import { AppBar, Toolbar, Box, Grid, FormGroup, FormControlLabel } from '@mui/material'
import {LanguageSwitch} from './languageSwitch'
import { Login } from './Login'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { DocumentReference } from 'firebase/firestore'
import { ScreenSizeContext } from '../ScreenSizeContext'

interface HeaderProps {
    showPopper: boolean,
    language: string,
    setLanguage: (language: string) => void
}
  
const Header: React.FC<HeaderProps> = ({ showPopper, setLanguage, language }) => {
    const ScreenSize = useContext(ScreenSizeContext)
    const en = useRef<HTMLButtonElement>(null)
    const es = useRef<HTMLButtonElement>(null)

    const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
        let language = event.target.value
        setLanguage(language)
        event.target.checked = true
    }

    return (
        <Grid container >
            <Box sx={{ position: "fixed", zIndex: "10", maxWidth: "1280px" }}>
                <AppBar sx={{ display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", maxWidth: "1280px", position: "fixed", left: "auto", right: "auto" }}>
                    <ThunderstormIcon     sx={{ color: ScreenSize === "sm" ? "transparent" : "white", marginLeft: "40px", fontSize: "40px" }} />
                    <FormGroup sx={{ display:"flex", flexDirection:"column", width: "100%", alignContent: "flex-end" }}>
                        <FormControlLabel
                            label="" control={<LanguageSwitch ref={en} checked={language === "en"} language="en" value="en" onChange={handleChangeLanguage} />}
                            />
                        <FormControlLabel
                            label="" control={<LanguageSwitch ref={es} checked={language === "es"} language="es" value="es" onChange={handleChangeLanguage} />}
                            />
                    </FormGroup>
                    <Toolbar sx={{ maxWidth: "80%", display: "flex", alignItems: "stretch" }}>
                        <Login  showPopper={showPopper} language={language} />
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
    )
}

export default Header