let userLevel = 0;
let currentXP = 0;
let maxXP = 10;
let intelligence = 0;
let uuid = null;

// 경험치 증가
function gainXP(amount) {
  if (currentXP >= maxXP) return;
  currentXP += amount;
  if (currentXP > maxXP) currentXP = maxXP;
  updateXPUI();
}

// UI 업데이트
function updateXPUI() {
  const percent = (currentXP / maxXP) * 100;
  document.getElementById("xp-bar").style.width = percent + "%";
  document.getElementById("intelligence").innerText = currentXP + " / " + maxXP;
}

// 레벨 텍스트 업데이트
function displayInitialLevel() {
  document.getElementById("inllet").textContent = userLevel;
}

// 전공 출력
function displayMajor() {
  const urlParams = new URLSearchParams(window.location.search);
  const choice = urlParams.get('choice');

  if (choice) {
    localStorage.setItem("major", choice);
    document.getElementById("majorText").innerText = "전공 : " + choice;
  } else {
    const saved = localStorage.getItem("major");
    document.getElementById("majorText").innerText = "전공 : " + (saved ?? "미정");
  }
}

// 로컬 저장
function saveProgress() {
  localStorage.setItem("userLevel", userLevel);
  localStorage.setItem("currentXP", currentXP);
  localStorage.setItem("maxXP", maxXP);
  localStorage.setItem("intelligence", intelligence);
}

// 초기화
function init() {
  userLevel = parseInt(localStorage.getItem("userLevel")) || 0;
  currentXP = parseInt(localStorage.getItem("currentXP")) || 0;
  maxXP = parseInt(localStorage.getItem("maxXP")) || 10;
  intelligence = parseInt(localStorage.getItem("intelligence")) || 0;

  displayInitialLevel();
  updateXPUI();
  displayMajor();

  // 클릭 시 경험치 증가 (예외: 특정 태그 또는 특정 id)
  document.addEventListener('click', (e) => {
    const tag = e.target.tagName;
    const closestUp = e.target.closest('#up');
    const closestChallenge = e.target.closest('#challenge');
    const closestStore = e.target.closest('#store');

    if (
      ["INPUT", "A", "BUTTON"].includes(tag) ||
      closestUp || closestChallenge || closestStore
    ) return;

    gainXP(1);
    saveProgress();
    spawnPlusOne(e); // 여기서 +1 이미지 등장
  });

  // 업그레이드 버튼
  document.getElementById("up").addEventListener("click", () => {
    if (currentXP < maxXP) return;

    userLevel += 1;
    intelligence += 1;
    currentXP = 0;
    maxXP = Math.floor(maxXP * 1.2);

    displayInitialLevel();
    updateXPUI();
    saveProgress();
  });
}

// DOMContentLoaded 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // UUID 설정
  if (!localStorage.getItem('uuid')) {
    uuid = crypto.randomUUID();
    localStorage.setItem('uuid', uuid);
  } else {
    uuid = localStorage.getItem('uuid');
  }

  init();
});

// 클릭 시 +1 이미지 생성
function spawnPlusOne(e) {
  const plus = document.createElement("div");
  plus.classList.add("plus-one");

  plus.style.left = `${e.clientX}px`;
  plus.style.top = `${e.clientY}px`;

  document.body.appendChild(plus);

  setTimeout(() => {
    plus.remove();
  }, 800);
}
