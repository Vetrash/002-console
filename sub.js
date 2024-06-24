#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

// Определение команды 'current'

const {argv} = yargs(hideBin(process.argv))
 .command('current', 'Получить текущую дату и время', {
    year: {
      alias: 'y',
      describe: 'Год',
      type: 'number',
    },
    month: {
      alias: 'm',
      describe: 'Месяц',
      type: 'number',
    },
    date: {
      alias: 'd',
      describe: 'Дата в календарном месяце',
      type: 'number',
    },
  })
//  .example(
//     '$0 current',
//     'Показать текущую дату и время в формате ISO'
//   )
//  .example('$0 current --year', 'Показать текущий год')
//  .example('$0 current --month', 'Показать текущий месяц')
//  .example('$0 current --date', 'Показать дату в календарном месяце')
//  .help()
//  .alias('help', 'h')
//  .version(false)
//  .strict();



  const currentDate = new Date();
  console.log(argv)
  if (argv.year || argv.y) {
    console.log(currentDate.getFullYear());
  }
  if (argv.month || argv.m) {
    console.log(currentDate.getMonth() + 1); 
  }
  if (argv.date || argv.d) {
    let dd = today.getDate(); 
    let mm = today.getMonth() + 1; 
    const yyyy = today.getFullYear(); 

    if( dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    console.log( `${dd}.${mm}.${yyyy}`);
  }


// Определение команд 'add' и 'sub'
yargs.command('add', 'Добавить количество дней или месяцев к текущей дате', {
  days: {
    alias: 'd',
    describe: 'Количество дней',
    type: 'number',
  },
  months: {
    alias: 'm',
    describe: 'Количество месяцев',
    type: 'number',
  },
})
.example('$0 add -d 2', 'Добавить 2 дня к текущей дате')
.example('$0 add --months 1', 'Добавить 1 месяц к текущей дате');

yargs.command('sub', 'Вычесть количество дней или месяцев из текущей даты', {
  days: {
    alias: 'd',
    describe: 'Количество дней',
    type: 'number',
  },
  months: {
    alias: 'm',
    describe: 'Количество месяцев',
    type: 'number',
  },
})
.example('$0 sub -d 2', 'Вычесть 2 дня из текущей даты')
.example('$0 sub --months 1', 'Вычесть 1 месяц из текущей даты');

// // Запуск утилиты
// yargs.parse(process.argv.slice(2));
