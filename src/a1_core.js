(function(){
'use strict';
var $=function(id){return document.getElementById(id);};
function J(id){try{return JSON.parse($(id).textContent);}catch(e){return null;}}
var APT=J('aptdata')||'';
function fromApt(id){var re=new RegExp('<script id="'+id+'" type="application/json">([\\s\\S]*?)</script>');var m=APT.match(re);if(!m)return null;try{return JSON.parse(m[1]);}catch(e){return null;}}
var ARCH=fromApt('archdata')||{groups:[]};
var ALBUM=fromApt('albumdata')||[];
var LOVE=J('lovedata')||[];
var MUSIC=J('musicdata')||{recs:[],socke:[]};
var BEACH=J('beachdata')||{HALL:[],ECHO:[]};
var EXTRA=J('extradata')||{};
var isTouch=('ontouchstart' in window)||(navigator.maxTouchPoints>0);
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function rnd(a,b){return a+Math.random()*(b-a);}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
var PI=Math.PI;

// ---------- text rendering ----------
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function inl(s){s=esc(s);s=s.replace(/~~([\s\S]+?)~~/g,'<s>$1</s>');s=s.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');s=s.replace(/(^|[^*\w])\*([^*\n]+?)\*(?!\*)/g,'$1<i>$2</i>');return s;}
function md(text){
 var lines=String(text).replace(/\r/g,'').split('\n'),out=[],para=[],inCode=false,code=[];
 function flush(){if(para.length){out.push('<p>'+para.map(inl).join('<br>')+'</p>');para=[];}}
 for(var i=0;i<lines.length;i++){var L=lines[i];
  if(/^\s*```/.test(L)){if(inCode){out.push('<pre>'+esc(code.join('\n'))+'</pre>');code=[];inCode=false;}else{flush();inCode=true;}continue;}
  if(inCode){code.push(L);continue;}
  var t=L.replace(/&nbsp;/g,' ').trim();
  if(!t){flush();continue;}
  var h=t.match(/^(#{1,6})\s+(.*)$/);
  if(h){flush();out.push('<h'+(h[1].length<=2?3:4)+'>'+inl(h[2])+'</h'+(h[1].length<=2?3:4)+'>');continue;}
  if(/^(-{3,}|\*{3,}|_{3,}|={3,})$/.test(t)){flush();out.push('<hr>');continue;}
  if(/^>\s?/.test(t)){flush();out.push('<blockquote>'+inl(t.replace(/^>\s?/,''))+'</blockquote>');continue;}
  para.push(t.replace(/^[-*]\s+/,'\u2022 '));}
 if(inCode)out.push('<pre>'+esc(code.join('\n'))+'</pre>');
 flush();return out.join('');}
function linesHtml(arr){return arr.map(function(l){return l===''?'<br>':'<p style="margin:0 0 .3em">'+inl(l)+'</p>';}).join('');}
function paginate(text,max){var blocks=String(text).replace(/\r/g,'').split(/\n\s*\n/),pages=[],cur='',f=0;
 for(var i=0;i<blocks.length;i++){var b=blocks[i];if(cur&&cur.length+b.length>max&&f%2===0){pages.push(cur);cur='';}cur+=(cur?'\n\n':'')+b;f+=(b.match(/```/g)||[]).length;}
 if(cur)pages.push(cur);return pages.length?pages:[''];}

// ---------- documents ----------
var DOCS={};
ARCH.groups.forEach(function(g){g.items.forEach(function(it){if(!DOCS[it.title])DOCS[it.title]={title:it.title,text:it.text||'',src:g.name};});});
LOVE.forEach(function(p){var k=p.t;if(DOCS[k])k=p.t+' ('+p.d+')';DOCS[k]={title:p.t,text:p.x,src:'Our love letters, love scenes and poems',date:p.d};p.key=k;});
function findDoc(q){if(DOCS[q])return DOCS[q];var ql=q.toLowerCase();for(var k in DOCS)if(k.toLowerCase().indexOf(ql)===0)return DOCS[k];for(k in DOCS)if(k.toLowerCase().indexOf(ql)>=0)return DOCS[k];return null;}
function docExists(q){return !!findDoc(q);}

// ---------- UI: toast, card, reader ----------
var toastT=0;function toast(t,ms){var e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('on');},ms||2800);}
var cardOpen=false,cardOnClose=null;
function card(title,html,btns,sub,onClose){
 $('cT').textContent=title;$('cS').textContent=sub||'';$('cS').style.display=sub?'':'none';$('cB').innerHTML=html||'';$('cB').scrollTop=0;
 var b=$('cBtns');b.innerHTML='';(btns||[]).concat([{t:'Close',alt:1,fn:closeCard}]).forEach(function(o){var e=document.createElement('button');e.type='button';e.textContent=o.t;if(o.alt)e.className='alt';e.onclick=function(ev){ev.stopPropagation();o.fn();};b.appendChild(e);});
 $('card').classList.remove('hide');cardOpen=true;cardOnClose=onClose||null;resetInput();}
