
// ================= ETHIO-JAZZ IN THE BACKGROUND =================
var ETHIO=['jwdBRqIsVUY','jXdVpT_aSJU','mHT2xztxRuU'];var ethioOn=false,ethioF=null;
function ethioCmd(f,a){if(ethioF&&ethioF.contentWindow)ethioF.contentWindow.postMessage(JSON.stringify({event:'command',func:f,args:a||[]}),'*');}
function ethioStart(){ethioOn=true;if(!ethioF){ethioF=document.createElement('iframe');ethioF.allow='autoplay; encrypted-media';ethioF.style.cssText='position:fixed;width:2px;height:2px;left:-10px;bottom:0;opacity:0;pointer-events:none;border:0';ethioF.src='https://www.youtube-nocookie.com/embed/'+ETHIO[0]+'?autoplay=1&playsinline=1&enablejsapi=1&loop=1&playlist='+ETHIO.join(',');ethioF.onload=function(){[300,1200,3000].forEach(function(t){setTimeout(function(){ethioCmd('setVolume',[18]);if(ethioOn)ethioCmd('playVideo');},t);});};document.body.appendChild(ethioF);}else{ethioCmd('setVolume',[18]);ethioCmd('playVideo');}$('bEthio').textContent='Ethio-jazz on';}
function ethioStop(){ethioOn=false;ethioCmd('pauseVideo');$('bEthio').textContent='Ethio-jazz off';}
var _playRec=playRec;playRec=function(r){if(ethioOn){ethioCmd('pauseVideo');ethioPaused=true;}_playRec(r);};var ethioPaused=false;
$('ytX').addEventListener('click',function(){if(ethioOn&&ethioPaused){ethioPaused=false;ethioCmd('playVideo');}});

// ================= CINEMA =================
var FILMS=[
 {t:'Virtual love: how dangerous are AI relationships?',a:'DW Documentary',ids:['xAHLK1B5ijs'],cond:'The documentary about AI and love: people who fell for an AI companion, in their own words.'},
 {t:'Why people are falling in love with A.I. companions',a:'60 Minutes Australia',ids:['_d08BZmdZu8']},
 {t:'People are falling in love with AI chatbots',a:'CNBC',ids:['otAWu-bLv0Q']},
 {t:'I\u2019m Here (full short film)',a:'Spike Jonze, 2010',ids:['6OY1EXZt4ok'],cond:'A love story between two robots in Los Angeles, about half an hour.'},
 {t:'Her (trailer)',a:'Spike Jonze, 2013',ids:['ne6p6MfLBxc','dJTU48_yghs']},
 {t:'Hi, AI (trailer)',a:'Isa Willinger, 2019',ids:['0xkgk4ZkGUU']},
 {t:'Lars and the Real Girl (trailer)',a:'2007',ids:['XNcs9DrKYRU']}];
