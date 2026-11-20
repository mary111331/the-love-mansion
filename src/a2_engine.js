
// ================= ENGINE =================
var canvas=$('c');
var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,isTouch?1.75:2));
renderer.setSize(window.innerWidth,window.innerHeight,false);
if(THREE.sRGBEncoding!==undefined)renderer.outputEncoding=THREE.sRGBEncoding;
var camera=new THREE.PerspectiveCamera(68,window.innerWidth/window.innerHeight,0.05,400);
camera.rotation.order='YXZ';
window.addEventListener('resize',function(){renderer.setSize(window.innerWidth,window.innerHeight,false);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();});
var EYE=1.62;
var player={x:0,z:0,yaw:0,pitch:-0.05,y:0};

// ---- textures ----
var TEX={};
function ctex(w,h,fn,rep){var c=document.createElement('canvas');c.width=w;c.height=h;var g=c.getContext('2d');fn(g,w,h);var t=new THREE.CanvasTexture(c);if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep[0],rep[1]);}if(THREE.sRGBEncoding!==undefined)t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t;}
function woodTex(base,dark,planks,rep){var key='w'+base+dark+planks+(rep||'');if(TEX[key])return TEX[key];
 TEX[key]=ctex(512,512,function(g,w,h){g.fillStyle=base;g.fillRect(0,0,w,h);var ph=h/planks;for(var p=0;p<planks;p++){var y=p*ph;g.fillStyle='rgba(0,0,0,'+(Math.random()*.12)+')';g.fillRect(0,y,w,ph);
  for(var i=0;i<26;i++){g.strokeStyle='rgba('+(dark)+','+(0.08+Math.random()*.14)+')';g.lineWidth=1+Math.random()*2;g.beginPath();var yy=y+Math.random()*ph;g.moveTo(0,yy);for(var x=0;x<=w;x+=32)g.lineTo(x,yy+Math.sin(x/60+i)*3*Math.random());g.stroke();}
  g.fillStyle='rgba(20,10,5,.55)';g.fillRect(0,y,w,2);var off=Math.random()*w;g.fillRect(off,y,2,ph);
  if(Math.random()<.5){g.fillStyle='rgba(40,20,10,.35)';g.beginPath();g.ellipse(Math.random()*w,y+ph/2,6+Math.random()*8,3+Math.random()*3,0,0,PI*2);g.fill();}}},rep||[2,2]);return TEX[key];}
function marbleTex(){if(TEX.marble)return TEX.marble;TEX.marble=ctex(512,512,function(g,w,h){g.fillStyle='#f1ece6';g.fillRect(0,0,w,h);for(var i=0;i<40;i++){g.strokeStyle='rgba(120,110,120,'+(Math.random()*.25)+')';g.lineWidth=Math.random()*2.5;g.beginPath();var x=Math.random()*w,y=Math.random()*h;g.moveTo(x,y);for(var k=0;k<12;k++){x+=rnd(-40,60);y+=rnd(-30,40);g.lineTo(x,y);}g.stroke();}
 g.strokeStyle='rgba(212,175,95,.35)';g.lineWidth=1;for(i=0;i<6;i++){g.beginPath();x=Math.random()*w;y=Math.random()*h;g.moveTo(x,y);for(k=0;k<10;k++){x+=rnd(-30,50);y+=rnd(-20,40);g.lineTo(x,y);}g.stroke();}},[1,1]);return TEX.marble;}
