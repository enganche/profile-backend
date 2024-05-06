const { User } = require("../models/user.model");
const { searchUsers } = require("./search.controller");

const searchProfile = async (req, res) => {
  const { q } = req.query; // Null check added here
  try {
    const results = await searchUsers(q);
    /*
    const simplifiedResults = results.map(
      ({ userId, name, title, location }) => ({
        userId,
        name,
        title,
        location,
      })
    );
    */
    res.json(results);
  } catch (error) {
    console.error("Error searching profiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userID = req.user.userId;
    const user = await User.findById(userID, {
      avatar: 1,
      email: 1,
      name: 1,
      birth_date: 1,
      location: 1,
      title: 1,
      description: 1,
      link: 1,
      project: 1,
      experience: 1,
      education: 1,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfileByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, {
      avatar: 1,
      email: 1,
      name: 1,
      birth_date: 1,
      location: 1,
      title: 1,
      description: 1,
      link: 1,
      project: 1,
      experience: 1,
      education: 1,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userID = req.user.userId;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(userID, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userID = req.user.userId;
    const deletedUser = await User.findByIdAndDelete(userID);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  getProfileByID,
  updateProfile,
  deleteProfile,
  searchProfile,
};
