"use strict";

const db = require("../server/db");
const { User, CircusClass } = require("../server/db/models");

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
  users.forEach(user => {
    if (user.userType > 0) coaches.push(user);
    else students.push(user);
  });

  console.log("c: ", coaches.length);
  console.log("s: ", students.length);

  const aerialista = coaches.find(
    coach => coach.displayName === "Jenny Aerialist"
  );
  const masterTrainer = coaches.find(
    coach => coach.displayName === "Master Coach"
  );

  const circusClasses = await Promise.all([
    CircusClass.create({
      title: "Advanced Beginning Silks",
      description:
        "Great for those who can invert comfortably in the air and do not ask to do double stars every class.",
      cap: 8,
      instructorId: aerialista.id,
      startTime: new Date("April 18, 2020 9:00:00"),
      endTime: new Date("April 18, 2020 10:00:00"),
    }),
    CircusClass.create({
      title: "Upper Back Flexibility",
      description: "Get rid of that quarantine hunchback.",
      cap: 10,
      instructorId: masterTrainer.id,
      startTime: new Date("April 18, 2020 14:00:00"),
      endTime: new Date("April 18, 2020 14:45:00"),
    }),
    CircusClass.create({
      title: "Handstands",
      description: "for a better profile pic",
      cap: 7,
      instructorId: masterTrainer.id,
      startTime: new Date("April 18, 2020 18:00:00"),
      endTime: new Date("April 18, 2020 19:15:00"),
    }),
  ]);
  console.log(`seeded ${circusClasses.length} classes`);

  const handstandsClass = circusClasses.find(cc => cc.title === "Handstands");

  await handstandsClass.setUsers(students);

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
