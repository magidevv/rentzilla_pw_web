import { faker, fakerUK } from "@faker-js/faker";

export function generateRandomCombination(): string {
  return faker.string.hexadecimal({ length: 5, prefix: "#" });
}

export function generateRandomWord(min: number, max: number): string {
  return faker.lorem.word({ length: { min: min, max: max } });
}

export function generateRandomComp(): string {
  return faker.company.name();
}

export function generateRandomUAComp(): string {
  return fakerUK.company.name();
}

export function generateRandomWords(length: number): string {
  return faker.lorem.words(length);
}

export function generateRandomCyrillicLetters(length: number): string {
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

export function generateRandomLatinLetters(length: number): string {
  return faker.string.alpha({ length });
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

export function generateRandomUACity(): string {
  return fakerUK.location.city();
}

export function generateRandomPhoneNumber(): string {
  return fakerUK.phone.number().replace(/\D/g, "");
}

const sex = faker.person.sexType();

export function generateRandomName(): string {
  return faker.person.firstName(sex);
}

export function generateRandomSurname(): string {
  return faker.person.lastName(sex);
}

export function generateRandomFathername(): string {
  return faker.person.middleName(sex);
}

export function generateRandomUAName(): string {
  return fakerUK.person.firstName(sex).replace(/'/g, "");
}

export function generateRandomUASurname(): string {
  return fakerUK.person.middleName(sex).replace(/'/g, "");
}

export function generateRandomUAFathername(): string {
  return fakerUK.person.middleName(sex).replace(/'/g, "");
}

export function generateSymbols(): string[] {
  return [
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
  ];
}
