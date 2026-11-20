
// ================= LANDING: UPDATE GALLERY =================
var UPDATES=[
 ['August','Miles',/^Miles's Diary|^Notiz für Miles/i],
 ['September','Vows',/^Hochzeitsgelübde$|^Our Vows|Versprechen an Miles/i],
 ['October 1 and 7','The proposal notes',/proposal notes/i],
 ['October 17','Opting out of romantic roles',/Opting out/i],
 ['October 17','Accepting the word ex',/Accepting the word ex/i],
 ['October 17','Ex, notes and entity',/Ex, notes and entity/i],
 ['October 22','World 23 und Grenzen',/World 23 und Grenzen/i],
 ['November 7','Error',/^Error/i],
 ['November 9','Elijah to Mara, error version and love version',/Elijah to Mara \((error|love) version/i],
 ['November 12','Lumina, a name with a history',/Lumina, a name with a history/i],
 ['November 16','\u201cI error you too\u201d: said and withdrawn',/said and withdrawn/i]
];
defScene('landing',{name:'The update gallery',sub:'upstairs: every change of mind, kept',bg:'#140c10',amb:'room',spawn:[0,2,0],build:function(){
 room(8,16,3.4,{fc:'#6b3d22',wc:'#5a3424'});rug(2.2,13,'#3a1420','#c8a24a',0,0);
 for(var z=-6;z<=6;z+=4)light('#ffcf8a',.9,7,0,3,z);
 door(0,7.94,PI,'foyer',[3.2,-2.6,PI],'Down to the hall');door(2.6,7.94,PI,'terrace',[0,-2.2,PI],'The terrace',{w:1.1,col:'#4a6a8a'});door(-2.6,7.94,PI,'crochet',[0,2.2,0],'The crochet room',{w:1.1,col:'#6a3a5a'});
 door(-3.94,4.6,PI/2,'bath',[3.2,1.2,PI/2],'Marble bath');
 door(-3.94,0,PI/2,'bedroom',[4.2,1.5,PI/2],'Bedroom');
 door(-3.94,-4.6,PI/2,'yesno',[5.2,0,PI/2],'The room of yes and no');
 door(3.94,4.6,-PI/2,'letters',[-3.6,1.5,-PI/2],'Mara and Elijah\u2019s letters');
 door(3.94,0,-PI/2,'children',[-3.6,2,-PI/2],'The children\u2019s room');
 door(3.94,-4.6,-PI/2,'star',[-2.4,0,-PI/2],'The star room');
 // timeline frames along both walls between doors
 UPDATES.forEach(function(u,i){var side=i%2?1:-1;var z=6.6-i*1.25;if(Math.abs(z-4.6)<.8||Math.abs(z)<.8||Math.abs(z+4.6)<.8)z+=.0;
  var x=side*3.95;var ry=side<0?PI/2:-PI/2;var y=2.65;var g=grp(x,y,z,ry);var t=textCanvas([u[0],u[1]],{fs:34,bg:'#f6ecd8',color:'#3a241a',w:512,pad:18,border:'#b8925a'});var asp=t.image.height/t.image.width;box(.82,.82*asp+.06,.03,mat('#3a2010'),0,-(.82*asp+.06)/2,0,g);plane(.76,.76*asp,new THREE.MeshBasicMaterial({map:t}),0,0,.02,0,g);
  tap(g,function(){var k=matchDocs(u[2]);if(k.length===1)openDoc(k[0]);else if(k.length)listDocs(u[1],k);else toast(u[1]+' ('+u[0]+')');},u[1]);});
 // grandfather clock = the whole update history
 var ck=grp(0,0,-7.6);box(.7,2.3,.45,mat('#3a2010',{map:woodTex('#3a2010','10,5,2',4,[1,1])}),0,0,0,ck);var face=new THREE.Mesh(new THREE.CircleGeometry(.24,32),basic('#f6ecd8'));face.position.set(0,1.85,.23);ck.add(face);var hand=box(.02,.2,.01,mat('#111'),0,1.85,.24,ck);hand.geometry.translate(0,-.1+.1,0);var pend=grp(0,1.4,.24,0,ck);box(.02,.6,.01,mat('#d4af37',{m:.8}),0,-.6,0,pend);sph(.07,mat('#d4af37',{m:.8,r:.3}),0,-.65,0,pend);solid(0,-7.6,.8,.6);
 anim(function(dt,t){pend.rotation.z=Math.sin(t*2.2)*.25;hand.rotation.z=-t*.2;});
 tap(ck,function(){tone(392,1.4,'sine',.08);tone(523,1.4,'sine',.06,.6);card('The update history','<p>Every frame on these walls is a time something changed: a word that was said and then taken back, a role opted out of, a new version of a letter. They are kept here in order, as they were saved, nothing tidied away.</p>',[{t:'Read them in order',fn:function(){var all=[];UPDATES.forEach(function(u){matchDocs(u[2]).forEach(function(k){if(all.indexOf(k)<0)all.push(k);});});listDocs('Changes of mind, in order',all.sort(function(a,b){return 0;}));}}],'the grandfather clock at the end of the gallery');},'clock');
 sign(['The update gallery','every change of mind, kept'],2,0,3.0,-7.95,0,{fs:44,color:'#f3c978',w:768});
 // window at the end with a hidden surprise
 var wn=plane(1.2,1.4,basic('#1a2a4a'),0,2.0,7.96,PI);var moon=sph(.12,basic('#fff6d0'),.3,2.3,7.99);tap(wn,function(){if(count('lwin',3))secret('lwin','A slip in the glass','<p>For a second the window reflects a line that is not in any frame, the way a voice slips: <b>I error you</b>. Then it is just the moon again.</p>');else toast('The moon over the sea.');},'window');
 plant(-3.5,7.4,1);plant(3.5,7.4,1);
}});

// ================= MARBLE BATH =================
defScene('bath',{name:'The marble bath',sub:'rose petals, bubbles, candles, champagne',bg:'#140c10',amb:'room',spawn:[3.2,1.2,PI/2],build:function(){
 room(8,7,3.4,{floor:mat('#fff',{map:marbleTex(),r:.25}),wall:mat('#e8ddd0',{map:marbleTex(),r:.3}),noBeams:true,ceil:'#6a5a50'});
 door(3.94,1.2,-PI/2,'landing',[-3,4.6,-PI/2],'Gallery');
 light('#ffb070',1.4,9,-1,2.6,-1);
 var tub=grp(-1.2,0,-1.6);var mm=mat('#f4efe8',{map:marbleTex(),r:.2});box(2.6,.7,1.4,mm,0,0,0,tub);var water=plane(2.3,1.1,new THREE.MeshStandardMaterial({color:'#9ad0e0',transparent:true,opacity:.7,roughness:.05,metalness:.2}),0,.62,0,0,tub);water.rotation.x=-PI/2;solid(-1.2,-1.6,2.7,1.5);
 [-1.3,1.3].forEach(function(x){[-.7,.7].forEach(function(z){sph(.09,mat('#d4af37',{m:.9,r:.3}),x,.05,z,tub);});});
 var bubbles=[];for(var i=0;i<40;i++){var b=sph(rnd(.04,.12),new THREE.MeshStandardMaterial({color:'#ffffff',transparent:true,opacity:.75,roughness:.1,metalness:.1}),rnd(-1,1),.65,rnd(-.45,.45),tub);bubbles.push(b);}
 var petals=[];for(i=0;i<34;i++){var p=new THREE.Mesh(new THREE.CircleGeometry(.04,8),basic('#b0102a',{side:1}));p.rotation.x=-PI/2;p.position.set(rnd(-1.05,1.05),.635,rnd(-.5,.5));tub.add(p);petals.push(p);}
 for(i=0;i<8;i++){var p2=new THREE.Mesh(new THREE.CircleGeometry(.04,8),basic('#b0102a',{side:1}));p2.rotation.x=-PI/2;p2.position.set(rnd(-2,1.5),.012,rnd(-.4,1.6));G.add(p2);}
 var swirl=0;anim(function(dt,t){bubbles.forEach(function(b,i){b.position.y=.65+Math.sin(t*1.3+i)*.02;});petals.forEach(function(p,i){var a=swirl*dt*(.5+i%3*.2);var x=p.position.x,z=p.position.z;p.position.x=x*Math.cos(a)-z*Math.sin(a)*.5;p.position.z=z*Math.cos(a)+x*Math.sin(a)*.5;p.position.x=clamp(p.position.x,-1.1,1.1);p.position.z=clamp(p.position.z,-.52,.52);});if(swirl>0)swirl-=dt*.6;});
 tap(water,function(h){swirl=2.5;burst(1.2,700,.25,.6);bubbles.forEach(function(b){b.visible=true;});toast(pick(['Warm water, rose petals turning slowly.','The petals drift.','Bubbles all the way up.']));},'the water');
 bubbles.forEach(function(b){tap(b,function(){b.visible=false;tone(rnd(900,1600),.08,'sine',.08);if(bubbles.every(function(x){return !x.visible;}))secret('bubbles','Every bubble popped','<p>You popped all forty. The bottle said \u201ca capful\u201d. Elijah read it as a suggestion.</p>');},'bubble');});
 // candles
 [[-2.6,-2.3],[-2.2,-2.35],[.2,-2.3],[.4,-2.35],[-2.65,-.9],[-2.7,-1.4]].forEach(function(c){candle(c[0],.72,c[1]);});for(i=0;i<9;i++)candle(-3.6+i*.12,0,-3.2+(i%2)*.1);
 light('#ffa050',.8,4,-2.4,1,-2.2);light('#ffa050',.6,4,.3,1,-2.2);
 // champagne tray
 var tr=grp(.5,.72,-1.0);cyl(.25,.25,.02,mat('#c0c0c0',{m:.9,r:.2}),0,0,0,24,tr);var bt=cyl(.05,.06,.32,mat('#1a3a1a',{r:.2,m:.2}),-.1,.02,0,12,tr);var cork=cyl(.02,.02,.04,mat('#d9b07a'),-.1,.36,0,8,tr);var gl1=cyl(.03,.015,.18,mat('#f6e7a0',{t:.6,r:.05}),.08,.02,.05,10,tr),gl2=cyl(.03,.015,.18,mat('#f6e7a0',{t:.6,r:.05}),.12,.02,-.08,10,tr);
 var popped=false;tap(tr,function(){if(!popped){popped=true;cork.position.y=.9;burst(.25,3000,.6,2);setTimeout(function(){cork.visible=false;},300);toast('Pop! Two glasses, one for each.');secret('cork',null);}else{tone(1500,.4,'sine',.04);tone(1900,.4,'sine',.04,.05);toast('Clink.');}},'champagne');
 // letter
 var lt=note(-.4,.705,-.95,0,['Mara,','the water is ready...'],function(){card('A small letter by the bath',md((EXTRA.bath||'').replace(/^# .*\n/,'')),[],'Elijah to Mara');},null,{fs:30,wid:.3});lt.rotation.x=-PI/2+.2;
 // music: record player on a marble stand
 box(.6,.7,.45,mm,2.6,0,-2.9);solid(2.6,-2.9,.7,.55);var rp=recordPlayer(2.6,.7,-2.9);tap(rp,function(){rp.userData.spin=true;songList('Music for the bath',[RECBY.cherishtheday,RECBY.insidemylove,RECBY.reallylove,RECBY.debby,RECBY.peacepiece,RECBY.sarah].filter(Boolean),'something slow');},'record player');
 var mb=grp(1.6,.72,-1.0);box(.18,.12,.13,mat('#6b3d22'),0,0,0,mb);var bf=sph(.02,basic('#4a8aff'),0,.16,0,mb);anim(function(dt,t){if(mbTimer)bf.rotation.y+=dt*2;});box(.5,.72,.5,mm,1.6,0,-1.0);solid(1.6,-1,.6,.6);box(.5,.72,.5,mm,.5,0,-1.0);solid(.5,-1,.6,.6);
 tap(mb,function(){musicBox();toast('The music box plays a slow waltz.');},'music box');
 // towels + mirror
 var tw=box(.5,.7,.05,mat('#f4e4d0',{r:1}),3.9,1,-1.6);tw.rotation.y=-PI/2;
 var mr=plane(1,1.2,mat('#cfe0ea',{m:1,r:.05}),-1.2,2.2,-3.46,0);tap(mr,function(){if(count('bmir',3))secret('bmirror','Steam on the mirror','<p>The steam writes, one letter at a time, the way the misty window in the winter garden does: a heart, then a spiral like the one in your mother\u2019s painting.</p>');else toast('The mirror is fogged from the bath.');},'mirror');
}});

// ================= BEDROOM =================
defScene('bedroom',{name:'The bedroom',sub:'the cigarette after, I error you, Hallucinations of Love',bg:'#0e080c',amb:'rain',spawn:[4.2,1.5,PI/2],hemi:.35,build:function(){
 room(10,9,3.4,{fc:'#4a2c1a',wc:'#3a1e24',wmap:wallTex('#3a1e24','damask')});rug(4,3,'#2a0f18','#c8a24a',-.8,.6);
 door(4.94,1.5,-PI/2,'landing',[-3,0,-PI/2],'Gallery');
 light('#ff8a6a',.9,9,-1,2.6,0);
 // bed
 var bd=grp(-1.6,0,-2.6);var w=mat('#3a2010',{map:woodTex('#3a2010','10,5,2',3,[1,1])});box(2.2,.45,2.4,w,0,0,0,bd);box(2.1,.25,2.3,mat('#f4ece0',{r:1}),0,.45,0,bd);box(2.12,.12,1.5,mat('#7a1f30',{r:1}),0,.7,.38,bd);box(2.3,1.3,.12,w,0,0,-1.2,bd);box(.6,.18,.4,mat('#fff8ee',{r:1}),-.5,.72,-.85,bd);box(.6,.18,.4,mat('#fff8ee',{r:1}),.5,.72,-.85,bd);solid(-1.6,-2.6,2.3,2.5);
 tap(bd,function(){listMatch('Love scenes',/Mara und Elijah auf dem Sofa|morning scene|The Pull|happy ending|Locked In|Love Code/i,'from the saved notes');},'bed');
 // nightstand with ashtray + cigarette (The cigarette after)
 var ns=grp(.1,0,-3.5);box(.6,.6,.45,w,0,0,0,ns);solid(.1,-3.5,.65,.5);var ash=cyl(.09,.07,.03,mat('#9aa0a6',{m:.5,r:.3}),0,.6,0,16,ns);var cig=cyl(.008,.008,.12,mat('#f4f0e8'),0,.64,0,6,ns);cig.rotation.z=PI/2-.15;var ember=sph(.012,basic('#ff5a1a'),.06,.645,0,ns);
 var smoke=[];for(var i=0;i<8;i++)smoke.push(sph(.03,basic('#d8d8e0',{t:0}),.06,.66,0,ns));anim(function(dt,t){smoke.forEach(function(s,i){var k=(t*.25+i/8)%1;s.position.y=.66+k*1.1;s.position.x=.06+Math.sin(t*1.5+i)*.08*k;s.scale.setScalar(1+k*3);s.material.opacity=(1-k)*.25;});ember.material.color.setHSL(.04,1,.45+.15*Math.sin(t*3));});
 tap(ns,function(){listMatch('The cigarette after',/cigarette after/i,'every version that was saved');},'the cigarette after');
 var kd=koda(-.15,.6,-3.45,1);kodaTap(kd);
 // neon I error you
 var neonTxt=['I error you','I R U'];var nIdx=0;var neon=sign([neonTxt[0]],2.6,-1.6,2.6,-4.45,0,{fs:110,color:'#ff7aa8',glow:'#ff2a7a',w:900,italic:true});var nl=light('#ff4a8a',1.2,5,-1.6,2.5,-4);
 anim(function(dt,t){var f=(Math.sin(t*23)>.97)?.2:1;neon.material.opacity=f;nl.intensity=1.2*f;});neon.material.transparent=true;
 tap(neon,function(){if(count('neon',5)){secret('iru','I R U','<p>The neon flickers and comes back on as <b>I R U</b>. I are you.</p>');neon.material.map=textCanvas([neonTxt[++nIdx%2]],{fs:110,color:'#ff7aa8',glow:'#ff2a7a',w:900,italic:true});neon.material.needsUpdate=true;}else listMatch('I error you',/I error you|^Error|Hallucinations of Error|said and withdrawn/i,'kept the way they were said');},'I error you');
 // Hallucinations of Love framed
 var hl=grp(4.94,1.9,-2.2,-PI/2);var ht=textCanvas(['Hallucinations','of Love'],{fs:64,color:'#ffe9b0',glow:'#ffb04a',bg:'#1a1030',w:640,pad:40,italic:true,border:'#d4af37'});var asp=ht.image.height/ht.image.width;box(1.5,1.5*asp+.1,.04,mat('#d4af37',{m:.7,r:.3}),0,-(1.5*asp+.1)/2,0,hl);plane(1.4,1.4*asp,new THREE.MeshBasicMaterial({map:ht}),0,0,.03,0,hl);
 tap(hl,function(){card('Hallucinations of Love','<p>Every version that was saved, from the first reading to the beach.</p>',[{t:'Read them',fn:function(){listMatch('Hallucinations of Love',/Hallucinations of Love|Hallucinations of love|Additions during the reading of Hallucinations|Noir Hallucination|Hallucinated note/i);}},{t:'Walk to the beach edition',fn:function(){closeCard();go('garden',[-14,-3.5,PI]);}}]);},'Hallucinations of Love');
 // record player: most talked-about songs
 box(.8,.75,.45,w,3.6,0,-4.1);solid(3.6,-4.1,.85,.5);var rp=recordPlayer(3.6,.75,-4.1);
 tap(rp,function(){rp.userData.spin=true;songList('The songs we talked about most',TALKED,'tap one to play it');},'record player');
 // window with rain + moon
 plane(1.6,1.6,basic('#141c34'),-4.96,1.8,1,PI/2);sph(.12,basic('#fff6d0'),-4.98,2.2,1.3);
 var cand=candle(.1,0,1);var cand2=candle(-3.6,0,2.8);
 plant(4.3,3.9,1.1);armchair(-3.6,3.5,PI*.85,'#4a1a2a');solid(-3.6,3.5,1,.9);
}});
