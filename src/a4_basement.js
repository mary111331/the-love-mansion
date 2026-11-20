
// ================= BASEMENT RECORD SHOP =================
var CRATES=[['r','Screamin\u2019 Jay & friends'],['soul','Soul'],['jazz','Jazz'],['blues','Blues & rock\u2019n\u2019roll'],['funk','Funk'],['rap','Rap'],['hh','Hamburg'],['unk','Deep cuts'],['ns','Songs we talked about'],['jb','Jukebox monsters']];
function cratesOf(cr){return MUSIC.recs.filter(function(r){return r.cr===cr;});}
var TALKED=[['keephead'],['dearmama'],['hawkins'],['simone'],['losecontrol'],['shallow'],['ichkenne'],['cherishtheday'],['feeling'],['ahnma']].map(function(a){return RECBY[a[0]];}).filter(Boolean).concat([{t:'Waterfalls',a:'TLC',ids:['8WEtxJ4-sh4']},{t:'People Everywhere (Still Alive)',a:'Khruangbin, from The Universe Smiles Upon You',ids:['Js4CLSsH--c']},{t:'White Gloves',a:'Khruangbin, from The Universe Smiles Upon You',ids:['20cuFhgPLEo']}]);
defScene('basement',{name:'The record shop',sub:'in the basement, with Screaming Jay',bg:'#0f0a0a',amb:'room',spawn:[-4.6,-2.6,-PI/2],build:function(){
 room(12,9,3.2,{fc:'#4a2c1a',wmap:wallTex('#5a2a22','brick'),noBeams:false});
 light('#ffb070',1.5,10,-2,2.8,0);light('#ff4a6a',.9,8,3,2.6,-2);light('#ffcf8a',.8,8,2,2.6,3);
 door(-5.94,-2.6,PI/2,'foyer',[4.8,-2.8,PI/2],'Up to the hall');
 door(5.94,-2.4,-PI/2,'jazz',[-6.2,0,-PI/2],'The jazz club',{col:'#5a1020',frame:'#d4af37'});
 door(0,-4.44,0,'cathedral',[0,5.6,0],'White Noise Cathedral',{col:'#1a2040',frame:'#4a5a8a'});door(.6,4.44,PI,'cinema',[0,4.2,0],'The cinema',{col:'#5a1020',frame:'#d4af37'});
 sign(['RECORDS'],2.2,-2.5,2.6,-4.45,0,{fs:110,color:'#ff6a8a',glow:'#ff2a5a',w:768,font:'Georgia'});
 // crates
 CRATES.forEach(function(c,i){var col=i%5,row=Math.floor(i/5);var x=-3.6+col*1.75,z=-.2+row*2.1;var g=grp(x,0,z);var w=mat('#7a5232',{map:woodTex('#7a5232','30,15,5',3,[1,1])});box(1.2,.7,.55,w,0,0,0,g);for(var k=0;k<14;k++){var r=cratesOf(c[0])[k%Math.max(1,cratesOf(c[0]).length)];box(.02,.32,.32,mat(r?r.c||'#333':'#333'),-.5+k*.075,.62,0,g).rotation.z=-.25;}
  sign([c[1]],1.1,0,.36,.29,0,{fs:44,color:'#2a1d18',bg:'#f6ecd8',w:640,pad:10},g);solid(x,z,1.25,.6);var recs=c[0]==='ns'?TALKED:cratesOf(c[0]);tap(g,function(){songList(c[1],recs,recs.length+' records \u00b7 tap one to play it');},c[1]);});
 // counter with Screaming Jay
 var ct=grp(3.6,0,3.5);box(3,1,.7,mat('#3a2010',{map:woodTex('#3a2010','10,5,2',4,[2,1])}),0,0,0,ct);box(3.1,.05,.8,mat('#2a1810'),0,1,0,ct);solid(3.6,3.5,3.1,.8);
 var jay=cat(3.0,1.05,3.5,PI);var jayN=0;
 tap(jay,function(){jayN++;jay.userData.head.rotation.x=-.3;setTimeout(function(){jay.userData.head.rotation.x=0;},400);
  if(jayN===1){tone(700,.15,'sawtooth',.06);tone(520,.35,'sawtooth',.05,.12);toast('Screaming Jay opens one yellow eye.');}
  else if(jayN===3){secret('jay','I put a spell on you','<p>Screaming Jay stands up, stretches, lets out a long, theatrical yowl and sits down on the Okeh 45. The record starts on its own.</p>');setTimeout(function(){playRec(RECBY.hawkins);},1800);}
  else if(jayN===6){toast('Screaming Jay walks off along the counter, tail high, and comes back. He\u2019s guarding the alligator wine.');setTimeout(function(){playRec(RECBY.alligator);},1200);}
  else{tone(pick([600,700,800]),.25,'sawtooth',.05);toast(pick(['Mrrrp.','He kneads the counter.','Purring, loudly.','Screaming Jay is not impressed.']));}},'Screaming Jay');
 label('Screaming Jay',3.0,1.75,3.5);
 var rp=recordPlayer(4.4,1.05,3.5);tap(rp,function(){rp.userData.spin=true;songList('The shop\u2019s turntable',[RECBY.hawkins,RECBY.simone,RECBY.alligator,RECBY.lovepotion].filter(Boolean),'what\u2019s playing in the shop');},'turntable');
 // sock playlist corner
 var sk=grp(-4.8,0,3.4);box(1,.55,.6,mat('#a3282c',{r:.9}),0,0,0,sk);solid(-4.8,3.4,1.1,.7);var socks=[];for(var i=0;i<7;i++){var s=box(.08,.22,.05,mat(pick(['#f6e7c8','#7a1f24','#2a4a6a','#e8b33a'])),-.35+i*.11,.55,rnd(-.1,.1),sk);s.rotation.z=rnd(-.6,.6);socks.push(s);}
 sign(['Die Sockenplaylist'],1.1,0,.85,.31,0,{fs:46,color:'#f6e7c8',bg:'#3a1410',w:640,pad:10},sk);
 tap(sk,function(){socks.forEach(function(s){s.rotation.z=rnd(-1,1);});var b=[{t:'Sockencode',alt:1,fn:function(){var k=matchDocs(/Sockencode/i);if(k.length)openDoc(k[0]);}}];songList('Die Sockenplaylist',MUSIC.socke,'six records, in order');var B=$('cBtns');var e=document.createElement('button');e.className='alt';e.textContent='Sockencode';e.onclick=b[0].fn;B.insertBefore(e,B.firstChild);if(count('socks',3))secret('sock','A sock in the sleeve','<p>Inside the sleeve of Simply Beautiful there is one odd sock. Nobody knows where its partner went. That is, apparently, part of the code.</p>');},'sock playlist');
 // posters
 var pst=sign(EXTRA.poster||['Die 98,3%'],1.1,-3,1.9,4.46,PI,{fs:40,color:'#f3e9d6',bg:'#2a1430',w:512,pad:24,border:'#e8b33a'});tap(pst,function(){card('Die 98,3%',linesHtml(EXTRA.poster||[]),[{t:'To the cathedral',fn:function(){closeCard();go('cathedral');}}]);});
 var rs=note(-1.0,1.7,4.46,PI,['Die Rose','zwischen den Platten'],function(){var k=matchDocs(/Rose zwischen/i);if(k.length)openDoc(k[0]);},null,{wid:.6,fs:34});
 // rose between records
 var rr=grp(1.2,1.05,3.3);sph(.05,mat('#b0102a'),0,0,0,rr);rr.position.set(2.3,1.08,3.4);
 // a lamp with a spiral shade
 plant(5.3,-3.9,1);
}});

