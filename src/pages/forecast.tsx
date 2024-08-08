import { useEffect, useState } from 'react'
import { Grid, Box } from '@mui/material'

interface WeatherData {
  // Defineix la forma de les dades que esperes de l'API externa
  // Per exemple:
  city: {
    id: number
    name: string
  };
  // Afegeix més camps segons sigui necessari
}

interface ForecastProps {
  lat: number
  lon: number
}

const Forecast: React.FC<ForecastProps> = ({ lat, lon }) => {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=db4ba26be7429fcc0022ff9783965201`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result: WeatherData = await response.json()
        setData(result)
        setLoading(false)
      } catch (error) {
        setError((error as Error).message)
        setLoading(false)
      }
    };

    fetchData();
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {data?.list.map((item: any) => (
        <Grid container key={item.dt_txt} textAlign={"left"} maxWidth={"200px"}>
          <Box sx={{ padding: "15px 0 5px 0" }}>
            {new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })} &nbsp;
            {new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </Box>
          <Grid container>
            <Grid container item xs={6} direction="column" justifyContent="center">
              <Box fontSize={"12px"}>{Math.round(item.main.temp - 273.15)}°C</Box>
              <Box fontSize={"12px"}>{item.weather[0].description}</Box>
            </Grid>
            <Grid container item xs={6} justifyContent="center" alignItems="center">
              <Box>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default Forecast