function closeCard(){$('card').classList.add('hide');cardOpen=false;var f=cardOnClose;cardOnClose=null;if(f)f();}
$('card').addEventListener('click',function(e){if(e.target===$('card'))closeCard();});
function openDoc(q,back){var d=findDoc(q);if(!d){toast('That note is not in the saved archive.');return;}
 var pages=paginate(d.text,3200),i=0;
 function render(){card(d.title,md(pages[i]),(i>0?[{t:'\u2039 Back',alt:1,fn:function(){i--;render();}}]:[]).concat(i<pages.length-1?[{t:'Next page \u203a',fn:function(){i++;render();}}]:[]).concat(back?[{t:'Back to list',alt:1,fn:back}]:[]),(d.date?d.date+' \u00b7 ':'')+d.src+(pages.length>1?' \u00b7 page '+(i+1)+' of '+pages.length:''));}
 render();}
function listDocs(title,titles,sub){var html='',ok=titles.filter(docExists);
 card(title,'',[],sub||(ok.length+' pieces, word for word'));var B=$('cB');
 ok.forEach(function(t){var d=findDoc(t);var e=document.createElement('button');e.className='item';e.type='button';e.innerHTML='<b></b><span></span>';e.firstChild.textContent=d.title;e.lastChild.textContent=d.date||'';e.onclick=function(){openDoc(t,function(){listDocs(title,titles,sub);});};B.appendChild(e);});}
function openArchive(){card('The whole archive','',[],'Every saved note, and the book of love letters, love scenes and poems');var B=$('cB');
 ARCH.groups.forEach(function(g,gi){var e=document.createElement('button');e.className='item';e.type='button';e.innerHTML='<b></b><span></span>';e.firstChild.textContent=g.name;e.lastChild.textContent=g.items.length+' notes';e.onclick=function(){listDocs(g.name,g.items.map(function(x){return x.title;}));};B.appendChild(e);});
 var e=document.createElement('button');e.className='item';e.type='button';e.innerHTML='<b>Our love letters, love scenes and poems</b><span>'+LOVE.length+' pieces</span>';e.onclick=openLoveBook;B.appendChild(e);
 if(ALBUM.length){var a=document.createElement('button');a.className='item';a.type='button';a.innerHTML='<b>The photo album</b><span>'+ALBUM.length+' pages</span>';a.onclick=function(){openAlbum(0);};B.appendChild(a);}}
function openLoveBook(){card('Our love letters, love scenes and poems','',[],LOVE.length+' pieces from August 17 to November 17, oldest first');var B=$('cB'),m='';
 LOVE.forEach(function(p){var mo=(p.d.match(/(August|September|October|November)/)||['',''])[1];if(mo&&mo!==m){m=mo;var h=document.createElement('h5');h.textContent=mo+' 2026';B.appendChild(h);}
  var e=document.createElement('button');e.className='item';e.type='button';e.innerHTML='<b></b><span></span>';e.firstChild.textContent=p.t;e.lastChild.textContent=p.d.replace(/ 2026.*$/,'');e.onclick=function(){openDoc(p.key,openLoveBook);};B.appendChild(e);});}
