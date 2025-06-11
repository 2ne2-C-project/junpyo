function getQueryParam(name) {
  const param = new URLSearchParams(window.location.search);
  return param.get(name);
}

window.onload = function() {
  const choice = getQueryParam('choice');
  document.getElementById('result').textContent = `전공: ${choice}`;
};

// 초기 지능값
let intelligence = parseInt(localStorage.getItem('intelligence'))

// 랜덤 지능
gianRandomIntelligence(0);

// 자동 저장

setInterval(() => {
  localStorage.setItem('intelligence', intelligence);
}, 3000);

function click() {
  Module.ccall('click', null, [], []); // click() 호출
  get_intelligence();
}

function get_intelligence() {
  const value = Module.ccall('get_intelligence', 'number', [], []); // get_intelligence() 호출
  document.getElementById('intelligence').textContent = value;
  }

document.addEventListener('click', () => {
  click();
});
