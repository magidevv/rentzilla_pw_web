import {
  generateRandomCombination,
  generateRandomWord,
  generateRandomWords,
  generateRandomSymbols,
  generateRandomCyrillicLetters,
  generateRandomStringDigits,
  generateRandomTextLines,
  generateRandomCity,
  generateSymbols,
  generateRandomLatinLetters,
} from "./random.util";
import { DateTime } from "luxon";

export const date: any = {
  currentDate: DateTime.now().plus({ hours: 1 }).toISO(),
  endDate: DateTime.now().plus({ days: 3 }).toISO(),

  startTenderDate: DateTime.now().plus({ days: 4 }).toISO(),
  endTenderDate: DateTime.now().plus({ days: 14 }).toISO(),
};

export const datePeriod = (): string => {
  const startTenderDate = DateTime.now()
    .plus({ days: 4 })
    .toFormat("dd.MM.yyyy")
    .toString();
  const endTenderDate = DateTime.now()
    .plus({ days: 14 })
    .toFormat("dd.MM.yyyy")
    .toString();
  return startTenderDate + " - " + endTenderDate;
};

export const restrictedSymbols = [
  ...generateSymbols().filter((symbol) =>
    [";", "<", ">", "^", "{", "}"].includes(symbol)
  ),
];

const randomName = "Тестовий Тендер " + generateRandomCombination();
const randomServiceName = generateRandomCyrillicLetters(1);
const newRandomServiceName = "Тестова Послуга " + generateRandomCombination();

export const validTenderData: { [key: string]: string } = {
  name: randomName,
  serviceName: randomServiceName,
  newServiceName: newRandomServiceName,
  workAddress: generateRandomCyrillicLetters(1),
  budgetAmount: generateRandomStringDigits(8),
  additionalInfo: generateRandomTextLines(6),
};

export const invalidTenderData: { [key: string]: string[] } = {
  name: [" ", generateRandomLatinLetters(71), generateRandomWord(1, 9)],
  serviceName: [" ", generateRandomWords(50)],
  workAddress: [generateRandomCity()],
  budgetAmount: [
    generateRandomSymbols(5),
    generateRandomCyrillicLetters(5),
    " ",
    "0",
    generateRandomStringDigits(10),
  ],
  additionalInfo: [" ", generateRandomLatinLetters(39)],
};
