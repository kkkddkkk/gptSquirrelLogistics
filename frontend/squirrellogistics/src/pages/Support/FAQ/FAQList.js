import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FAQList() {
  const navigate = useNavigate();
  const [faqItems, setFaqItems] = useState([
    { id: 1, title: '배송은 얼마나 걸리나요?', content: '보통 2~3일 내에 배송됩니다.' },
    { id: 2, title: '반품 정책은 어떻게 되나요?', content: '상품 수령 후 7일 이내 가능합니다.' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('FAQ를 삭제하시겠습니까?')) {
      setFaqItems(faqItems.filter(i => i.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = faqItems.length ? Math.max(...faqItems.map(i => i.id)) + 1 : 1;
    const newItem = { id: newId, title: `새 FAQ 제목 ${newId}`, content: '' };
    setFaqItems([newItem, ...faqItems]);
    navigate(`./${newId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-3xl w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">FAQ 목록</h2>
        <button
          onClick={handleAdd}
          className="mb-6 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded shadow"
        >
          FAQ 등록
        </button>
        <ul className="space-y-4">
          {faqItems.map(({ id, title }) => (
            <li
              key={id}
              onClick={() => navigate(`./${id}`)}
              className="flex justify-between items-center p-4 border border-gray-200 rounded cursor-pointer hover:shadow-lg hover:border-blue-500 transition"
            >
              <span className="text-lg font-medium text-gray-900">{title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(id);
                }}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
