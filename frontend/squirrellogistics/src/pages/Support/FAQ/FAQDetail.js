// FAQDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FAQDetail({ faqItems, onUpdate, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const faqId = Number(id);

  const item = faqItems.find(i => i.id === faqId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setContent(item.content);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
        <div className="max-w-3xl w-full p-6 bg-white rounded-md shadow-md text-center">
          <p className="text-gray-700 text-lg">FAQ를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/support/faq')}
            className="mt-4 px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdate(faqId, title, content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('FAQ를 삭제하시겠습니까?')) {
      onDelete(faqId);
      navigate('/support/faq');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-3xl w-full p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">FAQ 상세</h2>
        {isEditing ? (
          <>
            <input
              className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="제목"
            />
            <textarea
              className="border border-gray-300 p-3 w-full rounded h-40 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="내용"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold shadow"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTitle(item.title);
                  setContent(item.content);
                }}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">{item.title || '(제목 없음)'}</h3>
            <p className="mb-8 whitespace-pre-wrap text-gray-700">{item.content || '(내용 없음)'}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold shadow text-gray-900"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold shadow"
              >
                삭제
              </button>
              <button
                onClick={() => navigate('/support/faq')}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                목록
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
