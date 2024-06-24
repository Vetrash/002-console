#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getDate, getYear, getMonth } from "./getDate.js";

const argv = yargs(hideBin(process.argv)).command("current", "Текущая дата", {
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
}).argv;

if (argv.date || argv.d) {
  console.log(getDate(Date.now()));
}

if (argv.month || argv.m) {
  console.log(getMonth(Date.now()));
}

if (argv.year || argv.y) {
  console.log(getYear(Date.now()));
}