function randomLove(){return pick(LOVE);}
function openAlbum(i){if(!ALBUM.length)return;i=(i+ALBUM.length)%ALBUM.length;var a=ALBUM[i];
 card(a.title||'Photo album','<img src="'+a.src+'" style="width:100%;border-radius:10px;display:block">',[{t:'\u2039',alt:1,fn:function(){openAlbum(i-1);}},{t:'\u203a',fn:function(){openAlbum(i+1);}}],(a.date||'')+' \u00b7 page '+(i+1)+' of '+ALBUM.length);}

// ---------- embedded worlds ----------
var frameURL=null;
function openWorld(id,name){var s=J(id);if(!s){toast('That world is not inside this file.');return;}
 if(frameURL)URL.revokeObjectURL(frameURL);frameURL=URL.createObjectURL(new Blob([s],{type:'text/html'}));
 var f=$('frame');var old=f.querySelector('iframe');if(old)old.remove();var ifr=document.createElement('iframe');ifr.src=frameURL;ifr.allow='autoplay; fullscreen; xr-spatial-tracking';f.appendChild(ifr);f.classList.remove('hide');toast(name+'. Tap \u201cBack to the mansion\u201d to come home.',3500);stopAmb();}
$('frameClose').onclick=function(){var f=$('frame');var i=f.querySelector('iframe');if(i)i.remove();f.classList.add('hide');if(frameURL){URL.revokeObjectURL(frameURL);frameURL=null;}if(cur)startAmb(cur.amb);};

// ---------- secrets ----------
var SECRETS={},found={};try{found=JSON.parse(localStorage.getItem('lm_secrets')||'{}');}catch(e){}
function defSecret(id){SECRETS[id]=1;}
function secret(id,title,html){var fresh=!found[id];found[id]=1;try{localStorage.setItem('lm_secrets',JSON.stringify(found));}catch(e){}updSecrets();
 if(fresh){chime();toast('Hidden surprise found: '+Object.keys(found).filter(function(k){return SECRETS[k];}).length+' of '+Object.keys(SECRETS).length);}
 if(title)setTimeout(function(){card(title,html||'',[],'a hidden surprise');},fresh?700:0);}
function updSecrets(){var n=Object.keys(found).filter(function(k){return SECRETS[k];}).length;$('secrets').textContent='\u2726 '+n+' of '+Object.keys(SECRETS).length+' hidden surprises';}
var counts={};function count(id,n){counts[id]=(counts[id]||0)+1;return counts[id]>=n&&counts[id]%n===0;}

