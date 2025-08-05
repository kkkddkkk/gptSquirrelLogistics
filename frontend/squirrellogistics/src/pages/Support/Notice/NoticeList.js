// src/pages/Support/Notice/NoticeList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoticeList() {
  const navigate = useNavigate();
  const [noticeItems, setNoticeItems] = useState([
    { id: 1, title: '시스템 점검 안내', content: '2025년 8월 1일 시스템 점검이 예정되어 있습니다.' },
    { id: 2, title: '신규 서비스 출시', content: '새로운 물류 서비스가 추가되었습니다.' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('공지사항을 삭제하시겠습니까?')) {
      setNoticeItems(noticeItems.filter(i => i.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = noticeItems.length ? Math.max(...noticeItems.map(i => i.id)) + 1 : 1;
    const newItem = { id: newId, title: `새 공지 ${newId}`, content: '' };
    setNoticeItems([newItem, ...noticeItems]);
    navigate(`./${newId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">공지사항 목록</h2>
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        공지 등록
      </button>
      <ul>
        {noticeItems.map(({ id, title }) => (
          <li
            key={id}
            className="flex justify-between border-b py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`./${id}`)}
          >
            <span>{title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
              className="text-red-600 hover:underline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
