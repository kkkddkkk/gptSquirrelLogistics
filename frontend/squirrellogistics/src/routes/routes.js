import { BrowserRouter, Routes } from 'react-router-dom';
import NoticeRoutes from '.';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {NoticeRoutes()}
        {/* OtherRoutes() 등 추가 가능 */}
      </Routes>
    </BrowserRouter>
  );
}