function sandTex(){if(TEX.sand)return TEX.sand;TEX.sand=ctex(256,256,function(g,w,h){g.fillStyle='#d9c29a';g.fillRect(0,0,w,h);for(var i=0;i<6000;i++){g.fillStyle='rgba('+(Math.random()<.5?'255,240,210':'120,95,60')+','+Math.random()*.25+')';g.fillRect(Math.random()*w,Math.random()*h,1.5,1.5);}},[30,30]);return TEX.sand;}
function grassTex(){if(TEX.grass)return TEX.grass;TEX.grass=ctex(256,256,function(g,w,h){g.fillStyle='#3f6b35';g.fillRect(0,0,w,h);for(var i=0;i<5000;i++){g.fillStyle='rgba('+(Math.random()<.5?'120,170,90':'25,55,25')+','+Math.random()*.5+')';g.fillRect(Math.random()*w,Math.random()*h,1,3);}},[24,24]);return TEX.grass;}
function tileTex(a,b,n){var k='t'+a+b+n;if(TEX[k])return TEX[k];TEX[k]=ctex(256,256,function(g,w,h){var s=w/8;for(var i=0;i<8;i++)for(var j=0;j<8;j++){g.fillStyle=(i+j)%2?a:b;g.fillRect(i*s,j*s,s,s);}g.strokeStyle='rgba(0,0,0,.15)';for(i=0;i<=8;i++){g.beginPath();g.moveTo(i*s,0);g.lineTo(i*s,h);g.moveTo(0,i*s);g.lineTo(w,i*s);g.stroke();}},[n,n]);return TEX[k];}
function wallTex(base,pattern){var k='wl'+base+pattern;if(TEX[k])return TEX[k];TEX[k]=ctex(256,256,function(g,w,h){g.fillStyle=base;g.fillRect(0,0,w,h);
 if(pattern==='stripe'){for(var x=0;x<w;x+=32){g.fillStyle='rgba(255,255,255,.05)';g.fillRect(x,0,14,h);}}
 else if(pattern==='brick'){for(var y=0;y<h;y+=32)for(var x2=((y/32)%2)*32;x2<w+64;x2+=64){g.fillStyle='rgba(0,0,0,'+(.05+Math.random()*.12)+')';g.fillRect(x2-62,y+2,60,28);}g.fillStyle='rgba(230,220,200,.15)';for(y=0;y<h;y+=32)g.fillRect(0,y,w,2);}
 else if(pattern==='damask'){g.fillStyle='rgba(255,220,160,.07)';for(var i=0;i<4;i++)for(var j=0;j<4;j++){g.beginPath();g.ellipse(i*64+32,j*64+32,12,22,0,0,PI*2);g.fill();g.beginPath();g.arc(i*64,j*64,6,0,PI*2);g.fill();}}
 else{for(var n=0;n<3000;n++){g.fillStyle='rgba(0,0,0,'+Math.random()*.05+')';g.fillRect(Math.random()*w,Math.random()*h,2,2);}}},[3,1.5]);return TEX[k];}
var MATS={};
function mat(c,o){o=o||{};var k=c+JSON.stringify(o);if(MATS[k]&&!o.uniq)return MATS[k];var p={color:c,roughness:o.r!==undefined?o.r:.8,metalness:o.m||0};if(o.map)p.map=o.map;if(o.e){p.emissive=o.e;p.emissiveIntensity=o.ei||1;}if(o.t){p.transparent=true;p.opacity=o.t;}if(o.side)p.side=THREE.DoubleSide;var m=new THREE.MeshStandardMaterial(p);if(o.map&&!o.uniq)m.map=o.map;MATS[k]=m;return m;}
function basic(c,o){o=o||{};var p={color:c};if(o.t!==undefined){p.transparent=true;p.opacity=o.t;}if(o.map)p.map=o.map;if(o.side)p.side=THREE.DoubleSide;if(o.add){p.blending=THREE.AdditiveBlending;p.depthWrite=false;p.transparent=true;}return new THREE.MeshBasicMaterial(p);}

