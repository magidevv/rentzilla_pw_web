import {
  generateRandomCombination,
  generateRandomWord,
  generateRandomWords,
  generateRandomSymbols,
  generateRandomLetters,
  generateRandomStringDigits,
  generateRandomTextLines,
  generateRandomCity,
} from "../utils/random.util";

const randomName = "Тестовий Тендер " + generateRandomCombination();
const randomServiceName = generateRandomLetters(1);
const newRandomServiceName = "Тестова Послуга " + generateRandomCombination();

export const validTenderData: { [key: string]: string } = {
  name: randomName,
  serviceName: randomServiceName,
  newServiceName: newRandomServiceName,
  workAddress: generateRandomLetters(1),
  budgetAmount: generateRandomStringDigits(8),
  additionalInfo: generateRandomTextLines(6),
};

const invalidName = [
  " ",
  generateRandomWords(25),
  generateRandomWord(1, 9),
];
const invalidServiceName = [" ", generateRandomWords(50)];
const invalidBudgetData = [
  generateRandomSymbols(5),
  generateRandomLetters(5),
  " ",
  "0",
  generateRandomStringDigits(10),
];
const invalidPlaceData = [generateRandomCity()];
const invalidAdditionalInfo = [" ", generateRandomWords(1)];

export const invalidTenderData: { [key: string]: string[] } = {
  name: invalidName,
  serviceName: invalidServiceName,
  workAddress: invalidPlaceData,
  budgetAmount: invalidBudgetData,
  additionalInfo: invalidAdditionalInfo,
};
