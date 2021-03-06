window.onload = function () {

  const $startBtn = document.querySelector('.start-btn'),
    $intro = document.querySelector('.intro'),
    $menualBtn = document.querySelector('.menual-btn'),
    $exit = document.querySelector('.exit');

  var number,
    numberType,
    smallNumber = 0,
    largeNumber = 100,
    userLife = 5,
    play = false,
    firstGame = true;

  function setGame() {
    smallNumber = 0;
    largeNumber = 100;
    userLife = 5;

    document.querySelector('.small').innerText = 0;
    document.querySelector('.large').innerText = 100;

    for(var i = 0; i < 5; i++){
      document.getElementsByClassName('life')[i].classList.remove('off');
    }
    document.querySelector('.game-message').style.display = 'none';
    document.querySelector('.win').classList.remove('show');
    document.querySelector('.lose').classList.remove('show');
    document.querySelector('.number-frm').style.display = 'block';

    randomNumberGenerate();
  }

  function resetGame() {
    if (play) {
      if (confirm('게임이 진행중입니다. 새게임을 시작할까요?')) {
        setGame();
      } else {
        return;
      }
    } else {
      setGame();
      play = true;
    }
  }

  function numberTypeCheck() {
    if (number % 2 == 1) {
      numberType = '홀수'
    } else {
      numberType = '짝수'
    }
    document.querySelector('.number-type span').innerText = numberType;
  }

  function randomNumberGenerate() {
    number = Math.floor(Math.random() * (99 - 0)) + 1;
    document.querySelector('.number-true').innerText = number;
    numberTypeCheck();
  }

  function showingTable() {

    TweenMax.to('.intro', 2, {
      paddingTop: '10vh'
    });

    TweenMax.to('.game-table', 2, {
      display: 'block',
      opacity: 1
    });
  }


  $startBtn.onclick = function () {
    if(firstGame){
      showingTable();
      randomNumberGenerate();
      firstGame = false;
    }else{
      resetGame();
    }
  }

  function openMenual() {
    document.querySelector('.game-menual').style.display = 'block';
  }

  function closeMenual() {
    document.querySelector('.game-menual').style.display = 'none';
  }

  $menualBtn.onclick = function () {
    openMenual();
  }

  $exit.onclick = function () {
    closeMenual();
  }

  // 숫자 2자리 체크

  function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
      object.value = object.value.slice(0, object.maxLength);
    }
  }

  document.querySelector('input').oninput = function () {
    maxLengthCheck(this)
  }

  // 정답 체크

  function endGame(type) {
    play = false;
    document.querySelector('.number-frm').style.display = 'none';
    if (type == 'win') {
      document.querySelector('.game-message').style.display = 'block';
      document.querySelector('.win').classList.add('show');
    } else if (type == 'lose') {
      document.querySelector('.game-message').style.display = 'block';
      document.querySelector('.lose').classList.add('show');
    }
  }

  function resetInput() {
    document.querySelector('.number-frm input').value = '';
    document.querySelector('.number-frm input').focus();
  }

  function changeHint(sml, lrg) {
    document.querySelector('.small').innerText = sml;
    document.querySelector('.large').innerText = lrg;
  }

  function lifeCheck() {
    if (--userLife == 0) {
      endGame('lose');
    }
    document.getElementsByClassName('life')[userLife].classList.add('off')
  }

  function answerCheck() {
    var userNumber = document.querySelector('.number-frm input').value;

    if (number == userNumber) {
      endGame('win');
    } else {
      if (userNumber < number && userNumber > smallNumber) {
        smallNumber = userNumber;
      } else if (userNumber > number && userNumber < largeNumber) {
        largeNumber = userNumber;
      }
      changeHint(smallNumber, largeNumber);
      lifeCheck();

      return;
    }
  }

  document.querySelector('.submit').onclick = function (e) {
    e.preventDefault();
    if (!document.querySelector('.number-frm input').value == '') {
      answerCheck();
      resetInput();
    }
  }


}