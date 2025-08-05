import React from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

import FAQ from './FAQ';
import Notice from './Notice';
import Policy from './Policy';

export default function SupportLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav className="w-48 bg-white rounded shadow p-4 mr-6 sticky top-6 h-fit">
        <h1 >고객지원</h1>
        <ul className="space-y-3">
          <li><Link to="faq" className="text-blue-600 hover:underline">FAQ</Link></li>
          <li><Link to="notice" className="text-blue-600 hover:underline">공지사항</Link></li>
          <li><Link to="policy" className="text-blue-600 hover:underline">정책</Link></li>
        </ul>
      </nav>
      <main className="flex-1 bg-white rounded shadow p-6">
        <Routes>
          <Route path="faq/*" element={<FAQ />} />
          <Route path="notice/*" element={<Notice />} />
          <Route path="policy/*" element={<Policy />} />
          <Route path="*" element={<Navigate to="faq" replace />} />
        </Routes>
      </main>
    </div>
  );
}
