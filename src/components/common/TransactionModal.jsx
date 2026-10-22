import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useFinance } from '../../context/FinanceContext';
import { useToast } from '../../context/ToastContext';

export const TransactionModal = ({
  isOpen,
  onClose,
  initialData = null,
}) => {
  const { categories, addTransaction, editTransaction } = useFinance();
  const { addToast } = useToast();

  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || 'expense');
      setDescription(initialData.description || '');
      setAmount(initialData.amount ? String(initialData.amount) : '');
      setCategory(initialData.category || '');
      setDate(initialData.date || new Date().toISOString().split('T')[0]);
      setPaymentMethod(initialData.paymentMethod || 'Credit Card');
      setNote(initialData.note || '');
    } else {
      setType('expense');
      setDescription('');
      setAmount('');
      const defaultCat = categories.find((c) =>
        type === 'income' ? c.id.startsWith('cat_income') : !c.id.startsWith('cat_income')
      );
      setCategory(defaultCat ? defaultCat.id : '');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('Credit Card');
      setNote('');
    }
    setErrors({});
  }, [initialData, isOpen, categories]);

  // Adjust category selection when type toggles
  const handleTypeChange = (newType) => {
    setType(newType);
    const validCat = categories.find((c) =>
      newType === 'income' ? c.id.startsWith('cat_income') : !c.id.startsWith('cat_income')
    );
    if (validCat) setCategory(validCat.id);
  };

  const validate = () => {
    const errs = {};
    if (!description.trim()) errs.description = 'Description is required';
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errs.amount = 'Please enter a valid amount greater than 0';
    }
    if (!category) errs.category = 'Please select a category';
    if (!date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const selectedCatObj = categories.find((c) => c.id === category);

    const payload = {
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category,
      categoryName: selectedCatObj ? selectedCatObj.name : 'General',
      date,
      paymentMethod,
      note: note.trim(),
    };

    setTimeout(() => {
      if (initialData && initialData.id) {
        editTransaction(initialData.id, payload);
        addToast('Transaction successfully updated!', 'success');
      } else {
        addTransaction(payload);
        addToast(
          `${type === 'income' ? 'Income' : 'Expense'} of $${parseFloat(amount).toFixed(2)} recorded!`,
          'success'
        );
      }
      setLoading(false);
      onClose();
    }, 300);
  };

  const filteredCategories = categories.filter((c) =>
    type === 'income' ? c.id.startsWith('cat_income') : !c.id.startsWith('cat_income')
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Transaction' : 'Record Transaction'}
      subtitle="Keep your financial records accurate and categorised"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle: Income vs Expense */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-200/50 neu-inset">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              type === 'expense'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              type === 'income'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Income
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Amount ($ USD) *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
              $
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 text-sm font-semibold rounded-2xl glass-input"
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description *
          </label>
          <input
            type="text"
            placeholder="e.g. Whole Foods Groceries, Client Retainer"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input"
          />
          {errors.description && (
            <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category & Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white"
            >
              <option value="">Select Category</option>
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-rose-500 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Direct Deposit">Direct Deposit</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white"
          />
          {errors.date && (
            <p className="text-xs text-rose-500 mt-1">{errors.date}</p>
          )}
        </div>

        {/* Note (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notes / Memo (Optional)
          </label>
          <input
            type="text"
            placeholder="Add context or tags..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 text-xs sm:text-sm rounded-2xl glass-input"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
          >
            {initialData ? 'Update Record' : 'Save Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
