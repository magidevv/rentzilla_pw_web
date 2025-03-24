import {
  generateRandomWord,
  generateSymbols,
  generateRandomLatinLetters,
  generateRandomCyrillicLetters,
  generateRandomStringDigits,
  generateRandomCity,
  generateRandomPhoneNumber,
  generateRandomName,
  generateRandomSurname,
  generateRandomFathername,
  generateRandomComp,
  generateRandomUAComp,
  generateRandomUAName,
  generateRandomUASurname,
  generateRandomUAFathername,
} from "../utils/random.util";

export const validProfileData: { [key: string]: string[] } = {
  personTypes: ["ФОП", "Приватна особа", "Юридична особа"],
  legalEntityTypes: ["ТОВ", "ВАТ", "ЗАТ"],
  ipn: [generateRandomStringDigits(10)],
  legalEntityEDRPOU: [generateRandomStringDigits(8)],
  legalEntityName: [generateRandomUAComp(), generateRandomComp()],
  lastName: [generateRandomUASurname(), generateRandomSurname()],
  firstName: [generateRandomUAName(), generateRandomName()],
  fatherName: [generateRandomUAFathername(), generateRandomFathername()],
  city: [generateRandomCyrillicLetters(1)],
  phoneNumber: ["+380681234567"],
  viber: ["380681234567"],
  telegram: [
    "+380681234567",
    generateRandomWord(3, 12),
    "+38" + generateRandomPhoneNumber(),
  ],
  photo: ["test"],
};

export const invalidProfileData: {
  [key: string]: string[] | string[][];
} = {
  ipn: [
    [
      generateRandomCyrillicLetters(10),
      generateRandomLatinLetters(10),
      ...generateSymbols(),
      " ",
    ],
    [generateRandomStringDigits(9), generateRandomStringDigits(11)],
  ],
  legalEntityEDRPOU: [
    [
      generateRandomCyrillicLetters(8),
      generateRandomLatinLetters(8),
      ...generateSymbols(),
      " ",
    ],
    [generateRandomStringDigits(7), generateRandomStringDigits(9)],
  ],
  legalEntityName: [" "],
  lastName: [
    [
      generateRandomStringDigits(5),
      ...generateSymbols().filter(
        (symbol) => !["'", "-", ";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
      " ",
    ],
    [generateRandomLatinLetters(1), generateRandomLatinLetters(26)],
  ],
  firstName: [
    [
      generateRandomStringDigits(5),
      ...generateSymbols().filter(
        (symbol) => !["'", "-", ";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
      " ",
    ],
    [generateRandomLatinLetters(1), generateRandomLatinLetters(26)],
  ],
  fatherName: [
    [
      generateRandomStringDigits(5),
      ...generateSymbols().filter(
        (symbol) => !["'", "-", ";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
      " ",
    ],
    [generateRandomLatinLetters(1), generateRandomLatinLetters(26)],
  ],
  city: [
    [
      generateRandomStringDigits(5),
      ...generateSymbols().filter(
        (symbol) => !["'", "-", ";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
      generateRandomCity(),
      "Будапешт",
    ],
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
      " ",
    ],
    [generateRandomLatinLetters(31)],
  ],
  phoneNumber: [
    [
      generateRandomLatinLetters(5),
      ...generateSymbols().filter((symbol) => !["+"].includes(symbol)),
      " ",
    ],
    ["++"],
    ["+712345678901", "+380345678901"],
    ["+" + generateRandomStringDigits(13)],
  ],
  viber: [
    [
      generateRandomLatinLetters(5),
      ...generateSymbols().filter((symbol) => !["+"].includes(symbol)),
      " ",
    ],
    ["++"],
    ["+712345678901", "+380345678901"],
    ["+" + generateRandomStringDigits(16)],
  ],
  telegram: [
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
      " ",
    ],
    [
      "@" + generateRandomName(),
      "@" + generateRandomUAName(),
      generateRandomPhoneNumber(),
    ],
    [
      generateRandomUAName(),
      ...generateSymbols()
        .filter(
          (symbol) =>
            !["'", "-", ";", "<", ">", "^", "{", "}", "_"].includes(symbol)
        )
        .map((symbol) => "user" + symbol),
    ],
    ["+712345678901", "+380345678901"],
    [generateRandomStringDigits(3), generateRandomStringDigits(14)],
  ],
  photo: ["invalidFormat", "largeSize"],
};
