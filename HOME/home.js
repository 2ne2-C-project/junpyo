// select 전공 불러오기
// function getQueryParam(name) {
//   const param = new URLSearchParams(window.location.search);
//   return param.get(name);
// }

// window.onload = function() {
//   const choice = getQueryParam('choice');
//   document.getElementById('result').textContent = `전공 : ${choice}`;
// };

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const choice = urlParams.get('choice');

  if (choice) {
    localStorage.setItem("major", choice); // 전공 저장
    document.getElementById("majorText").innerText = "전공 : " + choice;
  } else {
    // 새로고침이나 다른 경로로 들어온 경우: localStorage에서 불러오기
    const saved = localStorage.getItem("major");
    document.getElementById("majorText").innerText = "전공 : " + (saved ?? "미정");
  }
};

// 1. 전역 변수들
let intelligence = 0;
let ModuleInstance = null;

let currentXP = 0;
const maxXP = 100;

// 2. 경험치 증가 함수
function gainXP(amount) {
  currentXP += amount;
  if (currentXP > maxXP) currentXP = maxXP;

  const percent = (currentXP / maxXP) * 100;
  document.getElementById("xp-bar").style.width = percent + "%";
  document.getElementById("xp-value").innerText = currentXP;
}

// 3. 클릭 시 호출 함수
function click() {
  ModuleInstance.ccall('click', null, [], []);
  get_intelligence();
  gainXP(1);  // 클릭할 때마다 경험치 +1
}

// 4. intelligence 값을 가져오는 함수
function get_intelligence() {
  intelligence = ModuleInstance.ccall('get_intelligence', 'number', [], []);
  document.getElementById('intelligence').textContent = intelligence;
}

// 5. 초기화 및 이벤트 연결
Module().then((instance) => {
  ModuleInstance = instance;

  // 로컬 저장소에서 intelligence 불러오기
  let intelligence = parseInt(localStorage.getItem('intelligence')) || 0;
  document.getElementById('intelligence').textContent = intelligence;

  // 화면 아무데나 클릭 시 intelligence 및 XP 증가
  document.addEventListener('click', (e) => {
    const excludedIds = ["up", "store", "study", "challenge"];
    if (excludedIds.includes(e.target.id)) return;

    click();
  });

  // intelligence 저장 주기적으로
  setInterval(() => {
    localStorage.setItem('intelligence', intelligence);
  }, 3000);

  // 초기 intelligence 불러오기
  get_intelligence();
});



// c언어 호출 함수
// let intelligence = 0;
// let ModuleInstance = null;

// function click() {
//   ModuleInstance.ccall('click', null, [], []);
//   get_intelligence();
// }

// function get_intelligence() {
//   intelligence = ModuleInstance.ccall('get_intelligence', 'number', [], []);
//   document.getElementById('intelligence').textContent = intelligence;
// }

// // 특정 버튼만 오르는 거 제외
// Module().then((instance) => {
//   ModuleInstance = instance;

//   let intelligence = parseInt(localStorage.getItem('intelligence')) || 0;
//   // 불러온 intelligence를 화면에 표시
//   document.getElementById('intelligence').textContent = intelligence;


//   // 클릭 시 필터링 조건을 먼저 검사하고 click() 실행
//   document.addEventListener('click', (e) => {
//     const excludedIds = ["up", "store", "study", "challenge"]; // 제외할 id 속성의 버튼들

//     if (excludedIds.includes(e.target.id)) return;

//     click();  // 필터 통과한 경우만 호출
//   });

//   setInterval(() => {
//     localStorage.setItem('intelligence', intelligence);
//   }, 3000);

//   get_intelligence();
// });