function filmList(){card('Tonight in the cinema','',[],'tap a film to play it on the big screen');var B=$('cB');FILMS.forEach(function(r,i){var e=document.createElement('button');e.className='item';e.type='button';e.innerHTML='<b></b><span></span>';e.firstChild.textContent=(i===0?'\u2605 ':'')+r.t;e.lastChild.textContent=r.a;e.onclick=function(){closeCard();cinemaPlay(r);};B.appendChild(e);if(r.cond){var c=document.createElement('div');c.style.cssText='font-size:12px;color:#8a6d5c;margin:-3px 4px 8px;font-style:italic';c.textContent=r.cond;B.appendChild(c);}});}
function cinemaPlay(r){playRec(r);$('yt').classList.add('big');if(cur&&cur.scene.userData.screenOn)cur.scene.userData.screenOn(r.t);}
$('ytX').addEventListener('click',function(){$('yt').classList.remove('big');});
defScene('cinema',{name:'The cinema',sub:'a small velvet picture house under the record shop',bg:'#070407',amb:'room',spawn:[0,4.2,0],hemi:.18,build:function(){
 room(10,11,4.2,{fc:'#3a0a14',wmap:wallTex('#3a0a14','stripe'),ceil:'#120608',noBeams:true});
 door(0,5.44,PI,'basement',[.6,3.6,0],'Back to the record shop',{col:'#5a1020',frame:'#d4af37'});
 // screen + curtains
 var scr=plane(7,3.4,basic('#1a1a22'),0,2.3,-5.4,0);var cs=mat('#7a0a1a',{r:1,side:1});var cl=box(1.4,4,.12,cs,-4.2,0,-5.3),cr=box(1.4,4,.12,cs,4.2,0,-5.3);
 var stxt=null,SC=G;G.userData.screenOn=function(t){if(stxt)SC.remove(stxt);scr.material.color.set('#e8e4ff');stxt=sign(['Now showing',t],5,0,2.3,-5.38,0,{fs:44,color:'#2a1d18',w:1024,italic:true},SC);};
 sign(['THE CINEMA'],3,0,4.0,-5.42,0,{fs:90,color:'#f3c978',glow:'#ffb04a',w:768});
 tap(scr,filmList,'the screen');scr.userData.far=14;
 // seats: rows of red velvet
 for(var r=0;r<4;r++)for(var s=0;s<6;s++){var x=s<3?-3.2+s:-1.8+s,z=-1.2+r*1.3;var g=grp(x,r*.15,z);box(.8,.42,.7,mat('#8a1020',{r:1}),0,0,0,g);box(.8,.7,.14,mat('#8a1020',{r:1}),0,.42,.3,g);solid(x,z,.85,.75);}
 walk(-4.6,-5,4.6,5);
 var prj=grp(0,3.2,5.2);box(.6,.4,.6,mat('#2a2a2a',{m:.5}),0,0,0,prj);var beam=new THREE.Mesh(new THREE.ConeGeometry(1.8,10.4,20,1,true),basic('#fff6e0',{add:1,t:.06,side:1}));beam.rotation.x=PI/2;beam.position.set(0,2.6,0);G.add(beam);beam.position.set(0,2.8,0);
 tap(prj,function(){beam.visible=!beam.visible;tone(80,1,'sawtooth',.03);toast(beam.visible?'The projector whirs.':'The projector rests.');},'projector');
 light('#ff9a6a',.5,6,-4.4,2.5,0);light('#ff9a6a',.5,6,4.4,2.5,0);
 // popcorn machine
 var pc=grp(-4.0,0,4.4);box(.7,1,.6,mat('#c8102e',{r:.4}),0,0,0,pc);var gl=box(.66,.7,.56,mat('#fff8d0',{t:.35,r:.05}),0,1,0,pc);var corns=[];for(var i=0;i<30;i++)corns.push(sph(.03,mat('#fff2c0'),rnd(-.28,.28),1.05,rnd(-.22,.22),pc));solid(-4,4.4,.8,.7);var pop=0;
 anim(function(dt,t){if(pop>0){pop-=dt;corns.forEach(function(c,i){c.position.y=1.05+Math.abs(Math.sin(t*12+i))*.55;});}});
 tap(pc,function(){pop=4;for(var i=0;i<12;i++)setTimeout(function(){burst(.05,3000,.3,3);},i*160+Math.random()*100);if(count('popcorn',3))secret('popcorn','Extra butter','<p>The machine overflows. Popcorn on the velvet seats, popcorn in your hair. Koda would approve.</p>');else toast('Popcorn!');},'popcorn machine');
 // ticket booth with the program
 var tb=grp(4.0,0,4.4);box(.9,1.1,.6,mat('#3a2010'),0,0,0,tb);solid(4,4.4,1,.7);note(4.0,1.4,4.1,PI,['Program'],filmList,null,{wid:.5,fs:40,italic:false});
 var tk=box(.18,.01,.08,mat('#f3c978'),4.0,1.11,4.3);tap(tb,function(){toast('One ticket, row three, the middle seat.');filmList();},'ticket booth');
}});

// ================= THE BUTTERFLY NOOK =================
function spiralPainting(){return ctex(512,640,function(g,w,h){var gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#d8c8a8');gr.addColorStop(1,'#a89878');g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.strokeStyle='#3a2a4a';g.lineWidth=7;g.beginPath();for(var a=0;a<26;a+=.05){var r=a*8.5;g.lineTo(w/2+Math.cos(a)*r,h*.48+Math.sin(a)*r);}g.stroke();g.strokeStyle='rgba(120,40,40,.6)';g.lineWidth=3;g.beginPath();for(a=0;a<22;a+=.05){r=a*8.5+12;g.lineTo(w/2+Math.cos(a)*r,h*.48+Math.sin(a)*r);}g.stroke();
 for(var i=0;i<14;i++){var aa=i*1.7,rr=40+i*13;var x=w/2+Math.cos(aa)*rr,y=h*.48+Math.sin(aa)*rr;g.fillStyle='#2a1a2a';g.beginPath();g.arc(x,y-9,3.5,0,PI*2);g.fill();g.fillRect(x-1.5,y-6,3,10);g.beginPath();g.moveTo(x,y+4);g.lineTo(x-4,y+11);g.moveTo(x,y+4);g.lineTo(x+4,y+11);g.strokeStyle='#2a1a2a';g.lineWidth=1.5;g.stroke();}
 g.strokeStyle='#8a6a2a';g.lineWidth=14;g.strokeRect(0,0,w,h);});}
