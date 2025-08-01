// src/pages/Support/Notice/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NoticeDetail from './NoticeDetail';
import NoticeList from './NoticeList';

export default function Notice() {
  return (
    <Routes>
      <Route path="/" element={<NoticeList />} />
      <Route path=":id" element={<NoticeDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}