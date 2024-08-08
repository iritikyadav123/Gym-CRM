const express = require("express");
const router = express.Router();
const expenseController = require("../Controller/expenseController");
const userController = require("../Controller/userController");

// Root route
router.get("/", async (req, res) => {
  const filter = req.query.filter || ""; // Default to empty string if filter is undefined

  try {
    const expenses = await expenseController.getExpenses();
    const users = await userController.getUsers({ filter });
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const totalPayments = users.reduce((acc, user) => acc + user.fee, 0);

    res.render("dashboard", { expenses, users, totalExpenses, totalPayments });
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("Server Error");
  }
});

// Expense routes
router.post("/add-expense", expenseController.addOneTimeExpense);
router.get("/expenses", expenseController.getExpenses);

// User routes
router.post("/add-user", userController.addUser);
router.get("/users", userController.getUsers);

module.exports = router;
