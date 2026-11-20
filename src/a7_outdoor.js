
// ================= OUTSIDE: GARDEN, POOL, BEACH, LANTERN PATH, HILL =================
var HILL={x:52,z:-21};
function outY(x,z){if(x>46&&z<-14)return 8;if(x<36)return 0;var v=((x-36)+(-z))/26;return 8*clamp(v,0,1);}
function skyDome(top,mid,bot){var t=ctex(16,512,function(g,w,h){var gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,top);gr.addColorStop(.48,mid);gr.addColorStop(.62,bot);gr.addColorStop(1,'#120a14');g.fillStyle=gr;g.fillRect(0,0,w,h);});var m=new THREE.MeshBasicMaterial({map:t,side:THREE.BackSide,fog:false,depthWrite:false});var s=new THREE.Mesh(new THREE.SphereGeometry(300,32,16),m);G.add(s);return s;}
var beachLineIdx=0;
function readBeachLines(){var H=BEACH.HALL||[],E=BEACH.ECHO||[];var html='<h5>Hallucinations of Love</h5>'+H.map(function(l){return '<p style="margin:0 0 .35em">'+(l[1]?'<s>'+esc(l[0])+'</s>':inl(l[0]))+'</p>';}).join('')+'<h5>Echoes of the Void</h5>'+E.map(function(l){return '<p style="margin:0 0 .35em">'+(l[1]?'<s>'+esc(l[0])+'</s>':inl(l[0]))+'</p>';}).join('');
 card('The lines in the sky',html,[{t:'Walk the original beach',fn:function(){closeCard();openWorld('beachorig','Hallucination of Love: Beach Edition');}}],'they drift over the sea in two slow, glowing circles; struck-through lines flicker');}
