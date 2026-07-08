try{
  var n=performance.getEntriesByType('navigation')[0];
  var r=n&&n.type==='reload';
  if(sessionStorage.getItem('zh_session_active')&&!r)
    document.documentElement.classList.add('booted');
}catch(e){}
