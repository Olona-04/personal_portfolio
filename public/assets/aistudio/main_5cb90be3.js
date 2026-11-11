// Olona Williams portfolio: theme toggle, mobile menu, typing/scroll effects, message box
(function(){
var root=document.documentElement,btn=document.getElementById('theme');
function sys(){return window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}
function cur(){return root.getAttribute('data-theme')||sys()}
function paint(){btn.textContent=cur()==='dark'?'☀️':'🌙'}
try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')root.setAttribute('data-theme',s)}catch(e){}
paint();
btn.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}paint()});
var nav=document.getElementById('nav'),m=document.getElementById('menu');
m.addEventListener('click',function(){var o=nav.classList.toggle('open');m.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');m.setAttribute('aria-expanded',false)}});


var f=document.getElementById('msg');
f.addEventListener('submit',function(e){e.preventDefault();
var d=new FormData(f),n=d.get('name'),m=d.get('message'),em=d.get('email');
var u='mailto:olonawilliams04@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(m+'\n\nFrom: '+n+' ('+em+')');
var a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
document.getElementById('msgnote').textContent='Opening your email app. Press send there to deliver it. Thank you!'});

document.documentElement.classList.add('js');
var hs=document.querySelectorAll('h2,h3.grp');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
[].forEach.call(hs,function(h){h.classList.add('rv');io.observe(h)})}else{document.documentElement.classList.remove('js')}
})();
