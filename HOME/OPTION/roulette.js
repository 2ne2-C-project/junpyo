// 캔버스 요소와 컨텍스트 가져오기
const $c = document.querySelector("canvas");
const ctx = $c.getContext("2d");

const menuAdd = document.querySelector('#menuAdd');

// 돌림판 항목과 색상 배열
const product = ["level 5 증가", "상품 획득", "level 5 감소", "경험치 50 증가", "경험치 50 감소"];

// colors 배열을 한 번만 초기화
const colors = ["#A8DADC", "#FFE5EC", "#FFD6A5", "#CDB4DB", "#E2F0CB"];

// 돌림판 다시 그리기 함수
const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (product.length / 2); // 한 조각 각도 (라디안)

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();

    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * i, arc * (i + 1)); // 부채꼴 조각 그리기
    ctx.fill();
    ctx.closePath();
  }

  // 텍스트 설정
  ctx.fillStyle = "#000";
  ctx.font = "18px Pretendard";
  ctx.textAlign = "center";

  // 조각마다 텍스트 그리기
  for (let i = 0; i < product.length; i++) {
    const angle = (arc * i) + (arc / 2); // 조각 중심 각도

    ctx.save(); // 상태 저장
    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    ); // 텍스트 위치 이동

    ctx.rotate(angle + Math.PI / 2); // 텍스트 각도 회전

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j); // 여러 줄로 텍스트 출력
    });

    ctx.restore(); // 상태 복원
  }
};

const initial = ""; // 초기 스타일 값 (없으면 빈 문자열)

// 돌림판 회전 함수
const rotate = () => {
  // 초기화
  $c.style.transform = initial;
  $c.style.transition = initial;

  const alpha = Math.floor(Math.random() * 100); // 약간의 랜덤성 부여

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length); // 랜덤 선택
    const arc = 360 / product.length;
    // 회전 각도 계산
    const rotateDeg = (ran * arc) + 3600 + (arc * 3) - (arc / 4) + alpha;

    // transform 스타일 적용 시 템플릿 리터럴 사용 (문자열로)
    $c.style.transform = `rotate(-${rotateDeg}deg)`; // 반시계 방향 회전
    $c.style.transition = "2s"; // 회전 시간 2초 설정
  }, 1);
};

// 페이지 로드 시 돌림판 생성
newMake();


// const modal = document.querySelector('.modal');
// const modalOpen = document.querySelector('.modal_btn');
// const modalClose = document.querySelector('.close_btn');

// //열기 버튼을 눌렀을 때 모달팝업이 열림
// modalOpen.addEventListener('click',function(){
// 	//'on' class 추가
//   modal.classList.add('on');
// });
// //닫기 버튼을 눌렀을 때 모달팝업이 닫힘
// modalClose.addEventListener('click',function(){
//   //'on' class 제거
//   modal.classList.remove('on');
// });