// ---- primitive helpers (all add to current build group G) ----
var G=null,TAPS=[],ANIM=[],SOLIDS=[],WALK=[],DOORS=[];
function add(o,parent){(parent||G).add(o);return o;}
function box(w,h,d,m,x,y,z,parent){var o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof m==='string'?mat(m):m);o.position.set(x||0,(y||0)+h/2,z||0);return add(o,parent);}
function cyl(rt,rb,h,m,x,y,z,seg,parent){var o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg||20),typeof m==='string'?mat(m):m);o.position.set(x||0,(y||0)+h/2,z||0);return add(o,parent);}
function sph(r,m,x,y,z,parent){var o=new THREE.Mesh(new THREE.SphereGeometry(r,18,14),typeof m==='string'?mat(m):m);o.position.set(x||0,y||0,z||0);return add(o,parent);}
function plane(w,h,m,x,y,z,ry,parent){var o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),typeof m==='string'?mat(m):m);o.position.set(x||0,y||0,z||0);o.rotation.y=ry||0;return add(o,parent);}
function grp(x,y,z,ry,parent){var g=new THREE.Group();g.position.set(x||0,y||0,z||0);g.rotation.y=ry||0;return add(g,parent);}
function light(c,i,d,x,y,z,parent){var l=new THREE.PointLight(c,i,d||10,2);l.position.set(x,y,z);return add(l,parent);}
function textCanvas(lines,o){o=o||{};var w=o.w||512,fs=o.fs||40,lh=fs*1.3,pad=o.pad!==undefined?o.pad:24;var h=o.h||Math.ceil(pad*2+lh*lines.length);
 return ctex(w,h,function(g){if(o.bg){g.fillStyle=o.bg;g.fillRect(0,0,w,h);}if(o.border){g.strokeStyle=o.border;g.lineWidth=6;g.strokeRect(6,6,w-12,h-12);}
  g.fillStyle=o.color||'#2a1d18';g.textAlign=o.align||'center';g.textBaseline='middle';
  lines.forEach(function(L,i){var f=fs;var st=false;if(/^~~.*~~$/.test(L)){L=L.slice(2,-2);st=true;}g.font=(o.italic?'italic ':'')+f+'px '+(o.font||'Georgia, serif');var x=o.align==='left'?pad:w/2;var y=pad+lh*i+lh/2;
   var tw=g.measureText(L).width;if(tw>w-pad*2){f=f*(w-pad*2)/tw;g.font=(o.italic?'italic ':'')+f+'px '+(o.font||'Georgia, serif');tw=w-pad*2;}
   if(o.glow){g.shadowColor=o.glow;g.shadowBlur=18;}g.fillText(L,x,y);if(st){g.fillRect(o.align==='left'?x:x-tw/2,y,tw,Math.max(2,f/12));}});});}
function sign(lines,wid,x,y,z,ry,o,parent){o=o||{};var t=textCanvas(lines,o);var asp=t.image.height/t.image.width;var m=new THREE.MeshBasicMaterial({map:t,transparent:!o.bg,side:THREE.DoubleSide,depthWrite:!!o.bg});var p=new THREE.Mesh(new THREE.PlaneGeometry(wid,wid*asp),m);p.position.set(x,y,z);p.rotation.y=ry||0;return add(p,parent);}
function label(text,x,y,z,parent,col){var t=textCanvas([text],{fs:44,color:col||'#fff6e0',bg:'rgba(30,15,30,.6)',w:512,pad:16});var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));var asp=t.image.height/t.image.width;sp.scale.set(0.9,0.9*asp,1);sp.position.set(x,y,z);sp.renderOrder=5;return add(sp,parent);}

