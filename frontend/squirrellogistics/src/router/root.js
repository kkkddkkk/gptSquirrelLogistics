// src/router/root.js

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import estimateRouter from "./estimate/estimateRouter";

const Loading = <div>로딩 중...</div>;

// ✅ EstimatePage 컴포넌트를 lazy 로드
const EstimatePage = lazy(() => import("../pages/estimate/EstimatePage"));

const root = createBrowserRouter([
  {
    path: "/", 
    element: <Suspense fallback={Loading}><EstimatePage /></Suspense>
  },
  {
    path: "/estimate", 
    element: <Suspense fallback={Loading}><EstimatePage /></Suspense>
  }
]);

export default root;
