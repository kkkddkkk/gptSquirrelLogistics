// src/pages/Support/Policy/PolicyList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PolicyList() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([
    { id: 1, title: '이용약관', content: '이용약관 내용입니다.' },
    { id: 2, title: '개인정보 수집방침', content: '개인정보 관련 내용입니다.' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('정책을 삭제하시겠습니까?')) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = policies.length ? Math.max(...policies.map(i => i.id)) + 1 : 1;
    const newPolicy = { id: newId, title: `새 정책 ${newId}`, content: '' };
    setPolicies([newPolicy, ...policies]);
    navigate(`./${newId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">정책 목록</h2>
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        정책 등록
      </button>
      <ul>
        {policies.map(({ id, title }) => (
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
