
const API_COUNTRIES_URL = "https://countries.dev/subregion/South America";
const API_WEATHER = "https://api.open-meteo.com/v1";

const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} en ${new URL(url).hostname} ${detail}`);
  }
  return res.json();
};

export const getCountries = async () => {
  const data = await fetchJSON(API_COUNTRIES_URL);
  return Array.isArray(data)
    ? data
    : (data.data ?? data.countries ?? data.results ?? []);
};

export const getWheater = async (countries) => {
  const result = await Promise.all(
    countries.map(async (country) => {
      const [lat, lon] = country.latlng ?? [];
      if (lat == null || lon == null) return null;

      const data = await fetchJSON(
        `${API_WEATHER}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`,
      );

      const name =
        typeof country.name === "string"
          ? country.name
          : (country.name?.common ?? country.name?.official);

      return {
        name,
        city: Array.isArray(country.capital)
          ? country.capital[0]
          : country.capital,
        flag: country.flag,
        temp: data.current?.temperature_2m,
      };
    }),
  );
  return result.filter(Boolean);
};
