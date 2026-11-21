
// ---------- hints: a soft sparkle on every secret, and the little book of hints ----------
var SPARKTEX=null;
function sparkTex(){if(SPARKTEX)return SPARKTEX;var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d');
 var r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.18,'rgba(255,240,200,.85)');r.addColorStop(.5,'rgba(255,215,150,.22)');r.addColorStop(1,'rgba(255,200,140,0)');g.fillStyle=r;g.fillRect(0,0,64,64);
 g.fillStyle='rgba(255,250,235,.9)';g.beginPath();g.moveTo(32,2);g.lineTo(35,29);g.lineTo(62,32);g.lineTo(35,35);g.lineTo(32,62);g.lineTo(29,35);g.lineTo(2,32);g.lineTo(29,29);g.closePath();g.fill();
 SPARKTEX=new THREE.CanvasTexture(c);return SPARKTEX;}
function hintFound(ids){for(var i=0;i<ids.length;i++)if(!found[ids[i]])return false;return true;}
function hint(obj,id,o){o=o||{};var ids=[].concat(id);var grpS=null,sps=[],ready=false,box=new THREE.Box3(),ws=new THREE.Vector3(),pt=new THREE.Vector3(),size=new THREE.Vector3();
 var m=new THREE.SpriteMaterial({map:sparkTex(),color:o.color||'#fff1cc',transparent:true,opacity:.8,depthWrite:false,blending:THREE.AdditiveBlending});
 function place(s){var b=box,face=Math.floor(Math.random()*6),ax=face>>1;pt.set(rnd(b.min.x,b.max.x),rnd(b.min.y,b.max.y),rnd(b.min.z,b.max.z));pt.setComponent(ax,face&1?b.max.getComponent(ax):b.min.getComponent(ax));obj.worldToLocal(pt);s.position.copy(pt);}
 function setup(){obj.updateWorldMatrix(true,true);box.setFromObject(obj);if(box.isEmpty())return;box.getSize(size);var pad=Math.max(.06,Math.min(size.x,size.y,size.z)*.08);
  var mn=.12;if(size.x<mn){box.min.x-=(mn-size.x)/2;box.max.x+=(mn-size.x)/2;}if(size.y<mn){box.min.y-=(mn-size.y)/2;box.max.y+=(mn-size.y)/2;}if(size.z<mn){box.min.z-=(mn-size.z)/2;box.max.z+=(mn-size.z)/2;}box.expandByScalar(pad);box.getSize(size);
  obj.getWorldScale(ws);var sc=Math.abs(ws.x)||1;var diag=size.length();var n=o.n||Math.max(3,Math.min(9,Math.round(diag*2.2)));var base=Math.max(.07,Math.min(.2,diag*.07));
  grpS=new THREE.Group();grpS.raycast=function(){};obj.add(grpS);
  for(var i=0;i<n;i++){var s=new THREE.Sprite(m);s.raycast=function(){};s.userData={p:Math.random()*PI*2,sp:rnd(.9,1.6),b:base/sc,up:false};place(s);s.scale.set(0,0,1);grpS.add(s);sps.push(s);}ready=true;}
 anim(function(dt,t){var gone=hintFound(ids)||(o.done&&o.done());if(gone){if(grpS)grpS.visible=false;return;}if(!ready){setup();if(!ready)return;}grpS.visible=true;
  for(var i=0;i<sps.length;i++){var s=sps[i],u=s.userData,v=Math.sin(t*u.sp+u.p);if(v<=0){if(u.up){u.up=false;place(s);}s.scale.set(0,0,1);continue;}u.up=true;var k=u.b*Math.pow(v,1.5);s.scale.set(k,k,1);}
  m.opacity=.6+.2*Math.sin(t*1.3);});}
