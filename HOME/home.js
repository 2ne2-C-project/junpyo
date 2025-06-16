function getQueryParam(name) {
  const param = new URLSearchParams(window.location.search);
  return param.get(name);
}

window.onload = function() {
  const choice = getQueryParam('choice');
  document.getElementById('result').textContent = `전공 : ${choice}`;
};

// 초기 지능값
// let intelligence = parseInt(localStorage.getItem('intelligence'))

// 랜덤 지능
// gianRandomIntelligence(0);

// 자동 저장

let intelligence = 0;

function click() { // click() 호출
  Module.ccall('click', null, [], []);
  get_intelligence();
}

function get_intelligence() { // get_intelligence() 호출
  intelligence = Module.ccall('get_intelligence', 'number', [], []);
  document.getElementById('intelligence').textContent = intelligence;
}

Module.onRuntimeInitialized = () => {
  // 전체 화면 클릭시 실행
  document.addEventListener('click', click);

  // 주기적으로 저장
  setInterval(() => {
    localStorage.setItem('intelligence', intelligence);
  }, 3000);

  get_intelligence();
};

