/* ══════════════════════════════════════════════════════════════
   Zain Hamid · ~/hub  —  shared behavior for all pages
   ══════════════════════════════════════════════════════════════ */
const USER = 'zhworldchannel-byte';

const SOCIALS = [
  {href:'https://www.linkedin.com/in/zain-hamid-390523393/',label:'LinkedIn',icon:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>'},
  {href:'https://www.instagram.com/zainy_2012/',label:'Instagram',icon:'<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>'},
  {href:'https://github.com/zhworldchannel-byte',label:'GitHub',icon:'<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'}
];
const CONTACT = {phone:'+1 425-364-0252',phoneHref:'tel:+14253640252',email:'zhworldchannel@gmail.com',altEmail:'zainhamidzia@gmail.com'};

/* ---------- pages (single source of truth for nav) ---------- */
const PAGES = [
  ['index.html','home'],['about.html','about'],['resume.html','resume'],
  ['projects.html','projects'],['games.html','games'],['robotics.html','robotics'],
  ['stack.html','stack'],['terminal.html','terminal'],['card.html','card'],['contact.html','contact']
];
(function renderShell(){
  const here=(location.pathname.split('/').pop()||'index.html')||'index.html';
  const active=h=>(h===here||(here===''&&h==='index.html'))?' class="active"':'';
  const navHtml=PAGES.map(([h,l])=>`<a href="${h}"${active(h)}>${l}</a>`).join('');
  const links=document.querySelector('.nav .links');
  if(links) links.innerHTML=navHtml;
  const foot=document.querySelector('footer.site-footer');
  if(foot){
    const socials=SOCIALS.map(s=>
      `<a class="foot-soc" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}"><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg></a>`
    ).join('');
    foot.innerHTML=`<div class="foot-inner">
      <div class="foot-brand"><span class="foot-dots"><i class="dot r"></i><i class="dot y"></i><i class="dot g"></i></span><span><b>Zain Hamid</b> · <span class="foot-path">~/hub</span></span></div>
      <nav class="fnav" aria-label="Footer navigation">${navHtml}</nav>
      <div class="foot-social" aria-label="Social links">${socials}</div>
      <div class="foot-contact">
        <a href="${CONTACT.phoneHref}">${CONTACT.phone}</a>
        <span class="foot-sep">·</span>
        <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
      </div>
    </div>
    <div class="foot-copy">© <span class="yr"></span> Zain Hamid · developer profile</div>`;
    foot.querySelectorAll('.yr').forEach(e=>e.textContent=new Date().getFullYear());
  }
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
  document.querySelectorAll('footer .yr').forEach(e=>e.textContent=new Date().getFullYear());
})();

/* ---------- favicon (terminal '>' glyph, injected everywhere) ---------- */
(function(){
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23010409"/><text x="50" y="70" font-size="60" font-family="monospace" fill="%2339d353" text-anchor="middle">&gt;_</text></svg>';
  const l=document.createElement('link'); l.rel='icon'; l.type='image/svg+xml';
  l.href='data:image/svg+xml,'+svg; document.head.appendChild(l);
})();

/* ---------- boot / loading screen (once per session, min ~3s) ---------- */
(function(){
  const boot=document.getElementById('boot'); if(!boot) return;
  const root=document.documentElement;
  if(root.classList.contains('booted')){ boot.remove(); return; }
  try{ sessionStorage.setItem('zh_booted','1'); }catch(e){}
  const steps=document.getElementById('bootsteps'),
        bar=document.getElementById('bootbar'),
        pct=document.getElementById('bootpct');
  const tasks=[
    'mounting /home/zain',
    'loading modules · projects · games · robotics',
    'initializing VaultFlow core',
    'establishing secure connection',
    'compiling interface assets',
    'decrypting profile',
    'starting ~/hub'
  ];
  let i=0;
  (function add(){ if(!steps||i>=tasks.length) return;
    const row=document.createElement('div'); row.className='boot-step';
    row.innerHTML='<span class="ck">✓</span><span class="t">'+tasks[i]+'</span>'
      +'<span class="lead"></span><span class="s">OK</span>';
    steps.appendChild(row);
    requestAnimationFrame(function(){ row.classList.add('show'); });
    i++; setTimeout(add, 300+Math.random()*150); })();
  const t0=performance.now();
  (function prog(){ const p=Math.min(100,(performance.now()-t0)/3000*100);
    if(bar) bar.style.width=p.toFixed(1)+'%';
    if(pct) pct.textContent=Math.floor(p)+'%';
    if(p<100) requestAnimationFrame(prog); })();
  setTimeout(function(){ boot.classList.add('out');
    setTimeout(function(){ boot.remove(); }, 520); }, 3300);
})();

/* ---------- VaultFlow release toast (home only, random + cooldown) ---------- */
(function(){
  const here=(location.pathname.split('/').pop()||'index.html')||'index.html';
  if(here!=='index.html'&&here!=='') return;
  const KEY_LAST='zh_vf_toast_at', KEY_OFF='zh_vf_toast_off', COOLDOWN=6*60*60*1000, CHANCE=.42;
  try{
    if(sessionStorage.getItem(KEY_OFF)) return;
    if(Date.now()-(+localStorage.getItem(KEY_LAST)||0)<COOLDOWN) return;
    if(Math.random()>CHANCE) return;
  }catch(e){}

  function show(){
    const el=document.createElement('aside');
    el.className='vf-toast'; el.setAttribute('role','status'); el.setAttribute('aria-live','polite');
    el.innerHTML=`<button type="button" class="vf-toast-x" aria-label="Dismiss">×</button>
      <div class="vf-toast-inner">
        <img class="vf-toast-logo" src="vaultflow-icon-square.png" alt="" onerror="this.style.display='none'" />
        <div class="vf-toast-body">
          <div class="vf-toast-tag">latest release</div>
          <h3 class="vf-toast-title">VaultFlow</h3>
          <p class="vf-toast-sub">Never Miss An Expiration Date Again</p>
        </div>
      </div>
      <div class="vf-toast-foot">
        <a class="vf-toast-link" href="https://vault-flow.space/" target="_blank" rel="noopener">visit vault-flow.space →</a>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(()=>el.classList.add('show'));
    try{ localStorage.setItem(KEY_LAST,String(Date.now())); }catch(e){}
    const close=()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),320);
      try{ sessionStorage.setItem(KEY_OFF,'1'); }catch(e){} };
    el.querySelector('.vf-toast-x')?.addEventListener('click',close);
    setTimeout(close,14000);
  }

  const boot=document.getElementById('boot');
  const delay=(boot&&!document.documentElement.classList.contains('booted'))?4000:900;
  setTimeout(show,delay);
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
  const rand=a=>a[Math.floor(Math.random()*a.length)];

  /* ── jokes: curated set + combinatorial generators (19,000+ distinct) ── */
  const jokes=[
    "why do programmers prefer dark mode? because light attracts bugs. 🐛",
    "it works on my machine ¯\\_(ツ)_/¯",
    "a SQL query walks into a bar, approaches two tables and asks: may I join you?",
    "why do Java developers wear glasses? because they don't C#.",
    "I told my computer I needed a break, and now it won't stop sending me KitKats.",
    "there are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
    "why did the developer go broke? because he used up all his cache.",
    "a programmer's wife says: go to the store and get a loaf of bread, if they have eggs get a dozen. he came back with 12 loaves of bread.",
    "why do programmers hate nature? it has too many bugs and no documentation.",
    "how do you comfort a JavaScript bug? you console it.",
    "why was the function sad after the party? it didn't get called back.",
    "a byte walks into a bar looking miserable. the bartender asks: what's wrong? it says: parity error. the bartender says: yeah, I thought you looked a bit off.",
    "why did the programmer quit his job? he didn't get arrays.",
    "what's a programmer's favorite hangout spot? the Foo Bar.",
    "why do Python devs prefer snakes? because they don't like to deal with C.",
    "I would tell you a UDP joke, but you might not get it.",
    "I'd tell you a TCP joke, but I'd have to keep repeating it until you got it.",
    "why don't bachelors like Git? because they're afraid to commit.",
    "there's no place like 127.0.0.1.",
    "hardware: the part of the computer you can kick. software: the part you can only swear at.",
    "why did the private variable break up with the public one? it needed some space.",
    "why was the JavaScript developer sad? because he didn't know how to null his feelings.",
    "a QA engineer walks into a bar. orders a beer. orders 0 beers. orders 999999999 beers. orders a lizard. orders -1 beers. orders a sfdeljknesv.",
    "to understand recursion, you must first understand recursion.",
    "why do programmers always mix up Halloween and Christmas? because Oct 31 == Dec 25.",
    "!false — it's funny because it's true.",
    "why did the developer stay calm? because he had good exception handling.",
    "a programmer is heading to the store. his partner says: get milk. he never returns. — array index out of bounds.",
    "how many programmers does it take to fix a lightbulb? none, it's a hardware problem.",
    "why was the developer unhappy at their job? they wanted arrays.",
    "the best thing about a boolean is even if you're wrong, you're only off by a bit.",
    "why did the coder get kicked out of school? because he kept breaking the class.",
    "I've got a really good UDP joke to tell you, but I don't know if you'll get it.",
    "algorithm: word used by programmers when they don't want to explain what they did.",
    "debugging: being the detective in a crime movie where you're also the murderer.",
    "there are 10 types of people: those who understand binary and those who don't.",
    "there are 10 types of people: those who understand binary, those who don't, and those who didn't expect a base-3 joke.",
    "why did the programmer dislike the countryside? too many bugs, and the WiFi's terrible.",
    "old programmers never die, they just decompile.",
    "why do programmers prefer iOS development? because they can't handle the Android.",
    "programming is 10% writing code and 90% understanding why it doesn't work.",
    "a good programmer looks both ways before crossing a one-way street.",
    "my code doesn't have bugs, it develops random unexpected features.",
    "when your code works on the first try. — nobody has ever said this.",
    "git commit -m 'minor changes' (changed 4,000 lines across 87 files).",
    "the '5-minute fix' is the most dangerous phrase in software.",
    "99 little bugs in the code, 99 little bugs — take one down, patch it around, 127 little bugs in the code.",
    "I don't always test my code, but when I do, I do it in production.",
    "the code is more like guidelines than actual rules.",
    "in order to understand recursion, see the previous joke.",
    "why did the frontend dev break up with the backend dev? there was no connection.",
    "CSS: the only language where you spend two hours centering a div and call it a career.",
    "a CSS developer's favorite dance move? float: left.",
    "'it's not a bug, it's an undocumented feature' — every developer ever.",
    "why was the null pointer so calm? it had nothing to reference.",
    "regex walks into a bar and immediately regrets everything. .*",
    "why did the DevOps engineer sleep on the floor? no stack.",
    "I finally understand why my code is slow — it has commitment issues, it never optimizes.",
    "why did the developer break up over text? too many unresolved merge conflicts.",
    "a programmer's dream vacation? somewhere with no internet, so the tickets stop.",
    "'have you tried turning it off and on again?' — the most powerful spell in IT.",
    "why did the AI cross the road? it was trained on chickens.",
    "why don't programmers like to go outside? the sun causes too much glare on the monitor.",
    "the two states of every programmer: 'I am a god' and 'I have no idea what I'm doing.'"
  ];

  const JL=['JavaScript','Python','Java','C++','C','C#','Go','Rust','Ruby','PHP','TypeScript','Swift',
    'Kotlin','Scala','Haskell','Perl','Lua','R','Dart','Elixir','Clojure','Assembly','Bash','SQL','COBOL',
    'Fortran','Objective-C','Visual Basic','MATLAB','Julia','Erlang','F#','Groovy','Solidity','Zig','Nim',
    'Crystal','OCaml','Prolog','Brainfuck'];

  const jokeGens=[
    ()=>{const l=rand(JL),t=[
      l=>l+' developers never die — they just go out of scope.',
      l=>'I\'d tell you a '+l+' joke, but I\'m afraid you wouldn\'t catch the exception.',
      l=>'writing '+l+' at 3am is how every horror movie actually begins.',
      l=>l+' is easy, they said. it\'ll be fun, they said. 🙃',
      l=>'debugging '+l+' is being a detective in a crime where you\'re also the murderer.',
      l=>'my '+l+' code doesn\'t have bugs — it has undocumented features.',
      l=>l+' devs don\'t get lost, they just take an unhandled path.',
      l=>'I love '+l+'. it never lets me down… it just throws me instead.',
      l=>'ask a '+l+' dev how they are and they\'ll say "it compiles, so… fine?"',
      l=>l+': turning coffee into stack traces since forever. ☕',
      l=>'"just one more line of '+l+'," I said, 400 lines ago.',
      l=>l+' semicolons: 50% syntax, 50% superstition.',
      l=>'the '+l+' docs said "trivial." it\'s been three days.',
      l=>'my therapist said to write my feelings down, so now I have 2,000 lines of '+l+'.',
      l=>l+' doesn\'t have problems, only "interesting behaviors."',
      l=>'to understand recursion, first write it in '+l+'.',
      l=>'I renamed my '+l+' variable "temp" in 2019. it\'s now load-bearing.',
      l=>'nobody:\nabsolutely nobody:\na '+l+' dev at 2am: "it worked five minutes ago."',
      l=>'a '+l+' dev walks into a bar and orders 1.0000000001 beers. floating point strikes again.',
      l=>'"I\'ll just quickly fix this '+l+' bug" — famous last words, part '+(Math.floor(Math.random()*900)+100)+'.'
    ]; return rand(t)(l);},
    ()=>{const a=rand(JL),b=rand(JL.filter(x=>x!==a)),v=[
      'one of these will be deprecated before you finish reading this.',
      'pick one and lose friends either way.',
      'both are perfect — according to their respective cults.',
      'the war never ends; only the survivors rotate.',
      'choose wisely, your future self is watching through the git blame.',
      'there\'s no right answer, only strongly held opinions.',
      'whichever you pick, Stack Overflow will judge you.',
      'a tale of two semicolons.',
      'same energy, different Slack channels.',
      'the real winner was the tech debt we made along the way.',
      'flip a coin; the coin also has opinions.',
      'somewhere a senior dev just sighed and doesn\'t know why.'
    ]; return a+' vs '+b+': '+rand(v);},
    ()=>{const g=rand(['programmers','frontend devs','backend devs','DevOps engineers','data scientists',
      'QA testers','sysadmins','interns','senior devs','product managers','designers','AI models','hackers',
      'gamers','startup founders','open-source maintainers','Stack Overflow lurkers','project managers']),
      p=rand(['none — that\'s a hardware problem.','one, but only if it\'s in the ticket.',
      'the whole team, plus a two-week sprint and a retro.','depends, is it billable?',
      'zero, we\'ll document it as a known limitation.','three: one to change it, two to argue about the framework.',
      'one, but they\'ll refactor the entire room first.','we don\'t — we just add a bright-mode toggle.',
      'still loading… please wait.','one, but they\'ll insist it worked in staging.']);
      return 'how many '+g+' does it take to change a lightbulb? '+p;},
    ()=>{const x=rand(['understand binary','finish their side projects','trust "it works on my machine"',
      'actually read the docs','use light mode on purpose','name variables well','write the tests first',
      'close their browser tabs','back up the database','comment their code','leave the office before midnight']);
      return 'there are 10 kinds of people: those who '+x+', and those who don\'t.';}
  ];

  const jokeSeen=[];
  function tellJoke(){
    for(let i=0;i<50;i++){
      const j = Math.random()<0.4 ? rand(jokes) : rand(jokeGens)();
      if(jokeSeen.indexOf(j)===-1){ jokeSeen.push(j); if(jokeSeen.length>80) jokeSeen.shift(); return j; }
    }
    return rand(jokes);
  }
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
    projects:()=>'apps &amp; websites → <a href="projects.html" style="color:var(--green)">projects.html</a>\ngames → <a href="games.html" style="color:var(--green)">games.html</a>\n→ type <span class="g">apps</span>, <span class="g">games</span>, or <span class="g">websites</span>',
    apps:()=>'• <span class="w">VaultFlow</span> — track document expiry dates · iOS + web · secure/Google sign-in + 2FA · built with Cursor AI\n• <span class="w">Digital Delights</span> — in-school game/social/proxy hub · first business to turn a profit',
    games:()=>'• <span class="w">Crazy Stack</span> (iOS) — first App Store game · stack game · Cursor AI\n• <span class="w">Battle Arena</span> (iOS) — online PVP · Firebase backend\n• <span class="w">Arena Shooter</span> (web) — wave shooter · single HTML file\n• <span class="w">Business Dominion</span> (web) — business sim · secure backend accounts · LLM test\n→ open games.html',
    websites:()=>'• Zain\'s World → <a href="https://zainhamidzia.wixsite.com/website" target="_blank" style="color:var(--cyan)">zainhamidzia.wixsite.com/website</a> · first site · blog\n• Digital Delights — game/social/proxy hub · profitable\n• Arena Shooter — browser game',
    vaultflow:()=>'VaultFlow → <a href="https://vault-flow.space/" target="_blank" style="color:var(--cyan)">vault-flow.space</a> · cloud ecosystem tracking document lifecycles &amp; subscription renewals before they expire. iOS + web, secure sign-in, Google sign-in, 2FA.',
    vault:()=>cmds.vaultflow(),
    ftc:()=>'Guided Motion · Team #32785 · FIRST Tech Challenge → multi-motor chassis control, sensor arrays &amp; Java autonomous + sponsorship, docs pipelines &amp; community outreach.',
    robotics:()=>cmds.ftc(),
    stack:()=>'TypeScript · JavaScript · Python · Java · React Native · TailwindCSS · Firebase · Xcode · Autodesk Fusion · Git · Cursor AI',
    tech:()=>cmds.stack(),
    resume:()=>'full CV → open <a href="resume.html" style="color:var(--green)">resume.html</a> · status: OPEN TO OPPORTUNITIES',
    contact:()=>'phone: <span class="g">+1 425-364-0252</span>\nmain: <span class="g">zhworldchannel@gmail.com</span> · alt: <span class="g">zainhamidzia@gmail.com</span>\n→ full details on <a href="contact.html" style="color:var(--green)">contact.html</a>',
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
    joke:()=>tellJoke(),
    jokes:()=>tellJoke(),
    dadjoke:()=>tellJoke(),
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
