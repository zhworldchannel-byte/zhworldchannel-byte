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

  const quotes=['ship small, ship often — momentum compounds.','clean state management > clever state management.',
    'the best UI is the one you never notice.','dark mode is not a preference — it\'s a lifestyle.',
    'a project that documents itself wins.','build in public, learn in public.'];
  const jokes=['why do programmers prefer dark mode? because light attracts bugs. 🐛',
    'there are 10 kinds of people: those who understand binary and those who don\'t.',
    'it works on my machine ¯\\_(ツ)_/¯','a SQL query walks into a bar, approaches two tables and asks: may I join you?'];
  const rand=a=>a[Math.floor(Math.random()*a.length)];
  const open=u=>{window.open(u,'_blank');return 'opening '+u+' ↗';};

  const cmds={
    help:()=>`<span class="g">── core ──</span>
  whoami  about  profile  age  school  skills  experience  status
<span class="g">── work ──</span>
  projects  apps  games  websites  vaultflow  ftc  robotics  stack
<span class="g">── links ──</span>
  resume  contact  email  github  linkedin  instagram  social
<span class="g">── system ──</span>
  ls  cat &lt;file&gt;  pwd  cd  uname  neofetch  date  echo  history
  motd  fortune  joke  coffee  banner  clear  sudo  exit  man &lt;cmd&gt;`,
    whoami:()=>'<span class="w">Zain Hamid</span> — Youth Developer · Founder &amp; CEO @ VaultFlow',
    about:()=>'13-year-old developer building apps, games &amp; websites with modern AI-assisted workflows. growing backend skills (data, auth, core app functionality). founder of VaultFlow.',
    profile:()=>'I build a wide range of apps and websites — games plus practical, user-focused tools that solve real problems. strong in modern AI-assisted development and a growing understanding of backend systems: data, authentication &amp; core app functionality.',
    age:()=>'13 years old · born 2012-09-29',
    school:()=>'Timbercrest Middle School · Grade 7 · Class of 2031',
    education:()=>cmds.school(),
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
      if(f==='about.md')return cmds.about();
      if(f==='profile.md')return cmds.profile();
      if(f==='skills.txt')return cmds.skills();
      if(f==='resume.md')return cmds.resume();
      if(!f)return 'usage: cat &lt;file&gt; — try about.md, profile.md, skills.txt, resume.md';
      return 'cat: '+f+': No such file or directory';},
    neofetch:()=>`<span class="g">      ______     zain@hub</span>
<span class="g">     / ____/     </span>---------------
<span class="g">    / /  __     </span>Name:    Zain Hamid
<span class="g">   / /__/ /     </span>Age:     13 (b. 2012-09-29)
<span class="g">   \\____/       </span>School:  Timbercrest MS · Grade 7
                Role:    Founder &amp; CEO @ VaultFlow
                Editor:  Cursor AI (native)
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
    if(fn){const out=fn(parts.slice(1));if(out!==null)print(out,'m');}
    else print('command not found: '+parts[0]+' — type <span class="g">help</span>','m');
  });
})();
