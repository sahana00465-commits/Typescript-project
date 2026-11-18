"use strict";
/* =========================================================================
   Spendly — a mini expense tracker (starter)
   Fill in every TODO. Your code must compile with `npm run build`
   (tsc, strict mode) with ZERO type errors. Do NOT use `any` to dodge types.
   See TODO.md for the task list and marks.
   ========================================================================= */
/* -------------------------------------------------------------------------
   TASK 1 — Enum (LU: Enums & Tuples)
   TODO: Define a string enum `Category` with: Food, Travel, Bills, Other.
   ------------------------------------------------------------------------- */
var Category;
(function (Category) {
    Category[Category["Food"] = 0] = "Food";
    Category[Category["Travel"] = 1] = "Travel";
    Category[Category["Bills"] = 2] = "Bills";
    Category[Category["Other"] = 3] = "Other";
})(Category || (Category = {}));
/* In-memory store (already typed once you define Expense above). */
const expenses = [];
let nextId = 1;
/* -------------------------------------------------------------------------
   TASK 5 — Type guard / narrowing (LU: Type Guards & Narrowing)
   TODO: Write `toNewExpense` that takes the RAW form strings and either
         returns a valid `NewExpense` or `null`.
         Use typeof / Number checks and verify the category is a real enum
         value. Reject: empty title, non-positive or non-numeric amount,
         invalid category. No `any`.
   ------------------------------------------------------------------------- */
function toNewExpense(titleRaw, amountRaw, categoryRaw) {
    const title = titleRaw.trim();
    const amount = Number(amountRaw);
    const category = Category[categoryRaw];
    if (!title)
        return null;
    if (isNaN(amount) || amount <= 0)
        return null;
    if (category === undefined)
        return null;
    return { title, amount, category };
}
/* -------------------------------------------------------------------------
   TASK 6 — Core logic
   TODO: total()      -> sum of all expense amounts (number)
         breakdown()  -> SummaryRow[] : one [category, total] row per Category
   ------------------------------------------------------------------------- */
function total() {
    let total = 0;
    for (const expense of expenses) {
        total += expense.amount;
    }
    return total;
}
function breakdown() {
    const breakdownMap = {
        [Category.Food]: 0,
        [Category.Travel]: 0,
        [Category.Bills]: 0,
        [Category.Other]: 0
    };
    for (const expense of expenses) {
        breakdownMap[expense.category] += expense.amount;
    }
    return Object.entries(breakdownMap).map(([category, amount]) => [Category[category], amount]);
}
/* -------------------------------------------------------------------------
   TASK 7 — DOM wiring + render (LU: TypeTasks UI, Build & Ship)
   TODO:
     - Grab the form + inputs with getElementById and cast to the right
       HTMLElement types (e.g. `as HTMLInputElement`).
     - On submit: preventDefault, call toNewExpense, show an error message
       if invalid, else push a full Expense (add the id) and re-render.
     - render(): paint the #list, #total, and #breakdown from the data.
   ------------------------------------------------------------------------- */
const form = document.getElementById("expense-form");
function render() {
    const list = document.getElementById("list");
    const totalEl = document.getElementById("total");
    const breakdownEl = document.getElementById("breakdown");
    //*... wire up the submit handler and render() here ...
    /* Call render() once on load so the UI reflects the (empty) state. */
    render();
}
