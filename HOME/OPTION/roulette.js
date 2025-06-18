// 캔버스 요소와 컨텍스트 가져오기
const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);

const menuAdd = document.querySelector('#menuAdd');
// 돌림판 항목과 색상 배열
const product = ["IQ 10 증가", "상품 획득", "IQ 10 감소", "IQ 5 증가", "IQ 5 감소"];
const colors = [];

// 돌림판 다시 그리기 함수
const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (product.length / 2);

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();

    // 돌림판 색상
    if (colors.length === 0) {
      colors.push("#A8DADC");
      colors.push("#FFE5EC");
      colors.push("#FFD6A5");
      colors.push("#CDB4DB");
      colors.push("#E2F0CB");
    }

    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i); // 조각 부채꼴
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

    ctx.save(); // 저장
    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    ); // 텍스트 위치 이동

    ctx.rotate(angle + Math.PI / 2); // 텍스트 각도 회전

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j); // 여러 줄로 표시
    });

    ctx.restore();
  }
};

// 돌림판 회전 함수
const rotate = () => {
  // 초기화
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;

  const alpha = Math.floor(Math.random() * 100); // 약간의 랜덤성 부여

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length); // 랜덤으로 선택
    const arc = 360 / product.length;
    const rotateDeg = (ran * arc) + 3600 + (arc * 3) - (arc / 4) + alpha; // 회전 각도 계산

    $c.style.transform = `rotate(-${rotateDeg}deg)`; // 반시계 방향 회전
    $c.style.transition = `2s`; // 회전 시간 설정
  }, 1);
};

// 페이지 로드 시 돌림판 생성
newMake();