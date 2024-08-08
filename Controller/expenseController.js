const Expense = require("../Model/expenseModel");

exports.addOneTimeExpense = async (req, res) => {
  const { type, amount, description } = req.body;
  try {
    const expense = new Expense({ type, amount, description });
    await expense.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).send("Server Error");
  }
};

exports.getExpenses = async () => {
  try {
    return await Expense.find();
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Server Error");
  }
};
