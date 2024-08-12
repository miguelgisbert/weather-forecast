'use client'

import { useState, useEffect, useContext, useRef } from 'react'
import { Button, Box, TextField, Popper, Typography, Snackbar, Alert, SnackbarCloseReason, Stack, Switch, ClickAwayListener } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { usePopper } from '../PopperContext'
import translations from '../styles/translations'
import '../styles/globals.scss'

interface LoginProps {
  showPopper: boolean
  language: string
}

const Contact: React.FC<LoginProps> = ({ showPopper, language }) => {
  const { formToShow, setFormToShow } = usePopper()
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [open, setOpen] = useState(false) // For Alerts
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const contactButtonRef = useRef<HTMLButtonElement | null>(null)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setFormToShow(showPopper ? 'contact' : 'none')
  }, [showPopper, setFormToShow])

  const handleClose = (_: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
    handleClose(event, 'timeout');
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault() 
    console.log("email",email)
    if (!validateEmail(email)) {
      setErrorMessage(translations[language].InvalidEmail as string)
      setAlertType('error')
      setOpen(true)
      return
    }
    setSuccessMessage(translations[language].MessageSubmited as string)
    setAlertType('success')
    setOpen(true)
    setFormToShow('none')
    setEmail('')
    setMessage('')
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertType} sx={{ width: '100%' }}>
          {alertType === 'success' ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ position: "absolute", right: "20px", bottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1976d2", width: "70px", height: "70px", borderRadius: "50px" }}>
        <Button ref={contactButtonRef} color="inherit" sx={{ display: "flex", alignItems: "center", height: "100%", width: "100%", lineHeight: 1.3 }} 
          onClick={(e) =>{
            setFormToShow('contact')
            setAnchorEl(e.currentTarget)  
          }} >
            <MailOutlineIcon fontSize= 'large' sx={{ color: "white" }} />
        </Button>
      </Box>
      <ClickAwayListener onClickAway={(event) => {
        if (contactButtonRef.current && contactButtonRef.current.contains(event.target as Node)) {
          return; 
        }
        setFormToShow('none');
      }}>
        <Popper open={formToShow === 'contact'} anchorEl={isSmallScreen ? null : anchorEl} placement={isSmallScreen ? 'top' : 'top-end'} sx={{ boxShadow: 5, padding:"40px", width: isSmallScreen ? "70vw" : "340px", height: "300px", backgroundColor: "white", bottom: isSmallScreen ? '70px!important' : '20px!important', left: isSmallScreen ? '5vw!important' : 'auto' }}>
          <Box  component="form" 
                sx={{ 
                  backgroundColor: "white", 
                  width:"100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  padding: 0,
                  gap: 2 
                }} 
                padding={5} 
                onSubmit={handleSubmit}>
            <TextField
              required
              id="email_contact"
              label={translations[language].Email}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              id="message_contact"
              label={translations[language].Message}
              type="text"
              multiline
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Button type="submit">
              {translations[language].Submit}
            </Button>
          </Box>
        </Popper>
      </ClickAwayListener>
    </>
  )
}

export { Contact }