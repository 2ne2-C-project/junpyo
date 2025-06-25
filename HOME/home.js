// select 전공 불러오기
// function getQueryParam(name) {
//   const param = new URLSearchParams(window.location.search);
//   return param.get(name);
// }

// window.onload = function() {
//   const choice = getQueryParam('choice');
//   document.getElementById('result').textContent = `전공 : ${choice}`;
// };

// window.onload = function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const choice = urlParams.get('choice');

//   if (choice) {
//     localStorage.setItem("major", choice); // 전공 저장
//     document.getElementById("majorText").innerText = "전공 : " + choice;
//   } else {
//     // 새로고침이나 다른 경로로 들어온 경우: localStorage에서 불러오기
//     const saved = localStorage.getItem("major");
//     document.getElementById("majorText").innerText = "전공 : " + (saved ?? "미정");
//   }
// };

// // 1. 전역 변수들
// let intelligence = 0;
// let ModuleInstance = null;

// let currentXP = 0;
// const maxXP = 50;

// // 2. 경험치 증가 함수
// function gainXP(amount) {
//   currentXP += amount;
//   if (currentXP > maxXP) currentXP = maxXP;

//   const percent = (currentXP / maxXP) * 100;
//   document.getElementById("xp-bar").style.width = percent + "%";
//   document.getElementById("xp-value").innerText = currentXP;
// }

// // 3. 클릭 시 호출 함수
// function click() {
//   ModuleInstance.ccall('click', null, [], []);
//   get_intelligence();
//   gainXP(1);  // 클릭할 때마다 경험치 +1
// }

// // 4. intelligence 값을 가져오는 함수
// function get_intelligence() {
//   intelligence = ModuleInstance.ccall('get_intelligence', 'number', [], []);
//   document.getElementById('intelligence').textContent = intelligence;
// }

// // 5. 초기화 및 이벤트 연결
// Module().then((instance) => {
//   ModuleInstance = instance;

//   // 로컬 저장소에서 intelligence 불러오기
//   let intelligence = parseInt(localStorage.getItem('intelligence')) || 0;
//   document.getElementById('intelligence').textContent = intelligence;

//   // 화면 아무데나 클릭 시 intelligence 및 XP 증가
//   document.addEventListener('click', (e) => {
//     const excludedIds = ["up", "store", "study", "challenge"];
//     if (excludedIds.includes(e.target.id)) return;

//     click();
//   });

//   // intelligence 저장 주기적으로
//   setInterval(() => {
//     localStorage.setItem('intelligence', intelligence);
//   }, 3000);

//   // 초기 intelligence 불러오기
//   get_intelligence();
// });

// // document.addEventListener('DOMContentLoaded', () => {
// //   fetch('http://localhost:5502/')
// //     .then(res => res.json())
// //     .then(data => {
// //       console.log('받아온 IQ 데이터:', data);

// //       const iq = data.iq;

// //       // 화면에 표시
// //       document.getElementById('intell').textContent = iq;
// //     })
// //     .catch(err => {
// //       console.error('IQ 가져오는 중 오류 발생:', err);
// //     });
// // });

// // // 백엔드가 응답해야할 것
// // app.get('/api/iq', (req, res) => {
// //   res.json({ iq: 75 });
// // });

// document.addEventListener('DOMContentLoaded', () => {
//   fetch('http://localhost:5502/') // 주소로 http get 요청을 보냄

//   // res.ok는 응답이 성공적인지 확인하는 값
//     .then(res => {
//       if (!res.ok) throw new Error('네트워크 응답이 좋지 않습니다');  // 에러 발생하면 catch로 넘김
//       return res.json();
//     })


//     .then(data => {
//       console.log('받아온 IQ 데이터:', data);
//       const iq = data.iq;
//       document.getElementById('intell').textContent = iq;
//     })
//     .catch(err => {
//       console.error('IQ 가져오는 중 오류 발생:', err);
//       document.getElementById('intell').textContent = '데이터 로드 실패';
//     });
// });

// 테스트용 초기화 (필요할 때만 켜기)
localStorage.removeItem("intelligence");
localStorage.removeItem("maxXP");
localStorage.removeItem("currentXP");

// 1. 전역 변수
let intelligence = 0;
let ModuleInstance = null;

let currentXP = 0;
let maxXP = 10; // 초기 경험치 최대치

// 2. 경험치 증가 함수
function gainXP(amount) {
  if (currentXP >= maxXP) return; // maxXP 넘으면 무시
  currentXP += amount;
  if (currentXP > maxXP) currentXP = maxXP;

  updateXPUI();
}

// 3. 경험치 바 UI 업데이트 함수
function updateXPUI() {
  const percent = (currentXP / maxXP) * 100;
  document.getElementById("xp-bar").style.width = percent + "%";
  document.getElementById("intelligence").innerText = currentXP + " / " + maxXP;
}

// 4. 업그레이드 버튼 클릭 시 IQ 증가
document.getElementById("up").addEventListener("click", () => {
  if (currentXP < maxXP) return; // 경험치 부족하면 무시

  intelligence += 1; // IQ +1
  currentXP = 0; // 경험치 초기화
  maxXP = Math.floor(maxXP * 1.5); // 다음 레벨업 요구치

  // IQ 및 경험치 저장
  localStorage.setItem("intellxigence", intelligence);
  localStorage.setItem("maxXP", maxXP);

  // IQ 표시
  document.getElementById("inllet").textContent = intelligence;
  updateXPUI();
});

// 클릭 시 호출되는 함수
function click() {
  gainXP(1); // 경험치만 증가
}

// IQ 텍스트 표시
function displayInitialIntelligence() {
  document.getElementById("inllet").textContent = intelligence;
}

// 7. 초기화 및 이벤트 연결
Module().then((instance) => {
  ModuleInstance = instance;

  // 저장된 값 불러오기
  intelligence = parseInt(localStorage.getItem('intelligence')) || 0;
  maxXP = parseInt(localStorage.getItem('maxXP')) || 10;

  displayInitialIntelligence();
  updateXPUI();

  // 화면 클릭 시 경험치 증가
  document.addEventListener('click', (e) => {
    const excludedIds = ["up", "store", "study", "challenge"];
    if (excludedIds.includes(e.target.id)) return;
    click();
  });

  // IQ 정기 저장
  setInterval(() => {
    localStorage.setItem('intelligence', intelligence);
  }, 3000);
});

// 백엔드 연결
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/api/game')
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

// 9. 전공 선택 처리
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const choice = urlParams.get('choice');

  if (choice) {
    localStorage.setItem("major", choice);
    document.getElementById("majorText").innerText = "전공 : " + choice;
  } else {
    const saved = localStorage.getItem("major");
    document.getElementById("majorText").innerText = "전공 : " + (saved ?? "미정");
  }
};
