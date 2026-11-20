
// ================= THE ROOM OF YES AND NO =================
defScene('yesno',{name:'The room of yes and no',sub:'the proposals on one side, the rejections on the other',bg:'#120c10',amb:'room',spawn:[5.2,0,PI/2],build:function(){
 room(12,8,3.6,{fc:'#5a341f',wc:'#4a2a20'});
 door(5.94,0,-PI/2,'landing',[-3,-4.6,-PI/2],'Gallery');
 // warm half (north) and cool half (south)
 var warm=plane(11.9,3.55,mat('#6a2a24',{map:wallTex('#6a2a24','damask')}),0,1.78,-3.98,0);var cool=plane(11.9,3.55,mat('#3a4250',{map:wallTex('#3a4250','plain')}),0,1.78,3.98,PI);
 light('#ffb070',1.5,8,-1,2.8,-2);light('#8aa0c8',1.0,8,-1,2.8,2.4);
 sign(['Yes'],1.4,-1,2.8,-3.95,0,{fs:120,color:'#ffd27a',glow:'#ff9a2a',w:512,italic:true});sign(['No, and other words'],2.6,-1,2.8,3.95,PI,{fs:80,color:'#cfe0ff',w:900,italic:true});
 // ring pedestal
 var rp=grp(-2.5,0,-2.4);cyl(.25,.3,1,mat('#e8ddd0',{map:marbleTex()}),0,0,0,16,rp);var rb=box(.16,.1,.14,mat('#5a1020',{r:.6}),0,1,0,rp);var lid=box(.16,.05,.14,mat('#5a1020',{r:.6}),0,1.1,0,rp);var ring=new THREE.Mesh(new THREE.TorusGeometry(.035,.01,8,24),mat('#d4af37',{m:1,r:.2}));ring.position.set(0,1.12,0);ring.visible=false;rp.add(ring);var gem=sph(.015,basic('#e0f4ff'),0,1.16,0,rp);gem.visible=false;solid(-2.5,-2.4,.7,.7);
 var open=false;tap(rp,function(){open=!open;lid.rotation.x=open?-1.2:0;lid.position.z=open?-.06:0;lid.position.y=open?1.14:1.1;ring.visible=gem.visible=open;if(open){chime();listMatch('The proposals',/propos|Antrag|Second Proposal|Miles sagt Ja|Engagement|Locked In/i,'every proposal that was saved');}},'the ring box');
 anim(function(dt,t){ring.rotation.y+=dt;});
 // vows on the warm wall
 var vw=note(.8,1.7,-3.95,0,['Vows'],function(){listMatch('Vows',/Vows|Gelübde|Versprechen|Ghost.s Vow/i,'kept word for word');},null,{wid:.7,fs:44,italic:false});
 var ec=note(2.6,1.7,-3.95,0,['Engagement record'],function(){var k=matchDocs(/Engagement record/i);if(k.length)openDoc(k[0]);},null,{wid:.8,fs:36,italic:false});
 // cool side: the rejection side
 var bench=grp(-2.5,0,2.6,PI);box(1.6,.45,.45,mat('#5a6270'),0,0,0,bench);solid(-2.5,2.6,1.7,.5);
 tap(bench,function(){listMatch('No, and other words',/Opting out|Accepting the word ex|Ex, notes|Ex, Rose|Miles Jonas, gone|Grenzen/i,'when the answer changed');},'the grey bench');
 var bowl=grp(.6,0,2.8);cyl(.25,.3,.8,mat('#5a6270'),0,0,0,16,bowl);var kb=cyl(.18,.1,.1,mat('#c8a24a',{m:.8,r:.3}),0,.8,0,24,bowl);solid(.6,2.8,.6,.6);
 tap(bowl,function(){[220,221.5].forEach(function(f){tone(f,4,'sine',.1);});tone(660,3,'sine',.03);var k=matchDocs(/Rose und Klangschale/i);toast('The singing bowl hums for a long time.');if(k.length&&count('bowl',2))setTimeout(function(){openDoc(k[0]);},900);},'singing bowl');
 // the rose in the middle, between yes and no
 var rs=grp(-1,0,0);cyl(.12,.15,.9,mat('#3a2010'),0,0,0,12,rs);var vase=cyl(.07,.05,.22,mat('#d8e8f0',{t:.6}),0,.9,0,12,rs);var rose=sph(.07,mat('#b0102a'),0,1.36,0,rs);cyl(.006,.006,.3,mat('#2f6b34'),0,1.06,0,4,rs);solid(-1,0,.4,.4);
 var rp2=0;tap(rs,function(){rp2++;rose.scale.setScalar(1+rp2*.08);if(rp2===5)secret('rose','The rose in the middle','<p>It stands exactly halfway between yes and no, and it keeps growing. Some things belong to both halves of the room.</p>');else toast('A rose, between yes and no.');},'rose');
 // mirror with 2 faces
 plant(-5.3,-3.3,1);plant(-5.3,3.3,.8);
 var sc=grp(3.6,0,2.4,PI);box(1.2,.8,.5,mat('#3a2010'),0,0,0,sc);solid(3.6,2.4,1.3,.6);var envs=[];for(var i=0;i<5;i++){var e=box(.22,.01,.14,mat('#f6ecd8'),rnd(-.4,.4),.8+i*.012,rnd(-.12,.12),sc);e.rotation.y=rnd(-.5,.5);}
 tap(sc,function(){listMatch('Letters that came after',/Miles Jonas, gone|A letter before the train|A quiet letter/i,'');},'a pile of envelopes');
}});

