import  { AppBar, Toolbar, Box, Grid } from '@mui/material'
import { Login } from './Login'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { DocumentReference } from 'firebase/firestore'
import { useContext } from 'react'
import { ScreenSizeContext } from '../ScreenSizeContext'

interface HeaderProps {
    showPopper: boolean
}
  
const Header: React.FC<HeaderProps> = ({ showPopper }) => {
    const ScreenSize = useContext(ScreenSizeContext)
    return (
        <Grid container >
            <Box sx={{ position: "fixed", zIndex: "10", maxWidth: "1280px" }}>
                <AppBar sx={{ display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", maxWidth: "1280px", position: "fixed", left: "auto", right: "auto" }}>
                    <ThunderstormIcon     sx={{ color: ScreenSize === "sm" ? "transparent" : "white", marginLeft: "40px", fontSize: "40px" }} />
                    <Toolbar sx={{ maxWidth: "80%", display: "flex", alignItems: "stretch" }}>
                        <Login  showPopper={showPopper} />
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
    )
}

export default Header