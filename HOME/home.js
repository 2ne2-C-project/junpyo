let click, getExp, getLevel, getMaxExp, upgrade, gainLevel;

Module.onRuntimeInitialized = () => {
  // WebAssembly 함수 연결
  click = Module.cwrap("click", null, []);
  getExp = Module.cwrap("get_exp", "number", []);
  getLevel = Module.cwrap("get_level", "number", []);
  getMaxExp = Module.cwrap("get_max_exp", "number", []);
  upgrade = Module.cwrap("upgrade", "number", []);
  gainLevel = Module.cwrap("gain_level", null, ["number"]);

  // 초기화
  displayInitialLevel();
  updateXPUI();
  displayMajor();

  // 화면 클릭 시 경험치 +1 (특정 요소 제외)
  document.addEventListener("click", (e) => {
    const tag = e.target.tagName;
    const id = e.target.closest("button")?.id;

    if (
      ["INPUT", "A", "BUTTON"].includes(tag) ||
      ["up", "store", "roulette", "challenge"].includes(id)
    ) return;

    click();
    updateXPUI();
    saveProgress();
    spawnPlusOne(e);
  });

  // 업그레이드 버튼 클릭 시 레벨업
  document.getElementById("up").addEventListener("click", () => {
    const success = upgrade();
    if (success) {
      displayInitialLevel();
      updateXPUI();
      saveProgress();
    } else {
      alert("경험치가 부족합니다!");
    }
  });
};

// 경험치 UI 업데이트
function updateXPUI() {
  const current = getExp();
  const max = getMaxExp();
  document.getElementById("xp-bar").style.width = (current / max) * 100 + "%";
  document.getElementById("intelligence").innerText = current + " / " + max;
}

// 레벨 UI 표시
function displayInitialLevel() {
  document.getElementById("inllet").textContent = getLevel();
}

// 전공 표시
function displayMajor() {
  const urlParams = new URLSearchParams(window.location.search);
  const choice = urlParams.get("choice");

  if (choice) {
    localStorage.setItem("major", choice);
    document.getElementById("majorText").innerText = "전공 : " + choice;
  } else {
    const saved = localStorage.getItem("major");
    document.getElementById("majorText").innerText = "전공 : " + (saved ?? "미정");
  }
}

// UUID 저장 및 불러오기
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("uuid")) {
    localStorage.setItem("uuid", crypto.randomUUID());
  }
});

// 저장
function saveProgress() {
  localStorage.setItem("level", getLevel());
  localStorage.setItem("exp", getExp());
  localStorage.setItem("maxExp", getMaxExp());
}

// 클릭 효과 +1
function spawnPlusOne(e) {
  const plus = document.createElement("div");
  plus.classList.add("plus-one");
  plus.style.left = `${e.clientX}px`;
  plus.style.top = `${e.clientY}px`;
  document.body.appendChild(plus);
  setTimeout(() => plus.remove(), 800);
}