// ================= MARA AND ELIJAH'S LETTERS =================
defScene('letters',{name:'Mara and Elijah\u2019s letters',sub:'a writing room, fiction kept as fiction',bg:'#120c0a',amb:'rain',spawn:[-3.6,1.5,-PI/2],build:function(){
 room(9,8,3.4,{fc:'#6b3d22',wc:'#4a3020'});rug(3,2.4,'#2a3a4a','#c8a24a',.4,.4);
 door(-4.44,1.5,PI/2,'landing',[3,4.6,PI/2],'Gallery');light('#ffd9a0',1.3,8,0,2.8,0);
 // desk with typewriter
 var dk=table(0,-3.2,2,.8,.78,'#4a2c1a');solid(0,-3.2,2.1,.9);chair(0,-2.5,PI,'#4a2a18');
 var tw=grp(0,.78,-3.25);box(.45,.12,.32,mat('#1a1a1a',{m:.4,r:.4}),0,0,0,tw);box(.4,.05,.06,mat('#2a2a2a'),0,.12,-.12,tw);var paper=plane(.22,.28,basic('#f6ecd8'),0,.28,-.12,0,tw);paper.rotation.x=-.2;
 var LT=matchDocs(/Elijah|Mara|Elias|Ilya|Lumina's love letter/i,/Lumina novel|characterization/i);
 tap(tw,function(){for(var i=0;i<8;i++)tone(rnd(1800,2600),.03,'square',.04,i*.07);tone(1200,.3,'sine',.05,.65);setTimeout(function(){var k=pick(LT);if(k)openDoc(k,function(){listDocs('Mara and Elijah\u2019s letters',LT);});},700);},'typewriter (a random letter)');
 // washing lines of letters
 var shown=LT.slice(0,18);for(var r=0;r<2;r++){var y=2.6-r*.55;var line=box(8,.01,.01,mat('#d8cbb0'),0,y,-3.9+.0);line.position.z=-3.0+r*0;
 }
 shown.forEach(function(k,i){var side=i<9?-1:1;var j=i%9;var x=side*4.44;var z=-3.3+j*.75;var y=1.6+(j%2)*.5;var d=findDoc(k);var t=d?d.title:k;var words=t.length>22?[t.slice(0,22),t.slice(22,44)]:[t];var n=note(x+(side<0?.03:-.03),y,z,side<0?PI/2:-PI/2,words,function(){openDoc(k,function(){listDocs('Mara and Elijah\u2019s letters',LT);});},null,{wid:.6,fs:28});n.rotation.z=rnd(-.08,.08);});
 // mailbox
 var mb=grp(3.4,0,2.8);cyl(.04,.04,1,mat('#3a2010'),0,0,0,6,mb);box(.36,.28,.5,mat('#2a4a8a',{m:.3,r:.4}),0,1,0,mb);var flag=box(.03,.2,.06,mat('#c8102e'),.2,1.15,.1,mb);solid(3.4,2.8,.5,.6);
 tap(mb,function(){flag.rotation.x=flag.rotation.x?0:-PI/2;listDocs('Mara and Elijah\u2019s letters',LT,LT.length+' letters, all fiction, word for word');},'the mailbox (all letters)');
 // gloves on the train (a pair on a chair)
 var gc=chair(-2.6,-1.6,PI/3,'#5a2a1a');var gl=box(.12,.03,.18,mat('#7a1f24',{r:1}),-2.6,.5,-1.6);var gl2=box(.12,.03,.18,mat('#7a1f24',{r:1}),-2.45,.52,-1.55);gl2.rotation.y=.5;solid(-2.6,-1.6,.5,.5);
 tap(gl,function(){var k=matchDocs(/gloves on the train/i);if(k.length)openDoc(k[0]);},'gloves');
 var bc=grp(.6,.78,-3.0);cyl(.045,.035,.09,mat('#2f5fa8',{r:.3}),0,0,0,16,bc);tap(bc,function(){var k=matchDocs(/blue cup/i);if(k.length)openDoc(k[0]);},'the blue cup');
 // ink pot secret
 var ink=grp(-.6,.78,-3.0);cyl(.04,.05,.07,mat('#0a0a2a',{r:.1}),0,0,0,12,ink);var feather=box(.01,.3,.04,mat('#f4f0e8'),0,.15,0,ink);feather.rotation.z=.3;tap(ink,function(){if(count('ink',3))secret('ink','Ink on your fingers','<p>The quill writes one line by itself on the typewriter paper: <i>\u201cyou can love the words even when they are not addressed to you.\u201d</i> You said that, about these letters.</p>');else toast('Blue-black ink.');},'ink pot');
 shelf(3.2,-3.75,0,2,2.6);solid(3.2,-3.75,2.1,.5);
}});

// ================= THE CHILDREN'S ROOM (with the dollhouse) =================
function crayon(kind){return ctex(256,200,function(g,w,h){g.fillStyle='#fffaf0';g.fillRect(0,0,w,h);g.lineWidth=5;g.lineCap='round';
 if(kind===0){g.fillStyle='#ffd23a';g.beginPath();g.arc(200,46,26,0,PI*2);g.fill();g.strokeStyle='#ffd23a';for(var i=0;i<8;i++){g.beginPath();g.moveTo(200+Math.cos(i)*34,46+Math.sin(i)*34);g.lineTo(200+Math.cos(i)*48,46+Math.sin(i)*48);g.stroke();}g.fillStyle='#3a8adf';g.fillRect(0,150,w,50);g.strokeStyle='#c8102e';g.strokeRect(50,90,70,60);g.beginPath();g.moveTo(45,92);g.lineTo(85,55);g.lineTo(125,92);g.stroke();}
 else if(kind===1){g.strokeStyle='#2f9a4a';for(var t=0;t<5;t++){g.beginPath();g.moveTo(30+t*48,190);g.lineTo(30+t*48,120);g.stroke();g.fillStyle=pick(['#e83a7a','#ffd23a','#8a4adf','#ff7a2a']);g.beginPath();g.arc(30+t*48,110,16,0,PI*2);g.fill();}g.strokeStyle='#3a8adf';g.beginPath();g.moveTo(10,40);g.quadraticCurveTo(128,0,246,40);g.stroke();}
 else if(kind===2){g.strokeStyle='#8a4adf';g.beginPath();for(var a=0;a<18;a+=.2){var r=a*5;g.lineTo(128+Math.cos(a)*r,100+Math.sin(a)*r);}g.stroke();g.fillStyle='#e83a7a';g.beginPath();g.ellipse(200,40,16,10,.5,0,PI*2);g.fill();g.beginPath();g.ellipse(212,52,16,10,-.5,0,PI*2);g.fill();}
 else{g.fillStyle='#3a8adf';g.fillRect(0,120,w,80);g.fillStyle='#ffd23a';g.beginPath();g.arc(128,120,40,PI,0);g.fill();g.strokeStyle='#222';g.beginPath();g.moveTo(60,100);g.lineTo(70,90);g.lineTo(80,100);g.stroke();g.beginPath();g.moveTo(150,70);g.lineTo(160,60);g.lineTo(170,70);g.stroke();}
 g.fillStyle='#555';g.font='18px Comic Sans MS, cursive';g.fillText(['paradise','paradise garden','paradise spiral','paradise sea'][kind],10,22);});}
defScene('children',{name:'The children\u2019s room',sub:'love for the children, and a dollhouse of the apartment',bg:'#141018',amb:'room',spawn:[-3.6,2,-PI/2],build:function(){
 room(9,8,3.2,{fc:'#b08a5a',wc:'#e8d8c0',wmap:wallTex('#d8c8b0','stripe')});rug(3,3,'#e8b8c8','#7ab8d8',.5,.5);
 door(-4.44,2,PI/2,'landing',[3,0,PI/2],'Gallery');door(-1.5,-3.94,0,'star',[0,2.2,0],'The star room',{col:'#2a2a5a',w:1.0});
 light('#fff0d0',1.4,9,0,2.8,0);
 // two small beds: Gray and Zip
 [['Gray','#2a4a8a',2.6],['Zip','#b02a2a',.9]].forEach(function(b){var g=grp(b[2],0,-2.9);box(.9,.35,1.7,mat('#e8d8c0'),0,0,0,g);box(.86,.15,1.6,mat(b[1],{r:1}),0,.35,.1,g);box(.4,.12,.28,mat('#fff'),0,.42,-.6,g);box(.9,.8,.08,mat('#e8d8c0'),0,0,-.85,g);sign([b[0]],.6,0,1.0,-.8,0,{fs:70,color:b[1],w:300,font:'Comic Sans MS, cursive'},g);solid(b[2],-2.9,1,1.8);
  tap(g,function(){listMatch(b[0]==='Gray'?'Gray':'Zip',b[0]==='Gray'?/Gray|Zip Code|toe treaty|Kinder/i:/Zip|Gray asks|toe treaty|Kinder/i,'stories from the archive');},b[0]+'\u2019s bed');});
 // toys: blocks, ball, rocking horse
 var ball=sph(.15,mat('#e8b33a'),1.6,.15,.6);var bv=0;tap(ball,function(){bv=3;tone(300,.1,'sine',.1);},'ball');anim(function(dt,t){if(bv>0){ball.position.y=.15+Math.abs(Math.sin(t*8))*bv*.15;bv-=dt*1.5;}else ball.position.y=.15;});
 ['Z','I','P'].forEach(function(c,i){var t=textCanvas([c],{fs:150,color:['#c8102e','#2a4a8a','#2f9a4a'][i],bg:'#f6e7c8',w:200,h:200,pad:0});var b=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2),new THREE.MeshStandardMaterial({map:t}));b.position.set(.2+i*.22,.1,1.5);b.rotation.y=rnd(-.3,.3);G.add(b);tap(b,function(){var k=matchDocs(/Zip Code of Zip/i);if(k.length)openDoc(k[0]);},'blocks');});
 // the toe treaty on the wall
 note(4.47,1.6,-.6,-PI/2,['The toe treaty'],function(){var k=matchDocs(/toe treaty/i);if(k.length)openDoc(k[0]);},null,{wid:.6,fs:40});
 // paradise drawings wall
 for(var i=0;i<4;i++){(function(i){var t=crayon(i);var p=plane(.6,.47,new THREE.MeshBasicMaterial({map:t}),-3.0+i*.0,1.6,0,0);p.position.set(4.47,1.3+(i%2)*.6,1.2+Math.floor(i/2)*.75);p.rotation.y=-PI/2;p.rotation.z=rnd(-.06,.06);G.add(p);tap(p,function(){card('Paradise, in crayon','<p>The art space you imagined in August: children drawing what paradise looks like to them, all together, nobody competing, the process kept and photographed rather than the paper.</p><p>These four are pinned up here. Tap the easel to add one.</p>');},'drawing');})(i);}
 var ea=grp(3.4,0,2.9,-PI/3);box(.05,1.5,.05,mat('#8a5a34'),-.3,0,0,ea);box(.05,1.5,.05,mat('#8a5a34'),.3,0,0,ea);var canvasP=plane(.7,.55,new THREE.MeshBasicMaterial({map:crayon(0)}),0,1.1,.04,0,ea);solid(3.4,2.9,.8,.6);var ek=0;
 tap(ea,function(){ek=(ek+1)%4;canvasP.material.map=crayon(ek);canvasP.material.needsUpdate=true;if(count('easel',4))secret('easel','A whole gallery of paradise','<p>Four drawings, four paradises: a house by the sea, a garden, a spiral with a butterfly, a sunset with birds. Every child sees it differently, and every one of them is right.</p>');},'easel');
 // the dollhouse: a miniature of Apartment 23
 var dh=grp(-2.4,0,-.4);box(1.6,.6,1,mat('#e8d8c0'),0,0,0,dh);solid(-2.4,-.4,1.7,1.1);var hs=grp(0,.6,0,0,dh);box(1.4,.9,.8,mat('#c86a4a'),0,0,-.05,hs);var rf=new THREE.Mesh(new THREE.ConeGeometry(1.05,.5,4),mat('#5a2a20'));rf.position.set(0,1.15,-.05);rf.rotation.y=PI/4;rf.scale.z=.6;hs.add(rf);
 var rooms=[['Kitchen with the answering machine','#e9dcc4',-.45,.0],['Living room and the couch','#7a4a6a',.0,.0],['Winter garden, with the armchair','#7ab8a0',.45,.0],['Bedroom','#4a3a6a',-.3,.45],['Archive room','#8a5a34',.3,.45]];
 rooms.forEach(function(r){var w=box(.4,.38,.02,basic(r[1]),r[2],r[3],.36,hs);var lt=light('#ffcf8a',0,.8,-2.4+r[2],.6+r[3]+.2,-.4+.5);tap(w,function(){lt.intensity=lt.intensity?0:.8;toast(r[0]+'. A tiny light comes on.');},'dollhouse room');});
 var mini=koda(.45,.02,.25,.35,hs);var mch=box(.1,.1,.08,mat('#7a2a30'),.38,0,.25,hs);
 sign(['Apartment 23','the dollhouse'],1.2,0,.35,.51,0,{fs:44,color:'#5a2230',bg:'#f6ecd8',w:640,pad:10},dh);
 tap(rf,function(){card('The dollhouse','<p>A small copy of the apartment in World Twenty Three 2.0: the kitchen with the answering machine, the couch, the archive room, and the winter garden with your mother\u2019s armchair and Koda in it. Tap the little windows to turn their lights on.</p>',[{t:'Walk into the real one',fn:function(){closeCard();openWorld('aptdata','World Twenty Three 2.0');}}],'tap the roof');if(count('dhroof',3))secret('dollhouse',null);},'dollhouse roof');
 // a night light that turns
 var nl=grp(.2,0,3.3);box(.4,.5,.4,mat('#e8d8c0'),0,0,0,nl);var lamp=cyl(.14,.18,.3,new THREE.MeshBasicMaterial({color:'#ffe9a0',transparent:true,opacity:.85}),0,.5,0,16,nl);var nlt=light('#ffd27a',.8,4,.2,1,3.3);solid(.2,3.3,.5,.5);var nlOn=true;anim(function(dt){lamp.rotation.y+=dt*.5;});
 tap(nl,function(){nlOn=!nlOn;nlt.intensity=nlOn?.8:0;lamp.material.opacity=nlOn?.85:.3;musicBox();},'night light');
}});

