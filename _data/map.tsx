import type { Data } from "react-svg-worldmap";

export const datas: Data = [
  { country: "us", value: -1 }, // united states
  { country: "kr", value: 125 }, // korea
  { country: "es", value: 55 }, // spain
  { country: "pe", value: 22 }, // peru
  { country: "mx", value: 15 }, // mexico
  { country: "ca", value: 13 }, // canada
  { country: "nl", value: 11 }, // netherlands
  { country: "fr", value: 9 }, // france
  { country: "ar", value: 8 }, // argentina
  { country: "pt", value: 6 }, // portugal
  { country: "bz", value: 3 }, // belize
  { country: "cl", value: 2 }, // chile
  { country: "ch", value: 2 }, // switzerland
  { country: "jp", value: 2 }, // japan
];

let daysAbroad = 0;

for (let index = 0; index < datas.length; index++) {
  if (datas[index].country != "us")
    daysAbroad = daysAbroad + datas[index].value
}

function getDays() {
  const firstDate = new Date("05/28/1998");
  const secondDate = new Date();

  const firstDateMs = firstDate.getTime();
  const secondDateMs = secondDate.getTime();

  const difference = secondDateMs - firstDateMs;

  return (
    Math.floor(difference / (1000 * 60 * 60 * 24))
  )

}

export const totalDays = getDays();

datas[0].value = totalDays - daysAbroad;