// ---- interaction registry ----
function tap(obj,fn,name){obj.userData.tap=fn;obj.userData.tname=name||'';obj.traverse(function(c){c.userData.tapRoot=obj;});TAPS.push(obj);return obj;}
function anim(fn){ANIM.push(fn);}
function solid(x,z,w,d){SOLIDS.push([x-w/2,z-d/2,x+w/2,z+d/2]);}
function walk(x1,z1,x2,z2){WALK.push([Math.min(x1,x2),Math.min(z1,z2),Math.max(x1,x2),Math.max(z1,z2)]);}
function door(x,z,ry,to,spawn,lab,o){o=o||{};var g=grp(x,0,z,ry);var w=o.w||1.3,h=o.h||2.3;
 var fr=mat(o.frame||'#3b2416',{r:.6});box(w+.24,.14,.18,fr,0,h,0,g);box(.12,h,.18,fr,-w/2-.06,0,0,g);box(.12,h,.18,fr,w/2+.06,0,0,g);
 var dm=o.open?basic(o.glowc||'#ffd9a0',{t:.35,add:1}):mat(o.col||'#6b3d22',{map:woodTex('#6b3d22','30,15,5',4,[1,1]),r:.55});
 var leaf=box(w,h,.08,dm,0,0,0,g);if(!o.open){sph(.05,mat('#d4af37',{m:.8,r:.3}),w/2-.15,1.05,.07,g);}
 if(lab)sign([lab],Math.min(1.6,w+.3),0,h+.38,.1,0,{fs:46,color:'#f3d9a0',bg:'rgba(35,18,22,.85)',w:640,pad:14},g);
 tap(g,function(){go(to,spawn);},lab);DOORS.push({x:x,z:z,to:to,spawn:spawn});return g;}

// ---- scenes ----
var SCN={},cur=null,curId=null,sceneObj=null;
function defScene(id,o){SCN[id]=o;}
function buildScene(id){var d=SCN[id];var s=new THREE.Scene();G=s;TAPS=[];ANIM=[];SOLIDS=[];WALK=[];DOORS=[];
 s.background=new THREE.Color(d.bg||'#140c10');if(d.fog)s.fog=new THREE.Fog(d.fog[0],d.fog[1],d.fog[2]);
 s.add(new THREE.HemisphereLight(d.sky||'#ffe8cc',d.ground||'#2a1810',d.hemi!==undefined?d.hemi:.55));
 d.build(s);var r={scene:s,taps:TAPS,anim:ANIM,solids:SOLIDS,walk:WALK,doors:DOORS,d:d,amb:d.amb};G=null;return r;}
var cache={};
function go(id,spawn,instant){if(!SCN[id]||(window.__noGo&&!instant))return;var doIt=function(){
  if(!cache[id])cache[id]=buildScene(id);cur=cache[id];curId=id;
  var sp=spawn||cur.d.spawn||[0,0,0];player.x=sp[0];player.z=sp[1];player.yaw=sp[2]||0;player.pitch=-0.05;EYE=1.62;
  $('pname').textContent=cur.d.name;$('psub').textContent=cur.d.sub||'';startAmb(cur.amb);jazzLoop(id==='jazz');
  if(cur.d.enter)cur.d.enter();try{localStorage.setItem('lm_last',id);}catch(e){}
  var keys=Object.keys(cache);if(keys.length>7){keys.forEach(function(k){if(k!==id&&Object.keys(cache).length>7){disposeScene(cache[k].scene);delete cache[k];}});}
  $('fade').classList.remove('on');};
 if(instant){doIt();return;}$('fade').classList.add('on');tone(220,.3,'sine',.04);setTimeout(doIt,330);}
function disposeScene(s){s.traverse(function(o){if(o.geometry)o.geometry.dispose();});}

