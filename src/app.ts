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
enum Category {
  Food,
  Travel,
  Bills,
  Other
}

/* -------------------------------------------------------------------------
   TASK 2 — Model type (LU: TypeTasks Model & Types)
   TODO: Define an `Expense` interface/type with:
         id: number, title: string, amount: number, category: Category
   ------------------------------------------------------------------------- */
    interface Expense {
      id: number;
      title: string;
      amount: number;
      category: Category;
     }

/* -------------------------------------------------------------------------
   TASK 3 — Utility types (LU: Utility Types)
   TODO: Using the utility types, declare:
         - NewExpense = Omit<Expense, "id">        // what the form produces
         - Breakdown  = Record<Category, number>    // per-category totals
         - (one more) Partial<Expense> OR Pick<...> used somewhere sensible
   ------------------------------------------------------------------------- */
type NewExpense = Omit<Expense, "id">;
type Breakdown  = Record<Category, number>;

/* -------------------------------------------------------------------------
   TASK 4 — Tuple (LU: Enums & Tuples)
   TODO: Define a tuple type `SummaryRow` = [Category, number]
         (used to return each breakdown row).
   ------------------------------------------------------------------------- */
type SummaryRow = [Category, number];

/* In-memory store (already typed once you define Expense above). */
const expenses: Expense[] = [];
let nextId = 1;

/* -------------------------------------------------------------------------
   TASK 5 — Type guard / narrowing (LU: Type Guards & Narrowing)
   TODO: Write `toNewExpense` that takes the RAW form strings and either
         returns a valid `NewExpense` or `null`.
         Use typeof / Number checks and verify the category is a real enum
         value. Reject: empty title, non-positive or non-numeric amount,
         invalid category. No `any`.
   ------------------------------------------------------------------------- */
function toNewExpense(titleRaw: string, amountRaw: string, categoryRaw: string): NewExpense | null {
  const title = titleRaw.trim();
  const amount = Number(amountRaw);
  const category = Category[categoryRaw as keyof typeof Category];
  if (!title) return null;
  if (isNaN(amount) || amount <= 0) return null;
  if (category === undefined) return null;
  return { title, amount, category };
}
/* -------------------------------------------------------------------------
   TASK 6 — Core logic
   TODO: total()      -> sum of all expense amounts (number)
         breakdown()  -> SummaryRow[] : one [category, total] row per Category
   ------------------------------------------------------------------------- */
 function total(): number { 
   let total = 0;
   for (const expense of expenses) {
     total += expense.amount;
   }
   return total;
 }
function breakdown(): SummaryRow[] {
   const breakdownMap: Breakdown = {
      [Category.Food]: 0,
      [Category.Travel]: 0,
      [Category.Bills]: 0,
      [Category.Other]: 0
   };
   for (const expense of expenses) {
      breakdownMap[expense.category] += expense.amount;
   }
   return Object.entries(breakdownMap).map(([category, amount]) => [Category[category as keyof typeof Category], amount] as SummaryRow);
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
const form = document.getElementById("expense-form") as HTMLFormElement;
 function render(): void {
   const list = document.getElementById("list") as HTMLUListElement;
   const totalEl = document.getElementById("total") as HTMLSpanElement;
   const breakdownEl = document.getElementById("breakdown") as HTMLUListElement;
 //*... wire up the submit handler and render() here ...

/* Call render() once on load so the UI reflects the (empty) state. */
 render();
 }
