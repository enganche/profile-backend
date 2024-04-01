const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: String,
  avatar: String,
  password: { type: String, required: true },
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
      repo: String,
    },
  ],
  experience: [
    {
      role: String,
      organization: String,
      duration: String,
    },
  ],
  education: [
    {
      name: String,
      specialize: String,
      duration: String,
    },
  ],
});

// const UserSchema = mongoose.Schema(
//     {
//         "username": "tuan123",
//         "name": "Nguyen Anh Tuan",
//         "avatar": "image.com",
//         "password": "123",
//         "title": "Dev",
//         "description": "A short paragraph bla bla bla",
//         "link": {
//             "linkedin": "...",
//             "github": "...",
//             "facebook": "...",
//             "x": "...",
//             "instagram": "...",
//             "website": "...",
//             "other": "..."
//         },
//         "project": [
//             {
//                 "name": "Web",
//                 "img": "img-link",
//                 "description": "A short project description bla bla bla",
//                 "repo": "..."
//             }
//         ],
//         "experience": [
//             {
//                 "role": "Lead Developer",
//                 "organization": "NEU",
//                 "duration": "From DATETIME to DATETIME"
//             }
//         ],
//         "education": [
//             {
//                 "name": "NEU",
//                 "specialize": "Information Technology",
//                 "duration": "From DATETIME to DATETIME"
//             }
//         ]
//     }
// );

const User = new mongoose.model("User", UserSchema);

module.exports = User;