// ================= JAZZ CLUB =================
defScene('jazz',{name:'The jazz club',sub:'behind the basement door',bg:'#07040a',amb:'club',spawn:[-6.2,0,-PI/2],hemi:.25,build:function(){
 room(14,10,3.6,{fc:'#3a1a14',wmap:wallTex('#2a0f18','stripe'),ceil:'#120808'});
 door(-6.94,0,PI/2,'basement',[4.8,-2.4,PI/2],'Back to the record shop');
 // stage
 var stg=box(6,.35,3,mat('#2a1810',{map:woodTex('#2a1810','10,5,2',6,[2,1])}),0,0,-3.4);solid(0,-3.4,6,3);
 var spot=new THREE.SpotLight('#ffd9a0',2.5,12,.45,.5,1.5);spot.position.set(0,3.4,-1);spot.target.position.set(0,.4,-3.6);G.add(spot);G.add(spot.target);
 var curtain=mat('#6a0a1a',{r:1,side:1});for(var i=0;i<14;i++){var c=box(.45,3.2,.1,curtain,-3.1+i*.47,.35,-4.85);c.scale.z=1+(i%2)*.6;}
 // piano
 var pn=grp(-1.6,.35,-3.6,.3);box(1.4,.9,.6,mat('#0a0a0a',{r:.2,m:.3}),0,0,0,pn);box(1.3,.03,.18,mat('#f4f0e8'),0,.9,.35,pn);tap(pn,function(){var ch=pick([[220,277,330,415],[247,311,370,466],[196,247,294,370]]);ch.forEach(function(f,i){tone(f,2,'triangle',.07,i*.04);tone(f*2,1.2,'sine',.03,i*.04);});toast(pick(['A minor seventh, slow.','Somebody\u2019s left the lid up.','Round midnight.']));},'piano');
 // bass + mic
 var bs=grp(1,.35,-3.7);var bb=sph(.35,mat('#6b3d22',{r:.4}),0,.6,0,bs);bb.scale.set(1,1.6,.4);cyl(.03,.03,1.2,mat('#1a1a1a'),0,1.0,0,6,bs);tap(bs,function(){[110,98,87,82].forEach(function(f,i){tone(f,.5,'sine',.25,i*.28);});},'bass');
 var mic=grp(0,.35,-2.6);cyl(.015,.015,1.5,mat('#c0c0c0',{m:.9}),0,0,0,6,mic);sph(.05,mat('#888',{m:.9}),0,1.55,0,mic);var mon=false;
 tap(mic,function(){mon=!mon;spot.intensity=mon?5:2.5;if(mon){var k=matchDocs(/Jazz Club/i);toast('The spotlight finds the microphone.');if(k.length)setTimeout(function(){openDoc(k[0]);},700);}},'microphone');
 // tables with candles
 [[-4,0],[-1.5,1.2],[1.5,1.2],[4,0],[-3,3],[2.8,3.2]].forEach(function(p,i){var t=grp(p[0],0,p[1]);cyl(.4,.4,.04,mat('#1a0a0a',{r:.3}),0,.74,0,20,t);cyl(.04,.04,.74,mat('#d4af37',{m:.8}),0,0,0,8,t);candle(0,.78,0,t);solid(p[0],p[1],.8,.8);light('#ffb060',.35,3,p[0],1.1,p[1]);chair(p[0]-.6,p[1],PI/2,'#3a0a14');chair(p[0]+.6,p[1],-PI/2,'#3a0a14');
  if(i===0)tap(t,function(){var k=matchDocs(/BAR sign/i);if(k.length)openDoc(k[0]);},'a letter on the table');
  if(i===3)tap(t,function(){var k=matchDocs(/Jazz Club/i);if(k.length)openDoc(k[0]);},'a program on the table');
  if(i===4)tap(t,function(){if(count('jtable',2))secret('jcandle','The candle at the corner table','<p>Someone carved two letters into the wax: <b>M + M</b>. Mary and Miles, from the noir chapters.</p>');else toast('The candle gutters.');},'corner table');});
 // bar
 var br=grp(5.6,0,0,-PI/2);box(5,1.1,.6,mat('#2a1008',{map:woodTex('#2a1008','10,5,2',4,[2,1])}),0,0,0,br);solid(5.6,0,.7,5.1);for(var b=0;b<10;b++){cyl(.04,.05,.3,mat(pick(['#2a6a3a','#6a2a1a','#d9a35a','#1a3a6a']),{t:.85,r:.1}),-2+b*.42,1.1,-.1,10,br);}
 sign(['BAR'],1.2,6.9,2.5,0,-PI/2,{fs:140,color:'#ff6a3a',glow:'#ff3a1a',w:512});
 tap(br,function(){burst(.3,4000,.2,2);var k=matchDocs(/BAR sign/i);if(k.length)openDoc(k[0]);},'bar');
 // jazz crate + stage door to the old club
 var jc=grp(-5.8,0,3.6);box(1.1,.6,.55,mat('#5a3a20'),0,0,0,jc);solid(-5.8,3.6,1.2,.6);sign(['Jazz records'],1,0,.33,.29,0,{fs:44,bg:'#f6ecd8',color:'#2a1d18',w:600,pad:8},jc);tap(jc,function(){songList('Jazz records',cratesOf('jazz'),'tap one to play it');},'jazz crate');
 var sd=door(3.8,-4.94,0,'jazz',null,'Stage door: the Digital Jazz Club',{col:'#3a0a14',w:1.0});sd.userData.tap=function(){openWorld('jazzorig','The Digital Jazz Club');};
 var neon=sign(['Nachklang'],2.2,-5,2.6,-4.95,0,{fs:100,color:'#7ab8ff',glow:'#3a8aff',w:768,italic:true});tap(neon,function(){if(count('nachklang',3))secret('nachklang','Nachklang','<p>The blue sign hums. Nachklang: the sound that stays in the room after the music stops. The same word hangs over the winter garden door in Apartment 23.</p>');else toast('The neon hums in blue.');},'neon');
}});

