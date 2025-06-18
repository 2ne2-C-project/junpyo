// select 전공 불러오기
function getQueryParam(name) {
  const param = new URLSearchParams(window.location.search);
  return param.get(name);
}

window.onload = function() {
  const choice = getQueryParam('choice');
  document.getElementById('result').textContent = `전공 : ${choice}`;
};

// c언어 호출 함수
let intelligence = 0;
let ModuleInstance = null;

function click() {
  ModuleInstance.ccall('click', null, [], []);
  get_intelligence();
}

function get_intelligence() {
  intelligence = ModuleInstance.ccall('get_intelligence', 'number', [], []);
  document.getElementById('intelligence').textContent = intelligence;
}

// 특정 버튼만 오르는 거 제외
Module().then((instance) => {
  ModuleInstance = instance;

  let intelligence = parseInt(localStorage.getItem('intelligence')) || 0;
  // 불러온 intelligence를 화면에 표시
  document.getElementById('intelligence').textContent = intelligence;


  // 클릭 시 필터링 조건을 먼저 검사하고 click() 실행
  document.addEventListener('click', (e) => {
    const excludedIds = ["up", "store", "study", "challenge"]; // 제외할 id 속성의 버튼들
    const excluddClaases = ["group"];

    if (excludedIds.includes(e.target.id)) return;

    click();  // 필터 통과한 경우만 호출
  });

  setInterval(() => {
    localStorage.setItem('intelligence', intelligence);
  }, 3000);

  get_intelligence();
});
