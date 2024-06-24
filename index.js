#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

// Определение команды 'current'

// const argvCurrent = yargs(hideBin(process.argv))
//  .command('current', 'Получить текущую дату и время', {
//     year: {
//       alias: 'y',
//       describe: 'Год',
//       type: 'number',
//     },
//     month: {
//       alias: 'm',
//       describe: 'Месяц',
//       type: 'number',
//     },
//     date: {
//       alias: 'd',
//       describe: 'Дата в календарном месяце',
//       type: 'number',
//     },
//   }).argv


//   const currentDate = new Date();
//   if (argvCurrent.year || argvCurrent.y) {
//     console.log(currentDate.getFullYear());
//   }
//   if (argvCurrent.month || argvCurrent.m) {
//     console.log(currentDate.getMonth() + 1); 
//   }
//   if (argvCurrent.date || argvCurrent.d) {
//     let dd = currentDate.getDate(); 
//     let mm = currentDate.getMonth() + 1; 
//     const yyyy = currentDate.getFullYear(); 

//     if( dd < 10) {
//         dd = '0' + dd;
//     }
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     console.log( `${dd}.${mm}.${yyyy}`);
//   }


// Определение команд 'add' и 'sub'
const argvAdd = yargs(hideBin(process.argv)).command('add', 'Добавить количество дней или месяцев к текущей дате', {
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
}).argv




if (argvAdd.date || argvAdd.d) {

  const daysAdd = argvAdd.date ? argvAdd.date : argvAdd.d;

  const nextDate =new Date( Date.now() + Number(daysAdd)*86400000);
  let dd = nextDate.getDate(); 
  let mm = nextDate.getMonth() + 1; 
  const yyyy = nextDate.getFullYear(); 

  if( dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }
  console.log( `${dd}.${mm}.${yyyy}`);
}

// const argSub = yargs.command('sub', 'Вычесть количество дней или месяцев из текущей даты', {
//   days: {
//     alias: 'd',
//     describe: 'Количество дней',
//     type: 'number',
//   },
//   months: {
//     alias: 'm',
//     describe: 'Количество месяцев',
//     type: 'number',
//   },
// }).argv;




// // Запуск утилиты
// yargs.parse(process.argv.slice(2));