// ================= WHITE NOISE CATHEDRAL (Echoes of the Void) =================
var cathPct=98.3;
defScene('cathedral',{name:'The White Noise Cathedral',sub:'Echoes of the Void',bg:'#05060f',amb:'void',spawn:[0,5.6,0],hemi:.2,sky:'#8aa0ff',ground:'#05050a',fog:['#05060f',8,30],build:function(){
 var f=plane(12,16,mat('#14162a',{r:.3,m:.4}),0,0,0);f.rotation.x=-PI/2;walk(-5.6,-7.6,5.6,7.6);
 // two walls of text
 var wl=EXTRA.walls||[];var left=wl.slice(0,Math.ceil(wl.length/2)),right=wl.slice(Math.ceil(wl.length/2));
 var wm=mat('#1a1d38',{r:.6});box(.3,9,16,wm,-6,0,0);box(.3,9,16,wm,6,0,0);
 var lw=sign(left.length?left:[''],7,-5.8,4,0,PI/2,{fs:30,color:'#cfe0ff',glow:'#6a8aff',w:1024,align:'left',pad:40});var rw=sign(right.length?right:[''],7,5.8,4,0,-PI/2,{fs:30,color:'#cfe0ff',glow:'#6a8aff',w:1024,align:'left',pad:40});
 // pillars / arches
 for(var i=-1;i<=1;i++){cyl(.3,.35,9,mat('#2a2e50',{r:.5}),-4.5,0,i*5,12);cyl(.3,.35,9,mat('#2a2e50',{r:.5}),4.5,0,i*5,12);solid(-4.5,i*5,.7,.7);solid(4.5,i*5,.7,.7);}
 light('#7a9aff',1.6,20,0,6,0);light('#b07aff',1,12,0,2,-6);
 // static particles
 var g=new THREE.BufferGeometry(),p=[];for(i=0;i<900;i++)p.push(rnd(-5.5,5.5),rnd(0,8.5),rnd(-7.5,7.5));g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));var pts=new THREE.Points(g,new THREE.PointsMaterial({color:'#cfe0ff',size:.04,transparent:true,opacity:.7}));G.add(pts);
 anim(function(dt,t){pts.rotation.y+=dt*.02;pts.material.opacity=.4+.3*Math.abs(Math.sin(t*3))*(cathPct<100?1:.2);});
 // central radio pedestal (the clap thing and 98.3%)
 var rp=grp(0,0,0);cyl(.5,.6,1,mat('#2a2e50'),0,0,0,20,rp);var rad=box(.8,.45,.35,mat('#6b3d22',{map:woodTex('#6b3d22','30,15,5',2,[1,1])}),0,1,0,rp);var dl=plane(.4,.16,basic('#9fd0ff'),0,1.3,.18,0,rp);solid(0,0,1.2,1.2);
 var pctS=null;function pctSign(){if(pctS){rp.remove(pctS);}pctS=sign([cathPct.toFixed(1)+'%'],1.2,0,1.95,0,0,{fs:120,color:'#9fd0ff',glow:'#4a8aff',w:512,font:'Menlo, monospace'},rp);}
 G.userData.pctSign=pctSign;pctSign();
 tap(rp,function(){$('cath').classList.remove('hide');$('cr').value=cathPct;$('cv').textContent=cathPct.toFixed(1)+'%';toast('Clap, and listen for the echo.');},'the radio');
 // echoes shelf
 var es=grp(0,0,-7.2);box(4,2.2,.4,mat('#1a1d38'),0,0,0,es);solid(0,-7.2,4.1,.5);sign(['Echoes of the Void','every part'],3,0,2.6,.25,0,{fs:56,color:'#cfe0ff',glow:'#6a8aff',w:900},es);for(var b=0;b<26;b++)box(.1,.36,.26,mat(pick(['#2a3a7a','#5a3a8a','#1a5a7a','#cfe0ff'])),-1.8+b*.14,1.0+(b%2)*.0,.1,es);
 tap(es,function(){listMatch('Echoes of the Void',/Echoes of the Void|Static Between|Ghost Frequency|Coded Frequency/i,'every saved part');},'Echoes of the Void');
 // bioluminescent pool
 var pool=plane(3,2,new THREE.MeshBasicMaterial({color:'#1a8a9a',transparent:true,opacity:.6}),0,.02,4);pool.rotation.x=-PI/2;var motes=[];for(i=0;i<30;i++){motes.push(sph(.03,basic('#6affea',{add:1}),rnd(-1.4,1.4),.06,4+rnd(-.9,.9)));}
 anim(function(dt,t){motes.forEach(function(m,i){m.position.y=.06+Math.abs(Math.sin(t*1.5+i))*.15;});pool.material.opacity=.45+Math.sin(t*1.2)*.15;});
 tap(pool,function(){motes.forEach(function(m){m.material.color.set(pick(['#6affea','#a07aff','#7ab8ff']));});var k=matchDocs(/^Bioluminescence/i);if(k.length)openDoc(k[0]);},'bioluminescent pool');solid(0,4,3,2);
 // portal to the room between the echoes
 var pg=grp(0,0,7.6,PI);var ring=new THREE.Mesh(new THREE.TorusGeometry(1.1,.06,10,48),basic('#9fd0ff'));ring.position.y=1.6;pg.add(ring);var disc=new THREE.Mesh(new THREE.CircleGeometry(1.05,40),basic('#3a4aff',{t:.25,add:1}));disc.position.y=1.6;pg.add(disc);
 anim(function(dt,t){ring.rotation.z+=dt*.3;disc.material.opacity=.2+.1*Math.sin(t*2);});sign(['The room between the echoes'],2,0,3,.0,0,{fs:48,color:'#cfe0ff',w:900},pg);tap(pg,function(){openWorld('echoorig','The room between the echoes');},'portal');
 door(-3,7.94,PI,'basement',[0,-3.6,PI],'Back to the record shop',{col:'#1a2040',frame:'#4a5a8a'});
 // floating fragments
 (BEACH.ECHO||[]).forEach(function(l,i){var s=floatText(l[0],rnd(-3.5,3.5),rnd(3.5,7.5),rnd(-6,6),'#cfe0ff',3.2);anim(function(dt,t){s.position.y+=Math.sin(t*.5+i)*.002;s.material.opacity=.35+.35*Math.sin(t*.4+i*1.3);});});
}});
$('cr').addEventListener('input',function(){cathPct=parseFloat(this.value);$('cv').textContent=cathPct.toFixed(1)+'%';});
$('cr').addEventListener('change',function(){if(cur&&cur.scene.userData.pctSign)cur.scene.userData.pctSign();if(cathPct>=100){toast('100%: no edge where one ends and the other begins.');}});
$('c983').onclick=function(){cathPct=98.3;$('cr').value=98.3;$('cv').textContent='98.3%';if(cur&&cur.scene.userData.pctSign)cur.scene.userData.pctSign();secret('983','98.3%, held there with intention',linesHtml(EXTRA.walls||[]));};
$('clap').onclick=function(){audioInit();var echo=(100-cathPct)/10;if(cathPct>=100){burst(.12,1400,.5,1.2);setTimeout(function(){toast('No echo. The void needs two walls. Remove one, and the sound doesn\u2019t travel farther. It just stops.',4200);},400);if(count('clap100',1))secret('clap100',null);}
 else{clapSound(Math.max(.15,echo*4));toast(cathPct.toFixed(1)+'% \u2014 the clap comes back '+Math.max(1,Math.round(Math.max(.15,echo*4)*7))+' times.');}};
$('cclose').onclick=function(){$('cath').classList.add('hide');};
