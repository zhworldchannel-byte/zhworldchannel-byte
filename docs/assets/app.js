/* ══════════════════════════════════════════════════════════════
   Zain Hamid · ~/hub  —  shared behavior for all pages
   ══════════════════════════════════════════════════════════════ */
const USER = 'zhworldchannel-byte';

/* ---------- pages (single source of truth for nav) ---------- */
const PAGES = [
  ['index.html','home'],['about.html','about'],['resume.html','resume'],
  ['projects.html','projects'],['games.html','games'],['robotics.html','robotics'],
  ['stack.html','stack'],['terminal.html','terminal'],['contact.html','contact']
];
(function renderNav(){
  const here=(location.pathname.split('/').pop()||'index.html')||'index.html';
  const links=document.querySelector('.nav .links');
  if(links) links.innerHTML=PAGES.map(([h,l])=>
    `<a href="${h}"${(h===here||(here===''&&h==='index.html'))?' class="active"':''}>${l}</a>`).join('');
  const fnav=document.querySelector('footer .fnav');
  if(fnav) fnav.innerHTML=PAGES.map(([h,l])=>`<a href="${h}">${l}</a>`).join('');
})();

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

/* ---------- favicon (terminal '>' glyph, injected everywhere) ---------- */
(function(){
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23010409"/><text x="50" y="70" font-size="60" font-family="monospace" fill="%2339d353" text-anchor="middle">&gt;_</text></svg>';
  const l=document.createElement('link'); l.rel='icon'; l.type='image/svg+xml';
  l.href='data:image/svg+xml,'+svg; document.head.appendChild(l);
})();

/* ---------- live date + time next to the prompt (top-left, borderless) ---------- */
(function(){
  const brand=document.querySelector('.nav .brand'); if(!brand) return;
  const c=document.createElement('span'); c.className='clock';
  brand.appendChild(c);
  const upd=()=>{const d=new Date();
    const date=d.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
    const time=d.toLocaleTimeString(undefined,{hour12:false});
    c.innerHTML='<span class="bar"></span><span class="d">'+date+'</span><span class="sep">·</span><span class="t">'+time+'</span>';};
  upd(); setInterval(upd,1000);
})();

/* ---------- back-to-top button ---------- */
(function(){
  const btn=document.createElement('a'); btn.className='totop'; btn.href='#'; btn.innerHTML='↑';
  btn.setAttribute('aria-label','back to top');
  btn.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'});});
  document.body.appendChild(btn);
  addEventListener('scroll',()=>btn.classList.toggle('show',scrollY>420),{passive:true});
})();

