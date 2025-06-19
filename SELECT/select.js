function goNext(selected) {
  location.href = `../HOME/home.html?choice=${encodeURIComponent(selected)}`;

}

// const savedValue = localStorage.getItem('selectedOption');
//   if (savedValue) {
//     selectElement.value = savedValue;
//   }

//   // 선택 값이 변경될 때마다 로컬 스토리지에 저장
//   selectElement.addEventListener('change', function() {
//     localStorage.setItem('selectedOption', this.value);
//   });