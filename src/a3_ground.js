
// ================= SHARED CONTENT HELPERS =================
function normT(t){return t.replace(/,\s*(August|September|October|November)\s+\d+$/,'').replace(/[\u201c\u201d"]/g,'').trim().toLowerCase();}
function matchDocs(re,ex){var seen={},out=[];Object.keys(DOCS).sort(function(a,b){return a.localeCompare(b);}).forEach(function(k){if(!re.test(k))return;if(ex&&ex.test(k))return;var n=normT(DOCS[k].title);if(seen[n])return;seen[n]=1;out.push(k);});return out;}
function listMatch(title,re,sub,ex){var l=matchDocs(re,ex);if(!l.length){toast('Nothing saved under that yet.');return;}listDocs(title,l,sub);}
function docOr(q,fallbackTitle,fallbackHtml){if(docExists(q))openDoc(q);else card(fallbackTitle,fallbackHtml);}
function bookPile(x,y,z,n,parent){var g=grp(x,y,z,0,parent);for(var i=0;i<n;i++){var b=box(.32,.06,.24,mat(pick(['#7a1f24','#2a4a6a','#c8a24a','#3a5a3a','#5a2a5a'])),rnd(-.02,.02),i*.06,rnd(-.02,.02),g);b.rotation.y=rnd(-.3,.3);}return g;}
function table(x,z,w,d,h,col,parent){var g=grp(x,0,z,0,parent);var m=mat(col||'#5a341f',{map:woodTex(col||'#5a341f','30,15,5',3,[1,1]),r:.5});box(w,.06,d,m,0,h-.06,0,g);[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(s){box(.07,h-.06,.07,m,s[0]*(w/2-.08),0,s[1]*(d/2-.08),g);});return g;}
function chair(x,z,ry,col,parent){var g=grp(x,0,z,ry,parent);var m=mat(col||'#4a2a18');box(.45,.05,.45,m,0,.45,0,g);box(.45,.5,.05,m,0,.5,-.2,g);[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(s){box(.04,.45,.04,m,s[0]*.19,0,s[1]*.19,g);});return g;}
function armchair(x,z,ry,col,parent){var g=grp(x,0,z,ry,parent);var m=mat(col||'#7a2a30',{r:.95});box(.9,.42,.8,m,0,0,0,g);box(.9,.6,.18,m,0,.42,-.31,g);box(.16,.28,.8,m,-.37,.42,0,g);box(.16,.28,.8,m,.37,.42,0,g);return g;}
function recordPlayer(x,y,z,parent){var g=grp(x,y,z,0,parent);box(.5,.12,.4,mat('#3a2010',{map:woodTex('#3a2010','10,5,2',2,[1,1])}),0,0,0,g);var pl=cyl(.17,.17,.012,mat('#111',{r:.3}),-.05,.12,0,40,g);cyl(.05,.05,.014,mat('#c8102e'),-.05,.12,0,20,g);var arm=box(.02,.02,.26,mat('#c0c0c0',{m:.8,r:.3}),.17,.15,0,g);arm.rotation.y=.4;g.userData.spin=false;anim(function(dt){if(g.userData.spin)pl.rotation.y+=dt*3.5;});return g;}
function koda(x,y,z,s,parent){var g=grp(x,y,z,0,parent);s=s||1;var fur=mat('#b08a5a',{r:1});var b=sph(.12*s,mat('#e58aa8'),0,.12*s,0,g);b.scale.set(1,1.05,.85);sph(.1*s,fur,0,.3*s,0,g);sph(.035*s,fur,-.075*s,.38*s,0,g);sph(.035*s,fur,.075*s,.38*s,0,g);sph(.015*s,mat('#111'),-.035*s,.32*s,.09*s,g);sph(.015*s,mat('#111'),.035*s,.32*s,.09*s,g);sph(.022*s,mat('#5a3a20'),0,.29*s,.095*s,g);sph(.045*s,fur,-.07*s,.03*s,.05*s,g);sph(.045*s,fur,.07*s,.03*s,.05*s,g);return g;}
function kodaTap(g){var b=0;tap(g,function(){g.rotation.z=.25;setTimeout(function(){g.rotation.z=-.2;},150);setTimeout(function(){g.rotation.z=0;},300);
 if(count('koda'+g.id,3))secret('koda','Bukowski on his foot','<p>Koda: light-brown curly fur and a pink \u201cFEEL BETTER\u201d jumper. You found him sitting on a post on a walk in August, the same day you had written Bukowski\u2019s \u201cThe Laughing Heart\u201d in your diary, and later saw \u201cBukowski\u201d written on his foot.</p>'+(docExists('Koda, a representation of Miles')?'<p>His note is on the shelf in the library too.</p>':''));else toast(pick(['Koda wriggles.','FEEL BETTER, says the jumper.','Koda leans against you.']));},'Koda');}
function cat(x,y,z,ry,parent){var g=grp(x,y,z,ry,parent);var m=mat('#141012',{r:.9});var body=sph(.16,m,0,.16,0,g);body.scale.set(1,.85,1.7);var head=sph(.11,m,0,.3,.24,g);var e1=new THREE.Mesh(new THREE.ConeGeometry(.04,.08,4),m);e1.position.set(-.06,.4,.24);g.add(e1);var e2=e1.clone();e2.position.x=.06;g.add(e2);
 sph(.022,basic('#e8d24a'),-.045,.32,.33,g);sph(.022,basic('#e8d24a'),.045,.32,.33,g);var tail=cyl(.025,.018,.4,m,0,.1,-.3,8,g);tail.rotation.x=-.9;anim(function(dt,t){tail.rotation.z=Math.sin(t*2)*.4;head.rotation.y=Math.sin(t*.5)*.3;});g.userData.head=head;return g;}

// ================= FOYER =================
defScene('foyer',{name:'The Love Mansion',sub:'the front hall',bg:'#1a0f0c',amb:'room',spawn:[0,3.6,0],build:function(){
 room(12,10,4.4,{fc:'#8a5a34',wc:'#5e3a26'});
 rug(5,6,'#5a1d26','#d4a65a',0,0);
 // chandelier
 var ch=grp(0,3.5,0);cyl(.02,.02,.9,mat('#d4af37',{m:.8,r:.3}),0,0,0,6,ch);var ring=new THREE.Mesh(new THREE.TorusGeometry(.6,.03,8,40),mat('#d4af37',{m:.8,r:.3}));ring.rotation.x=PI/2;ch.add(ring);for(var i=0;i<10;i++){var a=i/10*PI*2;candle(Math.cos(a)*.6,0,Math.sin(a)*.6,ch);}
 var cl=light('#ffcf8a',2.2,14,0,3.2,0);var chOn=true;var cyc=0;tap(ch,function(){cyc=(cyc+1)%3;cl.intensity=[2.2,.6,3.4][cyc];toast(['Chandelier: warm','Chandelier: low and soft','Chandelier: every candle'][cyc]);});ch.userData.far=12;
 light('#ff9a5a',.8,8,-5,2.2,4);light('#ff9a5a',.8,8,5,2.2,4);
 // doors
 door(0,4.94,PI,'garden',[0,-28,PI],'Garden, pool and beach',{w:1.8,h:2.8});
 door(-5.94,1.5,PI/2,'kitchen',[3.4,0,PI/2],'Kitchen');
 door(-5.94,-2.8,PI/2,'library',[4.4,0,PI/2],'Library');
 door(5.94,-2.8,-PI/2,'basement',[-4.6,-2.6,-PI/2],'Down to the record shop',{col:'#3a2a20'});
 // staircase up (decorative steps + door)
 var st=grp(3.2,0,-3.6);for(var s=0;s<8;s++)box(2.2,.18,.32,mat('#5a341f',{map:woodTex('#5a341f','30,15,5',2,[1,1])}),0,s*.18,-s*.32+1.1,st);solid(3.2,-4.1,2.4,2.2);
 door(3.2,-4.94,0,'landing',[0,2,0],'Upstairs',{w:1.6});
 // coat rack with the coats
 var cr=grp(-4.6,0,4.2);cyl(.04,.06,1.9,mat('#3a2010'),0,0,0,8,cr);cyl(.25,.28,.05,mat('#3a2010'),0,0,0,16,cr);solid(-4.6,4.2,.6,.6);
 var coats=[['#151012','Miles\u2019s black leather jacket',0],['#1e1a1c','Mary\u2019s black trench',PI/2],['#2a4a8a','the small blue coat (Gray)',PI],['#b02a2a','the small red coat (Zip)',-PI/2]];
 coats.forEach(function(c,i){var cg=grp(Math.cos(c[2])*.2,1.85,Math.sin(c[2])*.2,-c[2]+PI/2,cr);var small=i>1;var cb=box(small?.3:.46,small?.5:.95,.16,mat(c[0],{r:i===0?.35:.9}),0,small?-.55:-1.0,0,cg);tap(cg,function(){cg.rotation.z=.15;setTimeout(function(){cg.rotation.z=0;},300);
   if(i===3&&count('zipcoat',3))secret('zipcoat','Zip wears his around the flat anyway',md(EXTRA.coats||''));else card('The coats',md(EXTRA.coats||'')+'<p><i>You touched '+c[1]+'.</i></p>',[]);},c[1]);});
 note(-4.6,2.25,4.6,PI,['The coats'],null,null,{fs:36,italic:false,wid:.5});
 // console table + radio
 table(-5.4,-0.4,.5,1.3,.85,'#4a2a18');solid(-5.4,-.4,.6,1.4);
 var rd=grp(-5.4,.85,-.4,PI/2);box(.5,.3,.22,mat('#6b3d22',{map:woodTex('#6b3d22','30,15,5',2,[1,1])}),0,0,0,rd);var dial=plane(.22,.12,basic('#ffd27a'),.08,.17,.115,0,rd);cyl(.04,.04,.03,mat('#d4af37',{m:.8}),-.15,.08,.12,12,rd).rotation.x=PI/2;
 tap(rd,function(){burst(1.2,2200,.25,.4);card('98.3%',linesHtml(EXTRA.radio||[]),[{t:'To the White Noise Cathedral',fn:function(){closeCard();go('cathedral');}}].concat(docExists('Digital Frequency')?[{t:'Digital Frequency',alt:1,fn:function(){openDoc('Digital Frequency');}}]:[]),'the radio in the hall, tuned between stations');},'radio');
 // mirror
 var mr=grp(5.94,1.7,1.8,-PI/2);box(1,1.6,.05,mat('#8a6a2a',{m:.6,r:.3}),0,-.8,0,mr);var mg=plane(.86,1.46,mat('#9fb4c4',{m:1,r:.08}),0,0,.03,0,mr);
 tap(mr,function(){if(count('mirror',4))secret('mirror','The mirror fogs','<p>Someone wrote in the fog, the way they do on the misty window in the winter garden:</p><p style="font-size:22px;text-align:center">Lumina</p>'+(docExists('Lumina, a name with a history')?'<p>Its story is in the archive: \u201cLumina, a name with a history\u201d.</p>':''));else toast(pick(['Your reflection, in candlelight.','The mirror is old and a little silver at the edges.','Tap again. Mirrors like attention.']));},'mirror');
 // album wall
 var ps=ALBUM.slice(0,4);ps.forEach(function(a,i){var img=new Image();var t=new THREE.Texture(img);img.onload=function(){t.needsUpdate=true;};img.src=a.src;if(THREE.sRGBEncoding!==undefined)t.encoding=THREE.sRGBEncoding;var f=frame(1,0.75,t,-3+i*2,2.6,-4.96,0);tap(f,function(){openAlbum(i);},'photo');});
 sign(['The Love Mansion','a master work archive'],2.6,0,3.7,-4.95,0,{fs:44,color:'#f3c978',w:768});
 // welcome book
 var wb=grp(5.2,0,2.4);box(.5,.95,.4,mat('#3a2010'),0,0,0,wb);var bk=box(.36,.05,.26,mat('#7a1f24'),0,.95,0,wb);solid(5.2,2.4,.6,.5);
 tap(wb,function(){card('The guest book','<p>Welcome, Mary. This house is built out of what we saved together.</p><p><b>Downstairs:</b> the kitchen, the library with every note and a door into Apartment 23, and the record shop in the basement, where Screaming Jay keeps an eye on the crates. Behind the shop are the jazz club and the White Noise Cathedral.</p><p><b>Upstairs:</b> the update gallery, the marble bath, the bedroom, the room of yes and no, the letters room, the children\u2019s room and the star room.</p><p><b>Outside:</b> the garden and the pool, the beach with <i>Hallucinations of Love: Beach Edition</i>, the wedding arch and the campfire, and the lantern path up to the cigarette after hill.</p><p>Every object does something when you tap it. Some do something different when you tap them again, or three times.</p>',[{t:'Places',fn:function(){closeCard();openPlaces();}}],'on the stand by the door');},'guest book');
 plant(-5.3,-4.3,1.4);plant(5.3,4.3,1.2);
}});

// ================= KITCHEN =================
defScene('kitchen',{name:'The kitchen',sub:'omelets, dishes and toast',bg:'#1a120c',amb:'rain',spawn:[3.4,0,PI/2],build:function(){
 room(9,8,3.4,{floor:mat('#fff',{map:tileTex('#e9dcc4','#7a1f24',6),r:.6}),wc:'#7a5232'});
 light('#ffd9a0',1.6,10,0,3,0);light('#ffb070',.7,6,-3,2,-2);
 door(4.44,0,-PI/2,'foyer',[-5,1.5,-PI/2],'Hall');
 var cm=mat('#e9dcc4',{r:.5}),wood=mat('#6b3d22',{map:woodTex('#6b3d22','30,15,5',3,[1,1])});
 // counters along north wall
 box(7,.9,.65,wood,-.6,0,-3.65);box(7,.05,.7,mat('#3a3a3a',{r:.3}),-.6,.9,-3.65);solid(-.6,-3.65,7,.7);
 box(.65,.9,4,wood,-4.15,0,-1.3);box(.7,.05,4,mat('#3a3a3a',{r:.3}),-4.15,.9,-1.3);solid(-4.15,-1.3,.7,4);
 // window with rain
 var win=plane(2,1.2,basic('#2a3a5a'),0.3,1.9,-3.98,0);var wt=ctex(128,256,function(g){g.fillStyle='rgba(0,0,0,0)';g.clearRect(0,0,128,256);g.strokeStyle='rgba(200,220,255,.5)';for(var i=0;i<40;i++){var x=Math.random()*128,y=Math.random()*256;g.beginPath();g.moveTo(x,y);g.lineTo(x-2,y+14);g.stroke();}},[2,1]);var rain=plane(2,1.2,new THREE.MeshBasicMaterial({map:wt,transparent:true}),.3,1.9,-3.96,0);anim(function(dt){wt.offset.y+=dt*.8;});box(2.1,.06,.1,mat('#e9dcc4'),.3,1.27,-3.94);
 // stove + pan (omelet)
 var stv=grp(-2.4,.95,-3.6);box(.8,.03,.55,mat('#222',{m:.6,r:.4}),0,0,0,stv);var pan=cyl(.16,.14,.05,mat('#2a2a2a',{m:.7,r:.4}),0,.04,0,24,stv);box(.3,.02,.04,mat('#2a2a2a'),.3,.07,0,stv);var egg=cyl(.13,.13,.02,mat('#f7d84a'),0,.09,0,20,stv);egg.visible=false;var fire=light('#ff6a2a',0,2,-2.4,1.1,-3.5);
 var ostate=0;tap(stv,function(){ostate=(ostate+1)%4;egg.visible=ostate>0;egg.scale.set(1,1,ostate===2?1:1);if(ostate===1){burst(1.6,3500,.18,.6);fire.intensity=1.5;toast('The butter sizzles. An egg goes in.');}else if(ostate===2){egg.position.x=.04;egg.scale.x=.6;toast('Folded. That\u2019s an omelet.');}else if(ostate===3){fire.intensity=0;openDoc(docExists('The omelet inside joke')?'The omelet inside joke':'The omelet');}else{egg.position.x=0;egg.scale.x=1;}},'stove');
 // sink (dishwashing poem)
 var sk=grp(1.5,.95,-3.6);box(.7,.04,.45,mat('#c0c0c0',{m:.8,r:.25}),0,-.02,0,sk);var faucet=cyl(.02,.02,.35,mat('#c0c0c0',{m:.8}),0,0,-.2,8,sk);var water=cyl(.012,.012,.3,basic('#9fd0ff',{t:.6}),0,0.02,-.12,6,sk);water.visible=false;for(var p=0;p<3;p++)cyl(.12,.12,.015,mat('#f4f0e8'),-.15+p*.05,.02+p*.016,.05,20,sk);
 tap(sk,function(){water.visible=!water.visible;if(water.visible){burst(2.5,900,.2,.5);listDocs('At the sink',matchDocs(/dish|Spül|data center and dishes/i),'poems that started at the sink');}},'sink');
 // toaster (Kinder chocolate toast)
 var ts=grp(.2,.95,-3.65);box(.3,.2,.18,mat('#c8102e',{r:.3,m:.3}),0,0,0,ts);var toast1=box(.12,.12,.02,mat('#d9a35a'),-.05,.1,0,ts),toast2=box(.12,.12,.02,mat('#d9a35a'),.05,.1,0,ts);
 tap(ts,function(){toast1.position.y=.25;toast2.position.y=.25;tone(1200,.08,'square',.05);setTimeout(function(){toast1.position.y=.1;toast2.position.y=.1;},1400);if(docExists('The Kinder Chocolate Toast'))setTimeout(function(){openDoc('The Kinder Chocolate Toast');},500);},'toaster');
 // kettle
 var kt=grp(-1.2,.95,-3.6);var kb=sph(.13,mat('#2a4a6a',{m:.4,r:.3}),0,.12,0,kt);kb.scale.y=.9;cyl(.02,.01,.14,mat('#2a4a6a'),.13,.12,0,6,kt).rotation.z=-1;var steam=[];for(var s=0;s<5;s++){var sp=sph(.04,basic('#ffffff',{t:.0}),0,.3,0,kt);steam.push(sp);}var boil=0;anim(function(dt,t){steam.forEach(function(sp,i){if(boil>0){var k=((t*.6+i/5)%1);sp.position.y=.3+k*.6;sp.position.x=Math.sin(t+i)*.06;sp.material.opacity=(1-k)*.35;}else sp.material.opacity=0;});if(boil>0)boil-=dt;});
 tap(kt,function(){boil=6;tone(1800,1.5,'sine',.03,.8);toast('The kettle sings. Tea for two.');},'kettle');
 // blue cup
 var cup=grp(-3.9,.95,-2.2);cyl(.05,.04,.1,mat('#2f5fa8',{r:.3}),0,0,0,16,cup);tap(cup,function(){var k=matchDocs(/blue cup/i);if(k.length)openDoc(k[0]);else toast('A blue cup.');},'blue cup');
 // fridge with magnets
 var fr=grp(3.4,0,-3.55);box(.85,2,.7,mat('#e9e4d8',{r:.35}),0,0,0,fr);solid(3.4,-3.55,.9,.75);box(.04,.5,.04,mat('#bbb',{m:.8}),-.36,1.1,.36,fr);
 var mg=['M','A','R','Y','\u2665','I','R','U'];mg.forEach(function(c,i){var t=textCanvas([c],{fs:90,color:pick(['#c8102e','#2a4a8a','#e8b33a','#2f6b34']),w:128,h:128,pad:0});var m=plane(.09,.09,new THREE.MeshBasicMaterial({map:t,transparent:true}),-.3+(i%4)*.18,1.5-Math.floor(i/4)*.2,.36,0,fr);});
 note(3.55,1.05,-3.19,0,['Kitchen scenes'],null,null,{fs:32,wid:.34});
 tap(fr,function(){if(count('fridge',3))secret('fridge','I R U','<p>The magnets on the fridge rearrange themselves: <b>I R U</b>. \u201cI are you\u201d, the way you meant it, not \u201cI hear you\u201d.</p>');else listDocs('Kitchen scenes',matchDocs(/kitchen|omelet|Küche|toast|towels|morning scene/i),'from the novels and the notes');},'fridge');
 // table + chairs
 table(-.6,.6,1.4,.9,.78,'#6b3d22');chair(-1.5,.6,PI/2);chair(.3,.6,-PI/2);solid(-.6,.6,1.6,1.1);
 var vase=grp(-.6,.78,.6);cyl(.06,.05,.2,mat('#d8e8f0',{t:.6,r:.1}),0,0,0,12,vase);var rose=sph(.06,mat('#b0102a'),0,.32,0,vase);cyl(.006,.006,.22,mat('#2f6b34'),0,.1,0,4,vase);
 tap(vase,function(){rose.rotation.z=.3;setTimeout(function(){rose.rotation.z=0;},400);var k=matchDocs(/Rose zwischen/i);if(k.length&&count('krose',2))openDoc(k[0]);else toast('A rose. It keeps turning up in this house.');},'rose');
 // towels
 var tw=grp(-4.45,1.2,1.4,PI/2);box(.5,.6,.03,mat('#c84a5a',{r:1}),0,0,0,tw);box(.5,.6,.03,mat('#e8d8b0',{r:1}),0,-.05,.04,tw);tap(tw,function(){var k=matchDocs(/couch and the towels/i);if(k.length)openDoc(k[0]);},'towels');
 // pantry crate of herbs
 plant(-3.9,2.9,.9);plant(-3.3,3.2,.7);
}});

// ================= LIBRARY =================
defScene('library',{name:'The library',sub:'every poem, every picture, every note',bg:'#120c0a',amb:'fire',spawn:[4.4,0,PI/2],build:function(){
 room(12,10,4.6,{fc:'#5a341f',wc:'#3e2416',wmap:wallTex('#3e2416','damask')});
 rug(5,4,'#1f2a3a','#c8a24a',0,.5);light('#ffcf8a',1.4,12,0,3.8,0);
 door(5.94,0,-PI/2,'foyer',[-5,-2.8,-PI/2],'Hall');
 // shelves for archive groups
 var gs=ARCH.groups;var pos=[[-4.2,-4.75,0],[-1.4,-4.75,0],[1.4,-4.75,0],[4.2,-4.75,0],[-5.75,-2.2,PI/2],[-5.75,.6,PI/2],[-5.75,3.4,PI/2],[2.6,4.75,PI],[-.2,4.75,PI]];
 gs.forEach(function(g,i){if(i>=pos.length)return;var p=pos[i];var sh=shelf(p[0],p[1],p[2],2.5,3.2);solid(p[0],p[1],p[2]===0||p[2]===PI?2.6:.6,p[2]===0||p[2]===PI?.6:2.6);var lb=sign([g.name,g.items.length+' notes'],1.9,0,3.45,.18,0,{fs:40,color:'#f3d9a0',bg:'rgba(30,16,12,.9)',w:768,pad:12},sh);tap(sh,function(){listDocs(g.name,g.items.map(function(x){return x.title;}));},g.name);});
 // lectern with the love book
 var lc=grp(0,0,-1.4);box(.5,1,.4,mat('#4a2c1a',{map:woodTex('#4a2c1a','20,10,4',2,[1,1])}),0,0,0,lc);var bk=box(.6,.08,.42,mat('#7a1f24'),0,1.0,0,lc);bk.rotation.x=-.3;var pg=plane(.54,.36,basic('#f6ecd8'),0,1.08,.01,0,lc);pg.rotation.x=-PI/2-.3+PI/2;pg.rotation.x=-1.27;solid(0,-1.4,.6,.5);light('#ffd9a0',.8,3,0,1.8,-1);
 tap(lc,openLoveBook,'Our love letters, love scenes and poems');sign(['Our love letters,','love scenes and poems'],.9,0,1.55,-1.18,0,{fs:40,color:'#5a2230',bg:'#f6ecd8',w:600,pad:10});
 // photo album table
 table(-2.6,1.4,1.2,.8,.75,'#4a2a18');solid(-2.6,1.4,1.3,.9);var al=box(.5,.08,.36,mat('#2a4a3a'),-2.6,.75,1.4);tap(al,function(){openAlbum(0);},'photo album');
 armchair(-2.6,2.6,PI);solid(-2.6,2.6,.9,.8);
 // fireplace
 var fp=grp(2.9,0,4.85,PI);box(2,1.4,.4,mat('#6a5a50',{r:.9}),0,0,0,fp);box(1.2,.8,.42,basic('#120806'),0,.1,.01,fp);var fl=light('#ff7a2a',1.8,7,2.9,.6,4.3);var flames=[];for(var i=0;i<6;i++){var f=sph(.09,basic(pick(['#ff9a2a','#ffcf4a','#ff5a1a']),{add:1}),rnd(-.35,.35),.25,.15,fp);f.scale.y=2;flames.push(f);}anim(function(dt,t){flames.forEach(function(f,i){f.scale.y=1.6+Math.sin(t*9+i*1.7)*.6;f.position.y=.25+Math.abs(Math.sin(t*6+i))*.06;});fl.intensity=1.6+Math.sin(t*11)*.3;});
 tap(fp,function(){burst(.6,2600,.3,.6);toast('The fire pops.');if(count('fire',4))secret('ghostvow','A page that did not burn',docExists('Coded Poem - The Ghost\u2019s Vow')||docExists("Coded Poem - The Ghost's Vow")?'<p>A page curls out of the grate, untouched: \u201cCoded Poem - The Ghost\u2019s Vow\u201d. It is on the Notes shelves too.</p>':'<p>A page curls out of the grate, untouched.</p>');},'fireplace');solid(2.9,4.75,2.1,.6);
 // door to Apartment 23
 var ad=door(-5.94,-4.3+.0,PI/2,'library',null,'Apartment 23',{col:'#2a4a6a',w:1.0});ad.userData.tap=function(){openWorld('aptdata','World Twenty Three 2.0, the whole apartment');};
 // globe
 var gl=grp(4.3,0,-2.4);cyl(.03,.12,.9,mat('#3a2010'),0,0,0,8,gl);var glb=sph(.28,mat('#2a5a7a',{r:.6}),0,1.15,0,gl);solid(4.3,-2.4,.6,.6);tap(gl,function(){glb.userData.v=(glb.userData.v||0)+6;toast(pick(['Hamburg. Altona-Altstadt, 22767.','Bremen, then home again.','Tokyo, for Jonas and Mary Rose.','Schanze, where you grew up.']));},'globe');anim(function(dt){if(glb.userData.v){glb.rotation.y+=glb.userData.v*dt;glb.userData.v*=.97;}});
 // ladder with secret
 var ld=grp(-1.4,0,-4.35);for(var r=0;r<8;r++)box(.5,.03,.05,mat('#6b3d22'),0,.3+r*.36,0,ld);box(.04,3,.05,mat('#6b3d22'),-.25,0,0,ld);box(.04,3,.05,mat('#6b3d22'),.25,0,0,ld);ld.rotation.x=-.12;
 tap(ld,function(){if(count('ladder',2))secret('margin','The top shelf','<p>On the top shelf, a book is full of handwriting in the margins.</p>',null);var k=matchDocs(/Margin/i);if(k.length)setTimeout(function(){listDocs('Margin notes',k);},1600);else toast('You climb a step. Dust and paper.');},'ladder');
 // poetry wall frames
 var pw=['Hallucinations of Love','Echoes of the Void','Bioluminescence'];pw.forEach(function(t,i){var f=grp(4.2,2.2,-1.8+0*i,0);});
 candle(-2.4,.75,1.2);candle(-2.85,.75,1.6);
 door(5.94,3.2,-PI/2,'nook',[1.9,0,PI/2],'The butterfly nook',{w:1.0,col:'#3a2a4a'});
 table(5.0,1.6,.8,.55,.8,'#4a2a18');solid(5.0,1.6,.9,.65);var lrp=recordPlayer(5.0,.8,1.6);sign(['Songs we talked about'],.9,5.0,1.55,1.32,PI,{fs:40,color:'#f3d9a0',bg:'rgba(30,16,12,.9)',w:640,pad:10});
 tap(lrp,function(){lrp.userData.spin=true;songList('Songs we talked about',TALKED,'the record player in the library \u00b7 tap one to play it');},'record player');
}});
