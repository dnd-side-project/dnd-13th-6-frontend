// // 캔버스 에디터 컴포넌트 - 면접 연습용 코드
// import React, { useState, useEffect, useRef } from 'react';

// const CanvasEditor = () => {
//   const canvasRef = useRef(null);
//   const [objects, setObjects] = useState([]);
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//   // 객체 추가
//   const addObject = type => {
//     const newObject = {
//       id: Date.now(),
//       type: type,
//       x: Math.random() * 400,
//       y: Math.random() * 300,
//       width: 100,
//       height: 100,
//       color: '#' + Math.floor(Math.random() * 16777215).toString(16),
//       text: type === 'text' ? 'Sample Text' : ''
//     };
//     setObjects([...objects, newObject]);
//   };

//   // 캔버스 렌더링
//   const renderCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // 캔버스 초기화
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // 모든 객체 렌더링
//     objects.forEach(obj => {
//       ctx.fillStyle = obj.color;

//       if (obj.type === 'rectangle') {
//         ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
//       } else if (obj.type === 'circle') {
//         ctx.beginPath();
//         ctx.arc(
//           obj.x + obj.width / 2,
//           obj.y + obj.height / 2,
//           obj.width / 2,
//           0,
//           2 * Math.PI
//         );
//         ctx.fill();
//       } else if (obj.type === 'text') {
//         ctx.fillStyle = 'black';
//         ctx.font = '16px Arial';
//         ctx.fillText(obj.text, obj.x, obj.y);
//       }

//       // 선택된 객체에 테두리 그리기
//       if (selectedObject && selectedObject.id === obj.id) {
//         ctx.strokeStyle = 'blue';
//         ctx.lineWidth = 2;
//         ctx.strokeRect(obj.x - 2, obj.y - 2, obj.width + 4, obj.height + 4);
//       }
//     });
//   };

//   // 마우스 이벤트 핸들러
//   const handleMouseDown = e => {
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // 클릭된 객체 찾기
//     for (let i = objects.length - 1; i >= 0; i--) {
//       const obj = objects[i];
//       if (
//         x >= obj.x &&
//         x <= obj.x + obj.width &&
//         y >= obj.y &&
//         y <= obj.y + obj.height
//       ) {
//         setSelectedObject(obj);
//         setIsDragging(true);
//         setDragOffset({
//           x: x - obj.x,
//           y: y - obj.y
//         });
//         return;
//       }
//     }
//     setSelectedObject(null);
//   };

//   const handleMouseMove = e => {
//     if (!isDragging || !selectedObject) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // 선택된 객체 위치 업데이트
//     const updatedObjects = objects.map(obj => {
//       if (obj.id === selectedObject.id) {
//         return {
//           ...obj,
//           x: x - dragOffset.x,
//           y: y - dragOffset.y
//         };
//       }
//       return obj;
//     });

//     setObjects(updatedObjects);
//     setSelectedObject({
//       ...selectedObject,
//       x: x - dragOffset.x,
//       y: y - dragOffset.y
//     });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // 객체 삭제
//   const deleteObject = () => {
//     if (selectedObject) {
//       setObjects(objects.filter(obj => obj.id !== selectedObject.id));
//       setSelectedObject(null);
//     }
//   };

//   // 실행 취소
//   const undo = () => {
//     // 간단한 구현 - 마지막 객체 제거
//     if (objects.length > 0) {
//       setObjects(objects.slice(0, -1));
//     }
//   };

//   // 캔버스 내보내기
//   const exportCanvas = () => {
//     const canvas = canvasRef.current;
//     const link = document.createElement('a');
//     link.download = 'canvas.png';
//     link.href = canvas.toDataURL();
//     link.click();
//   };

//   // 렌더링 효과
//   useEffect(() => {
//     renderCanvas();
//   }, [objects, selectedObject]);

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <div>
//         <canvas
//           ref={canvasRef}
//           width={800}
//           height={600}
//           style={{
//             border: '1px solid #ccc',
//             cursor: isDragging ? 'grabbing' : 'grab'
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         />
//       </div>

//       <div style={{ padding: '20px' }}>
//         <h3>도구</h3>
//         <button onClick={() => addObject('rectangle')}>사각형 추가</button>
//         <button onClick={() => addObject('circle')}>원 추가</button>
//         <button onClick={() => addObject('text')}>텍스트 추가</button>

//         <h3>편집</h3>
//         <button onClick={deleteObject} disabled={!selectedObject}>
//           삭제
//         </button>
//         <button onClick={undo}>실행 취소</button>
//         <button onClick={exportCanvas}>내보내기</button>

//         <div style={{ marginTop: '20px' }}>
//           <h4>객체 개수: {objects.length}</h4>
//           {selectedObject && (
//             <div>
//               <h4>선택된 객체:</h4>
//               <p>타입: {selectedObject.type}</p>
//               <p>
//                 위치: ({Math.round(selectedObject.x)},{' '}
//                 {Math.round(selectedObject.y)})
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CanvasEditor;
import React from 'react';

export default function page() {
  return <div>page</div>;
}