/* ---------- terminal status clock ---------- */
(function(){
  const c=document.getElementById('tclock'); if(!c) return;
  const tick=()=>c.textContent=new Date().toLocaleTimeString(); tick(); setInterval(tick,1000);
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
  const box=document.getElementById('liverepos'); if(!box)return; box.innerHTML='';
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
  // focus without yanking the page down (was causing the title bar to hide under the nav)
  try{input.focus({preventScroll:true});}catch(e){}

  const quotes=['ship small, ship often — momentum compounds.','clean state management > clever state management.',
    'the best UI is the one you never notice.','dark mode is not a preference — it\'s a lifestyle.',
    'a project that documents itself wins.','build in public, learn in public.'];
  const jokes=['why do programmers prefer dark mode? because light attracts bugs. 🐛',
    'there are 10 kinds of people: those who understand binary and those who don\'t.',
    'it works on my machine ¯\\_(ツ)_/¯','a SQL query walks into a bar, approaches two tables and asks: may I join you?'];
  const rand=a=>a[Math.floor(Math.random()*a.length)];
  const open=u=>{window.open(u,'_blank');return 'opening '+u+' ↗';};

  const cmds={
    help:()=>`<span class="g">── me ──</span>
  whoami  about  profile  skills  experience  status  hire  whois
<span class="g">── work ──</span>
  projects  apps  games  websites  vaultflow  ftc  robotics  stack
<span class="g">── github · live ──</span>
  repos  followers  stars  snake
<span class="g">── links · navigation ──</span>
  resume  contact  email  github  linkedin  instagram  social  open &lt;page&gt;
<span class="g">── system ──</span>
  ls  tree  cat &lt;file&gt;  pwd  cd  uname  neofetch  version  uptime
  date  time  echo  history  man &lt;cmd&gt;  clear
<span class="g">── fun ──</span>
  motd  fortune  joke  coffee  banner  theme  colors  matrix
  ping  weather  reboot  42  secret  credits  sudo  exit`,
    whoami:()=>'<span class="w">Zain Hamid</span> — Youth Developer · Founder &amp; CEO @ VaultFlow',
    about:()=>'developer building apps, games &amp; websites with modern AI-assisted workflows. growing backend skills (data, auth, core app functionality). founder of VaultFlow.',
    profile:()=>'I build a wide range of apps and websites — games plus practical, user-focused tools that solve real problems. strong in modern AI-assisted development and a growing understanding of backend systems: data, authentication &amp; core app functionality.',
    skills:()=>'Vibe Coding · Python Coding · Software Development · AI-assisted tooling · Marketing',
    experience:()=>'Founder &amp; CEO @ VaultFlow · shipped iOS games (App Store) · built web games &amp; sites · first profitable business: Digital Delights',
    status:()=>'<span class="g">● OPEN TO OPPORTUNITIES</span> — internships, collaborations, freelance builds &amp; sponsorships.',
    projects:()=>'apps:     VaultFlow · Digital Delights\ngames:    Crazy Stack · Battle Arena · Arena Shooter · Business Dominion\nwebsites: Zain\'s World · Digital Delights\n→ type <span class="g">apps</span>, <span class="g">games</span> or open projects.html',
    apps:()=>'• <span class="w">VaultFlow</span> — track document expiry dates · iOS + web · secure/Google sign-in + 2FA · built with Cursor AI\n• <span class="w">Digital Delights</span> — in-school game/social/proxy hub · first business to turn a profit',
    games:()=>'• <span class="w">Crazy Stack</span> (iOS) — first App Store game · stack game · Cursor AI\n• <span class="w">Battle Arena</span> (iOS) — online PVP · Firebase backend\n• <span class="w">Arena Shooter</span> (web) — wave shooter · single HTML file\n• <span class="w">Business Dominion</span> (web) — business sim · secure backend accounts · LLM test\n→ open games.html',
    websites:()=>'• Zain\'s World (Wix) — first-ever project · blog\n• Digital Delights — game/social/proxy hub · profitable\n• Arena Shooter — browser game',
    vaultflow:()=>'VaultFlow → <a href="https://vault-flow.space" target="_blank" style="color:var(--cyan)">vault-flow.space</a> · cloud ecosystem tracking document lifecycles &amp; subscription renewals before they expire. iOS + web, secure sign-in, Google sign-in, 2FA.',
    vault:()=>cmds.vaultflow(),
    ftc:()=>'FIRST Tech Challenge → multi-motor chassis control, sensor arrays &amp; Java autonomous + sponsorship, docs pipelines &amp; community outreach.',
    robotics:()=>cmds.ftc(),
    stack:()=>'TypeScript · JavaScript · Python · Java · React Native · TailwindCSS · Firebase · Xcode · Autodesk Fusion · Git · Cursor AI',
    tech:()=>cmds.stack(),
    resume:()=>'full CV → open <a href="resume.html" style="color:var(--green)">resume.html</a> · status: OPEN TO OPPORTUNITIES',
    contact:()=>'email: <span class="g">zainhamidzia@gmail.com</span> · <span class="g">zhworldchannel@gmail.com</span>\nlinkedin · instagram · github @zhworldchannel-byte',
    email:()=>open('mailto:zainhamidzia@gmail.com'),
    github:()=>open('https://github.com/zhworldchannel-byte'),
    linkedin:()=>open('https://www.linkedin.com/in/zain-hamid-390523393/'),
    instagram:()=>open('https://www.instagram.com/zainy_2012/'),
    social:()=>'linkedin.com/in/zain-hamid-390523393 · instagram.com/zainy_2012 · github.com/zhworldchannel-byte',
    ls:()=>PAGES.map(p=>p[0]).join('  '),
    pwd:()=>'/home/zain/hub',
    cd:a=>a&&a.length?'bash: cd: '+a[0]+': just click a nav link 😄':'/home/zain',
    uname:()=>'TerminalOS zain-hub 1.0.0 x64 · JetBrains Mono · dark',
    cat:a=>{const f=(a[0]||'').toLowerCase();
      const map={'about.md':cmds.about,'profile.md':cmds.profile,'skills.txt':cmds.skills,
        'resume.md':cmds.resume,'contact.md':cmds.contact,'projects.md':cmds.projects,
        'stack.md':cmds.stack,'vaultflow.md':cmds.vaultflow,'experience.md':cmds.experience};
      if(map[f])return map[f]();
      if(!f)return 'usage: cat &lt;file&gt; — try: about.md, profile.md, skills.txt, resume.md, contact.md, projects.md, stack.md, vaultflow.md';
      return 'cat: '+f+': No such file or directory';},
    neofetch:()=>`<span class="g">      ______     zain@hub</span>
<span class="g">     / ____/     </span>---------------
<span class="g">    / /  __     </span>Name:    Zain Hamid
<span class="g">   / /__/ /     </span>Role:    Founder &amp; CEO @ VaultFlow
<span class="g">   \\____/       </span>Editor:  Cursor AI (native)
                Langs:   TS · JS · Python · Java
                Focus:   apps · games · robotics
                Status:  open to opportunities`,
    date:()=>new Date().toString(),
    echo:a=>a.join(' ')||'',
    motd:()=>'“build the thing you wish existed.” — welcome to zain@hub ◉',
    fortune:()=>rand(quotes),
    quote:()=>rand(quotes),
    joke:()=>rand(jokes),
    coffee:()=>'      ( (\n       ) )\n    ........\n    |      |]   fuel acquired ☕\n    \\      /\n     `----\'',
    banner:()=>'<span class="g">'+
      ' ______     ___     _____ _   _ \n'+
      '|__  / \\   |_ _|   | ____| \\ | |\n'+
      '  / / _ \\   | |    |  _| |  \\| |\n'+
      ' / /_/ ___ \\ | |    | |___| |\\  |\n'+
      '/____/_/   \\_\\___|   |_____|_| \\_|</span>',
    history:()=>hist.map((h,i)=>' '+(i+1)+'  '+h).join('\n')||'(empty)',
    sudo:()=>'<span style="color:#ff5f56">nice try.</span> zain is not in the sudoers file. this incident will be reported. 😏',
    exit:()=>'logout — connection to zain@hub closed. (just close the tab 😉)',
    logout:()=>cmds.exit(),
    man:a=>{const c=(a[0]||'').toLowerCase();
      if(cmds[c])return c.toUpperCase()+'(1)\n\n  a ~/hub command. run it directly: <span class="g">'+c+'</span>';
      return 'What manual page do you want? try: man help';},
    hire:()=>cmds.status(),
    opportunities:()=>cmds.status(),
    whois:a=>((a[0]||'').toLowerCase()==='zain'||!a.length)?cmds.whoami():'whois: no record for "'+a[0]+'"',
    open:a=>{const p=(a[0]||'').toLowerCase().replace('.html','');
      const hit=PAGES.find(x=>x[1]===p||x[0].replace('.html','')===p);
      if(hit){setTimeout(()=>location.href=hit[0],450);return 'opening '+hit[1]+'.html →';}
      return 'usage: open &lt;page&gt; — pages: '+PAGES.map(x=>x[1]).join(', ');},
    goto:a=>cmds.open(a),
    repos:async()=>{try{const r=await fetch('https://api.github.com/users/'+USER+'/repos?per_page=100&sort=updated').then(x=>x.json());
      if(!Array.isArray(r)||!r.length)return 'no public repos yet — they\'ll show here once you push.';
      return r.slice(0,15).map(x=>'• <span class="w">'+x.name+'</span>'+(x.language?' <span class="m">('+x.language+')</span>':'')).join('\n');
      }catch(e){return 'could not reach the github api right now.';}},
    followers:async()=>{try{const u=await fetch('https://api.github.com/users/'+USER).then(x=>x.json());
      return 'followers: <span class="g">'+(u.followers||0)+'</span> · following: '+(u.following||0)+' · public repos: '+(u.public_repos||0);
      }catch(e){return 'could not reach the github api right now.';}},
    stars:async()=>{try{const r=await fetch('https://api.github.com/users/'+USER+'/repos?per_page=100').then(x=>x.json());
      const s=Array.isArray(r)?r.reduce((a,x)=>a+(x.stargazers_count||0),0):0;
      return 'total stars across public repos: <span class="g">'+s+'</span> ★';
      }catch(e){return 'could not reach the github api right now.';}},
    snake:()=>'🐍 the contribution snake auto-generates via GitHub Actions and eats my commit squares.',
    hi:()=>'hey! 👋 type <span class="g">help</span> to explore, or <span class="g">whoami</span> to start.',
    hello:()=>cmds.hi(),
    ping:()=>'pong 🏓  (0.42ms — localhost of the mind)',
    time:()=>new Date().toLocaleTimeString(),
    uptime:()=>'up 24/7 · load average: shipping, shipping, shipping',
    version:()=>'zain@hub v1.2 · terminal build · '+new Date().getFullYear(),
    ver:()=>cmds.version(),
    tree:()=>{const it=PAGES.map(p=>p[0]);
      return '~/hub\n'+it.map((f,i)=>(i===it.length-1?'└── ':'├── ')+f).join('\n');},
    theme:()=>'theme: <span class="g">dark terminal</span> · #010409 canvas · #39d353 green · #22d3ee cyan · JetBrains Mono',
    colors:()=>'<span style="color:#39d353">green</span> · <span style="color:#22d3ee">cyan</span> · <span style="color:#c9d1d9">text</span> · <span style="color:#8b949e">muted</span> · <span style="color:#ff5f56">red</span>',
    color:()=>cmds.colors(),
    matrix:()=>'wake up, Neo… 🟢 the matrix already has you — look at the background.',
    weather:()=>'weather in ~/hub: ☀ permanently sunny, with a high chance of shipping.',
    reboot:()=>'rebooting… just kidding. we never go down — 24/7 uptime ◉',
    '42':()=>'the answer to life, the universe &amp; everything. (still debugging the question)',
    secret:()=>'🔓 you found it. fun fact: this whole site is one big terminal easter egg. keep building.',
    credits:()=>'designed &amp; built by <span class="w">Zain Hamid</span> · powered by ~/terminal · dark-mode always ◉',
    rm:a=>a.join(' ').includes('-rf')?'<span style="color:#ff5f56">whoa.</span> permission denied. nice try though. 😄':'rm: this is a read-only terminal.',
    cls:()=>{body.innerHTML='';return null;},
    clear:()=>{body.innerHTML='';return null;}
  };

  function print(html,cls){const d=document.createElement('div');d.className='line '+(cls||'');
    d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;}
  const hist=[];let hp=0;
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowUp'){if(hp>0)input.value=hist[--hp]||'';return;}
    if(e.key==='ArrowDown'){if(hp<hist.length)input.value=hist[++hp]||'';return;}
    if(e.key==='l'&&e.ctrlKey){e.preventDefault();body.innerHTML='';return;}
    if(e.key!=='Enter')return;
    const raw=input.value.trim();input.value='';
    print('<span class="u">zain@hub:~$</span> '+raw,'w');
    if(!raw)return; hist.push(raw);hp=hist.length;
    const parts=raw.split(/\s+/),fn=cmds[parts[0].toLowerCase()];
    if(fn){const out=fn(parts.slice(1));
      if(out&&typeof out.then==='function'){print('<span class="m">…</span>','m');out.then(v=>{if(v!=null)print(v,'m')});}
      else if(out!==null)print(out,'m');}
    else print('command not found: '+parts[0]+' — type <span class="g">help</span>','m');
  });
})();

