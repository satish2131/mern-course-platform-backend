const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Course = require("./models/Course");
const Certificate = require("./models/Certificate");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

async function seed() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Certificate.deleteMany({});

    // Create sample courses
    const courses = await Course.insertMany([
      { title: "HTML, CSS, JS", description: "Front-end basics", duration: "2 weeks"},
      { title: "Python Programming", description: "Python basics", duration: "3 weeks"},
      { title: "Machine Learning", description: "ML with Python", duration: "4 weeks" },
      { title: "AWS Cloud Foundations", description: "AWS basics", duration: "2 weeks"},
    ]);

    // Create a test user
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      enrolledCourses: [],
    });

    // Enroll user in first course and create certificate
    user.enrolledCourses.push(courses[0]._id);
    await user.save();

    await Certificate.create({
      userId: user._id,
      courseTitle: courses[0].title,
      certificateURL: "https://example.com/certificates/html-css-js.pdf",
    });

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();
