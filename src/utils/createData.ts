import { faker } from "@faker-js/faker";

const newPerson = (index: number): any => {
  return {
    id: index,
    full_name: faker.name.fullName(),
    email: faker.internet.email(),
    team: faker.helpers.arrayElement(["Academic", "People Skill", "Admission"]),
    role: faker.helpers.arrayElement(["Default", "Admin"]),
    status: faker.helpers.arrayElement(["Active", "Not-Active", "Deleted"]),
  };
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function makeData(...lens: any[]) {
  const makeDataLevel = (depth = 0): any[] => {
    const len = lens[depth]!;
    return range(len).map((val, index): any => {
      return {
        ...newPerson(index + 1),
      };
    });
  };

  return makeDataLevel();
}
