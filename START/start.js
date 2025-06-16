const snowCount = 25; // 눈 개수
const body = document.body;

// 눈 반복
for (let i = 0; i < snowCount; i++) {
  const snow = document.createElement("img");
  snow.src = "../IMG/snow.png"; //눈 이미지 넣기
  snow.className = "snow";
  
  // 눈 랜덤 위치
  snow.style.left = Math.random() * 90 + "%";
  // snow.style.width = 80 + Math.random() * 70 + "px";
  snow.style.animationDuration = 8 + Math.random() * 7 + "s";
  snow.style.animationDelay = Math.random() * 15 + "s";
  body.appendChild(snow);
}
document.addEventListener("click", () => {
  // body에 fade-out 클래스 추가
  document.body.classList.add("fade-out");

  // 애니메이션이 끝난 후 페이지 이동
  setTimeout(() => {
    window.location.href = "../SELECT/select.html"; // 실제 경로에 맞게 수정
  }, 800); // fadeOut 애니메이션 시간과 동일 (0.8초)
});