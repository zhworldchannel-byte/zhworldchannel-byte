/* ══════════════════════════════════════════════════════════════
   Zain Hamid · ~/hub  —  shared behavior for all pages
   ══════════════════════════════════════════════════════════════ */
const USER = 'zhworldchannel-byte';

/* ---------- matrix rain ---------- */
(function(){
  const c=document.getElementById('matrix'); if(!c) return;
  const x=c.getContext('2d'); let cols,drops;
  function size(){c.width=innerWidth;c.height=innerHeight;cols=Math.floor(c.width/16);drops=Array(cols).fill(1);}
  size(); addEventListener('resize',size);
  const chars='01<>[]{}/\\|=+-*#$@ZAINHAMIDVAULTFLOW';
  setInterval(()=>{
    x.fillStyle='rgba(1,4,9,.09)';x.fillRect(0,0,c.width,c.height);
    x.fillStyle='#39d353';x.font='14px JetBrains Mono';
    drops.forEach((y,i)=>{
      x.fillText(chars[Math.floor(Math.random()*chars.length)],i*16,y*16);
      if(y*16>c.height&&Math.random()>.975)drops[i]=0; drops[i]++;
    });
  },60);
})();

/* ---------- mobile nav toggle + year ---------- */
(function(){
  const b=document.querySelector('.nav .burger'), l=document.querySelector('.nav .links');
  if(b&&l) b.addEventListener('click',()=>l.classList.toggle('open'));
  document.querySelectorAll('#yr').forEach(e=>e.textContent=new Date().getFullYear());
})();

/* ---------- reveal on scroll ---------- */
(function(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
    if(e.target.dataset.bar!==undefined){e.target.querySelectorAll('.bar i').forEach(i=>i.style.width=i.dataset.w);}
  }}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* ---------- typewriter (data-driven) ---------- */
document.querySelectorAll('[data-type]').forEach(el=>{
  const lines=JSON.parse(el.dataset.type); let li=0,ci=0,del=false;
  (function loop(){
    const w=lines[li];
    el.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
    if(!del&&ci>w.length){del=true;setTimeout(loop,1100);return;}
    if(del&&ci<0){del=false;li=(li+1)%lines.length;setTimeout(loop,220);return;}
    setTimeout(loop,del?32:60);
  })();
});

/* ---------- count-up ---------- */
function countTo(el,val,ms){
  if(!el)return; val=+val||0; const t0=performance.now();
  (function f(t){const p=Math.min((t-t0)/ms,1);el.textContent=Math.floor(p*val).toLocaleString();
    if(p<1)requestAnimationFrame(f);})(performance.now());
}

/* ---------- live github data ---------- */
async function loadGitHub(){
  const hasStats=document.getElementById('s-repos')||document.getElementById('donut')||document.getElementById('liverepos');
  if(!hasStats) return;
  try{
    const u=await fetch('https://api.github.com/users/'+USER).then(r=>r.json());
    const yrs=Math.max(1,new Date().getFullYear()-new Date(u.created_at||Date.now()).getFullYear());
    countTo(document.getElementById('s-repos'),u.public_repos,1200);
    countTo(document.getElementById('s-followers'),u.followers,1200);
    countTo(document.getElementById('s-years'),yrs,1000);
    const repos=await fetch('https://api.github.com/users/'+USER+'/repos?per_page=100&sort=updated').then(r=>r.json());
    if(Array.isArray(repos)){
      countTo(document.getElementById('s-stars'),repos.reduce((a,r)=>a+(r.stargazers_count||0),0),1200);
      renderDonut(repos); renderRepos(repos);
    }
  }catch(e){/* offline / rate-limited — layout still renders */}
}
function renderDonut(repos){
  const box=document.getElementById('donut'); if(!box)return;
  const map={};repos.forEach(r=>{if(r.language)map[r.language]=(map[r.language]||0)+1});
  let entries=Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5);
  if(!entries.length)entries=[['TypeScript',4],['JavaScript',3],['Python',2],['Java',2]];
  const palette=['#3178c6','#f1e05a','#3572A5','#b07219','#39d353'];
  const total=entries.reduce((a,e)=>a+e[1],0);let acc=0,stops=[];
  const legend=document.getElementById('legend'); if(legend)legend.innerHTML='';
  entries.forEach((e,i)=>{const pct=e[1]/total*100,col=palette[i%palette.length];
    stops.push(col+' '+acc+'% '+(acc+pct)+'%');acc+=pct;
    if(legend)legend.innerHTML+='<div><span class="sw" style="background:'+col+'"></span><b>'+e[0]+'</b><span>'+pct.toFixed(0)+'%</span></div>';});
  box.style.background='conic-gradient('+stops.join(',')+')';
}
function renderRepos(repos){
  const box=document.getElementById('liverepos'); if(!box)return;
  const top=repos.filter(r=>!r.fork).sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,6);
  if(!top.length){box.innerHTML='<div class="card center" style="grid-column:1/-1;color:var(--muted)">no public repos yet — they\'ll appear here automatically once you push ◉</div>';return;}
  top.forEach(r=>{const el=document.createElement('a');el.href=r.html_url;el.target='_blank';
    el.className='card reveal in';el.style.textDecoration='none';
    el.innerHTML='<h3>📂 '+r.name+' <span class="tag ml">'+(r.language||'repo')+'</span></h3>'+
      '<p>'+(r.description||'no description provided')+'</p>'+
      '<div class="tag" style="border:0;padding-left:0">★ '+r.stargazers_count+' · ⑂ '+r.forks_count+'</div>';
    box.appendChild(el);});
}
loadGitHub();

