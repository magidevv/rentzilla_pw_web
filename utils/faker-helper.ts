import { faker } from "@faker-js/faker";

class FakerHelper {
  static generateRandomCombination() {
    return "Test " + faker.color.rgb();
  }
}

export default FakerHelper;