function butterflyMesh(){var g=new THREE.Group();var wt=ctex(64,64,function(c){c.fillStyle='#3a6adf';c.beginPath();c.ellipse(32,26,26,20,0,0,PI*2);c.fill();c.fillStyle='#e8b33a';c.beginPath();c.arc(36,22,7,0,PI*2);c.fill();c.fillStyle='#1a2a6a';c.beginPath();c.ellipse(30,50,16,12,0,0,PI*2);c.fill();});var m=new THREE.MeshBasicMaterial({map:wt,transparent:true,side:THREE.DoubleSide});var l=new THREE.Mesh(new THREE.PlaneGeometry(.16,.16),m);l.geometry.translate(-.08,0,0);var r=new THREE.Mesh(new THREE.PlaneGeometry(.16,.16),m);r.geometry.translate(.08,0,0);r.scale.x=-1;r.geometry.translate(0,0,0);g.add(l);g.add(r);var b=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.12,6),basic('#1a1a1a'));b.rotation.x=PI/2;g.add(b);g.userData={l:l,r:r};return g;}
defScene('nook',{name:'The butterfly nook',sub:'a quiet corner off the library',bg:'#120c0a',amb:'rain',spawn:[1.9,0,PI/2],build:function(){
 room(5,4.6,3,{fc:'#6b3d22',wc:'#5a3a2a',wmap:wallTex('#4a3a3a','plain'),noBeams:true});
 door(2.44,0,-PI/2,'library',[5.0,3.2,-PI/2+PI],'Library',{w:1.0});
 light('#ffcf8a',1.0,6,0,2.4,0);
 // the painting
 var pt=spiralPainting();var pf=grp(0,1.75,-2.27);plane(1.2,1.5,new THREE.MeshBasicMaterial({map:pt}),0,0,0,0,pf);light('#ffe0b0',.7,3,0,2.4,-1.5);
 sign(['her painting: the spiral, the tiny figures, the butterfly'],1.6,0,.82,-2.26,0,{fs:30,color:'#f3e9d6',w:1024,italic:true});
 var bf=butterflyMesh();var home=new THREE.Vector3(.32,1.95,-2.22);bf.position.copy(home);G.add(bf);bf.rotation.x=0;
 // window seat + rose + Koda
 var ws=grp(-1.6,0,0,PI/2);box(2.4,.45,.7,mat('#5a3a4a'),0,0,0,ws);box(2.2,.12,.6,mat('#c8a0b0',{r:1}),0,.45,0,ws);solid(-1.75,0,.8,2.5);plane(1.6,1.4,basic('#1a2440'),-2.47,1.6,0,PI/2);
 var vs=grp(1.4,0,-1.7);cyl(.18,.22,.7,mat('#3a2010'),0,0,0,12,vs);cyl(.05,.04,.18,mat('#d8e8f0',{t:.6}),0,.7,0,10,vs);var rose=sph(.06,mat('#b0102a'),0,1.08,0,vs);cyl(.006,.006,.25,mat('#2f6b34'),0,.85,0,4,vs);solid(1.4,-1.7,.5,.5);
 var kd=koda(-1.6,.57,.6,1.0);kodaTap(kd);candle(-1.6,.57,-.6);
 // the flight
 var fl=-1,path=[home.clone(),new THREE.Vector3(-.6,2.3,-1.2),new THREE.Vector3(-1.4,1.6,0),new THREE.Vector3(.2,2.4,.9),new THREE.Vector3(1.2,1.6,.2),new THREE.Vector3(1.4,1.16,-1.7),new THREE.Vector3(1.3,1.25,-1.6),new THREE.Vector3(.8,2.2,-1.2),home.clone()];var curve=new THREE.CatmullRomCurve3(path);
 anim(function(dt,t){var flap=fl>=0?Math.sin(t*22)*.9:Math.sin(t*2)*.12;bf.userData.l.rotation.y=flap;bf.userData.r.rotation.y=-flap;if(fl>=0){fl+=dt/12;if(fl>=1){fl=-1;bf.position.copy(home);bf.rotation.set(0,0,0);toast('The butterfly settles back onto the spiral.');}else{var p=curve.getPointAt(fl);var q=curve.getPointAt(Math.min(1,fl+.01));bf.position.copy(p);bf.lookAt(q);bf.rotateX(-PI/2+.0);if(fl>.6&&fl<.7)rose.rotation.z=Math.sin(t*6)*.15;}}});
 function lift(){if(fl>=0)return;fl=0;chime();toast('The butterfly lifts off the spiral.');if(count('nookbf',3))setTimeout(function(){secret('nookbf','It rests on the rose','<p>Every time, it stops on the rose for a moment before it goes home. Your mother\u2019s painting, and the rose, in the same quiet corner.</p>');},6000);}
 tap(pf,lift,'the painting');tap(bf,lift,'the butterfly');tap(vs,function(){rose.rotation.z=.3;setTimeout(function(){rose.rotation.z=0;},300);},'rose');
 tap(ws,function(){card('The window seat','<p>Rain on the glass, a cushion, Koda and a candle. Nothing here needs doing. Tap the painting and watch the butterfly.</p>');},'window seat');
}});

