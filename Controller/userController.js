const User = require("../Model/userModel");

exports.addUser = async (req, res) => {
  const { name, dob, fee, feeType } = req.body;
  try {
    const user = new User({ name, dob, fee, feeType });
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Server Error");
  }
};

exports.getUsers = async ({ filter } = {}) => {
  let query = {};

  if (filter) {
    switch (filter) {
      case "oneMonth":
        query.feeType = "One Month";
        break;
      case "threeMonths":
        query.feeType = "Three Months";
        break;
      case "oneYear":
        query.feeType = "One Year";
        break;
      default:
        query = {}; // Handle any unexpected filter values
        break;
    }
  }

  try {
    return await User.find(query);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Server Error");
  }
};
