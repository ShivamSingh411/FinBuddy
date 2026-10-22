// Service module for FinBuddy
// Structured to easily plug in a Flask API + MySQL database in the future

const API_BASE_URL = import.meta.env.VITE_API_URL || null;

export const api = {
  // Check if real backend is connected
  isBackendConnected: () => Boolean(API_BASE_URL),

  // Transactions
  getTransactions: async (demoData) => {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/transactions`);
      return res.json();
    }
    return Promise.resolve(demoData);
  },

  createTransaction: async (transaction) => {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      return res.json();
    }
    return Promise.resolve({
      ...transaction,
      id: `tx_${Date.now()}`,
      status: 'completed',
    });
  },

  deleteTransaction: async (id) => {
    if (API_BASE_URL) {
      await fetch(`${API_BASE_URL}/transactions/${id}`, { method: 'DELETE' });
    }
    return Promise.resolve({ success: true, id });
  },

  // Budgets
  getBudgets: async (demoBudgets) => {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/budgets`);
      return res.json();
    }
    return Promise.resolve(demoBudgets);
  },

  // Goals
  getGoals: async (demoGoals) => {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/goals`);
      return res.json();
    }
    return Promise.resolve(demoGoals);
  },

  // AI Assistant Query (Structured for future Gemini API via Flask backend)
  askAssistant: async (prompt, financialContext) => {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context: financialContext }),
      });
      return res.json();
    }

    // Client-side intelligent simulation with realistic finance responses
    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = prompt.toLowerCase();
        let reply = '';
        let suggestions = [];

        if (lower.includes('spend') || lower.includes('most') || lower.includes('category')) {
          reply = `Based on your current records, your largest expense category is **Housing & Rent** at $1,750 (61.9% of total outflow), followed by **Dining & Cafes** at $284.00 (10.1%) and **Groceries & Food** at $240.90 (8.5%). 

Your dining spend is currently pacing at 81.1% of its monthly limit. Trimming 2 outside dinners could preserve an extra ~$75 this month.`;
          suggestions = ['How can I lower my dining bill?', 'Show me recurring subscriptions', 'What is my current savings rate?'];
        } else if (lower.includes('save') || lower.includes('more')) {
          reply = `Here are 3 high-impact opportunities in your current budget:
1. **Optimize Subscriptions**: You currently spend ~$50/month across 4 streaming services. Pausing one saves $180/year.
2. **Batch Meal Prep**: Your groceries ($240.90) and dining ($284.00) total $524.90. Shifting 30% of restaurant meals to home-cooked meals yields ~$85/month extra savings.
3. **Automate Paycheck Transfers**: Route $300 immediately upon payday to your Emergency Fund before discretionary spending.`;
          suggestions = ['Simulate this in Future Simulator', 'Set up an emergency budget', 'Check Money Survival Runway'];
        } else if (lower.includes('afford') || lower.includes('buy') || lower.includes('purchase')) {
          reply = `Let's assess affordability using the **FinBuddy 3-Way Rule**:
- **Current Liquid Balance**: ~$11,250 in your safety net.
- **Monthly Net Cash Flow**: Positive +$3,362.40 this month.
- **Goal Impact**: If the purchase is under $350 and paid from your free cash flow (not emergency reserves), your budget easily absorbs it without disrupting your savings trajectory.

Would you like to model this purchase against your upcoming milestone goals?`;
          suggestions = ['Model in Life Event Predictor', 'Check impact on Emergency Fund', 'Add as a planned expense'];
        } else if (lower.includes('runway') || lower.includes('survival') || lower.includes('emergency')) {
          reply = `Your **Money Survival Runway** is currently **4.8 months** on total expenses, or **5.2 months** on bare-essential expenses only (assuming zero new income). 

You have $11,250 in liquid safety reserves against $2,150 in mandatory essential monthly obligations. That is in the **Healthy & Resilient** tier!`;
          suggestions = ['Go to Money Survival Mode', 'Review essential vs optional spending', 'How to reach 6 full months'];
        } else {
          reply = `I have analyzed your October cash flow ($6,192.80 in total inflows vs $2,830.40 total outflows). 

Your financial health is currently rated **Strong (88/100)** with a 54.3% savings rate. How would you like me to assist you with your financial planning today?`;
          suggestions = ['Where did I spend the most?', 'How can I save more?', 'Can I afford a $450 purchase?'];
        }

        resolve({
          reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions,
          isSample: true,
        });
      }, 700);
    });
  },
};