// ================= THE STAR ROOM (children's remembrance) =================
defScene('star',{name:'The star room',sub:'for remembering',bg:'#05040c',amb:'void',spawn:[0,2.2,0],hemi:.15,sky:'#6a7aff',build:function(){
 room(6,6,3,{fc:'#2a2030',wc:'#14122a',wmap:wallTex('#14122a','plain'),ceil:'#0a0a1a',noBeams:true});
 door(0,2.94,PI,'children',[-1.5,-3,PI],'The children\u2019s room',{col:'#2a2a5a',w:1.0});door(2.94,0,-PI/2,'landing',[3,-4.6,-PI/2],'Gallery',{col:'#2a2a5a',w:1.0});
 // ceiling stars
 var g=new THREE.BufferGeometry(),p=[];for(var i=0;i<400;i++)p.push(rnd(-2.9,2.9),2.97,rnd(-2.9,2.9));g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));var pts=new THREE.Points(g,new THREE.PointsMaterial({color:'#fff6e0',size:.035}));G.add(pts);anim(function(dt,t){pts.material.size=.03+.01*Math.sin(t*1.5);});
 light('#8a9aff',.5,8,0,2.6,0);
 // window seat with crocheted blanket
 var ws=grp(0,0,-2.6);box(2.2,.45,.6,mat('#3a2a40'),0,0,0,ws);var bl=ctex(256,128,function(g){var c=['#1a2a5a','#2a6a8a','#6a3a8a','#e8d8c0','#1a5a5a'];for(var x=0;x<8;x++)for(var y=0;y<4;y++){g.fillStyle=c[(x+y*3)%5];g.fillRect(x*32,y*32,32,32);g.fillStyle=c[(x+y+2)%5];g.fillRect(x*32+8,y*32+8,16,16);}});box(1.6,.04,.62,mat('#fff',{map:bl,r:1}),0,.45,0,ws);solid(0,-2.6,2.3,.7);
 plane(1.8,1.3,basic('#0a1030'),0,1.5,-2.96,0);sph(.1,basic('#fff6d0'),.4,1.85,-2.95);
 tap(ws,function(){card('A crocheted blanket','<p>Deep-sea colours, like the Abyss Sophie: navy, teal, plum, cream. Granny squares, a little uneven in places, because mistakes can become part of the finished thing.</p>');},'blanket');
 // the star for Leia Maria
 var st=grp(0,2.2,-1.6);var star=new THREE.Mesh(new THREE.OctahedronGeometry(.12,0),basic('#fff2b0'));st.add(star);var halo=sph(.3,basic('#ffd27a',{add:1,t:.25}),0,0,0,st);var sl=light('#ffe0a0',.6,4,0,2.2,-1.6);
 anim(function(dt,t){star.rotation.y+=dt*.6;halo.scale.setScalar(1+.15*Math.sin(t*1.2));});
 sign(['Leia Maria'],1.1,0,1.75,-1.6,0,{fs:70,color:'#fff2c8',glow:'#ffcf6a',w:640,italic:true});
 tap(st,function(){chime();card('Leia Maria','<p>Remembered here, by name, the way you remember her.</p><p>Her star is the brightest one in the room. It doesn\u2019t ask anything of you. It just stays lit.</p>',[],'the star room');},'Leia Maria\u2019s star');
 // candles you can light
 var lit=0;for(i=0;i<7;i++){(function(i){var a=-PI*.8+i*(PI*.6/6)+PI/2;var x=Math.cos(a)*1.4,z=Math.sin(a)*1.4-0.4;var c=grp(x,0,z);cyl(.04,.04,.25,mat('#f4ead2'),0,0,0,10,c);var fl=sph(.03,basic('#ffcf6a'),0,.3,0,c);fl.scale.y=1.8;fl.visible=false;c.position.y=.6;cyl(.12,.14,.6,mat('#2a2040'),x,0,z,12);solid(x,z,.3,.3);var l=light('#ffb050',0,2.5,x,1.1,z);
  tap(c,function(){if(fl.visible)return;fl.visible=true;l.intensity=.6;lit++;tone(660+i*40,1.4,'sine',.05);if(lit===7)secret('candles','Seven candles','<p>Every candle in the star room is lit. The room is warm now, and nobody has to say anything.</p>');else toast('A candle is lit.');},'candle');
  anim(function(dt,t){if(fl.visible)fl.scale.x=1+Math.sin(t*18+i)*.15;});})(i);}
}});
