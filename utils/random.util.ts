import { faker } from "@faker-js/faker";

export function generateRandomCombination(): string {
  return faker.string.hexadecimal({ length: 5, prefix: "#" });
}

export function generateRandomWord(min: number, max: number): string {
  return faker.lorem.word({ length: { min: min, max: max } });
}

export function generateRandomWords(length: number): string {
  return faker.lorem.words(length);
}

export function generateRandomLetters(length: number): string {
  const startingLetters: string[] = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ж",
    "З",
    "І",
    "Ї",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ю",
    "Я",
  ];

  return faker.string.fromCharacters(startingLetters, length);
}

export function generateRandomNumbers(min: number, max: number): number {
  return faker.number.int({ min: min, max: max });
}

export function generateRandomStringDigits(length: number): string {
  return faker.string.numeric({
    length,
    allowLeadingZeros: false,
  });
}

export function generateRandomTextLines(lines: number): string {
  return faker.lorem.lines(lines);
}

export function generateRandomSymbols(length: number): string {
  return faker.string.symbol(length);
}

export function generateRandomCity(): string {
  return faker.location.city();
}
