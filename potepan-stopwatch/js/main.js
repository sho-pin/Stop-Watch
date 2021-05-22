'use strict';

{
  //まずは要素の取得
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    // console.log(Date.now() - startTime);//startTimeからの経過時間の表示
    
    //分秒を表示
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getHours() - 9).padStart(1, '0');
    const m = String(d.getMinutes()).padStart(1, '0');
    const s = String(d.getSeconds()).padStart(1, '0');
    // const ms = String(d.getMilliseconds() ).padStart(1, '0');
    const ms = String(d.getMilliseconds() ).slice(0,1);
    // const h = d.getHours();
    // const m = d.getMinutes();
    // const s = d.getSeconds();
    // const ms = d.getMilliseconds();
    timer.textContent = `${h}:${m}:${s}:${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    },10 );//10ミリ秒後にcountUp()を呼び出す
  }

  //最初の状態
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  //動いている状態
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  //止まっている状態
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  //startボタンにクリックイベントを設定
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
  //現在時刻を取得
    startTime = Date.now();
    countUp();
  });
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    // elapsedTime = Date.now() - startTime;
    elapsedTime += Date.now() - startTime;//タイマーが走っていた時間を全て足す
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '0:0:0:0';
    elapsedTime = 0;//resetで値を0に戻す
  });
}