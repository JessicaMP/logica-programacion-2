import { convertFahrenheit, convertKelvin } from "./wheather.js";
import { getCountries, getWheater } from "./api-countries.js";

const tempColor = (c) => {
  if (c <= 10) return "border-sky-400";
  if (c <= 20) return "border-emerald-400";
  if (c <= 28) return "border-amber-400";
  return "border-red-500";
};

const getTemplate = ({celsius, fahrenheit, kelvin, country}) => {
  return `
      <li class="rounded-xl border-t-4 ${tempColor(celsius)} bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
        <div class="flex items-center gap-3">
          <span class="text-4xl">${country.flag ?? ""}</span>
          <div>
            <h2 class="text-lg font-semibold text-slate-800">${country.name}</h2>
            <p class="text-sm text-slate-500">${country.city ?? "-"}</p>
          </div>
        </div>

        <p class="mt-4 text-4xl font-bold text-slate-900">${celsius.toFixed(1)} °C</p>

        <div class="mt-3 flex gap-4 text-sm text-slate-600">
          <span class="rounded-md bg-slate-100 px-2 py-1">${fahrenheit.toFixed(1)} °F</span>
          <span class="rounded-md bg-slate-100 px-2 py-1">${kelvin.toFixed(2)} K</span>
        </div>
      </li>`
}

const show = (data) => {
  document.getElementById("list").innerHTML = data
    .map((item) => {
      const celsius = item.temp;
      const fahrenheit = convertFahrenheit(celsius);
      const kelvin = convertKelvin(celsius);

      return getTemplate({celsius, fahrenheit, kelvin, country: item});
    })
    .join("");
};

const loader = async () => {
  const list = document.getElementById("list");
  try {
    const countries = await getCountries();
    const data = await getWheater(countries);
    show(data);
  } catch (err) {
    console.error(err);
    list.innerHTML = `<li class="col-span-full rounded-lg bg-red-100 p-4 text-center text-red-700">Error: ${err.message}</li>`;
  }
};

loader();
