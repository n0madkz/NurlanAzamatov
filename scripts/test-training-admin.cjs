const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const net=require('node:net');
const {spawn}=require('node:child_process');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'training-admin-test-'));
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const request=async(url,options={})=>{
  const response=await fetch(url,{...options,headers:{...options.headers,Connection:'close'}});
  const body=await response.text();
  return {status:response.status,headers:response.headers,text:async()=>body};
};
let server;
(async()=>{
  for(const name of fs.readdirSync(root)) if(name.endsWith('.php')&&name!=='config.php') fs.copyFileSync(path.join(root,name),path.join(dir,name));
  fs.copyFileSync(path.join(__dirname,'fixtures/training-config.php'),path.join(dir,'config.php'));
  fs.copyFileSync(path.join(root,'training-content.md'),path.join(dir,'training-content.md'));
  fs.mkdirSync(path.join(dir,'assets'),{recursive:true});
  for(const name of fs.readdirSync(path.join(root,'assets'))) if(/\.(css|js)$/.test(name)) fs.copyFileSync(path.join(root,'assets',name),path.join(dir,'assets',name));
  const cover='assets/uploads/backgrounds/main/nurlan-portrait.JPG';
  fs.mkdirSync(path.dirname(path.join(dir,cover)),{recursive:true});
  fs.copyFileSync(path.join(root,cover),path.join(dir,cover));
  const probe=net.createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
  const base=`http://127.0.0.1:${port}`;
  server=spawn(path.join(root,'tools/php/php.exe'),['-S',`127.0.0.1:${port}`,'-t',dir],{windowsHide:true,stdio:'ignore'});
  for(let i=0;i<50;i++){try{await request(base+'/index.php');break;}catch{await delay(100);}}
  const anonymous=await request(base+'/training-edit.php',{redirect:'manual'});assert.equal(anonymous.status,302);
  const login=await request(base+'/login.php',{method:'POST',redirect:'manual',body:new URLSearchParams({login:'test-admin',password:'local-test-only-password'})});
  assert.equal(login.status,302);const cookie=login.headers.get('set-cookie').split(';')[0];
  const get=async route=>(await request(base+route,{headers:{Cookie:cookie}})).text();
  const form=async()=>{
    const html=await get('/training-edit.php');const data={};
    for(const m of html.matchAll(/<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"/g)) data[m[1]]=decode(m[2]);
    data.content=decode(html.match(/<textarea[^>]*name="content"[^>]*>([\s\S]*?)<\/textarea>/)[1]);return data;
  };
  const post=async data=>request(base+'/training-edit.php',{method:'POST',redirect:'manual',headers:{Cookie:cookie},body:data instanceof FormData?data:new URLSearchParams(data)});
  const initial=await form();
  assert.ok((await get('/admin.php')).includes('training-edit.php'),'editor is listed in admin');
  assert.equal((await post({...initial,action:'save',csrf:'wrong'})).status,200);
  assert.equal((await form()).revision,'0','CSRF rejected');
  const updated={...initial,action:'save',title:'Тест тренингі',lead:'Жаңа сипаттама',price:'210 000 ₸',dates:'1–7 қазан',registration_url:'https://docs.google.com/forms/test',content:initial.content+'\n\n<script>alert(1)</script>\nТЕКСЕРУ МӘТІНІ'};
  assert.equal((await post({...updated,registration_url:'javascript:alert(1)'})).status,200);
  assert.equal((await form()).revision,'0','unsafe URL rejected');
  assert.equal((await post(updated)).status,302);
  for(const route of ['/index.php','/training-details.php']) {
    const html=await get(route);assert.ok(html.includes(updated.title));assert.ok(html.includes(updated.price));assert.ok(html.includes(updated.dates));
  }
  const detail=await get('/training-details.php');assert.ok(detail.includes('ТЕКСЕРУ МӘТІНІ'));assert.ok(detail.includes('&lt;script&gt;'));assert.ok(detail.includes(updated.registration_url));
  assert.equal((await post({...updated,title:'stale'})).status,200);assert.equal((await form()).title,updated.title,'stale edit rejected');
  const upload=new FormData();for(const [key,value] of Object.entries(await form())) upload.set(key,value);upload.set('action','save');
  upload.set('training_cover',new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64')],{type:'image/png'}),'cover.png');
  assert.equal((await post(upload)).status,302);const withCover=await form();assert.ok(withCover.image.startsWith('assets/uploads/posters/training-'));
  assert.ok((await get('/index.php')).includes(withCover.image));assert.ok((await get('/training-details.php')).includes(withCover.image));
  assert.equal((await post({...withCover,action:'archive'})).status,302);
  assert.ok(!(await get('/index.php')).includes(updated.title),'archived poster hidden');
  assert.equal((await request(base+'/training-details.php')).status,404,'archived page unavailable');
  assert.ok((await get('/admin.php')).includes('Архивте'),'archive status remains visible in admin');
  assert.equal((await post({...await form(),action:'restore'})).status,302);
  assert.equal((await request(base+'/training-details.php')).status,200);
  assert.ok((await get('/index.php')).includes(updated.title),'restored poster visible');
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'data/training-state.json'),'utf8')).archived,false,'state persisted outside source');
  console.log('PASS: login protection, admin listing, CSRF, URL validation, edit, full program, cover upload, stale edit, archive/404, restore, persistence.');
  console.log('Isolated fixture: '+dir);
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server?.kill());
