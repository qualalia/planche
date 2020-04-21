const { Company } = require("../server/db/models");

module.exports = async function(instructors, classes) {
  const companies = await Promise.all([
    Company.create({
      name: "Kinetic Arts Center",
    }),
    Company.create({
      name: "New England Center for Circus Arts",
    }),
    Company.create({
      name: "Athletic Playground",
    }),
    Company.create({
      name: "Aloft Circus Arts",
    }),
    Company.create({
      name: "Esh Circus Arts",
    }),
  ]);
  console.log(`seeded ${companies.length} companies`);
  return companies;
};
