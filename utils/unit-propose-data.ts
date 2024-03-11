import { generateRandomTextLines } from "./random.util";
import { DateTime } from "luxon";

export const datePeriod = (daysToAdd: number): string => {
  const currentDate = DateTime.now().toFormat("dd.MM.yyyy").toString();
  const endDate = DateTime.now()
    .plus({ days: daysToAdd })
    .toFormat("dd.MM.yyyy")
    .toString();
  return currentDate + " - " + endDate;
};

export const validUnitProposeData: { [key: string]: string } = {
  userName: "Test Test",
  userNameTitle: "Test Test, ФОП",
  fileName: "test.png",
  comment: generateRandomTextLines(6),
};
