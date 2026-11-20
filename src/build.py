import json, re, os
H = os.path.dirname(os.path.abspath(__file__))
S = '/home/sprite'
def emb(obj):
    return json.dumps(obj, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
def rd(p):
    return open(p, encoding='utf-8').read()
t = rd(os.path.join(H, 'template.html'))
parts = {}
app = ''.join(rd(os.path.join(H, f)) for f in ['a1_core.js', 'a2_engine.js', 'a3_ground.js', 'a4_basement.js', 'a5_upstairs.js', 'a6_rooms.js', 'a7_outdoor.js', 'a9_new.js', 'a8_main.js'])
love = json.load(open(os.path.join(H, 'txtpieces.json')))
rep = {
    '__APT__': emb(rd(S + '/world-twenty-three-2.html')),
    '__BEACHORIG__': emb(rd(S + '/hallucination-of-love-beach-edition.html')),
    '__JAZZORIG__': emb(rd(S + '/the-digital-jazz-club.html')),
    '__ECHOORIG__': emb(rd(S + '/the-room-between-the-echoes.html')),
    '__LOVE__': emb(love),
    '__MUSIC__': emb(json.load(open(os.path.join(H, 'music.json')))),
    '__BEACH__': emb(json.load(open(os.path.join(H, 'beach_lines.json')))),
    '__EXTRA__': emb(json.load(open(os.path.join(H, 'extra.json')))),
}
three = rd(os.path.join(H, 'three.min.js')).replace('</script', '<\\/script')
appj = app.replace('</script', '<\\/script')
import re as _re
def sub(m):
    k = m.group(0)
    if k == '@@THREE_LIB@@': return three
    if k == '@@LM_APP@@': return appj
    return rep[k]
t = _re.sub(r'@@THREE_LIB@@|@@LM_APP@@|__APT__|__BEACHORIG__|__JAZZORIG__|__ECHOORIG__|__LOVE__|__MUSIC__|__BEACH__|__EXTRA__', sub, t)
out = S + '/the-love-mansion.html'
open(out, 'w', encoding='utf-8').write(t)
print(out, len(t.encode('utf-8')))
