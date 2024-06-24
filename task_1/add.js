#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getFullTimeISO } from "./getDate.js";

const argv = yargs(hideBin(process.argv)).command(
  "add",
  "Добавить количество дней,месяцев, лет в текущей дате",
  {
    year: {
      alias: "y",
      describe: "Год",
      type: "number",
    },
    month: {
      alias: "m",
      describe: "Месяц",
      type: "number",
    },
    date: {
      alias: "d",
      describe: "Дата в календарном месяце",
      type: "number",
    },
  }
).argv;

if (argv.date || argv.d) {
  console.log("argv", argv);
  const daysAdd = argv.date ? argv.date : argv.d;
  const nextDate = new Date(Date.now() + Number(daysAdd) * 86400000);
  console.log(getFullTimeISO(nextDate));
}

if (argv.month || argv.m) {
  const monthAdd = argv.month ? argv.month : argv.m;
  const nextDate = new Date(Date.now() + Number(monthAdd) * 2678400000);
  console.log(getFullTimeISO(nextDate));
}

if (argv.year || argv.y) {
  const yearAdd = argv.year ? argv.year : argv.y;
  const nextDate = new Date(Date.now() + Number(yearAdd) * 31536000000);
  console.log(getFullTimeISO(nextDate));
}
