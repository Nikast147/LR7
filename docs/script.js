
(function () {

  function init() {
    
    const wrap = document.createElement('div'); wrap.className = 'wrap';
    const panel = document.createElement('div'); panel.className = 'panel';

    const left = document.createElement('div'); left.className = 'left';
    const title = document.createElement('h1'); title.textContent = 'Магічна куля — задай питання';

    const controls = document.createElement('div'); controls.className = 'controls';
    const input = document.createElement('input'); input.className = 'question';
    input.placeholder = 'Наприклад: Чи буде завтра сонячно?'; input.setAttribute('aria-label', 'Поле для питання');
    const askBtn = document.createElement('button'); askBtn.className = 'ask'; askBtn.type = 'button'; askBtn.textContent = 'Запитати';

    controls.appendChild(input); controls.appendChild(askBtn);
    left.appendChild(title); left.appendChild(controls);

    const right = document.createElement('div'); right.className = 'ball-scene';
    const ball = document.createElement('div'); ball.className = 'ball';
    const glow = document.createElement('div'); glow.className = 'glow';
    const inner = document.createElement('div'); inner.className = 'inner';
    const answer = document.createElement('div'); answer.className = 'answer';
    const orbBase = document.createElement('div'); orbBase.className = 'orb-base';

    inner.appendChild(answer);
    ball.appendChild(glow); ball.appendChild(inner); ball.appendChild(orbBase);
    right.appendChild(ball);

    panel.appendChild(left); panel.appendChild(right);
    wrap.appendChild(panel);
    document.body.appendChild(wrap);

   
    const answers = [
      "Так",
      "Ні",
      "Можливо",
      "Дуже вірогідно",
      "Малий шанс"
    ];

    function pickAnswer(q){
      const qLower = (q||'').toLowerCase();
      if(!qLower.trim()) return 'Постав, будь ласка, запитання';
      let idx = Math.floor(Math.random()*answers.length);
      return answers[idx];
    }

    let timer;

    function revealText(text){
      if(timer) clearInterval(timer);

      answer.classList.remove('visible');
      answer.textContent = '';
      
      if (ball.animate) {
        ball.animate([{transform:'scale(1)'},{transform:'scale(0.995)'},{transform:'scale(1)'}],{duration:420,iterations:1,easing:'ease-out'});
      }
      if (glow.animate) {
        glow.animate([{opacity:0.2},{opacity:1},{opacity:0.2}],{duration:900,iterations:1});
      }

      let i=0;
      const speed = 30 + Math.random()*40;
      timer = setInterval(()=>{
        answer.textContent += text.charAt(i) || '';
        i++;
        if(i>text.length){
          clearInterval(timer);
          answer.classList.add('visible');
        }
      }, speed);
    }

    function ask(){
        const q = input.value;
        const a = pickAnswer(q);
        revealText(a);
        input.blur();
    }

    askBtn.addEventListener('click', ask);
    input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') ask(); });

    
    setTimeout(()=>revealText('Задай питання...'), 420);
  } 

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
