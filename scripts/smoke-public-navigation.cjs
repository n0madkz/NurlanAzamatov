// Dependency-free Chrome smoke test. Run while PHP serves the project locally:
// node scripts/smoke-public-navigation.cjs http://127.0.0.1:8012
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.argv[2] || 'http://127.0.0.1:8012';
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sheshendik-nav-'));
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'
], {windowsHide:true, stdio:'ignore'});
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
(async () => {
  const portFile = path.join(profile, 'DevToolsActivePort');
  for (let i=0; i<100 && !fs.existsSync(portFile); i++) await delay(100);
  const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(pages.find(page => page.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, {once:true}));
  let id=0;
  const pending = new Map();
  const errors=[];
  socket.addEventListener('message', event => {
    const message=JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text + ': ' + (message.params.exceptionDetails.exception?.description || ''));
    if (pending.has(message.id)) {
      const {resolve,reject,timer}=pending.get(message.id); clearTimeout(timer); pending.delete(message.id);
      message.error ? reject(Error(message.error.message)) : resolve(message.result);
    }
  });
  const send=(method,params={}) => new Promise((resolve,reject) => {
    const call=++id;
    const timer=setTimeout(()=>reject(Error('Timeout: '+method)),15000);
    pending.set(call,{resolve,reject,timer}); socket.send(JSON.stringify({id:call,method,params}));
  });
  const evaluate=async expression => {
    const response=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(response.exceptionDetails) throw Error(response.exceptionDetails.text);
    return response.result.value;
  };
  await send('Page.enable'); await send('Runtime.enable');
  const navigate=async route => {
    await send('Page.navigate',{url:base+route});
    for(let i=0;i<80;i++) {
      await delay(100);
      if(await evaluate(`location.href === ${JSON.stringify(base+route)} && document.readyState !== 'loading' && !!document.querySelector('.public-bottom-nav')`)) break;
    }
    await delay(1000);
  };
  const resize=async(width,height) => {await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});await delay(150);};
  const geometry=()=>evaluate(`(() => {
    const nav=document.querySelector('.public-bottom-nav'), r=nav.getBoundingClientRect();
    return {bottom:r.bottom, width:r.width, y:r.y, height:innerHeight, display:getComputedStyle(nav).display,
      header:getComputedStyle(document.querySelector('.public-header')).display,
      position:getComputedStyle(nav).position, overflow:document.documentElement.scrollWidth > innerWidth,
      links:[...nav.querySelectorAll('a')].map(a=>({width:a.getBoundingClientRect().width,height:a.getBoundingClientRect().height,icon:!!a.querySelector('svg'),text:a.innerText,clipped:a.querySelector('span').scrollWidth>a.clientWidth})),
      active:nav.querySelector('[aria-current]')?.dataset.navKey || ''};
  })()`);
  for(const route of ['/index.php','/training-details.php']) {
    await resize(390,844); await navigate(route);
    for(const [width,height] of [[320,740],[375,812],[390,844],[750,900],[844,390],[1280,900],[390,844]]) {
      await resize(width,height);
      const state=await geometry();
      if(width<=750) {
        assert.equal(state.position,'fixed'); assert.equal(state.header,'none');
        assert.ok(Math.abs(state.bottom-height)<1,'dock bottom matches viewport');
        assert.equal(state.links.length,5);
        assert.ok(state.links.every(a=>a.icon&&a.height>=44&&!a.clipped),'icons, touch area and labels: '+JSON.stringify(state));
        assert.ok(Math.max(...state.links.map(a=>a.width))-Math.min(...state.links.map(a=>a.width))<1,'equal tabs');
      } else assert.equal(state.display,'none');
      assert.equal(state.overflow,false,`${route}: overflow at ${width}`);
    }
    if(route.includes('index')) {
      assert.equal(await evaluate(`document.querySelectorAll('.training-details').length`),0);
      assert.equal(await evaluate(`document.querySelector('.training-cover .training-cta').getAttribute('href')`),'training-details.php');
      await evaluate(`document.documentElement.style.scrollBehavior='auto'`);
      for(const key of ['events','about','gallery','certificates']) {
        await evaluate(`document.getElementById('${key}').scrollIntoView()`); await delay(250);
        const state=await geometry();
        assert.equal(state.active,key,`highlight ${key}`);
        assert.ok(Math.abs(state.bottom-state.height)<1,'dock stays fixed during scroll');
      }
    } else {
      assert.equal(await evaluate(`document.querySelectorAll('h1').length`),1);
      assert.equal(await evaluate(`document.querySelectorAll('.training-info-card').length`),13);
      assert.equal((await geometry()).active,'training');
      await evaluate(`scrollTo(0,document.body.scrollHeight)`);await delay(250);
      assert.ok(Math.abs((await geometry()).bottom-844)<1);
    }
    await evaluate('scrollTo(0,0)');await delay(300);
    const screenshot=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(path.join(profile,route.includes('index')?'home.png':'training.png'),Buffer.from(screenshot.data,'base64'));
  }
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:2,mobile:true});
  await send('Emulation.setTouchEmulationEnabled',{enabled:true});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await navigate('/index.php');
  assert.ok(Math.abs((await geometry()).bottom-844)<1,'real mobile viewport bottom');
  await evaluate(`document.querySelector('.public-bottom-nav [data-nav-key="training"]').click()`);
  for(let i=0;i<80;i++) {await delay(100);if(await evaluate(`location.pathname.endsWith('/training-details.php') && document.readyState !== 'loading'`)) break;}
  assert.equal(await evaluate(`document.querySelectorAll('.training-info-card').length`),13,'training navigation opens full page');
  await evaluate(`document.querySelector('.training-back').click()`);
  for(let i=0;i<80;i++) {await delay(100);if(await evaluate(`location.pathname.endsWith('/index.php') && document.readyState !== 'loading' && !!document.querySelector('#certificates')`)) break;}
  await delay(500);
  assert.equal((await geometry()).active,'events','back link returns to poster');
  await send('Emulation.setScriptExecutionDisabled',{value:true});
  await navigate('/index.php');
  assert.equal((await geometry()).position,'fixed','server-rendered nav works without page scripts');
  assert.deepEqual(errors,[],'no JavaScript exceptions');
  console.log('PASS: both pages; 320–1280px; fixed equal tabs; icons; scroll highlights; 13 program sections; no-JS navigation.');
  console.log('Screenshots: '+profile);
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>{socket?.close();chrome.kill();});
