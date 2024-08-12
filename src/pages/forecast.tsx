import { useContext, useEffect, useState } from 'react'
import { Grid, Box, CircularProgress, Typography } from '@mui/material'
import { ExpandMore, ExpandLess, ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { UserContext } from '@/UserContext'
import translations from '@/styles/translations'

interface WeatherData {
  city: {
    id: number
    name: string
  },
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>
  }>,
}

interface ForecastProps {
  lat: number
  lon: number
  language: string
}

const Forecast: React.FC<ForecastProps> = ({ lat, lon, language }) => {
  const { user } = useContext(UserContext) || { user: null }
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lang=${language}&lat=${lat}&lon=${lon}&appid=db4ba26be7429fcc0022ff9783965201`)
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
    }
    fetchData();
  }, [language, lat, lon])

  if (!user) return <p>{translations[language]?.LoginMessage ?? "Please log in to view the forecast."}</p>
  if (loading) return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  )
  if (error) return <p>Error: {error}</p>

  const itemsToShow = showAll ? data?.list : data?.list.slice(0, 4)

  console.log(itemsToShow)

  return (
    <>
      {itemsToShow?.map((item: any) => (
        <Grid container key={item.dt_txt} textAlign={"left"} maxWidth={"200px"}>
          <Box sx={{ padding: "15px 0 5px 0" }}>
            {new Date(item.dt_txt).toLocaleDateString(language, { weekday: 'long' })} &nbsp;
            {new Date(item.dt_txt).toLocaleTimeString(language, { hour: 'numeric', minute: 'numeric', hour12: true })}
          </Box>
          <Grid container>
            <Grid container item xs={6} direction="column" justifyContent="center">
              <Box fontSize={"12px"} display="flex" alignItems="center">
                <Typography fontSize={"12px"} display="flex" alignItems="center" justifyContent={"center"}>
                  {Math.round(item.main.temp - 273.15)}°C
                </Typography>
                <Typography fontSize={"12px"} color="red" display="flex" alignItems="center">
                  <ArrowDropUp />
                  {Math.round(item.main.temp_max - 273.15)}°C 
                </Typography>
                <Typography fontSize={"12px"} color="blue" display="flex" alignItems="center">
                  <ArrowDropDown />
                  {Math.round(item.main.temp_min - 273.15)}°C 
                </Typography>
              </Box>
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
      {!showAll && data?.list && data?.list.length > 4 && (
        <ExpandMore 
          sx={{ marginTop: 2, cursor: "pointer" }}
          onClick={() => setShowAll(true)}
        />
      )}
      {showAll && data?.list && data?.list.length > 4 && (
        <ExpandLess 
          sx={{ marginTop: 2, cursor: "pointer" }}
          onClick={() => setShowAll(false)}
        />
      )}
    </>
  )
}

export default Forecast
