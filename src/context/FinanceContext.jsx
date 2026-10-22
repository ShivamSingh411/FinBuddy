import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_USER,
  INITIAL_CATEGORIES,
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
  INITIAL_GOALS,
  UPCOMING_BILLS,
} from '../services/demoData';
import { getLocaleForCurrency } from '../services/currencyService';

const FinanceContext = createContext(null);

const STORAGE_KEYS = {
  USER: 'finbuddy_user_v2',
  TRANSACTIONS: 'finbuddy_transactions_v2',
  BUDGETS: 'finbuddy_budgets_v2',
  GOALS: 'finbuddy_goals_v2',
};

export const FinanceProvider = ({ children }) => {
  // Initialize state with localStorage fallbacks to demo data
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (!saved) return INITIAL_USER;
    try {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_USER, ...parsed };
    } catch {
      return INITIAL_USER;
    }
  });

  const [categories] = useState(INITIAL_CATEGORIES);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [upcomingBills] = useState(UPCOMING_BILLS);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  // Currency Formatter — uses locale-aware formatting (en-IN for ₹1,25,000.00)
  const formatCurrency = (amount, includeSign = false) => {
    const currCode = user.currency || 'INR';
    const currSymbol = user.currencySymbol || '₹';
    const locale = getLocaleForCurrency(currCode);
    const num = Math.abs(Number(amount) || 0);

    let formatted;
    try {
      formatted = `${currSymbol}${num.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } catch {
      formatted = `${currSymbol}${num.toFixed(2)}`;
    }

    if (!includeSign) return formatted;
    return amount < 0 ? `-${formatted}` : `+${formatted}`;
  };

  // Financial Calculations
  const metrics = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const catMap = {};

    transactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        income += amt;
      } else {
        expenses += amt;
        catMap[tx.categoryName] = (catMap[tx.categoryName] || 0) + amt;
      }
    });

    const netSavings = income - expenses;
    const savingsRate = income > 0 ? Math.round((netSavings / income) * 100) : 0;

    // Essential vs Optional calculation based on budget definitions
    let essential = 0;
    let optional = 0;
    budgets.forEach((b) => {
      if (b.isEssential) {
        essential += Number(b.spent) || 0;
      } else {
        optional += Number(b.spent) || 0;
      }
    });

    // Total Savings Target vs Total Saved
    const totalGoalsTarget = goals.reduce((acc, g) => acc + (Number(g.targetAmount) || 0), 0);
    const totalGoalsSaved = goals.reduce((acc, g) => acc + (Number(g.savedAmount) || 0), 0);
    const overallGoalsProgress =
      totalGoalsTarget > 0 ? Math.round((totalGoalsSaved / totalGoalsTarget) * 100) : 0;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      netSavings,
      savingsRate,
      categorySpendMap: catMap,
      essentialExpenses: essential || 45800,
      optionalExpenses: optional || 10999,
      totalGoalsTarget,
      totalGoalsSaved,
      overallGoalsProgress,
    };
  }, [transactions, budgets, goals]);

  // Transaction Actions
  const addTransaction = (newTx) => {
    const tx = {
      ...newTx,
      id: `tx_${Date.now()}`,
      date: newTx.date || new Date().toISOString().split('T')[0],
      status: 'completed',
    };
    setTransactions((prev) => [tx, ...prev]);

    // Automatically update related budget spent amount if expense
    if (tx.type === 'expense') {
      setBudgets((prev) =>
        prev.map((b) => {
          if (b.categoryId === tx.category || b.categoryName === tx.categoryName) {
            return { ...b, spent: Number(b.spent || 0) + Number(tx.amount) };
          }
          return b;
        })
      );
    }
    return tx;
  };

  const editTransaction = (id, updatedFields) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedFields } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // Budget Actions
  const updateBudget = (id, newAllocated) => {
    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, allocated: Number(newAllocated) } : b))
    );
  };

  const addBudget = (budgetData) => {
    const b = {
      ...budgetData,
      id: `bgt_${Date.now()}`,
      spent: 0,
    };
    setBudgets((prev) => [...prev, b]);
    return b;
  };

  const deleteBudget = (id) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  // Goal Actions
  const addGoal = (goalData) => {
    const g = {
      ...goalData,
      id: `goal_${Date.now()}`,
      savedAmount: Number(goalData.savedAmount) || 0,
      targetAmount: Number(goalData.targetAmount) || 10000,
    };
    setGoals((prev) => [...prev, g]);
    return g;
  };

  const addContribution = (goalId, amount) => {
    const addAmt = Number(amount) || 0;
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const updated = Number(g.savedAmount) + addAmt;
          return { ...g, savedAmount: updated };
        }
        return g;
      })
    );
  };

  const updateGoal = (id, updatedFields) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updatedFields } : g))
    );
  };

  // User Preferences
  const updateUserPreferences = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.BUDGETS);
    localStorage.removeItem(STORAGE_KEYS.GOALS);
    setUser(INITIAL_USER);
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    setGoals(INITIAL_GOALS);
  };

  return (
    <FinanceContext.Provider
      value={{
        user,
        categories,
        transactions,
        budgets,
        goals,
        upcomingBills,
        metrics,
        formatCurrency,
        addTransaction,
        editTransaction,
        deleteTransaction,
        updateBudget,
        addBudget,
        deleteBudget,
        addGoal,
        addContribution,
        updateGoal,
        updateUserPreferences,
        resetToDemoData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
