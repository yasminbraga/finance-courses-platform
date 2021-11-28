const fs = require("fs");
let courses = require("../database");

exports.index = (req, res) => {
  res.render("home", { courses });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const courseFound = courses.find((course) => course.id == id);

  res.render("show", { course: courseFound });
};

exports.create = (req, res) => {
  res.render("create");
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const courseFound = courses.find((course) => course.id == id);

  res.render("edit", { course: courseFound });
};

exports.post = (req, res) => {
  const generateId = Math.floor(Date.now() * Math.random()).toString(36);

  let data = req.body;

  data = {
    id: generateId,
    ...data,
  };

  courses.push(data);

  fs.writeFile(
    "database.json",
    JSON.stringify(courses, null, 2),
    function (err) {
      if (err) return res.send("Write file error!");

      return res.redirect("/");
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.body;
  console.log(id);
  let index = 0;

  const foundCourse = courses.find((course, foundIndex) => {
    if (id == course.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundCourse) return res.send("Curso não encontrado");

  const course = {
    ...foundCourse,
    ...req.body,
    id: req.body.id,
  };

  try {
    courses[index] = course;
    fs.writeFile(
      "database.json",
      JSON.stringify(courses, null, 2),
      function (err) {
        if (err) return res.send("Write file error!");

        return res.redirect(`/courses/${req.body.id}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredCourses = courses.filter((course) => id != course.id);

  courses = filteredCourses;

  fs.writeFile(
    "database.json",
    JSON.stringify(courses, null, 2),
    function (err) {
      if (err) return res.send("Write file error!");

      return res.redirect(`/`);
    }
  );
};
