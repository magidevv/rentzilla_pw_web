import {
  generateRandomWord,
  generateSymbols,
  generateRandomLatinLetters,
  generateRandomCyrillicLetters,
  generateRandomStringDigits,
  generateRandomCity,
  generateRandomPhoneNumber,
} from "../utils/random.util";

export const paymentMethods = [
  "Готівкою / на картку",
  "Безготівковий розрахунок (без ПДВ)",
  "Безготівковий розрахунок (з ПДВ)",
];

export const timeOptions = {
  time: [
    "година",
    "зміна",
    "тонна",
    "гектар",
    "метр кв.",
    "метр куб.",
    "Кілометр",
  ],
  shortTime: ["година", "зміна", "тонна", "гектар", "м2", "м3", "м3"],
  shift: ["8 год", "4 год"],
};

export const mainCategories = [
  "Будівельна техніка",
  "Комунальна техніка",
  "Складська техніка",
  "Сільськогосподарська техніка",
];

export const sortingMethods = [" по назві", "по даті створення"];

export const categories = [
  "ресайклери",
  "драглайни",
  "всюдиходи",
  "асенізатори",
  "борони",
  "дровоколи",
  "вила",
  "електротягачі",
];

export const validUnitData: {
  [key: string]: string;
} = {
  name: " test12345",
  manufacturer: "CLAAS",
  modelName: "Sample model 1",
  techCharacteristics:
    "Двигун: Марка: Mercedes-Benz Кількість циліндрів: 6 Об'єм: 15,6 л Потужність: 626 к.с. Максимальний крутний момент: 2 470 Нм Система охолодження: рідинне охолодження",
  detailedDescr:
    "Трактор снігоприбиральний CLAAS Lexion - потужна та надійна машина з високою продуктивністю, яка легко справляється з великими сніговими наносами, забезпечуючи швидке та ефективне очищення доріг та площ.",
  place: "Дмитрівська сільська громада, Київська область,  Україна",
  photo: "test_copy.png",
  service: " test12345",
  price: "4 691 357 982 грн",
};

export const invalidUnitData: {
  [key: string]: string[] | string[][];
} = {
  name: [
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    [generateRandomLatinLetters(9), generateRandomLatinLetters(101)],
  ],
  manufacturer: [
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    ["-- test"],
  ],
  modelName: [
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    [generateRandomLatinLetters(16)],
  ],
  techCharacteristics: [
    ...generateSymbols().filter((symbol) =>
      [";", "<", ">", "^", "{", "}"].includes(symbol)
    ),
  ],
  detailedDescr: [
    ...generateSymbols().filter((symbol) =>
      [";", "<", ">", "^", "{", "}"].includes(symbol)
    ),
  ],
  service: [
    [
      ...generateSymbols().filter((symbol) =>
        [";", "<", ">", "^", "{", "}"].includes(symbol)
      ),
    ],
    [generateRandomLatinLetters(101)],
  ],
  price: [
    [
      "test",
      ...generateSymbols().filter((symbol) =>
        [
          ";",
          "<",
          ">",
          "^",
          "{",
          "}",
          "@",
          "!",
          "#",
          "$",
          "%",
          "?",
          "(",
          ")",
          "|",
          "\\",
          "/",
          "`",
          "~",
        ].includes(symbol)
      ),
    ],
    ["1234567890"],
  ],
};
