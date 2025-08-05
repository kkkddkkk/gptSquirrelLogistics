// src/pages/Support/Policy/PolicyDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PolicyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialItems = [
    { id: 1, title: '이용약관', content: '이용약관 내용입니다.' },
    { id: 2, title: '개인정보 수집방침', content: '개인정보 관련 내용입니다.' },
  ];

  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const found = initialItems.find(i => i.id === Number(id));
    if (found) {
      setItem(found);
      setTitle(found.title);
      setContent(found.content);
    }
  }, [id]);

  if (!item) {
    return <div>정책을 찾을 수 없습니다.</div>;
  }

  const handleSave = () => {
    alert(`저장: ${title}\n내용: ${content}`);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('정책을 삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
      navigate('/support/policy');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">정책 상세</h2>
      {isEditing ? (
        <>
          <input
            className="border p-2 w-full mb-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목"
          />
          <textarea
            className="border p-2 w-full h-32 mb-2"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용"
          />
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">저장</button>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">취소</button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="mb-4 whitespace-pre-wrap">{item.content || '내용이 없습니다.'}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-400 px-4 py-2 rounded mr-2">수정</button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">삭제</button>
          <button onClick={() => navigate('/support/policy')} className="ml-4 px-4 py-2 border rounded">목록</button>
        </>
      )}
    </div>
  );
}
