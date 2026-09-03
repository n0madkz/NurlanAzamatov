const items = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .14 });
items.forEach((item, index) => { item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`; observer.observe(item); });

document.documentElement.lang = 'kk';
const textMap = new Map([
  ['\u041e \u043f\u0440\u043e\u0435\u043a\u0442\u0435','\u0416\u043e\u0431\u0430 \u0442\u0443\u0440\u0430\u043b\u044b'],['\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0442\u043e\u0440\u0430\u043c','\u04b0\u0439\u044b\u043c\u0434\u0430\u0441\u0442\u044b\u0440\u0443\u0448\u044b\u043b\u0430\u0440\u0493\u0430'],['\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e','\u041c\u04d9\u0437\u0456\u0440\u0434\u0456 \u0430\u0448\u0443'],
  ['\u0413\u043e\u0432\u043e\u0440\u0438\u0442\u044c','\u0421\u04e9\u0439\u043b\u0435\u0439 \u0431\u0456\u043b'],['\u0442\u0430\u043a, \u0447\u0442\u043e\u0431\u044b','\u0441\u043e\u043d\u0434\u0430 \u0441\u0435\u043d\u0456'],['\u0432\u0430\u0441 \u0441\u043b\u0443\u0448\u0430\u043b\u0438.','\u0442\u044b\u04a3\u0434\u0430\u0439\u0434\u044b.'],
  ['\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0430\u0444\u0438\u0448\u0443','\u0410\u0444\u0438\u0448\u0430\u043d\u044b \u043a\u04e9\u0440\u0443'],['UP NEXT','\u0410\u041b\u0414\u0410 \u041d\u0415 \u0411\u0410\u0420'],['\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0435','\u0410\u043b\u0434\u0430\u0493\u044b'],['\u0432\u044b\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f.','\u0442\u0440\u0435\u043d\u0438\u043d\u0433\u0442\u0435\u0440.'],['\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f','\u0422\u0456\u0440\u043a\u0435\u043b\u0443'],['WHY STAGESPEAK','STAGESPEAK \u043d\u0435 \u04af\u0448\u0456\u043d'],['\u0421\u0446\u0435\u043d\u0430 \u043d\u0430\u0447\u0438\u043d\u0430\u0435\u0442\u0441\u044f','\u0421\u0430\u0445\u043d\u0430'],['\u0441 \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u0441\u043b\u043e\u0432\u0430.','\u0431\u0456\u0440\u0456\u043d\u0448\u0456 \u0441\u04e9\u0437\u0434\u0435\u043d \u0431\u0430\u0441\u0442\u0430\u043b\u0430\u0434\u044b.'],['\u0418\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u044c \u0433\u0430\u043b\u0435\u0440\u0435\u044e','\u0413\u0430\u043b\u0435\u0440\u0435\u044f\u043d\u044b \u043a\u04e9\u0440\u0443'],['FROM THE ROOM','\u0417\u0410\u041b\u0414\u0410\u041d \u041a\u04e9\u0440\u0456\u043d\u0456\u0441'],['\u041c\u043e\u043c\u0435\u043d\u0442\u044b','\u04d8\u0440 \u0441\u04d9\u0442'],['\u0432 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0438.','\u04d9\u0440\u0435\u043a\u0435\u0442\u0442\u0435.'],['\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d','\u049a\u0430\u0437\u0430\u049b\u0441\u0442\u0430\u043d']
]);
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let node; while (node = walker.nextNode()) { textMap.forEach((value, key) => { if (node.nodeValue.includes(key)) node.nodeValue = node.nodeValue.split(key).join(value); }); }

const profile = document.createElement('section');
profile.className = 'nurlan-profile section';
profile.innerHTML = `<div class="profile-intro"><p class="eyebrow">NURLAN AZAMATOV</p><h2>Сөздің күшін<br><em>сезініңіз.</em></h2><p>«Ораторлық өнер» мектебінің негізін қалаушы — Нұрлан Азаматов. Мақсатымыз — мүмкіндігінше көп адамға шешендік өнерді үйретіп, әр қатысушының жеке арманына жетуіне көмектесу.</p></div><div class="profile-facts"><p class="eyebrow">ТӘЖІРИБЕ ЖӘНЕ НӘТИЖЕ</p><ul><li>Өзіңізге деген сенімділік артады, көпшілік алдында сөйлеу қорқынышы азаяды.</li><li>Ойды жеңіл, қисынды және әсерлі жеткізудің әмбебап алгоритмін үйренесіз.</li><li>Тыңдаушы назарын ұстап, кез келген тақырыпта қағазсыз сөйлеуді меңгересіз.</li><li>Дауыс, дикция, екпін, кідіріс және интонацияны жетілдіресіз.</li><li>Кез келген сұраққа, қарсылыққа және манипуляцияға дұрыс жауап бересіз.</li></ul></div>`;
document.querySelector('.ticker').after(profile);
// Rebuild the profile block with UTF-8-safe escaped text.
profile.remove();
const profileSafe = document.createElement('section');
profileSafe.className = 'nurlan-profile section';
profileSafe.innerHTML = '<div class="profile-intro"><p class="eyebrow">NURLAN AZAMATOV</p><h2>\u0421\u04e9\u0437\u0434\u0456\u04a3 \u043a\u04af\u0448\u0456\u043d<br><em>\u0441\u0435\u0437\u0456\u043d\u0456\u04a3\u0456\u0437.</em></h2><p>\u00ab\u041e\u0440\u0430\u0442\u043e\u0440\u043b\u044b\u049b \u04e9\u043d\u0435\u0440\u00bb \u043c\u0435\u043a\u0442\u0435\u0431\u0456\u043d\u0456\u04a3 \u043d\u0435\u0433\u0456\u0437\u0456\u043d \u049b\u0430\u043b\u0430\u0443\u0448\u044b \u2014 \u041d\u04b1\u0440\u043b\u0430\u043d \u0410\u0437\u0430\u043c\u0430\u0442\u043e\u0432. \u041c\u0430\u049b\u0441\u0430\u0442\u044b\u043c\u044b\u0437 \u2014 \u0430\u0434\u0430\u043c\u0434\u0430\u0440\u0493\u0430 \u0448\u0435\u0448\u0435\u043d\u0434\u0456\u043a \u04e9\u043d\u0435\u0440\u0434\u0456 \u04af\u0439\u0440\u0435\u0442\u0456\u043f, \u0436\u0435\u043a\u0435 \u0430\0440\u043c\u0430\u043d\u044b\u043d\u0430 \u0436\u0435\u0442\u0443\u0456\u043d\u0435 \u043a\u04e9\u043c\u0435\u043a\u0442\u0435\u0441\u0443.</p></div><div class="profile-facts"><p class="eyebrow">\u0422\u04d8\u0416\u0406\u0420\u0418\u0411\u0415 \u0416\u04d8\u041d\u0415 \u041d\u04d8\u0422\u0418\u0416\u0415</p><ul><li>\u04e8\u0437\u0456\u04a3\u0456\u0437\u0433\u0435 \u0434\u0435\u0433\u0435\u043d \u0441\u0435\u043d\u0456\u043c\u0434\u0456\u043b\u0456\u043a \u0430\u0440\u0442\u0430\u0434\u044b, \u049b\u043e\u043f\u0448\u0456\u043b\u0456\u043a \u0430\u043b\u0434\u044b\u043d\u0434\u0430 \u0441\u04e9\u0439\u043b\u0435\u0443 \u049b\u043e\u0440\u049b\u044b\u043d\u044b\u0448\u044b \u0430\u0437\u0430\u044f\u0434\u044b.</li><li>\u041e\u0439\u0434\u044b \u0436\u0435\u04a3\u0456\u043b, \u049b\u0438\u0441\u044b\u043d\u0434\u044b \u0436\u04d9\u043d\u0435 \u04d9\u0441\u0435\u0440\u043b\u0456 \u0436\u0435\u0442\u043a\u0456\u0437\u0443\u0434\u0456\u04a3 \u04d9\u0434\u0456\u0441\u0456\u043d \u04af\u0439\u0440\u0435\u043d\u0435\u0441\u0456\u0437.</li><li>\u0422\u044b\u04a3\u0434\u0430\u0443\u0448\u044b \u043d\u0430\u0437\u0430\u0440\u044b\u043d \u04b1\u0441\u0442\u0430\u043f, \u049b\u0430\u0493\u0430\u0437\u0441\u044b\u0437 \u0441\u04e9\u0439\u043b\u0435\u0443\u0434\u0456 \u043c\u0435\u04a3\u0433\u0435\u0440\u0435\u0441\u0456\u0437.</li><li>\u0414\u0430\u0443\u044b\u0441, \u0434\u0438\u043a\u0446\u0438\u044f, \u0435\u043a\u043f\u0456\u043d, \u043a\u0456\u0434\u0456\u0440\u0456\u0441 \u0436\u04d9\u043d\u0435 \u0438\u043d\u0442\u043e\u043d\u0430\u0446\u0438\u044f\u043d\u044b \u0436\u0435\u0442\u0456\u043b\u0434\u0456\u0440\u0435\u0441\u0456\u0437.</li><li>\u041a\u0435\u0437 \u043a\u0435\u043b\u0433\u0435\u043d \u0441\u04b1\u0440\u0430\u049b\u049b\u0430 \u0436\u04d9\u043d\u0435 \u049b\u0430\u0440\u0441\u044b\u043b\u044b\u049b\u049b\u0430 \u0434\u04b1\u0440\u044b\u0441 \u0436\u0430\u0443\u0430\u043f \u0431\u0435\u0440\u0435\u0441\u0456\u0437.</li></ul></div>';
document.querySelector('.ticker').after(profileSafe);

const extraMap = new Map([
  ['ORATORY / ALMATY / 2026','\u0428\u0415\u0428\u0415\u041d\u0414\u0406\u041a / ALMATY / 2026'],
  ['VOICE IS A MUSCLE','\u0414\u0410\u0423\u042b\u0421 \u2014 \u0411\u04b0\u041b \u0411\u04b0\u041b\u0428\u042b\u049a\u0415\u0422'],['TRAIN IT DAILY','\u041a\u04ae\u041d \u0421\u0410\u0419\u042b\u041d \u0416\u0410\u0422\u0422\u042b\u049a\u0422\u042b\u0420'],['BE HEARD','\u0421\u0415\u041d\u0406 \u0422\u04a3\u0414\u0410\u0421\u042b\u041d'],
  ['\u0410\u0444\u0438\u0448\u0430 \u0436\u0438\u0432\u044b\u0445 \u0442\u0440\u0435\u043d\u0438\u043d\u0433\u043e\u0432 \u043f\u043e \u043e\u0440\u0430\u0442\u043e\u0440\u0441\u043a\u043e\u043c\u0443 \u043c\u0430\u0441\u0442\u0435\u0440\u0441\u0442\u0432\u0443. \u0411\u043e\u043b\u044c\u0448\u0435 \u0433\u043e\u043b\u043e\u0441\u0430, \u043c\u0435\u043d\u044c\u0448\u0435 \u0441\u0442\u0440\u0430\u0445\u0430.','\u0428\u0435\u0448\u0435\u043d\u0434\u0456\u043a \u04e9\u043d\u0435\u0440\u0433\u0435 \u0430\u0440\u043d\u0430\u043b\u0493\u0430\u043d \u0442\u0440\u0435\u043d\u0438\u043d\u0433\u0442\u0435\u0440 \u0430\u0444\u0438\u0448\u0430\u0441\u044b. \u041a\u04e9\u0431\u0456\u0440\u0435\u043a \u0434\u0430\u0443\u044b\u0441, \u0430\u0437\u044b\u0440\u0430\u049b \u049b\u043e\u0440\u049b\u044b\u043d\u044b\u0448.'],
  ['\u0412\u044b\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0444\u043e\u0440\u043c\u0430\u0442, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0432\u0430\u043c \u2014 \u043e\u0442 \u043a\u0430\u043c\u0435\u0440\u043d\u044b\u0445 \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u043c\u043e\u0432 \u0434\u043e \u0431\u043e\u043b\u044c\u0448\u0438\u0445 \u0438\u043d\u0442\u0435\u043d\u0441\u0438\u0432\u043e\u0432.','\u04e8\u0437\u0456\u04a3\u0456\u0437\u0433\u0435 \u043b\u0430\u0439\u044b\u049b \u0444\u043e\u0440\u043c\u0430\u0442\u0442\u044b \u0442\u0430\u04a3\u0434\u0430\u04a3\u044b\u0437 \u2014 \u0448\u0430\u0493\u044b\u043d \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u043c\u043d\u0430\u043d \u04af\u043b\u043a\u0435\u043d \u0438\u043d\u0442\u0435\u043d\u0441\u0438\u0432\u043a\u0435 \u0434\u0435\u0439\u0456\u043d.'],
  ['\u041c\u044b \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u043c \u0441\u0438\u043b\u044c\u043d\u044b\u0445 \u0442\u0440\u0435\u043d\u0435\u0440\u043e\u0432 \u0438 \u043b\u044e\u0434\u0435\u0439, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0445\u043e\u0442\u044f\u0442 \u0437\u0432\u0443\u0447\u0430\u0442\u044c \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u0435\u0435. \u0412 \u043a\u0430\u0436\u0434\u043e\u0439 \u0430\u0444\u0438\u0448\u0435 \u2014 \u043c\u0435\u0441\u0442\u043e \u0434\u043b\u044f \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0438, \u0436\u0438\u0432\u043e\u0439 \u043e\u0431\u0440\u0430\u0442\u043d\u043e\u0439 \u0441\u0432\u044f\u0437\u0438 \u0438 \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u043e\u0433\u043e \u043b\u0438\u0447\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0440\u044b\u0432\u0430.','\u0411\u0456\u0437 \u043c\u044b\u049b\u0442\u044b \u0442\u0440\u0435\u043d\u0435\u0440\u043b\u0435\u0440 \u043c\u0435\u043d \u0441\u0435\u043d\u0456\u043c\u0434\u0456 \u0441\u04e9\u0439\u043b\u0435\u0443\u0434\u0456 \u04af\u0439\u0440\u0435\u043d\u0433\u0456\u0441\u0456 \u043a\u0435\u043b\u0435\u0442\u0456\u043d \u0430\u0434\u0430\u043c\u0434\u0430\u0440\u0434\u044b \u0431\u0456\u0440\u0456\u043a\u0442\u0456\u0440\u0435\u043c\u0456\u0437. \u04d8\u0440 \u0430\u0444\u0438\u0448\u0430\u0434\u0430 \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430\u0493\u0430, \u0448\u044b\u043d\u0430\u0439\u044b \u043a\u0435\u0440\u0456 \u0431\u0430\u0439\u043b\u0430\u043d\u044b\u0441\u049b\u0430 \u0436\u04d9\u043d\u0435 \u0436\u0435\u043a\u0435 \u0441\u0435\u0440\u043f\u0456\u043b\u0456\u0441\u043a\0435 \u043e\u0440\u044b\u043d \u0431\u0430\u0440.']
]);
const walker2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (node = walker2.nextNode()) { extraMap.forEach((value, key) => { if (node.nodeValue.includes(key)) node.nodeValue = node.nodeValue.split(key).join(value); }); }
const intro = document.querySelector('.profile-intro p:last-child');
if (intro) intro.textContent = '\u00ab\u041e\u0440\u0430\u0442\u043e\u0440\u043b\u044b\u049b \u04e9\u043d\u0435\u0440\u00bb \u043c\u0435\u043a\u0442\u0435\u0431\u0456\u043d\u0456\u04a3 \u043d\u0435\u0433\u0456\u0437\u0456\u043d \u049b\u0430\u043b\u0430\u0443\u0448\u044b \u2014 \u041d\u04b1\u0440\u043b\u0430\u043d \u0410\u0437\u0430\u043c\u0430\u0442\u043e\u0432. \u041c\u0430\u049b\u0441\u0430\u0442\u044b\u043c\u044b\u0437 \u2014 \u0430\u0434\u0430\u043c\u0434\u0430\u0440\u0493\u0430 \u0448\u0435\u0448\u0435\u043d\u0434\u0456\u043a \u04e9\u043d\u0435\u0440\u0434\u0456 \u04af\u0439\u0440\u0435\u0442\u0456\u043f, \u0436\u0435\u043a\u0435 \u0430\u0440\u043c\u0430\u043d\u044b\u043d\u0430 \u0436\u0435\u0442\u0443\u0456\u043d\u0435 \u043a\u04e9\u043c\u0435\u043a\u0442\u0435\u0441\u0443.';
const cardMap = new Map([
  ['\u0413\u043e\u043b\u043e\u0441, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0441\u043b\u044b\u0448\u043d\u043e','\u0415\u0441\u0442\u0456\u043b\0435\0442\u0456\043d \u0434\u0430\u0443\u044b\u0441'],['\u0421\u0446\u0435\u043d\u0430 \u0431\u0435\u0437 \u0441\u0442\u0440\u0430\u0445\u0430','\u049a\u043e\u0440\u049b\u044b\u043d\u044b\u0448\u0441\u044b\u0437 \u0441\u0430\u0445\u043d\u0430'],['\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u043c \u043f\u043e \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u043e\u0439 \u043f\u043e\u0434\u0430\u0447\u0435, \u0438\u043d\u0442\u043e\u043d\u0430\u0446\u0438\u0438 \u0438 \u0440\u0430\u0431\u043e\u0442\u0435 \u0441 \u0432\u043e\u043b\u043d\u0435\u043d\u0438\u0435\u043c.','\u04e8\u0437\u0456\u043d\u0435 \u0441\u0435\u043d\u0456\u043c\u0434\u0456 \u04b1\u0441\u0442\u0430\u0443, \u0434\u0430\u0443\u044b\u0441 \u043f\u0435\u043d \u0438\u043d\u0442\u043e\u043d\u0430\u0446\u0438\u044f\u043d\u044b \u0436\u0435\u0442\u0456\u043b\u0434\u0456\u0440\u0443\u0433\u0435 \u0430\u0440\u043d\u0430\u043b\u0493\u0430\u043d \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u043c.'],['\u041e\0434\u043d\u043e\u0434\u043d\u0435\u0432\u043d\u044b\u0439 \u0438\u043d\u0442\u0435\u043d\u0441\u0438\u0432 \u0434\u043b\u044f \u0442\u0435\u0445, \u043a\u0442\u043e \u0445\u043e\u0447\u0435\u0442 \u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u043e \u0438 \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e.','\u0415\u0440\u043a\u0456\u043d \u04d9\u0440\u0456 \u0441\u0435\u043d\u0456\u043c\u0434\u0456 \u0441\u04e9\u0439\u043b\u0435\u0443\u0433\u0435 \u0430\u0440\u043d\u0430\u043b\u0493\u0430\u043d \u0431\u0456\u0440 \u043a\u04af\u043d\u0434\u0456\u043a \u0438\u043d\u0442\u0435\u043d\u0441\u0438\u0432.']
]);
const walker3 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (node = walker3.nextNode()) { cardMap.forEach((value, key) => { if (node.nodeValue.includes(key)) node.nodeValue = node.nodeValue.split(key).join(value); }); }
const kz = (...codes) => String.fromCharCode(...codes);
document.querySelector('.ticker div').textContent = kz(0x0414,0x0410,0x0423,0x042b,0x0421,0x0020,0x2014,0x0020,0x0411,0x04b0,0x041b,0x0020,0x0411,0x04b0,0x041b,0x0428,0x042b,0x049a,0x0415,0x0422,0x0020,0x2733,0x0020,0x041a,0x04ae,0x041d,0x0020,0x0421,0x0410,0x0419,0x042b,0x041d,0x0020,0x0416,0x0410,0x0422,0x0422,0x042b,0x049a,0x0422,0x042b,0x0420);
const cards = document.querySelectorAll('.poster-card');
if (cards[0]) { cards[0].querySelector('h3').textContent = kz(0x0415,0x0441,0x0442,0x0456,0x043b,0x0435,0x0442,0x0456,0x043d,0x0020,0x0434,0x0430,0x0443,0x044b,0x0441); cards[0].querySelector('p').textContent = kz(0x04e8,0x0437,0x0456,0x043d,0x0435,0x0020,0x0441,0x0435,0x043d,0x0456,0x043c,0x0434,0x0456,0x0020,0x04b1,0x0441,0x0442,0x0430,0x0443,0x002c,0x0020,0x0434,0x0430,0x0443,0x044b,0x0441,0x0020,0x043f,0x0435,0x043d,0x0020,0x0438,0x043d,0x0442,0x043e,0x043d,0x0430,0x0446,0x0438,0x044f,0x043d,0x044b,0x0020,0x0436,0x0435,0x0442,0x0456,0x043b,0x0434,0x0456,0x0440,0x0443,0x0433,0x0435,0x0020,0x0430,0x0440,0x043d,0x0430,0x043b,0x0493,0x0430,0x043d,0x0020,0x043f,0x0440,0x0430,0x043a,0x0442,0x0438,0x043a,0x0443,0x043c,0x002e); }
if (cards[1]) { cards[1].querySelector('h3').textContent = kz(0x049a,0x043e,0x0440,0x049b,0x044b,0x043d,0x044b,0x0448,0x0441,0x044b,0x0437,0x0020,0x0441,0x0430,0x0445,0x043d,0x0430); cards[1].querySelector('p').textContent = kz(0x0415,0x0440,0x043a,0x0456,0x043d,0x0020,0x04d9,0x0440,0x0456,0x0020,0x0441,0x0435,0x043d,0x0456,0x043c,0x0434,0x0456,0x0020,0x0441,0x04e9,0x0439,0x043b,0x0435,0x0443,0x0433,0x0435,0x0020,0x0430,0x0440,0x043d,0x0430,0x043b,0x0493,0x0430,0x043d,0x0020,0x0431,0x0456,0x0440,0x0020,0x043a,0x04af,0x043d,0x0434,0x0456,0x043a,0x0020,0x0438,0x043d,0x0442,0x0435,0x043d,0x0441,0x0438,0x0432,0x002e); }
const firstFact = document.querySelector('.profile-facts li');
if (firstFact) firstFact.textContent = kz(0x04e8,0x0437,0x0456,0x04a3,0x0456,0x0437,0x0433,0x0435,0x0020,0x0434,0x0435,0x0433,0x0435,0x043d,0x0020,0x0441,0x0435,0x043d,0x0456,0x043c,0x0434,0x0456,0x043b,0x0456,0x043a,0x0020,0x0430,0x0440,0x0442,0x0430,0x0434,0x044b,0x002c,0x0020,0x043a,0x04e9,0x043f,0x0448,0x0456,0x043b,0x0456,0x043a,0x0020,0x0430,0x043b,0x0434,0x044b,0x043d,0x0434,0x0430,0x0020,0x0441,0x04e9,0x0439,0x043b,0x0435,0x0443,0x0020,0x049b,0x043e,0x0440,0x049b,0x044b,0x043d,0x044b,0x0448,0x044b,0x0020,0x0430,0x0437,0x0430,0x044f,0x0434,0x044b,0x002e);
const aboutText = document.querySelector('.split-copy p:not(.eyebrow)');
if (aboutText) aboutText.textContent = kz(0x0411,0x0456,0x0437,0x0020,0x043c,0x044b,0x049b,0x0442,0x044b,0x0020,0x0442,0x0440,0x0435,0x043d,0x0435,0x0440,0x043b,0x0435,0x0440,0x0020,0x043c,0x0435,0x043d,0x0020,0x0441,0x0435,0x043d,0x0456,0x043c,0x0434,0x0456,0x0020,0x0441,0x04e9,0x0439,0x043b,0x0435,0x0443,0x0434,0x0456,0x0020,0x04af,0x0439,0x0440,0x0435,0x043d,0x0433,0x0456,0x0441,0x0456,0x0020,0x043a,0x0435,0x043b,0x0435,0x0442,0x0456,0x043d,0x0020,0x0430,0x0434,0x0430,0x043c,0x0434,0x0430,0x0440,0x0434,0x044b,0x0020,0x0431,0x0456,0x0440,0x0456,0x043a,0x0442,0x0456,0x0440,0x0435,0x043c,0x0456,0x0437,0x002e,0x0020,0x04d8,0x0440,0x0020,0x0430,0x0444,0x0438,0x0448,0x0430,0x0434,0x0430,0x0020,0x043f,0x0440,0x0430,0x043a,0x0442,0x0438,0x043a,0x0430,0x0493,0x0430,0x002c,0x0020,0x0448,0x044b,0x043d,0x0430,0x0439,0x044b,0x0020,0x043a,0x0435,0x0440,0x0456,0x0020,0x0431,0x0430,0x0439,0x043b,0x0430,0x043d,0x044b,0x0441,0x049b,0x0430,0x0020,0x0436,0x04d9,0x043d,0x0435,0x0020,0x0436,0x0435,0x043a,0x0435,0x0020,0x0441,0x0435,0x0440,0x043f,0x0456,0x043b,0x0456,0x0441,0x043a,0x0435,0x0020,0x043e,0x0440,0x044b,0x043d,0x0020,0x0431,0x0430,0x0440,0x002e);
const schoolName = kz(0x041d,0x04b1,0x0440,0x043b,0x0430,0x043d,0x0020,0x0410,0x0437,0x0430,0x043c,0x0430,0x0442,0x043e,0x0432,0x0442,0x044b,0x04a3,0x0020,0x0448,0x0435,0x0448,0x0435,0x043d,0x0434,0x0456,0x043a,0x0020,0x04e9,0x043d,0x0435,0x0440,0x0020,0x043c,0x0435,0x043a,0x0442,0x0435,0x0431,0x0456);
const brandWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (node = brandWalker.nextNode()) { if (node.nodeValue.includes('STAGESPEAK')) node.nodeValue = node.nodeValue.split('STAGESPEAK').join(schoolName); }
document.title = schoolName + ' — афиша';
const scheduleIntro = document.querySelector('.schedule .section-intro'); if (scheduleIntro) scheduleIntro.innerHTML = '&#1058;&#1088;&#1077;&#1085;&#1077;&#1088;: &#1053;&#1201;&#1088;&#1083;&#1072;&#1085; &#1040;&#1079;&#1072;&#1084;&#1072;&#1090;&#1086;&#1074;<br>&#1058;&#1088;&#1077;&#1085;&#1080;&#1085;&#1075; &#1201;&#1079;&#1072;&#1179;&#1090;&#1099;&#1083;&#1099;&#1171;&#1099;: 14 &#1089;&#1072;&#1171;&#1072;&#1090;';
const taplinkImages = ['assets/uploads/backgrounds/main/nurlan-portrait.JPG','assets/drive/photos/483528293_28821656594145921_3746918195898899378_n.jpg','assets/drive/photos/483365109_28816670661311181_1426371898592760444_n.jpg'];
const heroImage = document.querySelector('.hero-image img'); if (heroImage) heroImage.src = taplinkImages[0];
const splitImage = document.querySelector('.split-image img'); if (splitImage) splitImage.src = taplinkImages[1];
document.querySelectorAll('.gallery-grid img').forEach((image, index) => image.src = taplinkImages[index % taplinkImages.length]);
const media = document.createElement('section');
media.className = 'media-links section';
media.innerHTML = '<div><p class="eyebrow">VIDEO / SOCIAL</p><h2>Нұрланның<br><em>видеолары.</em></h2><p class="media-note">Жаңа сабақтар, сахнадағы сөздер және шешендік өнер туралы материалдар.</p></div><div class="media-buttons"><a class="media-button" href="https://www.youtube.com/channel/UCnX-xZgJ8HzOodW1-3f8RWA" target="_blank" rel="noopener"><span>YouTube</span><b>↗</b></a><a class="media-button" href="https://www.facebook.com/nurlan.azamatov.1/" target="_blank" rel="noopener"><span>Facebook</span><b>↗</b></a></div>';
document.querySelector('.nurlan-profile').after(media);
const mediaTitle = media.querySelector('h2');
if (mediaTitle) mediaTitle.innerHTML = '\u0421\u0430\u0445\u043d\u0430\u0434\u0430\u0493\u044b<br><em>\u0441\u04d9\u0442\u0442\u0435\u0440.</em>';
const schedule = document.createElement('section');
schedule.className = 'schedule section';
schedule.innerHTML = '<div class="section-head"><div><p class="eyebrow">&#1041;&#1040;&#1170;&#1044;&#1040;&#1056;&#1051;&#1040;&#1052;&#1040;</p><h2>&#171;&#1050;&#1241;&#1089;&#1110;&#1073;&#1080; &#1086;&#1088;&#1072;&#1090;&#1086;&#1088;&#187;<br><em>&#1090;&#1088;&#1077;&#1085;&#1080;&#1085;&#1075;&#1110;.</em></h2></div><p class="section-intro">&#1058;&#1088;&#1077;&#1085;&#1077;&#1088;: &#1053;&#1201;&#1088;&#1083;&#1072;&#1085; &#1040;&#1079;&#1072;&#1084;&#1072;&#1090;&#1086;&#1074;<br>&#1050;&#1199;&#1085;&#1076;&#1077;&#1083;&#1110;&#1082; &#1201;&#1072;&#1088;&#1099;&#1084;&#1099;: 14 &#1089;&#1072;&#1171;&#1072;&#1090;</p></div><div class="schedule-grid"><div class="day-card"><div class="day-title"><span>01</span><strong>&#1041;&#1110;&#1088;&#1110;&#1085;&#1096;&#1110; &#1082;&#1199;&#1085;</strong><small>&#1055;&#1088;&#1077;&#1079;&#1077;&#1085;&#1090;&#1072;&#1094;&#1080;&#1103;&#1171;&#1072; &#1076;&#1072;&#1081;&#1099;&#1085;&#1076;&#1099;&#1179;</small></div><div class="schedule-row"><time>09:30 — 10:00</time><p>&#1058;&#1088;&#1077;&#1085;&#1080;&#1085;&#1075;&#1082;&#1077; &#1179;&#1072;&#1090;&#1099;&#1089;&#1091;&#1096;&#1099;&#1083;&#1072;&#1088;&#1084;&#1077;&#1085; &#1090;&#1072;&#1085;&#1099;&#1089;&#1091;.<br>&#1058;&#1072;&#1085;&#1099;&#1089;&#1091;&#1076;&#1099;&#1187; &#1072;&#1088;&#1085;&#1072;&#1081;&#1099; &#1092;&#1086;&#1088;&#1084;&#1072;&#1089;&#1099;&#1085; &#1179;&#1086;&#1083;&#1076;&#1072;&#1085;&#1091;.</p></div><div class="schedule-row"><time>10:00 — 10:30</time><p>&#1050;&#1257;&#1087;&#1096;&#1110;&#1083;&#1110;&#1082; &#1072;&#1083;&#1076;&#1099;&#1085;&#1076;&#1072; &#1089;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091;&#1076;&#1110;&#1187; &#1085;&#1077;&#1075;&#1110;&#1079;&#1075;&#1110; &#1090;&#1199;&#1088;&#1083;&#1077;&#1088;&#1110;.</p></div><div class="schedule-row"><time>10:30 — 11:00</time><p>&#1055;&#1088;&#1077;&#1079;&#1077;&#1085;&#1090;&#1072;&#1094;&#1080;&#1103; &#1085;&#1099;&#1089;&#1072;&#1085;&#1072;&#1089;&#1099;. &#1057;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091;&#1076;&#1110;&#1187; &#1179;&#1201;&#1088;&#1099;&#1083;&#1099;&#1084;&#1099;: &#1082;&#1110;&#1088;&#1110;&#1089;&#1087;&#1077;, &#1085;&#1077;&#1075;&#1110;&#1079;&#1075;&#1110; &#1073;&#1257;&#1083;&#1110;&#1084;, &#1179;&#1086;&#1088;&#1099;&#1090;&#1099;&#1085;&#1076;&#1099;.</p></div><div class="schedule-row"><time>11:00 — 12:00</time><p>&#1045;&#1088;&#1082;&#1110;&#1085; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091; (&#1080;&#1084;&#1087;&#1088;&#1086;&#1074;&#1080;&#1079;&#1072;&#1094;&#1080;&#1103;) &#1076;&#1072;&#1171;&#1076;&#1099;&#1089;&#1099;.</p></div><div class="schedule-row"><time>12:00 — 13:00</time><p>&#1044;&#1077;&#1085;&#1077; &#1090;&#1110;&#1083;&#1110;. &#1178;&#1086;&#1083;&#1076;&#1099;&#1187; &#1179;&#1080;&#1084;&#1099;&#1083;&#1099;. &#1054;&#1088;&#1072;&#1090;&#1086;&#1088;&#1076;&#1099;&#1187; &#1090;&#1201;&#1088;&#1099;&#1089;&#1099;. &#1052;&#1077;&#1090;&#1072;&#1093;&#1072;&#1073;&#1072;&#1088;&#1083;&#1072;&#1084;&#1072;.</p></div><div class="break-row">&#1058;&#1199;&#1089;&#1082;&#1110; &#1072;&#1089;&#1082;&#1072; &#1199;&#1079;&#1110;&#1083;&#1110;&#1089;</div><div class="schedule-row"><time>14:00 — 15:00</time><p>&#1057;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091; &#1101;&#1085;&#1077;&#1088;&#1075;&#1077;&#1090;&#1080;&#1082;&#1072;&#1089;&#1099;. &#1057;&#1077;&#1079;&#1110;&#1084;, &#1101;&#1084;&#1086;&#1094;&#1080;&#1103;&#1083;&#1072;&#1088;&#1076;&#1099; &#1078;&#1077;&#1090;&#1082;&#1110;&#1079;&#1091; &#1073;&#1110;&#1083;&#1091;.</p></div><div class="schedule-row"><time>15:00 — 16:00</time><p>&#1040;&#1091;&#1076;&#1080;&#1090;&#1086;&#1088;&#1080;&#1103;&#1084;&#1077;&#1085; &#1082;&#1257;&#1079; &#1179;&#1072;&#1090;&#1099;&#1085;&#1072;&#1089; &#1201;&#1089;&#1090;&#1072;&#1087; &#1090;&#1201;&#1088;&#1091; &#1241;&#1076;&#1110;&#1089;&#1090;&#1077;&#1088;&#1110;.</p></div><div class="schedule-row"><time>16:00 — 18:00</time><p>&#1040;&#1091;&#1076;&#1080;&#1090;&#1086;&#1088;&#1080;&#1103; &#1085;&#1072;&#1079;&#1072;&#1088;&#1099;&#1085; &#1179;&#1072;&#1083;&#1072;&#1081; &#1201;&#1089;&#1090;&#1072;&#1087; &#1090;&#1201;&#1088;&#1072;&#1084;&#1099;&#1079;. &#1057;&#1201;&#1088;&#1072;&#1179;&#1179;&#1072; &#1078;&#1072;&#1091;&#1072;&#1087; &#1078;&#1241;&#1085;&#1077; &#1072;&#1091;&#1076;&#1080;&#1090;&#1086;&#1088;&#1080;&#1103;&#1084;&#1077;&#1085; &#1076;&#1080;&#1072;&#1083;&#1086;&#1075;.</p></div><div class="schedule-row"><time>17:30 — 18:00</time><p>&#1050;&#1077;&#1083;&#1077;&#1089;&#1110; &#1089;&#1072;&#1073;&#1072;&#1179;&#1090;&#1072; &#1089;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091;&#1075;&#1077; &#1072;&#1088;&#1085;&#1072;&#1083;&#1171;&#1072;&#1085; &#1072;&#1088;&#1085;&#1072;&#1081;&#1099; &#1090;&#1072;&#1179;&#1099;&#1088;&#1099;&#1087;&#1090;&#1072;&#1088;&#1076;&#1099; &#1090;&#1072;&#1083;&#1179;&#1099;&#1083;&#1072;&#1091;.</p></div></div><div class="day-card"><div class="day-title"><span>02</span><strong>&#1045;&#1082;&#1110;&#1085;&#1096;&#1110; &#1082;&#1199;&#1085;</strong><small>&#1054;&#1088;&#1072;&#1090;&#1086;&#1088;&#1076;&#1099;&#1187; &#1078;&#1072;&#1088;&#1179;&#1099;&#1085; &#1089;&#1257;&#1079;&#1110;</small></div><div class="schedule-row"><time>10:00 — 10:30</time><p>&#1044;&#1072;&#1091;&#1099;&#1089;&#1087;&#1077;&#1085; &#1078;&#1201;&#1084;&#1099;&#1089;. &#1044;&#1080;&#1082;&#1094;&#1080;&#1103;&#1085;&#1099; &#1076;&#1199;&#1088;&#1099;&#1089;&#1090;&#1072;&#1091; &#1072;&#1084;&#1072;&#1083;&#1076;&#1072;&#1088;&#1099;.</p></div><div class="schedule-row"><time>10:30 — 11:30</time><p>&#1057;&#1090;&#1086;&#1088;&#1080;&#1090;&#1077;&#1083;&#1083;&#1080;&#1085;&#1075;. &#1178;&#1099;&#1079;&#1099;&#1179;&#1090;&#1099; &#1086;&#1179;&#1080;&#1171;&#1072;&#1083;&#1072;&#1088;&#1076;&#1099; &#1078;&#1241;&#1085;&#1077; &#1241;&#1187;&#1075;&#1110;&#1084;&#1077;&#1083;&#1077;&#1088;&#1076;&#1110; &#1241;&#1089;&#1077;&#1088;&#1083;&#1110; &#1073;&#1072;&#1103;&#1085;&#1076;&#1072;&#1087; &#1199;&#1081;&#1088;&#1077;&#1085;&#1091;.</p></div><div class="schedule-row"><time>11:30 — 12:30</time><p>&#1050;&#1257;&#1087;&#1096;&#1110;&#1083;&#1110;&#1082; &#1072;&#1083;&#1076;&#1099;&#1085;&#1076;&#1072; &#1089;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091; &#1199;&#1088;&#1077;&#1081;&#1110;&#1085;&#1110;&#1187; &#1072;&#1083;&#1076;&#1099;&#1085;-&#1072;&#1083;&#1091; &#1078;&#1086;&#1083;&#1076;&#1072;&#1088;&#1099;.</p></div><div class="schedule-row"><time>12:30 — 13:00</time><p>&#1057;&#1257;&#1081;&#1083;&#1077;&#1091;&#1075;&#1077; &#1076;&#1072;&#1081;&#1099;&#1085;&#1076;&#1099;&#1179;. &#1057;&#1257;&#1079;&#1110;&#1187;&#1110;&#1079;&#1076;&#1110;&#1187; &#1073;&#1072;&#1089; &#1088;&#1077;&#1087;&#1077;&#1090;&#1080;&#1094;&#1080;&#1103;&#1089;&#1099;.</p></div><div class="break-row">&#1058;&#1199;&#1089;&#1082;&#1110; &#1072;&#1089;&#1179;&#1072; &#1199;&#1079;&#1110;&#1083;&#1110;&#1089;</div><div class="schedule-row"><time>14:00 — 16:00</time><p>&#1058;&#1088;&#1077;&#1085;&#1080;&#1085;&#1075;&#1090;&#1110;&#1187; &#1087;&#1088;&#1072;&#1082;&#1090;&#1080;&#1082;&#1072;&#1083;&#1099;&#1179; &#1073;&#1257;&#1083;&#1110;&#1075;&#1110;: &#1179;&#1072;&#1090;&#1099;&#1089;&#1091;&#1096;&#1099;&#1083;&#1072;&#1088;&#1076;&#1099;&#1187; &#1073;&#1077;&#1081;&#1085;&#1077;&#1082;&#1072;&#1084;&#1077;&#1088;&#1072; &#1072;&#1083;&#1076;&#1099;&#1085;&#1076;&#1072; &#1089;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091;&#1110;.</p></div><div class="schedule-row"><time>16:00 — 16:30</time><p>&#1057;&#1110;&#1079;&#1075;&#1077; &#1082;&#1077;&#1083;&#1077;&#1089;&#1110; &#1078;&#1086;&#1083;&#1099; &#1241;&#1088;&#1179;&#1072;&#1096;&#1072; &#1078;&#1072;&#1179;&#1089;&#1099; &#1089;&#1257;&#1079; &#1089;&#1257;&#1081;&#1083;&#1077;&#1091;&#1075;&#1077; &#1082;&#1257;&#1084;&#1077;&#1082;&#1090;&#1077;&#1089;&#1077;&#1090;&#1110;&#1085; 16 &#1082;&#1077;&#1187;&#1077;&#1089;.</p></div><div class="schedule-row"><time>16:30 — 17:30</time><p>&#1041;&#1077;&#1081;&#1085;&#1077; &#1090;&#1199;&#1089;&#1110;&#1088;&#1110;&#1083;&#1110;&#1084;&#1076;&#1110; &#1090;&#1072;&#1084;&#1072;&#1096;&#1072;&#1083;&#1072;&#1091;. &#1040;&#1088;&#1085;&#1072;&#1081;&#1099; &#1078;&#1199;&#1081;&#1077; &#1072;&#1088;&#1179;&#1099;&#1083;&#1099; &#1086;&#1088;&#1072;&#1090;&#1086;&#1088;&#1171;&#1072; &#1073;&#1072;&#1171;&#1072; &#1073;&#1077;&#1088;&#1091;.</p></div><div class="schedule-row"><time>17:30 — 18:00</time><p>&#1057;&#1077;&#1088;&#1090;&#1080;&#1092;&#1080;&#1082;&#1072;&#1090;&#1090;&#1072;&#1088;&#1076;&#1099; &#1090;&#1072;&#1073;&#1099;&#1089; &#1077;&#1090;&#1091;, &#1179;&#1072;&#1090;&#1099;&#1089;&#1091;&#1096;&#1099;&#1083;&#1072;&#1088;&#1076;&#1099;&#1187; &#1089;&#1086;&#1187;&#1171;&#1099; &#1090;&#1110;&#1083;&#1077;&#1082; &#1089;&#1257;&#1079;&#1076;&#1077;&#1088;&#1110;&#1085; &#1090;&#1099;&#1187;&#1076;&#1072;&#1091;.</p></div></div></div>';
document.querySelector('.media-links').before(schedule);
const scheduleIntroFinal = document.querySelector('.schedule .section-intro'); if (scheduleIntroFinal) scheduleIntroFinal.innerHTML = '&#1058;&#1088;&#1077;&#1085;&#1080;&#1085;&#1075; &#1201;&#1079;&#1072;&#1179;&#1090;&#1099;&#1171;&#1099;: 14 &#1089;&#1072;&#1171;&#1072;&#1090;<br>&#1058;&#1088;&#1077;&#1085;&#1077;&#1088;: &#1053;&#1201;&#1088;&#1083;&#1072;&#1085; &#1040;&#1079;&#1072;&#1084;&#1072;&#1090;&#1086;&#1074;';
const scheduleCards = document.querySelectorAll('.schedule-grid .day-card');
if (scheduleCards[1]) scheduleCards[1].remove();
if (scheduleCards[0]) { let cut = false; scheduleCards[0].querySelectorAll('.schedule-row').forEach((row) => { if (row.querySelector('time')?.textContent.trim().startsWith('16:00')) cut = true; if (cut) row.remove(); }); }
const certificates = document.createElement('section');
certificates.className = 'certificates section';
certificates.id = 'certificates';
certificates.innerHTML = '<div><p class="eyebrow">&#1057;&#1045;&#1056;&#1058;&#1048;&#1060;&#1048;&#1050;&#1040;&#1058;&#1058;&#1040;&#1056;</p><h2>&#1058;&#1241;&#1078;&#1110;&#1088;&#1080;&#1073;&#1077;&#1085;&#1110;<br><em>&#1088;&#1072;&#1089;&#1090;&#1072;&#1081;&#1099;&#1179;.</em></h2></div><div class="certificates-copy"><p>&#1053;&#1201;&#1088;&#1083;&#1072;&#1085; &#1040;&#1079;&#1072;&#1084;&#1072;&#1090;&#1086;&#1074;&#1090;&#1099;&#1187; &#1073;&#1110;&#1083;&#1110;&#1084;&#1110; &#1084;&#1077;&#1085; &#1089;&#1077;&#1088;&#1090;&#1080;&#1092;&#1088;&#1080;&#1082;&#1072;&#1090;&#1090;&#1072;&#1088;&#1099;&#1085;&#1099;&#1187; &#1078;&#1080;&#1085;&#1072;&#1171;&#1099;&#1085; Drive &#1087;&#1072;&#1087;&#1082;&#1072;&#1089;&#1099;&#1085;&#1072;&#1085; &#1082;&#1257;&#1088;&#1091;&#1075;&#1077; &#1073;&#1086;&#1083;&#1072;&#1076;&#1099;.</p><a class="button button-coral" href="https://drive.google.com/drive/folders/1YLjlncjndUYJ86nkRkgyD-6IqhHAUxxJ?usp=sharing" target="_blank" rel="noopener">&#1057;&#1077;&#1088;&#1090;&#1080;&#1092;&#1080;&#1082;&#1072;&#1090;&#1090;&#1072;&#1088;&#1076;&#1099; &#1082;&#1257;&#1088;&#1091; <span>↗</span></a></div>';
document.querySelector('.gallery').after(certificates);
const certLink = certificates.querySelector('a'); if (certLink) certLink.href = 'https://drive.google.com/drive/folders/12BPfRpNaDXNuGZ9H-7EWchXqUr53OM-Q';
const nav = document.querySelector('.site-header nav'); if (nav && !nav.querySelector('[href="#certificates"]')) { const link = document.createElement('a'); link.href = '#certificates'; link.textContent = kz(0x0421,0x0435,0x0440,0x0442,0x0438,0x0444,0x0438,0x043a,0x0430,0x0442,0x0442,0x0430,0x0440); nav.append(link); }
const fontLink = document.createElement('link'); fontLink.rel = 'stylesheet'; fontLink.href = 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&display=swap'; document.head.append(fontLink);
// Schedule screenshots are transcribed into the program section, so keep the gallery visual-only.
const visualGallery = [
  'assets/drive/photos/481510086_28816670704644510_3530916731107346624_n.jpg',
  'assets/drive/photos/483365109_28816670661311181_1426371898592760444_n.jpg',
  'assets/drive/photos/483528293_28821656594145921_3746918195898899378_n.jpg',
  'assets/drive/photos/506606089_30050761081235460_5702181368424452149_n.jpg'
];
const visualSplit = document.querySelector('.split-image img'); if (visualSplit) visualSplit.src = visualGallery[1];
document.querySelectorAll('.gallery-grid img').forEach((image, index) => image.src = visualGallery[index]);
const ambient = document.createElement('div');
ambient.className = 'ambient-bg';
const ambientImages = [
  'assets/drive/photos/481510086_28816670704644510_3530916731107346624_n.jpg',
  'assets/drive/photos/483528293_28821656594145921_3746918195898899378_n.jpg',
  'assets/drive/photos/481510086_28816670704644510_3530916731107346624_n.jpg'
];
ambientImages.forEach((src, index) => { const image = document.createElement('img'); image.src = src; image.alt = ''; if (index === 0) image.className = 'is-active'; ambient.append(image); });
document.body.prepend(ambient);
let ambientIndex = 0;
setInterval(() => { const frames = ambient.querySelectorAll('img'); frames[ambientIndex].classList.remove('is-active'); ambientIndex = (ambientIndex + 1) % frames.length; frames[ambientIndex].classList.add('is-active'); }, 7000);

// Keep the public page free from the old brand and city label.
const forbiddenLabels = /StageSpeak|STAGESPEAK|Almaty|ALMATY|Алматы/gi;
const cleanupWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (node = cleanupWalker.nextNode()) node.nodeValue = node.nodeValue.replace(forbiddenLabels, '');

// Shared fullscreen image viewer for posters, gallery photos and certificates.
const lightboxImages = () => Array.from(document.querySelectorAll('.hero-image img, .poster-image img, .split-image img, .gallery-grid img, .certificate-card img'));
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('aria-hidden', 'true');
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Жабу">×</button><button class="lightbox-prev" type="button" aria-label="Алдыңғы сурет">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lightbox-next" type="button" aria-label="Келесі сурет">›</button>';
document.body.append(lightbox);
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
let lightboxIndex = 0;
const showLightbox = (index) => {
  const images = lightboxImages(); if (!images.length) return;
  lightboxIndex = (index + images.length) % images.length;
  const image = images[lightboxIndex]; lightboxImage.src = image.currentSrc || image.src; lightboxImage.alt = image.alt || 'Сурет';
  lightboxCaption.textContent = (lightboxIndex + 1) + ' / ' + images.length;
  lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('lightbox-open');
};
const closeLightbox = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lightbox-open'); };
document.addEventListener('click', (event) => {
  const image = event.target.closest('.hero-image img, .poster-image img, .split-image img, .gallery-grid img, .certificate-card img');
  if (image) { event.preventDefault(); showLightbox(lightboxImages().indexOf(image)); return; }
  if (event.target === lightbox || event.target.closest('.lightbox-close')) closeLightbox();
  if (event.target.closest('.lightbox-prev')) showLightbox(lightboxIndex - 1);
  if (event.target.closest('.lightbox-next')) showLightbox(lightboxIndex + 1);
});
document.addEventListener('keydown', (event) => { if (!lightbox.classList.contains('is-open')) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') showLightbox(lightboxIndex - 1); if (event.key === 'ArrowRight') showLightbox(lightboxIndex + 1); });

// This is a personal website, so remove the organizer CTA and plural promo wording.
document.querySelector('.header-link')?.remove();
const descriptionMeta = document.querySelector('meta[name="description"]');
if (descriptionMeta) descriptionMeta.setAttribute('content', 'Нұрлан Азаматовтың шешендік өнер мектебі туралы ақпарат және жеке афиша.');
const personalCopy = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (node = personalCopy.nextNode()) {
  node.nodeValue = node.nodeValue.replace(/Шешендік өнерге арналған тренингтер афишасы\.?/gi, '');
}
const footerOnlyYear = document.querySelector('footer');
if (footerOnlyYear) footerOnlyYear.innerHTML = '<p>2026</p>';


// Local media imported from the shared Google Drive folder.
const drivePhotoNames = [
  '2A7A9455.JPG','2A7A9478.JPG','2A7A9584.JPG','2A7A9623.JPG','2A7A9632.JPG','2A7A9638.JPG','2A7A9651.JPG','2A7A9668.JPG',
  '481510086_28816670704644510_3530916731107346624_n.jpg','483365109_28816670661311181_1426371898592760444_n.jpg',
  '483528293_28821656594145921_3746918195898899378_n.jpg','506606089_30050761081235460_5702181368424452149_n.jpg',
  '508119233_30050761074568794_8412998690162479422_n.jpg','BA03D3EA-6101-4AC9-91A0-0F69C98DED42.jpeg',
  'Codex \u0441\u0443\u0440\u0435\u0442\u0456 2026 M08 18 12_49_47.png','IMG_9758.jpg'
];
const drivePhotos = drivePhotoNames.map((name) => 'assets/drive/photos/' + encodeURIComponent(name));
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid && drivePhotos.length) {
  galleryGrid.querySelectorAll('img').forEach((image, index) => { image.src = drivePhotos[index % drivePhotos.length]; image.loading = 'lazy'; });
  drivePhotos.slice(4).forEach((src, index) => {
    const image = document.createElement('img'); image.src = src; image.alt = 'Залдағы сәт ' + (index + 5); image.loading = 'lazy'; image.className = 'drive-gallery-image'; galleryGrid.append(image);
  });
}
if (ambient && drivePhotos.length) {
  ambient.querySelectorAll('img').forEach((image, index) => { image.src = drivePhotos[index % drivePhotos.length]; });
}
// Use real training-room photos for the animated background.
const trainingBackgrounds = [drivePhotos[8], drivePhotos[10], drivePhotos[8]];
if (ambient && trainingBackgrounds.length) {
  ambient.querySelectorAll('img').forEach((image, index) => { image.src = trainingBackgrounds[index % trainingBackgrounds.length]; });
}

// Certificates are displayed one by one from local project files.
const localCertificates = Array.from({length: 7}, (_, index) => 'assets/drive/certificates/certificate-' + (index + 1) + '.jpg');
if (certificates) {
  const externalCertificateLink = certificates.querySelector('a');
  if (externalCertificateLink) externalCertificateLink.remove();
  const certificateGrid = document.createElement('div'); certificateGrid.className = 'certificate-grid';
  localCertificates.forEach((src, index) => {
    const card = document.createElement('a'); card.className = 'certificate-card'; card.href = src; card.target = '_blank'; card.rel = 'noopener';
    card.innerHTML = '<img src="' + src + '" alt="Сертификат ' + (index + 1) + '" loading="lazy"><span>Сертификат ' + String(index + 1).padStart(2, '0') + ' ↗</span>';
    certificateGrid.append(card);
  });
  certificates.append(certificateGrid);
}
const oneDayScheduleTitle = document.querySelector('.schedule-grid .day-card .day-title strong');
if (oneDayScheduleTitle) oneDayScheduleTitle.textContent = '\u0411\u0456\u0440 \u043a\u04af\u043d\u0434\u0456\u043a \u0431\u0430\u0493\u0434\u0430\u0440\u043b\u0430\u043c\u0430';
const durationLine = document.querySelector('.schedule .section-intro');
if (durationLine) durationLine.innerHTML = '&#1058;&#1088;&#1077;&#1085;&#1077;&#1088;: &#1053;&#1201;&#1088;&#1083;&#1072;&#1085; &#1040;&#1079;&#1072;&#1084;&#1072;&#1090;&#1086;&#1074;';
// Replace every remaining poster/hero placeholder with real local training photos.
const localTrainingPhotos = [drivePhotos[8], drivePhotos[10], drivePhotos[8], drivePhotos[10]];
const heroLocal = document.querySelector('.hero-image img'); if (heroLocal) heroLocal.src = localTrainingPhotos[0];
const aboutLocal = document.querySelector('.split-image img'); if (aboutLocal) aboutLocal.src = localTrainingPhotos[1];
document.querySelectorAll('.poster-image img').forEach((image, index) => { image.src = localTrainingPhotos[index % localTrainingPhotos.length]; });
fetch('media.php').then((response) => response.ok ? response.json() : null).then((media) => {
  if (!media) return;
  const uploadedGallery = media.gallery || [];
  const uploadedCertificates = media.certificates || [];
  const mainBackgrounds = media.main_backgrounds || [];
  const ambientBackgrounds = media.ambient_backgrounds || [];
  if (mainBackgrounds[0]) document.querySelector('.hero-image img')?.setAttribute('src', mainBackgrounds[0]);
  if (ambientBackgrounds.length) ambient.querySelectorAll('img').forEach((image, index) => image.src = ambientBackgrounds[index % ambientBackgrounds.length]);
  const currentGallery = document.querySelector('.gallery-grid');
  const existingNames = new Set(Array.from(document.images).map((image) => decodeURIComponent((image.src || '').split('/').pop())));
  uploadedGallery.forEach((src, index) => { const name = decodeURIComponent(src.split('/').pop()); if (existingNames.has(name)) return; const image = document.createElement('img'); image.src = src; image.alt = 'Галерея ' + (index + 1); image.loading = 'lazy'; image.className = 'uploaded-gallery-image'; currentGallery?.append(image); existingNames.add(name); });
  const certGrid = document.querySelector('.certificate-grid');
  uploadedCertificates.forEach((src, index) => { const name = decodeURIComponent(src.split('/').pop()); if (existingNames.has(name)) return; const card = document.createElement('a'); card.className = 'certificate-card'; card.href = src; card.target = '_blank'; card.rel = 'noopener'; card.innerHTML = '<img src="' + src + '" alt="Сертификат" loading="lazy"><span>Сертификат ' + String(index + 1).padStart(2, '0') + ' ↗</span>'; certGrid?.append(card); existingNames.add(name); });
}).catch(() => {});

// Keep the ticker continuously filled while it loops.
const tickerTrack = document.querySelector('.ticker>div');
if (tickerTrack) {
  const tickerCopy = tickerTrack.textContent.trim();
  tickerTrack.replaceChildren(
    Object.assign(document.createElement('span'), { className: 'ticker-copy', textContent: tickerCopy }),
    Object.assign(document.createElement('span'), { className: 'ticker-copy', textContent: tickerCopy, ariaHidden: 'true' })
  );
}
