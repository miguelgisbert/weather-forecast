interface CityCoordinates {
    lat: number;
    lon: number;
}

export async function getCityCoordinates(cityName: string): Promise<CityCoordinates> {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=db4ba26be7429fcc0022ff9783965201`);
        if (!response.ok) {
        throw new Error('Failed to fetch city coordinates');
        }
        const [result] = await response.json();
        return { lat: result.lat, lon: result.lon };
    } catch (error) {
        throw new Error(`Error fetching city coordinates: ${(error as Error).message}`);
    }
}
  