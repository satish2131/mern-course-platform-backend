const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const User = require("../models/User");
const Certificate = require("../models/Certificate");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Enroll in course
router.post("/:id/enroll", async (req, res) => {
  const { userId } = req.body;
  const courseId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User not found");

  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    await user.save();

    // Add a certificate for user
    const course = await Course.findById(courseId);
    const certificate = new Certificate({
      userId,
      courseTitle: course.title,
      certificateURL: `https://example.com/certificates/${course.title}.pdf`
    });
    await certificate.save();
  }

  res.send("Enrolled successfully");
});

module.exports = router;
