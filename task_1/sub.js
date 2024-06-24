#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getFullTimeISO } from "./getDate.js";

const argv = yargs(hideBin(process.argv)).command(
  "sub",
  "Уменьшить количество дней,месяцев, лет в текущей дате",
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
  const daysSub = argv.date ? argv.date : argv.d;
  const nextDate = new Date(Date.now() - Number(daysSub) * 86400000);
  console.log(getFullTimeISO(nextDate));
}

if (argv.month || argv.m) {
  const monthSub = argv.month ? argv.month : argv.m;
  const nextDate = new Date(Date.now() - Number(monthSub) * 2678400000);
  console.log(getFullTimeISO(nextDate));
}

if (argv.year || argv.y) {
  const yearSub = argv.year ? argv.year : argv.y;
  const nextDate = new Date(Date.now() - Number(yearSub) * 31536000000);
  console.log(getFullTimeISO(nextDate));
}
