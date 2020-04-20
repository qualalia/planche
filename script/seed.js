"use strict";

const db = require("../server/db");
const { User, CircusClass } = require("../server/db/models");
const { makeLessons, makeCompanies, makeCircusClasses } = require("../script");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({ email: "murphy@email.com", password: "123" }),
    User.create({ email: "cody@email.com", password: "123" }),
    User.create({
      email: "master-coach@email.com",
      password: "123",
      userType: 1,
      displayName: "Master Coach",
      bio: "the very best like no one ever was",
    }),
    User.create({
      email: "aerialista@email.com",
      password: "123",
      userType: 1,
      bio: "will encourage you to brag about burns",
      displayName: "Jenny Aerialist",
    }),
  ]);
  console.log(`seeded ${users.length} users`);

  const coaches = [];
  const students = [];
  const companyStaff = [];
  users.forEach(user => {
    switch (user.userType) {
      case 0:
        students.push(user);
      case 1:
        coaches.push(user);
      case 2:
        companyStaff.push(user);
      default:
        students.push(user);
    }
  });

  console.log("coaches: ", coaches.length);
  console.log("students: ", students.length);
  console.log("company staff: ", companyStaff.length);

  const classes = await makeCircusClasses(coaches);
  const companies = await makeCompanies(coaches, classes);
  const lessons = await makeLessons(classes);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
