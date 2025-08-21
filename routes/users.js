const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Certificate = require("../models/Certificate");
const Course = require("../models/Course");

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Enroll in a course
router.post("/enroll/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { courseId } = req.body;

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();

      const course = await Course.findById(courseId);
      await Certificate.create({
        userId: user._id,
        courseTitle: course.title,
        certificateURL: `https://example.com/certificates/${course.title.replace(/ /g,"_")}.pdf`,
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
