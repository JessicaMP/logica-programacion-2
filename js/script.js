/* Version consola */
const prompt = require("prompt-sync")();

const MESSAGE = {
  primary: "Brindame la temperatura actual en grados Celsius",
  extra: "(Ingrese solo numeros)",
};

const isValidNumber = (value) => value.trim() !== "" && !isNaN(Number(value));

const quizAndGetNumber = (message) => {
  let num = prompt(`${message.primary}: `);

  while (!isValidNumber(num)) {
    num = prompt(`${message.primary} ${MESSAGE.extra} : `);
  }
  return Number(num);
};

const convertFahrenheit = (num) => num * 1.8 + 32;

const convertKelvin = (num) => num + 273.15;

const getTemperature = () => {
  const celsius = quizAndGetNumber(MESSAGE);
  const fahrenheit = convertFahrenheit(celsius);
  const kelvin = convertKelvin(celsius);

  return { celsius, fahrenheit, kelvin };
};

console.log(getTemperature());
