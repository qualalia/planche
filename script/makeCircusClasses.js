const { CircusClass } = require("../server/db/models");

module.exports = async function(instructors) {
  const aerialista = instructors.find(
    coach => coach.displayName === "Jenny Aerialist"
  );
  const masterTrainer = instructors.find(
    coach => coach.displayName === "Master Coach"
  );

  const circusClasses = await Promise.all([
    CircusClass.create({
      title: "Advanced Beginning Silks",
      description:
        "Great for those who can invert comfortably in the air and do not ask to do double stars every class.",
      instructorId: aerialista.id,
    }),
    CircusClass.create({
      title: "Upper Back Flexibility",
      description: "Get rid of that quarantine hunchback.",
      instructorId: masterTrainer.id,
    }),
    CircusClass.create({
      title: "Handstands",
      description: "for a better profile pic",
      instructorId: masterTrainer.id,
    }),
  ]);
  console.log(`seeded ${circusClasses.length} classes`);
  return circusClasses;
};
