export function smoothLoop(videoEl){
  if(!videoEl) return;
  let fadeEl = videoEl.cloneNode(true);
  fadeEl.classList.add('fade-mirror');
  videoEl.parentNode.appendChild(fadeEl);
  let playing=false;
  const sync = ()=>{
    if(playing && videoEl.currentTime > (videoEl.duration - 0.25)){
      fadeEl.currentTime = 0.0;
      fadeEl.play();
      fadeEl.style.opacity = 1;
      setTimeout(()=>fadeEl.style.opacity = 0, 280);
    }
    requestAnimationFrame(sync);
  };
  videoEl.addEventListener('play', ()=>{playing=true;sync();});
}
