const checkNumber = (number) => {
  if (Math.trunc(number/10) === 0) return `0${number}`;
  return number; 
};

const elemEnd = (num, words) => {
  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
};

const createSpan = (classes) => {
  const elemSpan = document.createElement('span');
  elemSpan.className = classes;

  return elemSpan;
};

const createP = (classes, text = '') => {
  const elemP = document.createElement('p');
  elemP.className = classes;
  elemP.textContent = text;

  return elemP;
};


const createTimer = (app) => {
  const elemTitle = createP('timer__title', 'До конца акции осталось:');

  const elemDays = createP(`timer__item timer__item__days`);
  const countDays = createSpan('timer__count timer__count_days');
  const unitsDays = createSpan('timer__units timer__units_days');
  elemDays.append(countDays, unitsDays);

  const elemHours = createP('timer__item timer__item__hours');
  const countHours = createSpan('timer__count timer__count_hours');
  const unitsHours = createSpan('timer__units timer__units_hours');
  elemHours.append(countHours, unitsHours);

  const elemMinutes = createP('timer__item timer__item__minutes');
  const countMinutes = createSpan('timer__count timer__count_minutes');
  const unitsMinutes = createSpan('timer__units timer__units_minutes');
  elemMinutes.append(countMinutes, unitsMinutes);

  const elemSeconds = createP('timer__item timer__item__seconds no-timer');
  const countSeconds = createSpan('timer__count timer__count_seconds');
  const unitsSeconds = createSpan('timer__units timer__units_seconds');
  elemSeconds.append(countSeconds, unitsSeconds);

  app.append(elemTitle, elemDays, elemHours, elemMinutes, elemSeconds);

  return {
    countDays,
    unitsDays,
    countHours,
    unitsHours,
    countMinutes,
    unitsMinutes,
    countSeconds,
    unitsSeconds,
    elemSeconds,
    elemDays,
  };
};

const timer = () => {
  const app = document.querySelector('div[data-timer-deadline]');
  const stopData = new Date(app.dataset.timerDeadline).getTime();
  const {
    countDays,
    unitsDays,
    countHours,
    unitsHours,
    countMinutes,
    unitsMinutes,
    countSeconds,
    unitsSeconds,
    elemSeconds,
    elemDays,
  } = createTimer(app);

  const getTimeRemaining = () => {
    const startData = Date.now();
    const setData = stopData - startData;
  
    const seconds = Math.floor(setData / 1000 % 60);
    const minutes = Math.floor(setData / 1000 / 60 % 60);
    const hours = Math.floor(setData / 1000 / 60 / 60 % 24);
    const days = Math.floor(setData / 1000 / 60 / 60 / 24);
  
    return {
      setData,
      seconds,
      minutes,
      hours,
      days,
    };
  };

  const start = () => {
    const {
      setData,
      seconds,
      minutes,
      hours,
      days
    } = getTimeRemaining();

    if (days === 0 && !elemDays.classList.contains('.no-timer')) {
      elemDays.classList.add('no-timer');
      elemSeconds.classList.remove('no-timer');
    }

  
    countDays.textContent = checkNumber(days);
    unitsDays.textContent = elemEnd(days, ['день', 'дня', 'дней']);
    countHours.textContent = checkNumber(hours);
    unitsHours.textContent = elemEnd(hours, ['час', 'часа', 'часов']);
    countMinutes.textContent = checkNumber(minutes);
    unitsMinutes.textContent = elemEnd(minutes, ['минута', 'минуты', 'минут']);
    countSeconds.textContent = checkNumber(seconds);
    unitsSeconds.textContent = elemEnd(seconds, ['секунда', 'секунды', 'секунд']);    
  
    const intervalId = setTimeout(start, 1000);

    if (setData <= 0) {
      clearTimeout(intervalId);
      countDays.textContent = '00';
      unitsDays.textContent = 'дней';
      countHours.textContent = '00';
      unitsHours.textContent = 'часов';
      countMinutes.textContent = '00';
      unitsMinutes.textContent = 'минут';
      countSeconds.textContent = '00';
      unitsSeconds.textContent = 'секунд';    
    }
  };

  start();
};

timer();