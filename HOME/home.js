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

  // 클릭 시 경험치 증가
  document.addEventListener('click', (e) => {
    if (["INPUT", "A", "BUTTON"].includes(e.target.tagName)) return;
    gainXP(1);
    saveProgress();
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
  // UUID 설정 (필요 없다면 이 부분도 삭제 가능)
  if (!localStorage.getItem('uuid')) {
    uuid = crypto.randomUUID();
    localStorage.setItem('uuid', uuid);
  } else {
    uuid = localStorage.getItem('uuid');
  }

  init();
});

function spawnParticles(e) {
  const count = 10; // 파티클 개수
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // 클릭 위치에 파티클 위치 지정
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    // 방향 랜덤 설정
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 40 + 10;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);

    document.body.appendChild(particle);

    // 애니메이션 후 제거
    setTimeout(() => {
      particle.remove();
    }, 600);
  }
}

