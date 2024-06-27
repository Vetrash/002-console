import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import fs from "fs";

const argv = yargs(hideBin(process.argv)).command("current", "Текущая дата", {
  file: {
    alias: "f",
    describe: "Путь до файла",
    type: "string",
  },
}).argv;

function checkFilePatch(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    console.log("Указанный путь не существует");
    return false;
  }
  if (!fs.existsSync(filePath)) {
    console.log("Указанный файл не существует");
    return false;
  }

  return true;
}

function playAnalyzer() {
  let filePath = "./log/logs_coinToss.txt";

  if (argv.file || argv.f) {
    filePath = argv.file ? argv.file : argv.f;
  }

  const isValid = checkFilePatch(filePath);
  if (!isValid) return;

  const data = fs.readFileSync(filePath, "utf8");
  const dataSplit = data.split("\n");

  let sumGames = 0;
  let sumWinGames = 0;
  let sumLoseGames = 0;
  let percent = 0;

  dataSplit.forEach((item, index) => {
    if (item != "") {
      const itemObj = JSON.parse(item);
      sumGames++;
      if (itemObj.isWin) {
        sumWinGames++;
      } else {
        sumLoseGames++;
      }
    }
  });

  percent = Math.ceil((sumWinGames / sumGames) * 10000) / 100;

  console.log(`
      Общее количество партий: ${sumGames}
      Количество выигранных/проигранных партий: ${sumWinGames}/${sumLoseGames}
      Процент выигранных партий: ${percent} %
      `);
}

playAnalyzer();
