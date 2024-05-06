const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  account_type: { type: String, required: true },
  name: String,
  birth_date: Date,
  avatar: String,
  location: String,
  gender: String,
  title: String,
  description: String,
  link: {
    linkedin: String,
    github: String,
    facebook: String,
    x: String,
    instagram: String,
    website: String,
    other: String,
  },
  project: [
    {
      name: String,
      img: String,
      description: String,
      link: String,
      year: String,
    },
  ],
  experience: [
    {
      role: String,
      organization: String,
      start_date: String,
      end_date: String,
    },
  ],
  education: [
    {
      name: String,
      specialize: String,
      start_date: String,
      end_date: String,
    },
  ],
});

const User = new mongoose.model("User", UserSchema);

/*
const users = [
  {
    username: "user1",
    email: "user1@gmail.com",
    password: "$2b$10$eR.FYPy5lje411KYffyRCepOBd82j4ZuAh5PtMpePs9lNuvbGpIv2",
    account_type: "user",
    name: "Phùng Lê Minh",
    birth_date: new Date("2003-10-28"),
    avatar: "avatar1.jpg",
    location: "Ha Long, Vietnam",
    gender: "Male",
    title: "Software Engineer",
    description:
      "Experienced software engineer with expertise in web development.",
    link: {
      linkedin: "https://linkedin.com/phungleminh",
      github: "https://github.com/phungleminh",
      facebook: "https://facebook.com/phungleminh",
      x: "",
      instagram: "https://instagram.com/phungleminh",
      website: "https://phungleminh.com",
      other: "",
    },
    project: [
      {
        name: "E-commerce Website",
        img: "project1.jpg",
        description:
          "Developed a responsive e-commerce website using MERN stack.",
        link: "https://github.com/phungleminh/e-commerce",
        year: "2021",
      },
    ],
    experience: [
      {
        role: "Freelancer",
        organization: "",
        start_date: "Jan 2020",
        end_date: "Present",
      },
    ],
    education: [
      {
        name: "National Economics University",
        specialize: "Information Technology",
        start_date: "2021",
        end_date: "2025",
      },
    ],
  },
  {
    username: "user2",
    email: "user2@gmail.com",
    password: "$2b$10$/fiW0ZW0RtzVIPXVpBX87.Rp4ccPU.EdKvc/gOC2tMNLVqakBUk1q",
    account_type: "user",
    name: "Nguyễn Anh Tuấn",
    birth_date: new Date("2003-12-03"),
    avatar: "avatar2.jpg",
    location: "Ha Noi, Vietnam",
    gender: "Male",
    title: "Web Developer",
    description:
      "Passionate web developer with experience in front-end technologies.",
    link: {
      linkedin: "https://linkedin.com/nguyenanhtuan",
      github: "https://github.com/nguyenanhtuan",
      facebook: "https://facebook.com/nguyenanhtuan",
      x: "",
      instagram: "",
      website: "",
      other: "",
    },
    project: [
      {
        name: "Portfolio Website",
        img: "project2.jpg",
        description:
          "Designed and developed a personal portfolio website showcasing my projects and skills.",
        link: "https://github.com/nguyenanhtuan/portfolio",
        year: "2020",
      },
    ],
    experience: [
      {
        role: "Frontend Developer",
        organization: "XYZ Web Solutions",
        start_date: "Mar 2023",
        end_date: "Present",
      },
    ],
    education: [
      {
        name: "National Economics University",
        specialize: "Information Technology",
        start_date: "2021",
        end_date: "2025",
      },
    ],
  },
  {
    username: "user3",
    email: "user3@gmail.com",
    password: "$2b$10$F0/Ec2Yy12VH1YZuIuLnVeLdreaspBQDtScRT1vH58z2WG/X4pMn6",
    account_type: "user",
    name: "Nguyễn Hồng Quân",
    birth_date: new Date("2003-12-08"),
    avatar: "avatar3.jpg",
    location: "Ha Noi, Vietnam",
    gender: "Male",
    title: "Web Developer",
    description:
      "Passionate web developer with experience in back-end technologies.",
    link: {
      linkedin: "https://linkedin.com/nguyenhongquan",
      github: "https://github.com/nguyenhongquan",
      facebook: "https://facebook.com/nguyenhongquan",
      x: "",
      instagram: "",
      website: "",
      other: "",
    },
    project: [
      {
        name: "Portfolio Website",
        img: "project3.jpg",
        description:
          "Designed and developed a personal portfolio website showcasing my projects and skills.",
        link: "https://github.com/nguyenhongquan/portfolio",
        year: "2020",
      },
    ],
    experience: [
      {
        role: "Backend Developer",
        organization: "ABC Web Solutions",
        start_date: "Mar 2023",
        end_date: "Present",
      },
    ],
    education: [
      {
        name: "National Economics University",
        specialize: "Information Technology",
        start_date: "2021",
        end_date: "2025",
      },
    ],
  },
  {
    username: "user4",
    email: "user4@gmail.com",
    password: "$2b$10$xGpreqMdBpW5Q9ySQeZiAOARCrgKDfYdbAM7c38nXHgc79KgS9bzG",
    account_type: "user",
    name: "Ca Phương Ngọc",
    birth_date: new Date("2002-04-20"),
    avatar: "avatar4.jpg",
    location: "Thanh Hoa, Vietnam",
    gender: "Female",
    title: "Graphic Designer",
    description:
      "Creative graphic designer with a passion for visual storytelling.",
    link: {
      linkedin: "https://linkedin.com/caphuongngoc",
      github: "",
      facebook: "https://facebook.com/caphuongngoc",
      x: "",
      instagram: "https://instagram.com/caphuongngoc",
      website: "",
      other: "https://behance.com/caphuongngoc",
    },
    project: [
      {
        name: "Brand Identity Design",
        img: "project4.jpg",
        description:
          "Designed brand identity including logo, color scheme, and typography for a startup.",
        link: "https://behance.com/caphuongngoc",
        year: "2021",
      },
    ],
    experience: [
      {
        role: "Graphic Designer",
        organization: "Design Studio XYZ",
        start_date: "Jan 2022",
        end_date: "Present",
      },
    ],
    education: [
      {
        name: "School of Visual Arts",
        specialize: "Graphic Design",
        start_date: "2020",
        end_date: "2024",
      },
    ],
  },
  {
    username: "user5",
    email: "user5@gmail.com",
    password: "$2b$10$W6eEU/iimZyB08xdmC8xWuLvG1cBUZoADd/3XZs8UDxNAsmVE5XDO",
    account_type: "user",
    name: "Dương Mai Hương",
    birth_date: new Date("2002-07-24"),
    avatar: "avatar5.jpg",
    location: "Bac Giang, Vietnam",
    gender: "Female",
    title:
      "Detail-oriented accountant with experience in financial analysis and reporting.",
    description:
      "Passionate web developer with experience in back-end technologies.",
    link: {
      linkedin: "https://linkedin.com/duongmaihuong",
      github: "",
      facebook: "https://facebook.com/duongmaihuong",
      x: "",
      instagram: "",
      website: "",
      other: "",
    },
    project: [],
    experience: [
      {
        role: "Accountant",
        organization: "ABC Accounting Firm",
        start_date: "Jan 2023",
        end_date: "Present",
      },
    ],
    education: [
      {
        name: "Foreign Trade University",
        specialize: "Accounting",
        start_date: "2020",
        end_date: "2024",
      },
    ],
  },
  // Add more users as needed...
];

// Create users in the database
User.insertMany(users)
  .then(() => {
    console.log("Users created successfully");
    // Close database connection if necessary
  })
  .catch((error) => {
    console.error("Error creating users:", error);
    // Handle error
  });
*/

module.exports = { User };