// ---- input ----
var keys={},joy={x:0,y:0,id:null},look={id:null,x:0,y:0,moved:0,t:0};
window.addEventListener('keydown',function(e){keys[e.key.toLowerCase()]=1;});window.addEventListener('keyup',function(e){keys[e.key.toLowerCase()]=0;});
var J0=$('joy'),K0=$('knob');
function joyMove(t){var r=J0.getBoundingClientRect();var dx=t.clientX-(r.left+r.width/2),dy=t.clientY-(r.top+r.height/2);var L=Math.hypot(dx,dy),m=48;if(L>m){dx*=m/L;dy*=m/L;}joy.x=dx/m;joy.y=dy/m;K0.style.transform='translate('+dx+'px,'+dy+'px)';}
J0.addEventListener('touchstart',function(e){e.preventDefault();var t=e.changedTouches[0];joy.id=t.identifier;joyMove(t);},{passive:false});
J0.addEventListener('touchmove',function(e){e.preventDefault();for(var i=0;i<e.changedTouches.length;i++)if(e.changedTouches[i].identifier===joy.id)joyMove(e.changedTouches[i]);},{passive:false});
function joyEnd(e){for(var i=0;i<e.changedTouches.length;i++)if(e.changedTouches[i].identifier===joy.id){joy.id=null;joy.x=joy.y=0;K0.style.transform='';}}
J0.addEventListener('touchend',joyEnd);J0.addEventListener('touchcancel',joyEnd);
var mouseJoy=false;J0.addEventListener('mousedown',function(e){mouseJoy=true;joyMove(e);e.stopPropagation();});window.addEventListener('mousemove',function(e){if(mouseJoy)joyMove(e);});window.addEventListener('mouseup',function(){if(mouseJoy){mouseJoy=false;joy.x=joy.y=0;K0.style.transform='';}});
function resetInput(){joy.x=joy.y=0;joy.id=null;K0.style.transform='';look.id=null;keys={};}
function lookStart(id,x,y){look.id=id;look.x=x;look.y=y;look.sx=x;look.sy=y;look.moved=0;look.t=performance.now();}
function lookMove(x,y){var dx=x-look.x,dy=y-look.y;look.x=x;look.y=y;look.moved+=Math.abs(dx)+Math.abs(dy);player.yaw-=dx*0.0055;player.pitch=clamp(player.pitch-dy*0.0045,-1.3,1.3);}
function lookEnd(x,y){if(look.moved<12&&performance.now()-look.t<600)doTap(x,y);look.id=null;}
canvas.addEventListener('touchstart',function(e){e.preventDefault();audioInit();if(look.id===null){var t=e.changedTouches[0];lookStart(t.identifier,t.clientX,t.clientY);}},{passive:false});
canvas.addEventListener('touchmove',function(e){e.preventDefault();for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];if(t.identifier===look.id)lookMove(t.clientX,t.clientY);}},{passive:false});
canvas.addEventListener('touchend',function(e){for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];if(t.identifier===look.id)lookEnd(t.clientX,t.clientY);}},{passive:false});
var mdown=false;canvas.addEventListener('mousedown',function(e){if(isTouch&&e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents)return;mdown=true;audioInit();lookStart('m',e.clientX,e.clientY);});
window.addEventListener('mousemove',function(e){if(mdown)lookMove(e.clientX,e.clientY);});
window.addEventListener('mouseup',function(e){if(mdown){mdown=false;lookEnd(e.clientX,e.clientY);}});
var ray=new THREE.Raycaster(),v2=new THREE.Vector2();
function doTap(x,y){if(!cur||cardOpen)return;v2.x=x/window.innerWidth*2-1;v2.y=-(y/window.innerHeight)*2+1;ray.setFromCamera(v2,camera);ray.far=14;
 var hits=ray.intersectObjects(cur.taps,true);for(var i=0;i<hits.length;i++){var r=hits[i].object.userData.tapRoot;if(r&&r.userData.tap){if(hits[i].distance>(r.userData.far||9)){toast('Walk a little closer.');return;}pling();r.userData.tap(hits[i]);return;}}}
window.__tapAt=doTap;

