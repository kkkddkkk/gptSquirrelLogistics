// src/pages/Support/FAQ/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FAQList from './FAQList.js';
import FAQDetail from './FAQDetail.js';

export default function FAQ() {
  return (
    <Routes>
      <Route path="/" element={<FAQList />} />
      <Route path=":id" element={<FAQDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
