export interface Expense {
    id?: string; // Optional ID for existing expenses
    category: string;
    remarks: string;
    amount: number;
    expenseDate: Date;
  }

  
export interface ExpenseCategory {
    id: number;
    name: string;
    icon: string; // You can store the icon class or URL for an icon
}