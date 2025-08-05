// src/pages/Support/Policy/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PolicyList from './PolicyList';
import PolicyDetail from './PolicyDetail';

export default function Policy() {
  return (
    <Routes>
      <Route path="/" element={<PolicyList />} />
      <Route path=":id" element={<PolicyDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}