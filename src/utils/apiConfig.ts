// API Keys
// export const RAPID_API_KEY = '68f112d67emsh1bcfe996999b048p115191jsne2c3391764f7';
// export const RAPID_API_HOST = 'google-map-places.p.rapidapi.com';

export const RAPID_API_KEY = '461f837620mshcb90ed3e8a81b79p1144e4jsnf3a1c5c1d160'
export const RAPID_API_HOST = '';
// Geocoding API Configuration
export const getGeocodeOptions = (query: string) => ({
  method: 'GET',
  url: 'https://google-map-places.p.rapidapi.com/maps/api/geocode/json',
  params: {
    address: `${query}, France`,
    language: 'fr',
    region: 'fr',
    result_type: 'street_address|premise',
    location_type: 'ROOFTOP',
    components: 'country:FR'
  },
  headers: {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST
  }
});

// Distance Matrix API Configuration for French locations
export const getDistanceMatrixOptions = (origin: string, destination: string) => ({
  method: 'GET',
  url: 'https://google-map-places.p.rapidapi.com/maps/api/distancematrix/json',
  params: {
    origins: `${origin}, France`,
    destinations: `${destination}, France`,
    language: 'fr',
    region: 'fr',
    units: 'metric',
    mode: 'driving',
    avoid: 'tolls',
    traffic_model: 'best_guess',
    departure_time: 'now'
  },
  headers: {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST
  }
});