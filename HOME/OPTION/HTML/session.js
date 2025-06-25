document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:5502/api/game')
    .then(res => {
      if (!res.ok) throw new Error('네트워크 응답이 좋지 않습니다');
      return res.json();
    })
    .then(data => {
      const iq = data.iq;
      document.getElementById('intell').textContent = iq;
    })
    .catch(err => {
      console.error('IQ 가져오는 중 오류 발생:', err);
      document.getElementById('intell').textContent = '데이터 로드 실패';
    });
});