/* ---------- custom cursor: precise dot + soft trailing ring ---------- */
(function(){
  if(!matchMedia('(pointer:fine)').matches) return;     // mouse only
  const root=document.documentElement;
  const dot=document.createElement('div'); dot.className='cur-dot';
  const ring=document.createElement('div'); ring.className='cur-ring';
  document.body.append(dot,ring); root.classList.add('cur');

  let mx=innerWidth/2,my=innerHeight/2, rx=mx,ry=my, seen=false;
  addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.transform='translate('+mx+'px,'+my+'px)';
    if(!seen){seen=true; rx=mx; ry=my; root.classList.add('cur-ready');}
  },{passive:true});

  addEventListener('mousedown',()=>root.classList.add('cur-down'));
  addEventListener('mouseup',()=>root.classList.remove('cur-down'));
  addEventListener('mouseleave',()=>root.classList.add('cur-hidden'));
  addEventListener('mouseenter',()=>root.classList.remove('cur-hidden'));

  const clickSel='a,button,summary,label,[role=button],input[type=submit],'
    +'input[type=button],.tile,.chip,.pill,.btn';
  const typeSel='input:not([type=submit]):not([type=button]),textarea,select,[contenteditable]';
  addEventListener('mouseover',e=>{
    const t=e.target;
    root.classList.toggle('cur-hover',!!(t.closest&&t.closest(clickSel)));
    root.classList.toggle('typing',!!(t.closest&&t.closest(typeSel)));
  });

  (function loop(){
    rx+=(mx-rx)*0.18; ry+=(my-ry)*0.18;
    ring.style.transform='translate('+rx+'px,'+ry+'px)';
    requestAnimationFrame(loop);
  })();
})();
