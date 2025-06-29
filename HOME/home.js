const base = "192.168.0.31";
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

// 저장 - 버튼으로 수동 저장
function saveToServer() {
  fetch(`http://${base}:8080/api/users/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uuid,
      level: userLevel,
      exp: currentXP,
      iq: intelligence
    })
  }).then(res => res.text())
    .then(msg => console.log("서버 저장 결과:", msg));
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

    fetch(`http://${base}:8080/api/${uuid}/upgrade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: userLevel,
        exp: currentXP,
        iq: intelligence
      })
    }).then(res => res.text())
      .then(msg => console.log("업그레이드 결과:", msg));
  });

  // 저장 버튼 (id="saveBtn")
  // document.getElementById("saveBtn").addEventListener("click", saveToServer);
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

  // 테스트 호출
  fetch(`http://${base}:8080/api/test`)
    .then(res => res.text())
    .then(data => console.log("[/api/test 응답]", data));

  // 불러오기
  fetch(`http://${base}:8080/api/${uuid}`)
    .then(res => res.json())
    .then(data => {
      userLevel = data.level ?? 0;
      currentXP = data.exp ?? 0;
      intelligence = data.iq ?? 0;
      displayInitialLevel();
      updateXPUI();
    })
    .catch(err => {
      console.error("데이터 불러오기 실패:", err);
    });

  // 주기 저장 (5초마다)
  setInterval(() => {
    fetch(`http://${base}:8080/api/${uuid}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: userLevel,
        exp: currentXP,
        iq: intelligence
      })
    });
  }, 5000);

  init();
});
