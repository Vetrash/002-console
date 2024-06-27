import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import fs from "fs";
import rl from "readline-sync";

const argv = yargs(hideBin(process.argv)).command("current", "Текущая дата", {
  file: {
    alias: "f",
    describe: "Путь для файла логирования",
    type: "string",
  },
}).argv;

function checkFilePatch(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

function playGame() {
  const min = 1;
  const max = 3;
  const num = Math.floor(Math.random() * (max - min) + min);

  console.log(
    `Какой стороной упала монетка?  ${num === 1 ? "Орлом" : "Решкой"}`
  );
  console.log(`Варианты ответа \n 1 - Орел \n 2 - Решка`);

  function question() {
    const guess = parseInt(rl.question("input: "));
    let isWin = false;

    if (isNaN(guess) || (guess !== 1 && guess !== 2)) {
      console.log("Пожалуйста, введите число");
      question();
      return;
    }

    if (guess === num) {
      console.log(`Вы угадали!`);
      isWin = true;
    } else {
      console.log(`Вы не угадали!`);
    }
    console.log(`Монетка упала ${num === 1 ? "Орлом" : "Решкой"}`);

    const content = {
      date: new Date().toISOString(),
      result: num === 1 ? "Орел" : "Решка",
      num,
      isWin,
      answerPlayer: guess,
    };
    const contentStr = `${JSON.stringify(content)}\n`;
    let patch = "./log/logs_coinToss.txt";

    if (argv.file || argv.f) {
      patch = argv.file ? argv.file : argv.f;
    }

    checkFilePatch(patch);

    fs.appendFile(patch, contentStr, (err) => {
      if (err) throw err;
    });

    return;
  }

  question();
}

playGame();
