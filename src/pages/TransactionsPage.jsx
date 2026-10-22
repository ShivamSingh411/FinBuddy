import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Trash2,
  Edit2,
  Download,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { TransactionModal } from '../components/common/TransactionModal';

export const TransactionsPage = () => {
  const { transactions, categories, deleteTransaction, formatCurrency } = useFinance();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'amt-desc' | 'amt-asc'

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Pagination
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered & Sorted Transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // Search filter
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          tx.description.toLowerCase().includes(q) ||
          (tx.categoryName && tx.categoryName.toLowerCase().includes(q)) ||
          (tx.paymentMethod && tx.paymentMethod.toLowerCase().includes(q)) ||
          (tx.note && tx.note.toLowerCase().includes(q));

        // Type filter
        const matchesType = typeFilter === 'all' || tx.type === typeFilter;

        // Category filter
        const matchesCategory =
          categoryFilter === 'all' || tx.category === categoryFilter || tx.categoryName === categoryFilter;

        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amt-desc') return Number(b.amount) - Number(a.amount);
        if (sortBy === 'amt-asc') return Number(a.amount) - Number(b.amount);
        return 0;
      });
  }, [transactions, searchQuery, typeFilter, categoryFilter, sortBy]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Total metrics of currently filtered subset
  const filteredMetrics = useMemo(() => {
    let inc = 0;
    let exp = 0;
    filteredTransactions.forEach((tx) => {
      const a = Number(tx.amount) || 0;
      if (tx.type === 'income') inc += a;
      else exp += a;
    });
    return { income: inc, expenses: exp, net: inc - exp };
  }, [filteredTransactions]);

  const confirmDelete = () => {
    if (deletingId) {
      deleteTransaction(deletingId);
      addToast('Transaction removed successfully', 'info');
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      addToast('No transactions to export', 'error');
      return;
    }
    const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount', 'Payment Method', 'Notes'];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      tx.date,
      `"${tx.description.replace(/"/g, '""')}"`,
      `"${tx.categoryName || ''}"`,
      tx.type,
      tx.amount,
      tx.paymentMethod || '',
      `"${(tx.note || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FinBuddy_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV file downloaded successfully', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Transactions Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search, filter, update, and manage all your historical cash movements.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            icon={Download}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
            className="shadow-lg shadow-teal-500/20"
          >
            New Transaction
          </Button>
        </div>
      </div>

      {/* Filtered Subset Quick Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel-subtle border border-white/80">
          <span className="text-xs font-semibold text-slate-500">Filtered Inflow</span>
          <div className="text-xl font-bold text-emerald-600 font-heading mt-1">
            +{formatCurrency(filteredMetrics.income)}
          </div>
        </div>
        <div className="p-4 rounded-2xl glass-panel-subtle border border-white/80">
          <span className="text-xs font-semibold text-slate-500">Filtered Outflow</span>
          <div className="text-xl font-bold text-slate-800 font-heading mt-1">
            -{formatCurrency(filteredMetrics.expenses)}
          </div>
        </div>
        <div className="p-4 rounded-2xl glass-panel-subtle border border-white/80">
          <span className="text-xs font-semibold text-slate-500">Net Flow (Filtered)</span>
          <div
            className={`text-xl font-bold font-heading mt-1 ${
              filteredMetrics.net >= 0 ? 'text-teal-700' : 'text-rose-600'
            }`}
          >
            {formatCurrency(filteredMetrics.net, true)}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <GlassCard className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by description or note..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white cursor-pointer"
            >
              <option value="all">All Flow Types</option>
              <option value="expense">Expenses Only</option>
              <option value="income">Income Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Order */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white cursor-pointer"
            >
              <option value="date-desc">Newest Date First</option>
              <option value="date-asc">Oldest Date First</option>
              <option value="amt-desc">Highest Amount First</option>
              <option value="amt-asc">Lowest Amount First</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Transactions Table / List */}
      <GlassCard className="p-0 overflow-hidden">
        {paginatedTransactions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-200/50 text-slate-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No matching transactions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria, clear category filters, or add a new transaction.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setCategoryFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/70 bg-white/40 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Description</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Payment Method</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                {paginatedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-white/50 transition-colors group"
                  >
                    {/* Description & icon */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                            tx.type === 'income'
                              ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25'
                              : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                          }`}
                        >
                          {tx.type === 'income' ? (
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{tx.description}</p>
                          {tx.note && (
                            <p className="text-[11px] text-slate-500 truncate max-w-xs">
                              {tx.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <Badge variant={tx.type === 'income' ? 'emerald' : 'slate'} size="sm">
                        {tx.categoryName || 'General'}
                      </Badge>
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {tx.paymentMethod || 'Manual Entry'}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                      {tx.date}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right font-bold font-mono">
                      <span
                        className={
                          tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                        }
                      >
                        {tx.type === 'income' ? '+' : '-'}
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                        <button
                          onClick={() => setEditingTransaction(tx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-white/80 transition-colors"
                          title="Edit transaction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(tx.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && (
          <div className="p-4 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Showing{' '}
              <span className="font-semibold text-slate-800">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-slate-800">
                {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-800">{filteredTransactions.length}</span>{' '}
              entries
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="px-3 py-1 text-slate-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Edit Transaction Modal */}
      {editingTransaction && (
        <TransactionModal
          isOpen={Boolean(editingTransaction)}
          onClose={() => setEditingTransaction(null)}
          initialData={editingTransaction}
        />
      )}

      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        title="Delete Transaction"
        subtitle="This action cannot be undone."
      >
        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to remove this record from your transaction history? Your budget spent balances will adjust automatically.
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="md" onClick={() => setDeletingId(null)}>
            Cancel
          </Button>
          <Button variant="danger" size="md" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
