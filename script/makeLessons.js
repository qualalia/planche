const { Lesson } = require("../server/db/models");

module.exports = async function(circusClasses) {
  const handstandsClass = circusClasses.find(cc => cc.title === "Handstands");
  const advBegSilks = circusClasses.find(
    cc => cc.title === "Advanced Beginning Silks"
  );
  const upperBackFlex = circusClasses.find(
    cc => cc.title === "Upper Back Flexibility"
  );

  const lessons = await Promise.all([
    Lesson.create({
      startTime: new Date("April 18, 2020 9:00:00"),
      endTime: new Date("April 18, 2020 10:00:00"),
      circusClassId: advBegSilks.id,
      cap: 8,
      instructorId: advBegSilks.instructorId,
    }),
    Lesson.create({
      cap: 10,
      startTime: new Date("April 18, 2020 14:00:00"),
      endTime: new Date("April 18, 2020 14:45:00"),
      circusClassId: upperBackFlex.id,
      instructorId: upperBackFlex.instructorId,
    }),
    Lesson.create({
      startTime: new Date("April 18, 2020 18:00:00"),
      endTime: new Date("April 18, 2020 19:15:00"),
      cap: 7,
      circusClassId: handstandsClass.id,
      instructorId: handstandsClass.instructorId,
    }),
    Lesson.create({
      startTime: new Date("April 20, 2020 19:00:00"),
      endTime: new Date("April 20, 2020 20:30:00"),
      cap: 8,
      circusClassId: advBegSilks.id,
      instructorId: advBegSilks.instructorId,
    }),
    Lesson.create({
      startTime: new Date("April 19, 2020 9:00:00"),
      endTime: new Date("April 19, 2020 10:00:00"),
      cap: 8,
      circusClassId: advBegSilks.id,
      instructorId: advBegSilks.instructorId,
    }),
    Lesson.create({
      cap: 8,
      startTime: new Date("April 19, 2020 14:30:00"),
      endTime: new Date("April 19, 2020 15:30:00"),
      circusClassId: advBegSilks.id,
      instructorId: advBegSilks.instructorId,
    }),
  ]);
  console.log(`seeded ${lessons.length} lessons`);
  return lessons;
};