// ---- movement & loop ----
function canStand(x,z){var ok=false,W=cur.walk;for(var i=0;i<W.length;i++){var w=W[i];if(x>=w[0]&&x<=w[2]&&z>=w[1]&&z<=w[3]){ok=true;break;}}if(!ok)return false;var S=cur.solids,r=.22;for(i=0;i<S.length;i++){var s=S[i];if(x>s[0]-r&&x<s[2]+r&&z>s[1]-r&&z<s[3]+r)return false;}return true;}
var clock=new THREE.Clock(),T=0;
function loop(){requestAnimationFrame(loop);var dt=Math.min(clock.getDelta(),.05);T+=dt;if(!cur)return;
 var f=-joy.y,s=joy.x;if(keys.w||keys.arrowup)f=1;if(keys.s||keys.arrowdown)f=-1;if(keys.a)s=-1;if(keys.d)s=1;if(keys.arrowleft)player.yaw+=dt*1.8;if(keys.arrowright)player.yaw-=dt*1.8;
 if(cardOpen){f=0;s=0;}var sp=(cur.d.speed||2.4)*dt;
 if(f||s){var sn=Math.sin(player.yaw),cs=Math.cos(player.yaw);var dx=(-sn*f+cs*s)*sp,dz=(-cs*f-sn*s)*sp;if(canStand(player.x+dx,player.z))player.x+=dx;if(canStand(player.x,player.z+dz))player.z+=dz;}
 var gy=cur.d.groundY?cur.d.groundY(player.x,player.z):0;player.y+=(gy-player.y)*Math.min(1,dt*8);
 camera.position.set(player.x,player.y+EYE+(f||s?Math.sin(T*9)*.025:0),player.z);camera.rotation.set(player.pitch,player.yaw,0);
 for(var i=0;i<cur.anim.length;i++)cur.anim[i](dt,T);
 if(cur.d.tick)cur.d.tick(dt,T);
 renderer.render(cur.scene,camera);}

// ---- common furniture helpers ----
function room(w,d,h,o){o=o||{};var floorM=o.floor||mat('#7a4a2a',{map:woodTex(o.fc||'#7a4a2a','40,20,8',8,[w/3,d/3]),r:.7});
 var f=plane(w,d,floorM,0,0,0);f.rotation.x=-PI/2;
 var c=plane(w,d,mat(o.ceil||'#3a2418',{map:woodTex(o.ceil||'#3a2418','20,10,4',6,[w/3,d/3])}),0,h,0);c.rotation.x=PI/2;
 var wm=o.wall||mat(o.wc||'#5a3424',{map:o.wmap||woodTex(o.wc||'#5a3424','30,15,5',10,[w/2,1])});
 plane(w,h,wm,0,h/2,-d/2,0);plane(w,h,wm,0,h/2,d/2,PI);plane(d,h,wm,-w/2,h/2,0,PI/2);plane(d,h,wm,w/2,h/2,0,-PI/2);
 if(!o.noBeams){var bm=mat('#2b1810',{map:woodTex('#2b1810','10,5,2',2,[1,1])});for(var x=-w/2+1.5;x<w/2;x+=3)box(.22,.25,d,bm,x,h-.25,0);}
 if(!o.noTrim){var tm=mat('#2e1a10');box(w,.14,.06,tm,0,0,-d/2+.03);box(w,.14,.06,tm,0,0,d/2-.03);box(.06,.14,d,tm,-w/2+.03,0,0);box(.06,.14,d,tm,w/2-.03,0,0);}
 walk(-w/2+.35,-d/2+.35,w/2-.35,d/2-.35);}
