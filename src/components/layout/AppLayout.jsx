import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { TransactionModal } from '../common/TransactionModal';

export const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#EBF2F8] text-slate-800 relative overflow-x-hidden">
      {/* Ambient background glass orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-teal-400/15 blur-[120px] pointer-events-none -z-0" />
      <div className="fixed bottom-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-sky-300/20 blur-[140px] pointer-events-none -z-0" />
      <div className="fixed top-[40%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-300/10 blur-[130px] pointer-events-none -z-0" />

      {/* Deep Navy Glass Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Topbar
          setMobileOpen={setMobileOpen}
          onOpenAddTransaction={() => setIsAddTxOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet context={{ openAddTransaction: () => setIsAddTxOpen(true) }} />
        </main>
      </div>

      {/* Global Transaction Modal */}
      <TransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
      />
    </div>
  );
};
