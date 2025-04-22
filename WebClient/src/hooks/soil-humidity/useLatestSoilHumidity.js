import { useQuery } from '@tanstack/react-query';

async function fetchLatestSoilHumidity() {
  try {
    const res = await fetch('/api/IoT/soilhumidity/latest', {
      method: 'GET',
    });    
    if (import.meta.env.MODE === 'development' && res.status === 404) {
      console.log('No data found, returning random value for testing');
      // Return a random value for testing
      const randomValue = Math.floor(Math.random() * 100);

      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: 0,
        soil_humidity_value: randomValue,
        time_stamp: new Date().toISOString(),
      };
    }

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.body.json();
    console.log('Latest soil humidity data:', data);
    return data;
  }
  catch (error) {
    console.error('Error fetching latest soil humidity data:', error);
    throw error;
  }
}

export function useLatestSoilHumidity(options = {}) {
  return useQuery({
    queryKey: ['soilHumidity', 'latest'],
    queryFn: fetchLatestSoilHumidity,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
}