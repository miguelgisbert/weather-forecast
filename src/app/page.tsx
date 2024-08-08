'use client'

import '../styles/globals.scss'
import { useState, useEffect } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import Header from '../components/Header'
import { ScreenSizeContext } from '../ScreenSizeContext'
import { PopperProvider } from '../PopperContext'
import { Breakpoint, CustomUser } from '../types'
import { Grid, Card, Typography } from '@mui/material'
import { getCityCoordinates } from '../lib/getCityCoordinates'
import Forecast from '@/pages/forecast'

interface City {
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export default function Home() {

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchCitiesCoordinates = async () => {
      try {
        const cityNames = ['London', 'Toronto', 'Singapore'];
        const coordinatesPromises = cityNames.map(name => 
          getCityCoordinates(name).then(coords => ({ name, coordinates: coords }))
        );
        const citiesWithCoordinates = await Promise.all(coordinatesPromises);
        setCities(citiesWithCoordinates);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchCitiesCoordinates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PopperProvider>
      <ScreenSizeContext.Provider value={currentBreakpoint}>
        <Header showPopper={false} />
        <Grid container direction= {"row"} justifyContent= {"center"} gap={5} sx={{ margin: "100px 0" }}>
          {cities.map((city) => (
            <Card key={city.name} sx={{ padding: "30px 40px", borderRadius: "15px" }}>
              <Typography variant="h4" sx={{ paddingBottom: "20px" }} >{city.name}</Typography>
              <Forecast lat={city.coordinates.lat} lon={city.coordinates.lon} />
            </Card>
          ))}
        </Grid>
      </ScreenSizeContext.Provider>
    </PopperProvider>
  );
}
