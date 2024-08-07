import { useEffect, useState } from 'react';

interface WeatherData {
  // Defineix la forma de les dades que esperes de l'API externa
  // Per exemple:
  city: {
    id: number;
    name: string;
  };
  // Afegeix més camps segons sigui necessari
}

interface ForecastProps {
  lat: number;
  lon: number;
}

const Forecast: React.FC<ForecastProps> = ({ lat, lon }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=db4ba26be7429fcc0022ff9783965201`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: WeatherData = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  console.log(data)

  return (
    <div>
      <h1>Weather Forecast</h1>
      <div className="forecast-container">
        {data?.list.map((item) => (
          <div key={item.dt_txt} className="forecast-card">
            <h2>{item.dt_txt}</h2>
            <p>Temperature: {Math.round(item.main.temp - 273.15)}°C</p>
            <p>{item.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
