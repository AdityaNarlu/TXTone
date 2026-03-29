import React from 'react';
import { Outlet } from 'react-router-dom';
import FloatingNav from './FloatingNav';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 pb-24">
        <Outlet />
      </main>
      <AppFooter />
      <FloatingNav />
    </div>
  );
}