/* ---------- interactive terminal ---------- */
(function(){
  const body=document.getElementById('tbody'), input=document.getElementById('tin');
  if(!body||!input) return;
  const cmds={
    help:()=>'commands: <span class="g">whoami about projects vaultflow ftc stack contact social resume ls neofetch date echo clear sudo</span>',
    whoami:()=>'<span class="w">Zain Hamid</span> — Founder &amp; CEO @ VaultFlow · Full-Stack App Developer · Software Engineer &amp; Roboticist',
    about:()=>'student builder & founder. i ship cloud ecosystems + cross-platform apps and run the control + business side of an FTC robotics team. dark-mode always.',
    projects:()=>'• VaultFlow Cloud Portal (TypeScript)\n• Mobile App Engineering (React Native)\n• FTC Control Engineering (Java)\n• FTC Business &amp; Outreach (Ops)\n→ open projects.html for full case studies',
    vaultflow:()=>'VaultFlow → <a href="https://vault-flow.space" target="_blank" style="color:var(--cyan)">vault-flow.space</a> · a cloud ecosystem tracking document lifecycles &amp; subscription renewals before they expire.',
    ftc:()=>'FIRST Tech Challenge → multi-motor chassis control, sensor arrays &amp; Java autonomous + sponsorship, documentation pipelines &amp; community outreach.',
    stack:()=>'TypeScript · JavaScript · Python · Java · React Native · TailwindCSS · Firebase · Xcode · Autodesk Fusion · Git · Cursor AI',
    contact:()=>'email: <span class="g">zhworldchannel@gmail.com</span> · linkedin · instagram · github @zhworldchannel-byte',
    social:()=>'linkedin.com/in/zain-hamid-390523393 · instagram.com/zainy_2012 · github.com/zhworldchannel-byte',
    resume:()=>'status: <span class="g">OPEN TO OPPORTUNITIES</span> — internships, collaborations, freelance app work &amp; FTC sponsorships. reach me: zhworldchannel@gmail.com',
    ls:()=>'index.html  about.html  projects.html  robotics.html  stack.html  terminal.html  contact.html',
    neofetch:()=>'<span class="g">zain@hub</span>\n----------------\nOS:      TerminalOS x64\nHost:    ~/hub\nShell:   pwsh\nEditor:  Cursor AI (native)\nTheme:   Dark Mode Always\nUptime:  24/7 · always shipping\nStatus:  open to opportunities',
    date:()=>new Date().toString(),
    echo:a=>a.join(' ')||'',
    sudo:()=>'<span style="color:#ff5f56">nice try.</span> zain is not in the sudoers file. this incident will be reported. 😏',
    clear:()=>{body.innerHTML='';return null;}
  };
  function print(html,cls){const d=document.createElement('div');d.className='line '+(cls||'');
    d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;}
  const hist=[];let hp=0;
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowUp'){if(hp>0)input.value=hist[--hp]||'';return;}
    if(e.key==='ArrowDown'){if(hp<hist.length)input.value=hist[++hp]||'';return;}
    if(e.key!=='Enter')return;
    const raw=input.value.trim();input.value='';
    print('<span class="u">zain@hub:~$</span> '+raw,'w');
    if(!raw)return; hist.push(raw);hp=hist.length;
    const parts=raw.split(/\s+/),fn=cmds[parts[0].toLowerCase()];
    if(fn){const out=fn(parts.slice(1));if(out!==null)print(out,'m');}
    else print('command not found: '+parts[0]+' — type <span class="g">help</span>','m');
  });
})();
