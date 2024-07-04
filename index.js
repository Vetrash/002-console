#!/usr/bin/env node

import axios from "axios";
import rl from "readline-sync";

const getWeather = async () => {
  let city = "";
  console.log(
    `Погоду в каком городе вы хотите узнать?
Введите название города на английском языке`
  );
  city = rl.question("city: ");

  if (city.length < 1) {
    console.log("Пожалуйста, введите город");
    getWeather();
    return;
  }

  const myAPIKey = process.env.myAPIKey;
  const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${myAPIKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

getWeather();