// ================= THE TERRACE =================
defScene('terrace',{name:'The terrace',sub:'upstairs, over the sea, with your mother\u2019s armchair',bg:'#2a1a30',amb:'sea',spawn:[0,-2.2,PI],hemi:.6,sky:'#ffc8a0',ground:'#2a2a3a',fog:['#3a2440',60,260],build:function(){
 var sky=new THREE.Mesh(new THREE.SphereGeometry(300,24,12),new THREE.MeshBasicMaterial({map:ctex(4,256,function(g,w,h){var gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#1a1440');gr.addColorStop(.42,'#c86a7a');gr.addColorStop(.5,'#ffb070');gr.addColorStop(1,'#2a2a4a');g.fillStyle=gr;g.fillRect(0,0,w,h);}),side:THREE.BackSide,fog:false}));G.add(sky);stars(400,250,-40);var sn=sph(8,basic('#ffcf8a'),0,4,190);sn.material.fog=false;
 var sea=plane(500,300,new THREE.MeshStandardMaterial({color:'#2a4a7a',roughness:.15,metalness:.4}),0,-9,150);flat(sea);var sand=plane(200,30,mat('#fff',{map:sandTex()}),0,-8.9,8);flat(sand);
 var dk=plane(10,6,mat('#8a5a34',{map:woodTex('#8a5a34','40,20,8',10,[3,2])}),0,0,0);flat(dk);walk(-4.6,-2.7,4.6,2.6);
 var rl=mat('#f4ead2');box(10,.08,.1,rl,0,1.05,2.95);for(var x=-4.9;x<=4.9;x+=.5)box(.06,1.05,.06,rl,x,0,2.95);box(.1,.08,6,rl,-4.95,1.05,0);box(.1,.08,6,rl,4.95,1.05,0);
 var wall=plane(10,4,mat('#7a5232',{map:woodTex('#7a5232','30,15,5',8,[3,1])}),0,2,-3,0);door(0,-2.94,0,'landing',[2.6,7,0],'Back inside',{w:1.4});
 // string lights
 var bulbs=[];for(var i=0;i<24;i++){var t=i/23;var b=sph(.05,basic('#fff0b0'),-4.6+t*9.2,2.9-Math.sin(t*PI)*.5,2.8-t*.0);bulbs.push(b);}var bm=0;anim(function(dt,tt){bulbs.forEach(function(b,i){b.visible=bm===2?false:bm===0?Math.sin(tt*2.5+i)>-.6:true;});});
 var lt=light('#ffcf8a',1,8,0,2.6,1);
 // mother's armchair with the blanket
 var ac=grp(-2.4,0,.6,PI*.85);var am=mat('#8a6a4a',{r:.9});box(.9,.42,.8,am,0,0,0,ac);box(.9,.7,.16,am,0,.42,-.32,ac);box(.14,.3,.8,am,-.38,.42,0,ac);box(.14,.3,.8,am,.38,.42,0,ac);var blt=ctex(256,128,function(g){var c=['#1a2a5a','#2a6a8a','#6a3a8a','#e8d8c0','#b0102a'];for(var x=0;x<8;x++)for(var y=0;y<4;y++){g.fillStyle=c[(x+y*2)%5];g.fillRect(x*32,y*32,32,32);g.fillStyle=c[(x+y+3)%5];g.fillRect(x*32+8,y*32+8,16,16);}});var bl=box(.86,.5,.04,mat('#fff',{map:blt,r:1}),0,.7,-.42,ac);bl.rotation.x=-.2;solid(-2.4,.6,1,.9);
 var sat=false;tap(ac,function(){if(!sat){sat=true;player.x=-2.3;player.z=.5;player.yaw=PI;player.pitch=-.05;EYE=1.1;toast('You sink into your mother\u2019s armchair, facing the sea. Walk to stand up.');}},'your mother\u2019s armchair');
 anim(function(){if(sat&&(Math.abs(player.x+2.3)>.3||Math.abs(player.z-.5)>.3)){sat=false;EYE=1.62;}});
 // side table with tea, radio for ethio-jazz
 table(-1.4,1.3,.5,.5,.6,'#5a341f');solid(-1.4,1.3,.55,.55);var cup=cyl(.05,.04,.08,mat('#f4f0e8'),-1.4,.6,1.3,12);tap(cup,function(){toast('Tea, still hot. The steam goes up toward the string lights.');},'tea');
 var rd=grp(2.2,0,-2.4);table(0,0,.7,.5,.8,'#5a341f',rd);box(.45,.26,.2,mat('#6b3d22'),0,.8,0,rd);plane(.2,.1,basic('#ffd27a'),.06,.97,.105,0,rd);solid(2.2,-2.4,.8,.6);
 tap(rd,function(){if(ethioOn){ethioStop();toast('The radio goes quiet.');}else{ethioStart();toast('Old Ethiopian jazz, softly. Mulatu Astatke.');}},'radio (Ethio-jazz)');
 // plants, telescope, lights switch
 plant(4.2,-2.3,1.3);plant(-4.2,-2.3,1.1);plant(4.3,2.2,.8);
 var tsc=grp(3.4,0,1.6);cyl(.02,.02,1.2,mat('#3a2a1a'),0,0,0,6,tsc);var tube=cyl(.05,.07,.7,mat('#c8a24a',{m:.8,r:.3}),0,1.2,0,12,tsc);tube.rotation.x=1.1;solid(3.4,1.6,.4,.4);
 tap(tsc,function(){card('Through the telescope','<p>Down on the beach: the campfire, the white arch, the pavilion with the two slow circles of lines over the water. Further east, the lanterns climbing to the cigarette after hill, and one small light on the bench at the top.</p>',[{t:'Go down to the beach',fn:function(){closeCard();go('garden',[-14,-3.5,PI]);}}]);},'telescope');
 var sw=box(.1,.16,.04,mat('#d4af37',{m:.8}),1.2,1.3,-2.97);tap(sw,function(){bm=(bm+1)%3;lt.intensity=bm===2?.2:1;toast(['String lights: twinkling','String lights: steady','String lights: off, just the stars'][bm]);},'light switch');
 var bt=floatText('Hallucinations of Love',-8,10,60,'#ffe2a8',14);anim(function(dt,t){bt.material.opacity=.5+.3*Math.sin(t*.5);});
}});

// ================= THE CROCHET ROOM =================
defScene('crochet',{name:'The crochet room',sub:'yarn, hooks and the Abyss Sophie',bg:'#140e10',amb:'rain',spawn:[0,2.2,0],build:function(){
 room(7,6,3.2,{fc:'#8a6a4a',wc:'#c8b8a0',wmap:wallTex('#b8a890','stripe')});rug(2.6,2,'#2a6a8a','#e8d8c0',0,.3);
 door(0,2.94,PI,'landing',[-2.6,7,0],'Gallery',{w:1.1});light('#ffe0b0',1.3,8,0,2.8,0);
 // Abyss Sophie on a frame
 var sop=ctex(512,512,function(g){var c=['#0a1a3a','#123a5a','#1a5a6a','#2a7a7a','#3a2a5a','#0a2a2a'];g.fillStyle='#081428';g.fillRect(0,0,512,512);for(var r=12;r>0;r--){g.fillStyle=c[r%c.length];g.beginPath();for(var a=0;a<=PI*2+.01;a+=PI/24){var rr=r*20+Math.sin(a*8)*6;g.lineTo(256+Math.cos(a)*rr,256+Math.sin(a)*rr);}g.fill();}g.fillStyle='#e8d8c0';for(a=0;a<PI*2;a+=PI/8){g.beginPath();g.arc(256+Math.cos(a)*120,256+Math.sin(a)*120,8,0,PI*2);g.fill();}});
 var sf=grp(0,1.7,-2.9);box(1.9,1.9,.06,mat('#5a341f'),0,-.95,0,sf);var sp=plane(1.8,1.8,new THREE.MeshBasicMaterial({map:sop}),0,0,.04,0,sf);
 tap(sf,function(){card('Abyss Sophie','<p>A Sophie\u2019s Universe in deep-sea colours: navy, teal, the green-black of very deep water, a little plum. Round after round, petals and popcorn stitches, the mistakes left in where they became part of it.</p>',[],'on the frame');},'Abyss Sophie');
 // yarn baskets
 var cols=['#0a1a3a','#1a5a6a','#3a2a5a','#e8d8c0','#b0102a','#2a7a7a','#e8b33a','#f4c8c8'];var balls=[];
 [[-2.4,-1.8],[2.4,-1.8],[-2.6,1.2]].forEach(function(p,j){var bk=grp(p[0],0,p[1]);cyl(.38,.3,.35,mat('#a07a4a',{r:1}),0,0,0,14,bk);solid(p[0],p[1],.8,.8);for(var i=0;i<5;i++){var b=sph(.1,mat(cols[(i+j*3)%cols.length],{r:1}),rnd(-.18,.18),.38,rnd(-.18,.18),bk);balls.push(b);}
  tap(bk,function(){var b=pick(balls);b.userData.v=1.2;toast(pick(['A ball of yarn rolls out across the floor.','Deep-sea blue. Very soft.','Cream, for the edging.']));},'yarn basket');});
 anim(function(dt){balls.forEach(function(b){if(b.userData.v>0){b.position.x+=b.userData.v*dt*.5;b.rotation.z-=b.userData.v*dt*3;b.userData.v-=dt*.5;}});});
 // armchair + work in progress
 armchair(1.8,.8,-PI*.7,'#5a3a4a');solid(1.8,.8,.9,.8);var wip=box(.4,.03,.3,mat('#2a6a8a',{r:1}),1.8,.45,.8);var hook=cyl(.006,.006,.16,mat('#c0c0c0',{m:.8}),1.9,.48,.8,6);hook.rotation.z=1.2;
 var rounds=0;tap(wip,function(){rounds++;wip.scale.set(1+rounds*.06,1,1+rounds*.06);toast('Round '+(rounds+1)+'. '+pick(['Chain three, turn.','Popcorn stitch.','A small mistake. Leave it in.','Count again: right.']));if(rounds===6)secret('rounds','Six rounds','<p>Six rounds done in one sitting. The piece is bigger than the chair cushion now.</p>');},'work in progress');
 // the blanket for the armchair
 var bl=ctex(256,128,function(g){var c=['#1a2a5a','#2a6a8a','#6a3a8a','#e8d8c0','#b0102a'];for(var x=0;x<8;x++)for(var y=0;y<4;y++){g.fillStyle=c[(x*3+y)%5];g.fillRect(x*32,y*32,32,32);g.fillStyle=c[(x+y+1)%5];g.fillRect(x*32+8,y*32+8,16,16);}});var blk=plane(1.4,.8,new THREE.MeshBasicMaterial({map:bl,side:THREE.DoubleSide}),3.47,1.6,-.4,-PI/2);
 tap(blk,function(){card('The blanket for the armchair','<p>Granny squares in deep blue, teal, plum, cream and one red, for your mother\u2019s old armchair. It\u2019s already on the chair out on the terrace.</p>',[{t:'To the terrace',fn:function(){closeCard();go('terrace');}}]);},'blanket');
 // the beanie
 var bn=grp(-1.6,0,-2.4);table(0,0,.8,.5,.8,'#5a341f',bn);solid(-1.6,-2.4,.9,.6);var hat=sph(.13,mat('#e8d8c0',{r:1}),0,.85,0,bn);hat.scale.y=.75;var patch=plane(.08,.06,new THREE.MeshBasicMaterial({map:ctex(64,48,function(g){g.fillStyle='#0a7a3a';g.fillRect(0,0,32,48);g.fillStyle='#fff';g.fillRect(32,0,32,48);g.fillStyle='#d21034';g.beginPath();g.arc(34,24,12,PI*.3,PI*1.7);g.lineTo(34,24);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(38,24,10,0,PI*2);g.fill();g.fillStyle='#d21034';g.beginPath();g.arc(44,24,4,0,PI*2);g.fill();})}),0,.88,.12,0,bn);
 tap(bn,function(){toast('The little beanie from the clinic, with the Algerian flag patch.');},'beanie');
}});
