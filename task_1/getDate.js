export const getDate = (time) => {
  const currentDate = new Date(time);

  let dd = currentDate.getDate();
  let mm = currentDate.getMonth() + 1;
  const yyyy = currentDate.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getYear = (time) => {
  const currentDate = new Date(time);

  return currentDate.getFullYear();
};

export const getMonth = (time) => {
  const currentDate = new Date(time);

  return currentDate.getMonth() + 1;
};

export const getFullTimeISO = (time) => {
  const currentDate = new Date(time);
  const dateIso = currentDate.toISOString();
  return dateIso;
};
