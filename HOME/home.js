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
let ModuleInstance = null;

function click() {
  ModuleInstance.ccall('click', null, [], []);
  get_intelligence();
}

function get_intelligence() {
  intelligence = ModuleInstance.ccall('get_intelligence', 'number', [], []);
  document.getElementById('intelligence').textContent = intelligence;
}

Module().then((instance) => {
  ModuleInstance = instance;

  document.addEventListener('click', click);

  setInterval(() => {
    localStorage.setItem('intelligence', intelligence);
  }, 3000);

  get_intelligence();
});