function rug(w,d,c1,c2,x,z){var t=ctex(256,256,function(g,W,H){g.fillStyle=c1;g.fillRect(0,0,W,H);g.strokeStyle=c2;g.lineWidth=10;g.strokeRect(14,14,W-28,H-28);g.lineWidth=3;g.strokeRect(32,32,W-64,H-64);g.fillStyle=c2;for(var i=0;i<5;i++){g.beginPath();g.ellipse(W/2,H/2,90-i*16,60-i*10,0,0,PI*2);g.globalAlpha=.25;g.fill();}g.globalAlpha=1;});var p=plane(w,d,mat('#ffffff',{map:t,r:1}),x||0,.012,z||0);p.rotation.x=-PI/2;return p;}
function candle(x,y,z,parent){var g=grp(x,y,z,0,parent);cyl(.035,.035,.18,mat('#f4ead2'),0,0,0,10,g);var fl=sph(.025,basic('#ffcf6a'),0,.22,0,g);fl.scale.y=1.8;var l=null;anim(function(dt,t){fl.scale.x=1+Math.sin(t*20+x*7)*.15;fl.position.y=.22+Math.sin(t*13+z)*.004;});return g;}
function frame(w,h,tex,x,y,z,ry,parent,fc){var g=grp(x,y,z,ry,parent);box(w+.12,h+.12,.05,mat(fc||'#8a6a2a',{m:.4,r:.4}),0,-(h+.12)/2,0,g);var p=plane(w,h,tex?new THREE.MeshBasicMaterial({map:tex}):mat('#ddd'),0,0,.03,0,g);return g;}
function shelf(x,z,ry,w,h,cols){var g=grp(x,0,z,ry);var wm=mat('#4a2c1a',{map:woodTex('#4a2c1a','20,10,4',3,[1,1])});box(w,h,.4,wm,0,0,-.05,g);var rows=Math.floor(h/.42);
 for(var r=0;r<rows;r++){var y=.12+r*.42;box(w-.06,.03,.42,mat('#3a2010'),0,y,0,g);var bx=-w/2+.08;while(bx<w/2-.12){var bw=.04+Math.random()*.06,bh=.24+Math.random()*.1;box(bw,bh,.26,mat(pick(cols||['#7a1f24','#2a4a6a','#c8a24a','#3a5a3a','#5a2a5a','#d8cbb0','#8a4a2a'])),bx+bw/2,y+.03,.05,g);bx+=bw+.006;}}
 return g;}
function plant(x,z,s,parent){var g=grp(x,0,z,0,parent);s=s||1;cyl(.18*s,.13*s,.3*s,mat('#9a5a3a'),0,0,0,12,g);for(var i=0;i<9;i++){var l=sph(.16*s,mat(pick(['#2f6b34','#3d7d3a','#2a5a2c'])),rnd(-.15,.15)*s,(.45+Math.random()*.5)*s,rnd(-.15,.15)*s,g);l.scale.set(1,1.5,.6);l.rotation.z=rnd(-.6,.6);}return g;}
function pTex(lines,o){o=o||{};return textCanvas(lines,Object.assign({bg:'#f6ecd8',color:'#3a241a',fs:30,w:512,pad:30,align:'left',italic:true,border:'#c9a76a'},o));}
function note(x,y,z,ry,lines,fn,parent,o){var t=pTex(lines,o);var asp=t.image.height/t.image.width;var w=(o&&o.wid)||.42;var p=plane(w,w*asp,new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}),x,y,z,ry||0,parent);if(fn)tap(p,fn);return p;}
function flat(o,rx){o.rotation.x=rx===undefined?-PI/2:rx;return o;}
function stars(n,r,y0){var g=new THREE.BufferGeometry(),p=[];for(var i=0;i<n;i++){var th=Math.random()*PI*2,ph=Math.random()*PI*.45;p.push(Math.cos(th)*Math.sin(ph)*r,(y0||0)+Math.cos(ph)*r,Math.sin(th)*Math.sin(ph)*r);}g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));var s=new THREE.Points(g,new THREE.PointsMaterial({color:'#fff6e0',size:.6,sizeAttenuation:true,transparent:true,opacity:.9}));return add(s);}
function floatText(text,x,y,z,col,size){var t=textCanvas([text],{fs:46,color:col||'#ffe9b0',glow:col||'#ffcf6a',w:1024,pad:20,italic:true});var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false,opacity:.95}));var asp=t.image.height/t.image.width;var s=size||4;sp.scale.set(s,s*asp,1);sp.position.set(x,y,z);return add(sp);}