// ---------- audio ----------
var AC=null,master=null,soundOn=true;
function audioInit(){if(AC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.8;master.connect(AC.destination);}catch(e){AC=null;}}
function tone(f,d,type,vol,when,dest){if(!AC||!soundOn)return;var t=AC.currentTime+(when||0),o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol||.15,t+.01);g.gain.exponentialRampToValueAtTime(.0005,t+d);o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.05);}
function chime(){[880,1320,1760].forEach(function(f,i){tone(f,1.2,'sine',.08,i*.09);});}
function pling(){tone(pick([523,587,659,784,880]),.6,'triangle',.08);}
var noiseBuf=null;function nbuf(){if(noiseBuf)return noiseBuf;var n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0),l=0;for(var i=0;i<n;i++){var w=Math.random()*2-1;l=(l+.02*w)/1.02;d[i]=w*.5+l*3;}noiseBuf=b;return b;}
function burst(d,freq,vol,q){if(!AC||!soundOn)return;var s=AC.createBufferSource();s.buffer=nbuf();var f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=freq||1500;f.Q.value=q||1;var g=AC.createGain(),t=AC.currentTime;g.gain.setValueAtTime(vol||.4,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(master);s.start(t,Math.random());s.stop(t+d+.05);}
function clapSound(echo){if(!AC||!soundOn)return;var n=Math.round(echo*7);for(var i=0;i<=n;i++){(function(i){setTimeout(function(){burst(.12,1400,.5*Math.pow(.55,i),1.2);},i*170);})(i);}}
var amb=null;
function startAmb(kind){stopAmb();if(!AC||!soundOn||!kind)return;var s=AC.createBufferSource();s.buffer=nbuf();s.loop=true;var f=AC.createBiquadFilter(),g=AC.createGain();
 var cfg={rain:['highpass',900,.10],sea:['lowpass',500,.22],fire:['bandpass',2600,.05],room:['lowpass',220,.06],void:['lowpass',160,.12],club:['lowpass',300,.05]}[kind]||['lowpass',300,.05];
 f.type=cfg[0];f.frequency.value=cfg[1];g.gain.value=cfg[2];s.connect(f);f.connect(g);g.connect(master);s.start();var lfo=null;
 if(kind==='sea'){lfo=AC.createOscillator();var lg=AC.createGain();lfo.frequency.value=.12;lg.gain.value=.12;lfo.connect(lg);lg.connect(g.gain);lfo.start();}
 amb={s:s,lfo:lfo};}
function stopAmb(){if(amb){try{amb.s.stop();if(amb.lfo)amb.lfo.stop();}catch(e){}amb=null;}}
var mbTimer=null;function musicBox(){if(!AC)return;clearTimeout(mbTimer);var notes=[659,0,784,880,0,784,659,0,587,523,0,587,659,0,0,587,523,494,523,0,0];var i=0;(function step(){if(i>=notes.length)return;if(notes[i])tone(notes[i]*1.5,1.1,'sine',.07);tone(notes[i]?notes[i]*3:0||1,0.01,'sine',0);i++;mbTimer=setTimeout(step,330);})();}
var jazzT=null;function jazzLoop(on){clearTimeout(jazzT);if(!on||!AC)return;var ch=[[220,277,330,415],[247,294,370,440],[196,247,294,370],[220,262,330,392]],k=0;(function bar(){if(!soundOn)return;var c=ch[k%4];c.forEach(function(f,i){tone(f,1.9,'triangle',.035,i*.02);});tone(c[0]/2,.4,'sine',.12,0);tone(c[2]/2,.4,'sine',.1,.9);tone(pick(c)*2,.3,'sine',.03,1.3);k++;jazzT=setTimeout(bar,1900);})();}

// ---------- YouTube ----------
var ytRec=null,ytIdx=0;
function playRec(r){ytRec=r;ytIdx=0;if(!r.ids||!r.ids.length){window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(r.a+' '+r.t),'_blank');return;}ytShow();}
function ytShow(){var r=ytRec;$('ytT').textContent=r.t+' \u00b7 '+r.a;$('ytbox').innerHTML='<iframe allow="autoplay; encrypted-media" allowfullscreen src="https://www.youtube-nocookie.com/embed/'+r.ids[ytIdx%r.ids.length]+'?autoplay=1&playsinline=1&rel=0"></iframe>';$('yt').classList.remove('hide');$('ytNext').style.display=r.ids.length>1?'':'none';jazzLoop(false);}
$('ytNext').onclick=function(){ytIdx++;ytShow();};$('ytX').onclick=function(){$('ytbox').innerHTML='';$('yt').classList.add('hide');};
var RECBY={};MUSIC.recs.concat(MUSIC.socke).forEach(function(r){RECBY[r.id]=r;});
function songList(title,recs,sub){card(title,'',[],sub||'');var B=$('cB');recs.forEach(function(r){var e=document.createElement('button');e.className='item';e.type='button';e.innerHTML='<b></b><span></span>';e.firstChild.textContent=r.t;e.lastChild.textContent=r.a;e.onclick=function(){closeCard();playRec(r);};B.appendChild(e);if(r.cond){var c=document.createElement('div');c.style.cssText='font-size:12px;color:#8a6d5c;margin:-3px 4px 8px;font-style:italic';c.textContent=r.cond;B.appendChild(c);}});}
