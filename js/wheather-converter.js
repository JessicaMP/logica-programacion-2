import { convertFahrenheit, convertKelvin } from "./wheather.js";

const isValidNumber = (value) => value.trim() !== "" && !isNaN(Number(value));

const getTemplate = () => {
    return `
    <section class="bg-slate-100 px-4 py-10">
        <div class="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">
          <h2 class="text-center text-2xl font-bold text-slate-800">Temperature Converter</h2>
          <p class="mt-1 text-center text-sm text-slate-500">Enter degrees Celsius</p>

          <form id="converter-form" class="mt-6 flex flex-col sm:flex-row gap-2" novalidate>
            <input
              id="celsius-input"
              type="text"
              inputmode="decimal"
              placeholder="Example: 25"
              class="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button
              type="submit"
              class="rounded-lg bg-sky-600 px-5 py-2 font-semibold text-white transition hover:bg-sky-700"
            >
              Converter
            </button>
          </form>

          <p id="converter-error" class="mt-2 hidden text-sm text-red-600">
            Write only number
          </p>

          <div id="converter-result" class="mt-6 hidden grid-cols-3 gap-3 text-center">
            <div class="rounded-xl bg-sky-50 p-3">
              <p id="res-c" class="text-xl font-bold text-sky-700"></p>
              <p class="text-xs text-slate-500">Celsius</p>
            </div>
            <div class="rounded-xl bg-amber-50 p-3">
              <p id="res-f" class="text-xl font-bold text-amber-700"></p>
              <p class="text-xs text-slate-500">Fahrenheit</p>
            </div>
            <div class="rounded-xl bg-emerald-50 p-3">
              <p id="res-k" class="text-xl font-bold text-emerald-700"></p>
              <p class="text-xs text-slate-500">Kelvin</p>
            </div>
          </div>
        </div>
      </section>`
}
class TemperatureConverter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = getTemplate();

    this.querySelector("#converter-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.convert();
    });
  }

  convert() {
    const input = this.querySelector("#celsius-input");
    const error = this.querySelector("#converter-error");
    const result = this.querySelector("#converter-result");

    if (!isValidNumber(input.value)) {
      error.classList.remove("hidden");
      result.classList.add("hidden");
      result.classList.remove("grid");
      return;
    }

    const celsius = Number(input.value);

    this.querySelector("#res-c").textContent = `${celsius.toFixed(1)} °C`;
    this.querySelector("#res-f").textContent = `${convertFahrenheit(celsius).toFixed(1)} °F`;
    this.querySelector("#res-k").textContent = `${convertKelvin(celsius).toFixed(2)} K`;

    error.classList.add("hidden");
    result.classList.remove("hidden");
    result.classList.add("grid");
  }
}

customElements.define("temperature-converter", TemperatureConverter);