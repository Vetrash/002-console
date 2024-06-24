import rl from "readline-sync";

function playGame() {
  const min = 0;
  const max = 100;
  const guessNum = Math.floor(Math.random() * (max - min) + min);

  console.log(`Загадано число в диапазоне от ${min} до ${max}`);

  function question() {
    const guess = parseInt(rl.question("input: "), 10);

    if (isNaN(guess)) {
      console.log("Пожалуйста, введите число");
      question();
      return;
    }

    if (guess === guessNum) {
      console.log(`Отгадано число ${guessNum}`);
      return;
    }

    if (guess > max || guess < 1) {
      console.log(`Число должно быть от ${min} до ${max}`);
      question();
      return;
    }

    const hint = guess < guessNum ? "больше" : "меньше";
    console.log(hint);
    question();
  }

  question();
}

playGame();