function hintRefresh(){var a=$('c983'),b=$('clap');if(a)a.classList.toggle('lmhint',!found['983']);if(b)b.classList.toggle('lmhint',!found['clap100']);}
var HINTS=[
 ['The front hall',[['zipcoat','The smallest coat on the rack is red, and it belongs to Zip. Touch it three times.'],['mirror','Mirrors like attention. Look into the hall mirror four times.']]],
 ['The kitchen',[['fridge','Magnets wait on the cold white door. Tap the fridge three times.']]],
 ['The library',[['ghostvow','Some pages refuse to burn. Tap the fireplace four times.'],['margin','Someone wrote in the margins, up on the top shelf. Tap the ladder twice.']]],
 ['The butterfly nook, off the library',[['nookbf','Let the butterfly leave the spiral three times. Tap the painting, wait until it settles back, then tap again. On the third flight, watch where it rests.']]],
 ['Wherever Koda sits: on the post in the garden, in the bedroom, or in the butterfly nook',[['koda','A small bear in a pink FEEL BETTER jumper. Give him three taps.']]],
 ['The record shop',[['jay','A black cat dozes on the counter. Wake Screaming Jay with three taps.'],['sock','Six records and one lost sock. Tap the red box of socks three times.']]],
 ['The jazz club',[['jcandle','One small table stands in the corner with its candle burning low. Tap that table twice.'],['nachklang','A blue word hums over the room. Tap the Nachklang sign three times.']]],
 ['The cinema',[['popcorn','The red machine always makes more. Tap the popcorn machine three times.']]],
 ['The White Noise Cathedral',[['983','Tap the radio, then hold the dial at 98.3% with its own button.'],['clap100','Tap the radio, slide all the way up to 100%, then clap, and listen for the echo that never comes.']]],
 ['The update gallery, upstairs',[['lwin','The moon in the window is not quite still. Tap the window three times.']]],
 ['The marble bath',[['bubbles','Forty bubbles float in the tub. Pop every single one.'],['cork','Two glasses are waiting. Tap the champagne.'],['bmirror','Steam has fogged the mirror. Tap it three times.']]],
 ['The bedroom',[['iru','The pink neon says I error you. Tap it five times.']]],
 ['The room of yes and no',[['rose','Halfway between yes and no stands a rose. Tap it five times and let it grow.']]],
 ['Mara and Elijah\u2019s letters',[['ink','Blue-black ink and a quill on the desk. Tap the ink pot three times.']]],
 ['The children\u2019s room',[['easel','Every child paints a different paradise. Tap the easel four times.'],['dollhouse','The little apartment has a roof that lifts. Tap the dollhouse roof three times.']]],
 ['The star room',[['candles','Seven wicks, all dark. Light every one of them.']]],
 ['The garden',[['roses','Walk the rose path and touch the rose bushes, eight times in all.'],['pool','Trail your hand through the pool. Tap the water four times.']]],
 ['The beach',[['hall10','Glowing jellyfish drift above the shore. Tap them ten times in all, or keep asking for another.'],['bouquet','At the white wedding arch, throw the bouquet.'],['shell','Shells lie along the sand. Pick up six, and hold the last one to your ear.']]],
 ['The cigarette after hill',[['hill','A lantern stands at the top. Tap it three times.']]],
 ['The crochet room',[['rounds','The piece on the armchair wants more rounds. Tap it six times.']]]];
function openHintBook(){var n=Object.keys(found).filter(function(k){return SECRETS[k];}).length,tot=Object.keys(SECRETS).length;
 card('The little book of hints','',[],n+' of '+tot+' found');var B=$('cB');
 var p=document.createElement('p');p.style.cssText='margin:0 0 8px';p.textContent='A soft sparkle sits on everything that still hides a surprise. It goes out once you have found it.';B.appendChild(p);
 HINTS.forEach(function(g){var h=document.createElement('h5');h.textContent=g[0];B.appendChild(h);g[1].forEach(function(e){var f=!!found[e[0]];var d=document.createElement('div');d.className='item';d.style.cssText=f?'opacity:.7':'';
  var b=document.createElement('b');b.style.cssText='font-weight:normal;font-style:italic';b.textContent=e[1];var s=document.createElement('span');s.textContent=f?'\u2726 found':'not yet';if(f)s.style.color='#a0742a';d.appendChild(b);d.appendChild(s);B.appendChild(d);});});}
function hintBook(){var hb=grp(2.5,0,-2.1);cyl(.28,.3,.7,mat('#4a2c1a',{map:woodTex('#4a2c1a','20,10,4',2,[1,1])}),0,0,0,16,hb);var bk=box(.34,.07,.26,mat('#2f5a4a',{r:.6}),0,.7,0,hb);bk.rotation.y=.4;box(.3,.075,.22,basic('#f6ecd8'),.0,.7,.0,hb).rotation.y=.4;
 solid(2.5,-2.1,.6,.6);light('#ffe0a0',.5,2.5,2.5,1.4,-2.1);sign(['The little book','of hints'],.6,2.5,1.15,-2.1,PI/2,{fs:40,color:'#5a2230',bg:'#f6ecd8',w:500,pad:10});
 tap(hb,openHintBook,'the little book of hints');}
