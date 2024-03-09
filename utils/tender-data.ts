import {
  generateRandomCombination,
  generateRandomWord,
  generateRandomWords,
  generateRandomSymbols,
  generateRandomCyrillicLetters,
  generateRandomStringDigits,
  generateRandomTextLines,
  generateRandomCity,
} from "./random.util";

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
  name: [" ", generateRandomWords(25), generateRandomWord(1, 9)],
  serviceName: [" ", generateRandomWords(50)],
  workAddress: [generateRandomCity()],
  budgetAmount: [
    generateRandomSymbols(5),
    generateRandomCyrillicLetters(5),
    " ",
    "0",
    generateRandomStringDigits(10),
  ],
  additionalInfo: [" ", generateRandomWords(1)],
};
