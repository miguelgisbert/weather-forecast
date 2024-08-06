'use client'

import '../styles/globals.scss'
import { useMediaQuery, useTheme } from '@mui/material'
import Header from '../components/Header'
import { ScreenSizeContext } from '../ScreenSizeContext'
import { PopperProvider } from '../PopperContext'
import { Breakpoint, CustomUser } from '../types'
import { Grid } from '@mui/material';

export default function Home() {

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  
  let currentBreakpoint: Breakpoint = 'xl';
  
  if (isXs) {
    currentBreakpoint = 'xs';
  } else if (isSm) {
    currentBreakpoint = 'sm';
  } else if (isMd) {
    currentBreakpoint = 'md';
  } else if (isLg) {
    currentBreakpoint = 'lg';
  }

  return (
      <>
        <PopperProvider>
          <ScreenSizeContext.Provider value={currentBreakpoint}>
            <Header showPopper={false} />
          </ScreenSizeContext.Provider>
        </PopperProvider>
      </>
  );
}
