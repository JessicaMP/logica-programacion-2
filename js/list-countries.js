class ListCountries extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="px-4 py-10">
        <div class="mx-auto max-w-5xl space-y-10">
          <div>
            <h1 class="text-xl font-bold text-slate-800 sm:text-2xl">
              Current temperature by country
            </h1>
            <p class="mt-2 text-slate-500">Central location data for each country</p>
          </div>

          <ul id="list" class=" grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <li class="col-span-full text-center text-slate-500 animate-pulse">Loading...</li>
          </ul>
        </div>
      </section>
    `;
  }
}

customElements.define("list-countries", ListCountries);