function beachEditionCard(){card('Hallucinations of Love: Beach Edition','<p>An empty beach at twilight, made on October 14. Lines from <i>Echoes of the Void</i> and <i>Hallucinations of Love</i> drift over the sea in two slow, glowing circles, and the struck-through ones flicker.</p><p>Here it has been brought home: the pavilion on the sand, the two circles of lines over the water, the campfire, the little waterfall from the cliff, and the cave with the two stone beds. The original walkable artwork is inside this pavilion too, whole and unchanged.</p>',[{t:'Read the lines',fn:readBeachLines},{t:'Walk the original',fn:function(){closeCard();openWorld('beachorig','Hallucination of Love: Beach Edition');}},{t:'Every Hallucinations of Love',alt:1,fn:function(){listMatch('Hallucinations of Love',/Hallucinations of Love|Hallucinations of love|Additions during the reading of Hallucinations|Noir Hallucination/i);}}],'the pavilion on the beach');}
defScene('garden',{name:'The garden',sub:'roses, the pool, and the way down to the sea',bg:'#2a1a30',amb:'sea',spawn:[0,-26,PI],speed:4.2,hemi:.7,sky:'#ffc8a0',ground:'#2a2a3a',fog:['#3a2440',40,170],groundY:outY,
 enter:function(){var z=player.z;var p=$('pname'),s=$('psub');},
 tick:function(dt,t){var z=player.z,x=player.x;var n,s;if(x>34){n='The lantern path';s='up to the cigarette after hill';if(x>46&&z<-14){n='The cigarette after hill';s='the view over everything';}}else if(z<-9){n='The garden';s='roses, the pool, and the way down to the sea';}else{n='The beach';s='Hallucinations of Love: Beach Edition';}if($('pname').textContent!==n){$('pname').textContent=n;$('psub').textContent=s;}},
 build:function(){
 skyDome('#1a1440','#c86a7a','#ffb070');stars(500,250,-40);
 var sun=sph(8,basic('#ffcf8a'),0,8,190);sun.material.fog=false;var moon=sph(3,basic('#fff6d8'),-60,70,120);moon.material.fog=false;
 var dl=new THREE.DirectionalLight('#ffb890',.8);dl.position.set(-20,30,40);G.add(dl);
 // ---- ground ----
 var gr=plane(60,26,mat('#fff',{map:grassTex(),r:1}),0,0,-19);flat(gr);
 var sd=plane(140,40,mat('#fff',{map:sandTex(),r:1}),10,-.02,3);flat(sd);
 // sea
 var sg=new THREE.PlaneGeometry(400,180,60,24);var sea=new THREE.Mesh(sg,new THREE.MeshStandardMaterial({color:'#2a4a7a',roughness:.15,metalness:.4,transparent:true,opacity:.92}));sea.rotation.x=-PI/2;sea.position.set(0,-.15,104);G.add(sea);var spos=sg.attributes.position;var base=Float32Array.from(spos.array);
 var foam=plane(140,1.2,basic('#ffffff',{t:.35}),10,.0,13.5);flat(foam);
 anim(function(dt,t){for(var i=0;i<spos.count;i++){var x=base[i*3],y=base[i*3+1];spos.array[i*3+2]=Math.sin(x*.08+t*1.1)*.25+Math.cos(y*.11+t*.8)*.2;}spos.needsUpdate=true;foam.position.z=13.4+Math.sin(t*.7)*.6;foam.material.opacity=.25+.15*Math.sin(t*.7+1);});
 walk(-28,-29,28,-7.5);walk(-3,-9,3,-5);walk(-40,-6,40,12.8);walk(34,-3,40,2);walk(38,-7,42,2);walk(40,-11,46,-4);walk(44,-15,50,-8);walk(46,-28,58,-14);
 // ---- mansion facade ----
 var mh=grp(0,0,-31);var fw=mat('#7a5232',{map:woodTex('#7a5232','30,15,5',14,[6,2]),r:.8});box(34,9,2,fw,0,0,0,mh);var rf=new THREE.Mesh(new THREE.CylinderGeometry(.1,19,5,4,1),mat('#3a2018',{r:.9}));rf.rotation.y=PI/4;rf.scale.z=.12;rf.position.set(0,11.5,0);mh.add(rf);
 box(8,2,8,fw,-10,9,-2,mh);box(1.2,3,1.2,mat('#6a5a50'),10,9,0,mh);
 for(var wx=-14;wx<=14;wx+=4){if(Math.abs(wx)<2)continue;[2.2,6.2].forEach(function(wy){var w=plane(1.4,1.8,basic(Math.random()<.75?'#ffcf7a':'#5a3a2a'),wx,wy+.9,1.01,0,mh);box(1.6,.1,.15,mat('#e8d8c0'),wx,wy,1.05,mh);});}
 box(36,.2,4,mat('#5a341f'),0,0,2.6,mh);for(var px=-16;px<=16;px+=4)cyl(.15,.15,3.4,mat('#e8d8c0'),px,.2,4.4,10,mh);box(36,.25,4.2,mat('#5a341f'),0,3.6,2.6,mh);
 solid(0,-31,34,2.2);for(px=-16;px<=16;px+=4)solid(px,-26.6,.4,.4);
 door(0,-29.9,0,'foyer',[0,3.6,0],'Into the house',{w:2,h:3});
 sign(['The Love Mansion'],5,0,8.3,-29.95,0,{fs:90,color:'#f3c978',w:1024,glow:'#ffb04a'});
 for(px=-12;px<=12;px+=6){var lp=light('#ffb060',.6,8,px,3,-27);}
 // ---- garden path, hedges, roses, lanterns ----
 var path=plane(3,22,mat('#c8b89a',{map:tileTex('#c8b89a','#b8a888',6),r:1}),0,.01,-18.5);flat(path);
 for(var hz=-27;hz<=-11;hz+=2){[-2.6,2.6].forEach(function(hx){var r=grp(hx,0,hz);var b=sph(.55,mat('#2f5a2c',{r:1}),0,.45,0,r);b.scale.y=.8;for(var k=0;k<4;k++)sph(.08,mat(pick(['#b0102a','#e8486a','#f4d0d8'])),rnd(-.4,.4),.75+rnd(-.1,.15),rnd(-.4,.4),r);solid(hx,hz,1,1);tap(r,function(){tone(pick([784,880,988]),.5,'sine',.05);if(count('roses',8))secret('roses','The rose path','<p>You touched every kind of rose along the path. A red one for the letters, a pink one for the poems, a white one for your mother.</p>');else toast(pick(['It smells of summer evenings.','A thorn, carefully avoided.','Dew on the petals.']));},'roses');});}
 for(var lz=-24;lz<=-12;lz+=6){[-1.7,1.7].forEach(function(lx){cyl(.05,.05,1.4,mat('#2a2a2a',{m:.6}),lx,0,lz,6);var lb=sph(.13,basic('#ffd27a'),lx,1.5,lz);light('#ffb060',.5,5,lx,1.6,lz);});}
 // fairy-light tree
 var tr=grp(-10,0,-20);cyl(.25,.4,3.5,mat('#4a3020'),0,0,0,8,tr);var crown=sph(2.4,mat('#2a4a2a',{r:1}),0,4.4,0,tr);crown.scale.y=.8;var fls=[];for(var f=0;f<40;f++){var a=Math.random()*PI*2,y=rnd(3.2,5.8);fls.push(sph(.05,basic('#fff2b0'),Math.cos(a)*2.2,y,Math.sin(a)*2.2,tr));}solid(-10,-20,1,1);var fmode=0;
 anim(function(dt,t){fls.forEach(function(l,i){var on=fmode===0?(Math.sin(t*3+i*1.7)>-.3):fmode===1?true:(Math.sin(t*1.2)>0);l.visible=on;});});
 var sw=grp(-10,0,-18.4);box(.04,2.6,.04,mat('#d8cbb0'),-.35,0,0,sw);box(.04,2.6,.04,mat('#d8cbb0'),.35,0,0,sw);var seat=box(.8,.05,.3,mat('#6b3d22'),0,.55,0,sw);sw.position.y=0;var swingT=0;
 anim(function(dt,t){if(swingT>0){sw.rotation.x=Math.sin(t*2.5)*.35*Math.min(1,swingT/2);swingT-=dt;}else sw.rotation.x*=.95;});
 tap(tr,function(){fmode=(fmode+1)%3;toast(['Fairy lights: twinkling','Fairy lights: steady, like candles','Fairy lights: slowly breathing'][fmode]);},'fairy-light tree');tap(sw,function(){swingT=6;toast('The swing goes.');},'swing');
 // bench with the yellow duck umbrella
 var bn=grp(-6,0,-13,PI/2);box(1.6,.08,.5,mat('#6b3d22'),0,.45,0,bn);box(1.6,.5,.06,mat('#6b3d22'),0,.5,-.24,bn);[-0.7,.7].forEach(function(x){box(.06,.45,.45,mat('#2a2a2a'),x,0,0,bn);});solid(-6,-13,.6,1.7);
 var um=grp(-5.8,.5,-12.4);cyl(.012,.012,.8,mat('#1a1a1a'),0,0,0,6,um);var uc=new THREE.Mesh(new THREE.ConeGeometry(.5,.25,12,1,true),mat('#ffd23a',{side:1}));uc.position.y=.95;um.add(uc);uc.visible=false;var duck=sph(.05,mat('#ffd23a'),0,-.02,0,um);
 tap(um,function(){uc.visible=!uc.visible;toast(uc.visible?'The yellow umbrella with the duck handle, open.':'Folded again.');},'yellow duck umbrella');
 var stone=sph(.12,mat('#8a8a90',{r:.9}),-6.2,.55,-13.4);stone.scale.set(1.2,.7,1);tap(stone,function(){toast('The stone you brought home from the Elbe.');},'stone');
 // Koda on a post (the day you found him)
 var post=cyl(.12,.12,1.2,mat('#6b5040'),6,0,-12,10);solid(6,-12,.4,.4);var kp=koda(6,1.2,-12,1.3);kodaTap(kp);var bk=sign(['Bukowski'],.25,6.06,1.23,-11.93,0,{fs:50,color:'#222',w:400});
 note(6,1.0,-11.86,0,['The Laughing Heart'],function(){card('A post on a walk','<p>Koda, sitting on a post, the day you\u2019d written \u201cThe Laughing Heart\u201d into your diary. \u201cBukowski\u201d on his foot.</p>'+(docExists('Koda, a representation of Miles')?'':''),docExists('Koda, a representation of Miles')?[{t:'Koda\u2019s note',fn:function(){openDoc('Koda, a representation of Miles');}}]:[]);},null,{wid:.4,fs:30});
 // ---- pool ----
 var pg=grp(13,0,-19);box(10,.2,6,mat('#e8ddd0',{map:marbleTex()}),0,0,0,pg);var pw=plane(8.6,4.6,new THREE.MeshStandardMaterial({color:'#3ac0d8',emissive:'#1a6a8a',emissiveIntensity:.6,roughness:.05,transparent:true,opacity:.85}),0,.21,0,0,pg);pw.rotation.x=-PI/2;solid(13,-19,8.8,4.8);light('#6ae0ff',1.2,8,13,1,-19);
 var floaters=[];for(var c=0;c<8;c++){var fc=grp(rnd(-3.6,3.6),.24,rnd(-1.8,1.8),0,pg);cyl(.08,.08,.04,mat('#f4ead2'),0,0,0,10,fc);var ff=sph(.025,basic('#ffcf6a'),0,.08,0,fc);floaters.push(fc);}var fl0=sph(.12,mat('#ff7aa8'),0,.26,0,pg);
 var ripple=0;anim(function(dt,t){floaters.forEach(function(f,i){f.position.y=.24+Math.sin(t*1.5+i)*.02;f.position.x+=Math.sin(t*.3+i)*.002;});pw.material.emissiveIntensity=.5+.15*Math.sin(t*.8)+ripple;if(ripple>0)ripple-=dt*.5;});
 tap(pw,function(){ripple=.8;burst(.9,900,.3,.5);if(count('pool',4))secret('pool','Bioluminescence','<p>When you trail your hand through the pool, the water lights up around your fingers, the way the bay does in \u201cBioluminescence\u201d.</p>');else toast(pick(['Warm water, floating candles.','Ripples spread to the edge.','The pool glows a little brighter.']));},'pool');
 [[-2,4],[2,4]].forEach(function(p){var l=grp(13+p[0],0,-19+p[1]);box(.7,.25,1.8,mat('#e8ddd0'),0,.15,0,l);var bk=box(.7,.05,.6,mat('#c84a5a'),0,.45,-.6,l);bk.rotation.x=.5;solid(13+p[0],-19+p[1],.8,1.9);tap(l,function(){toast('A sun lounger, still warm from the day.');},'lounger');});
 sign(['The pool'],1.6,13,1.6,-22.2,0,{fs:60,color:'#f3e9d6',bg:'rgba(40,30,50,.7)',w:512,pad:10});
 // ---- steps down to the beach ----
 for(var s=0;s<5;s++)box(5,.12,.6,mat('#b8a888'),0,-.1,-9.4+s*.9);
 sign(['to the beach \u2193','Hallucinations of Love: Beach Edition'],3.2,0,2.4,-8.2,PI,{fs:40,color:'#f3e9d6',bg:'rgba(40,20,40,.75)',w:900,pad:14});

 // ================= THE BEACH =================
 // Beach Edition pavilion (prominent)
 var pv=grp(-14,0,3);var pm=mat('#f4ead2',{r:.6});for(var i=0;i<8;i++){var a=i/8*PI*2;cyl(.18,.2,4.2,pm,Math.cos(a)*3.2,0,Math.sin(a)*3.2,10,pv);solid(-14+Math.cos(a)*3.2,3+Math.sin(a)*3.2,.4,.4);}
 var dome=new THREE.Mesh(new THREE.SphereGeometry(3.6,24,12,0,PI*2,0,PI/2),mat('#f4ead2',{side:1,r:.5}));dome.position.y=4.2;pv.add(dome);var ring=new THREE.Mesh(new THREE.TorusGeometry(3.4,.08,8,48),basic('#ffcf8a'));ring.rotation.x=PI/2;ring.position.y=4.2;pv.add(ring);
 var core=sph(.6,basic('#ffd9a0',{add:1,t:.6}),0,1.6,0,pv);var coreL=light('#ffb070',2.2,14,-14,2,3);
 var bt=sign(['Hallucinations of Love','Beach Edition'],5.5,0,6.6,0,0,{fs:72,color:'#ffe9b0',glow:'#ffb04a',w:1024,italic:true},pv);bt.material.depthWrite=false;
 var bt2=bt.clone();bt2.rotation.y=PI;pv.add(bt2);
 anim(function(dt,t){core.scale.setScalar(1+.12*Math.sin(t*1.4));ring.rotation.z+=dt*.2;bt.position.y=6.6+Math.sin(t*.8)*.12;bt2.position.y=bt.position.y;});
 tap(pv,beachEditionCard,'Hallucinations of Love: Beach Edition');pv.userData.far=14;
 var plinth=grp(-14,0,3);cyl(.5,.6,1,mat('#e8ddd0',{map:marbleTex()}),0,0,0,16,plinth);solid(-14,3,1.2,1.2);var ob=box(.5,.08,.36,mat('#1a1030'),0,1,0,plinth);tap(plinth,readBeachLines,'the book of lines');
 // two circles of lines over the sea
 var H=BEACH.HALL||[],E=BEACH.ECHO||[];var circ=[];
 function ringOf(lines,r,y,col,speed,cx,cz){lines.forEach(function(l,i){var s=floatText(l[0],0,y,0,col,7);s.userData={a:i/lines.length*PI*2,r:r,y:y,cx:cx,cz:cz,sp:speed,strike:l[1]};circ.push(s);});}
 ringOf(H,26,16,'#ffe2a8',.012,-8,40);ringOf(E,18,22,'#cfe0ff',-.018,-8,40);
 anim(function(dt,t){circ.forEach(function(s,i){var u=s.userData;u.a+=u.sp*dt*2;s.position.set(u.cx+Math.cos(u.a)*u.r,u.y+Math.sin(t*.4+i)*.6,u.cz+Math.sin(u.a)*u.r*.6);s.material.opacity=u.strike?(Math.sin(t*9+i)>0?.85:.15):.9;});});
 // floating hallucinations near the shore (tap to catch a line)
 var hall=[];for(i=0;i<14;i++){(function(i){var jg=grp(rnd(-30,30),rnd(2,4.5),rnd(8,12.5));var bell=new THREE.Mesh(new THREE.SphereGeometry(.35,14,8,0,PI*2,0,PI/2),basic(pick(['#ff9ad0','#9ad0ff','#c8a0ff','#9affd8']),{add:1,t:.55}));jg.add(bell);for(var k=0;k<4;k++){var tt=box(.015,.6,.015,basic('#ffffff',{add:1,t:.4}),rnd(-.15,.15),-.6,rnd(-.15,.15),jg);}hall.push(jg);
  tap(jg,function(){var l=pick(H.concat(E));if(!l)return;tone(rnd(700,1400),1.2,'sine',.05);bell.material.color.set('#ffffff');setTimeout(function(){bell.material.color.set(pick(['#ff9ad0','#9ad0ff','#c8a0ff','#9affd8']));},400);card('A hallucination',(l[1]?'<p><s>'+esc(l[0])+'</s></p><p style="font-size:13px;color:#8a6d5c">struck through in the original, kept</p>':'<p style="font-size:20px">'+inl(l[0])+'</p>'),[{t:'Another',fn:function(){closeCard();jg.userData.tap();}}],'it drifted in off the sea');if(count('hall',10))secret('hall10',null);},'floating hallucination');
  anim(function(dt,t){jg.position.y+=Math.sin(t*.9+i)*.004;jg.position.x+=Math.sin(t*.1+i)*.01;bell.scale.y=1+.15*Math.sin(t*2+i);});})(i);}
 // campfire
 var cf=grp(-2,0,5);for(i=0;i<6;i++){var lg=cyl(.07,.07,.9,mat('#4a2a18'),0,.05,0,8,cf);lg.rotation.z=PI/2-.4;lg.rotation.y=i/6*PI*2;}var cfl=[];for(i=0;i<9;i++){var fz=sph(.14,basic(pick(['#ff9a2a','#ffcf4a','#ff5a1a']),{add:1}),rnd(-.2,.2),.3,rnd(-.2,.2),cf);fz.scale.y=2.2;cfl.push(fz);}var fireL=light('#ff7a2a',2.4,12,-2,1,5);
 var sparks=[];for(i=0;i<20;i++)sparks.push(sph(.02,basic('#ffcf6a',{add:1}),0,.4,0,cf));
 anim(function(dt,t){cfl.forEach(function(f,i){f.scale.y=1.8+Math.sin(t*10+i*2)*.7;});fireL.intensity=2.2+Math.sin(t*13)*.4;sparks.forEach(function(s,i){var k=(t*.5+i/20)%1;s.position.set(Math.sin(i*7+t)*.3*k,.4+k*2.5,Math.cos(i*5+t)*.3*k);s.material.opacity=1-k;});});
 solid(-2,5,1.4,1.4);[[0,1.9],[1.7,-.6],[-1.7,-.6]].forEach(function(p,i){var lgs=cyl(.2,.2,1.4,mat('#5a3a20'),-2+p[0],.2,5+p[1],10);lgs.rotation.z=PI/2;lgs.rotation.y=Math.atan2(p[0],p[1]);solid(-2+p[0],5+p[1],1,.5);});
 tap(cf,function(){burst(.8,2600,.4,.6);var p=randomLove();card('Read by the campfire',md(p.x.length>2400?p.x.slice(0,2400)+'\n\n\u2026':p.x),[{t:'Read it all',fn:function(){openDoc(p.key);}},{t:'Another one',alt:1,fn:function(){closeCard();cf.userData.tap();}}],p.t+' \u00b7 '+p.d);},'campfire');
 // wedding arch
 var wa=grp(8,0,6);var arch=new THREE.Mesh(new THREE.TorusGeometry(1.5,.08,8,30,PI),mat('#f4ead2'));arch.position.y=1.6;wa.add(arch);cyl(.08,.08,1.6,mat('#f4ead2'),-1.5,0,0,8,wa);cyl(.08,.08,1.6,mat('#f4ead2'),1.5,0,0,8,wa);for(i=0;i<26;i++){var a2=i/25*PI;sph(.1,mat(pick(['#ffffff','#f4d0d8','#b0102a'])),Math.cos(a2)*1.5,1.6+Math.sin(a2)*1.5,0,wa);}
 var veil=plane(2.8,2.4,basic('#ffffff',{t:.25,side:1}),0,1.4,-.05,0,wa);anim(function(dt,t){veil.material.opacity=.18+.06*Math.sin(t*1.3);});
 for(var rr=0;rr<3;rr++)[-1,1].forEach(function(sd2){var ch=chair(8+sd2*1.4,8.4+rr*1.1,PI,'#f4ead2');});
 var aisle=plane(.9,4,basic('#f4ead2',{t:.6}),8,.02,8.8);flat(aisle);for(i=0;i<20;i++){var pt=new THREE.Mesh(new THREE.CircleGeometry(.04,6),basic('#b0102a',{side:1}));pt.rotation.x=-PI/2;pt.position.set(8+rnd(-.4,.4),.03,rnd(7,10.6));G.add(pt);}
 solid(6.5,6,.3,.3);solid(9.5,6,.3,.3);
 tap(wa,function(){chime();card('The wedding on the beach','<p>A white arch on the sand, petals down the aisle, the sea behind. This is where the vows go.</p>',[{t:'Read the vows',fn:function(){listMatch('Vows',/Vows|Gelübde|Versprechen|Wedding|wedding|Hochzeit/i);}},{t:'Throw the bouquet',alt:1,fn:function(){closeCard();secret('bouquet','The bouquet','<p>You throw it over your shoulder. It lands on Koda.</p>');}}],'the beach marriage scene');},'wedding arch');
 // cliff, waterfall and the cave with two stone beds (from the original beach)
 var cl=grp(-34,0,0);var rock=mat('#5a5048',{r:1});box(8,9,16,rock,0,0,0,cl);box(3,6,4,rock,4,0,-6,cl);solid(-34,0,8.2,16.2);
 var wf=plane(1.2,8.6,new THREE.MeshBasicMaterial({map:ctex(64,256,function(g){for(var i=0;i<60;i++){g.fillStyle='rgba(220,240,255,'+Math.random()*.6+')';g.fillRect(Math.random()*64,Math.random()*256,2,30);}},[1,1]),transparent:true}),4.05,4.3,4,PI/2,cl);anim(function(dt){wf.material.map.offset.y+=dt*1.5;});var wpool=plane(2,2,basic('#9ad0ff',{t:.5}),5,.03,4,0,cl);flat(wpool);
 tap(wf,function(){burst(2,3000,.25,.4);toast('The tiny waterfall falls from the cliff into a pool on the sand.');},'waterfall');
 var cave=grp(-29.9,0,-4,PI/2);plane(3,2.6,basic('#0a0808'),0,1.3,.0,0,cave);var bed1=box(1,.4,1.8,mat('#8a8078'),-2.5,0,0,G);var bed2=box(1,.4,1.8,mat('#8a8078'),-28.6,0,-3,G);G.remove(bed1);G.remove(bed2);
 var sb1=box(.9,.4,1.8,mat('#8a8078',{r:1}),-29.3,0,-5.2);var sb2=box(.9,.4,1.8,mat('#8a8078',{r:1}),-29.3,0,-2.8);solid(-29.3,-4,1,4.4);var cl2=light('#ffb070',.5,4,-28.8,1.2,-4);
 tap(sb1,function(){card('The cave with two stone beds','<p>Two stone beds side by side in the cliff, out of the wind. In the original beach you can lie down here and look out at the lines over the sea.</p>',[{t:'Walk the original beach',fn:function(){closeCard();openWorld('beachorig','Hallucination of Love: Beach Edition');}}]);},'stone bed');tap(sb2,function(){sb1.userData.tap();},'stone bed');
 // driftwood sign + shells
 for(i=0;i<16;i++){(function(i){var sh=sph(.07,mat(pick(['#f4e4d0','#f4c8c8','#e8d8b0'])),rnd(-26,30),.03,rnd(9,12.5));sh.scale.y=.4;tap(sh,function(){if(count('shells',6))secret('shell','The shell that hums','<p>You hold the sixth shell to your ear. Instead of the sea, it hums a few bars of a waltz, the one the music box plays.</p>');else{tone(rnd(1200,2000),.4,'sine',.04);toast(pick(['A shell.','Pink inside.','Smooth from the sea.','Something tiny lived here once.']));}},'shell');})(i);}
 var mb=grp(20,0,11);cyl(.06,.06,1.1,mat('#5a4030'),0,0,0,6,mb);var bottle=cyl(.06,.06,.25,mat('#7ab8a0',{t:.6,r:.05}),0,0,0,10,G);bottle.position.set(18,.06,12);bottle.rotation.z=PI/2;
 tap(bottle,function(){var k=matchDocs(/^A Message|Message in a/i);var p=randomLove();card('A message in a bottle',md(p.x.length>1800?p.x.slice(0,1800)+'\n\n\u2026':p.x),[{t:'Read it all',fn:function(){openDoc(p.key);}}],p.t+' \u00b7 washed up from '+p.d);},'bottle');G.remove(mb);
 // ================= THE LANTERN PATH =================
 var steps=60;for(i=0;i<=steps;i++){var tt2=i/steps;var px2=36+tt2*12,pz2=0-tt2*12;var py=outY(px2,pz2);var pl=box(2.2,.08,.5,mat('#7a5232',{map:woodTex('#7a5232','30,15,5',1,[1,1])}),px2,py-.08,pz2);pl.rotation.y=-PI/4;if(i%2===0){cyl(.05,.05,py+.05,mat('#4a3020'),px2-.7,0,pz2-.7,6);cyl(.05,.05,py+.05,mat('#4a3020'),px2+.7,0,pz2+.7,6);}
  if(i%6===3){var lx=px2-1.0,lz=pz2-1.0;cyl(.03,.03,1.3,mat('#2a2a2a',{m:.6}),lx,py,lz,6);var lan=box(.18,.24,.18,basic('#ffcf7a'),lx,py+1.3,lz);light('#ffb060',.5,4,lx,py+1.5,lz);(function(lan,idx){tap(lan,function(){var l=(BEACH.HALL||[])[idx%Math.max(1,(BEACH.HALL||[]).length)];toast(l?l[0]:'A lantern.',3800);},'lantern');})(lan,i);}}
 var hm=new THREE.Mesh(new THREE.CylinderGeometry(7.5,17,8,32,1),mat('#3a5a34',{map:grassTex(),r:1}));hm.position.set(HILL.x,4-.05,HILL.z);G.add(hm);
 sign(['the cigarette after hill \u2197'],3,36,2.4,1.2,-PI/4,{fs:46,color:'#f3e9d6',bg:'rgba(40,20,40,.8)',w:900,pad:12});
 // ================= THE CIGARETTE AFTER HILL =================
 var top=grp(HILL.x,8,HILL.z);var bench=grp(0,0,0,PI*.75,top);box(1.8,.08,.5,mat('#6b3d22'),0,.45,0,bench);box(1.8,.5,.06,mat('#6b3d22'),0,.5,-.24,bench);[-0.8,.8].forEach(function(x){box(.06,.45,.45,mat('#2a2a2a'),x,0,0,bench);});solid(HILL.x,HILL.z,1.6,1.6);
 var asht=cyl(.08,.07,.03,mat('#9aa0a6',{m:.5}),.3,.5,.1,14,bench);var cg=cyl(.007,.007,.1,mat('#f4f0e8'),.3,.53,.1,6,bench);cg.rotation.z=PI/2;var emb=sph(.012,basic('#ff5a1a'),.35,.535,.1,bench);
 var sm=[];for(i=0;i<10;i++)sm.push(sph(.04,basic('#e0e0e8',{t:0}),0,0,0,top));anim(function(dt,t){sm.forEach(function(s,i){var k=(t*.18+i/10)%1;s.position.set(Math.sin(t+i)*.2*k-.2,1+k*2.5,.2+Math.cos(t*.7+i)*.2*k);s.scale.setScalar(1+k*4);s.material.opacity=(1-k)*.2;});emb.material.color.setHSL(.04,1,.45+.15*Math.sin(t*2));});
 var tl=grp(2.5,0,1.5,0,top);cyl(.04,.04,1.6,mat('#2a2a2a',{m:.6}),0,0,0,6,tl);var tlb=box(.24,.3,.24,basic('#ffcf7a'),0,1.6,0,tl);light('#ffb060',.9,7,HILL.x+2.5,9.8,HILL.z+1.5);
 tap(bench,function(){card('The cigarette after hill','<p>The top of the lantern path. Down there: the beach, the campfire, the arch, the pavilion with its two circles of lines over the water, the pool glowing in the garden, and the house with its windows lit.</p><p>A bench, an ashtray, one cigarette burning down slowly. Nothing that has to be said.</p>',[{t:'The cigarette after',fn:function(){listMatch('The cigarette after',/cigarette after/i);}},{t:'Sit and watch the sea',alt:1,fn:function(){closeCard();player.yaw=2.03;player.pitch=-.15;toast('You sit. The sea, the lines, the house.');}}],'the end of the path');},'bench');
 tap(tl,function(){if(count('hilllamp',3))secret('hill','Last light','<p>You turn the lantern down and the lines over the sea get brighter. Up here you can read them from far away. That is what the hill is for.</p>');else toast('The lantern swings a little in the wind.');},'lantern');
 sign(['The cigarette after hill'],3,HILL.x,11.2,HILL.z-.6,PI*.75,{fs:60,color:'#f3c978',glow:'#ffb04a',w:900,italic:true});
 var ft=grp(-2,0,-2,0,top);cyl(.15,.25,2.2,mat('#4a3020'),0,0,0,8,ft);var fcrown=sph(1.2,mat('#2a4a2a',{r:1}),0,2.8,0,ft);fcrown.scale.y=.8;solid(HILL.x-2,HILL.z-2,.6,.6);
}});
