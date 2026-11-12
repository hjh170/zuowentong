// 作文通 冒烟测试：把测试驱动拼在同一作用域执行，最小 DOM 桩
const fs = require("fs");
const vm = require("vm");

class Node {
  constructor() {
    this.innerHTML = ""; this.className = ""; this.style = {}; this.value = "";
    this.disabled = false; this.onclick = null; this.oninput = null;
    this.textContent = ""; this.selectionStart = 0; this.selectionEnd = 0;
    this.offsetLeft = 0; this.offsetWidth = 0; this.parentElement = null;
  }
  querySelectorAll() { return []; }
  addEventListener() {}
  closest() { return null; }
  appendChild() {}
  remove() {}
  click() {}
  focus() {}
  getAttribute() { return ""; }
  setAttribute() {}
}
const store = {};
const ctx = {
  console,
  window: { addEventListener() {}, scrollTo() {}, scrollY: 0, location: { protocol: "file:" } },
  history: { pushState() {}, replaceState() {} },
  navigator: {},
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
  },
  document: {
    querySelector: () => new Node(),
    querySelectorAll: () => [],
    createElement: () => new Node(),
    body: new Node(),
    addEventListener() {},
    getElementById: () => null,
  },
  setTimeout, Date, Math, JSON,
};
ctx.globalThis = ctx;
vm.createContext(ctx);

store["zwt3"] = JSON.stringify({ v: 3, xp: 120, done: [0, 1], stars: { 0: 3, 1: 2 }, stat: {}, fav: [], streak: 3, last: "", mute: 0, right: 9, wrong: 2 });

const app = fs.readFileSync("/tmp/app.js", "utf8");
const driver = `
(function(){
  const out=[];
  const step=(n,f)=>{try{f();out.push("OK   "+n)}catch(e){out.push("FAIL "+n+" → "+e.message)}};
  step("启动 home()",()=>home&&typeof home==="function");
  step("迁移后进度保留",()=>{if(S.done.length!==2)throw new Error("done="+S.done.length);if(S.xp!==120)throw new Error("xp="+S.xp);if(!localStorage.getItem("zwt4"))throw new Error("未写 zwt4")});
  step("好句宝库(全部)",()=>goLib(2));
  step("宝库分页切换",()=>lib(3));
  step("学习报告",()=>goReport());
  step("作文欣赏列表",()=>goEssays());
  step("范文详情",()=>goEssay(0));
  step("返回上一层",()=>goBack());
  step("进入第 0 关",()=>goLevel(0));
  step("答题一轮",()=>{
    const before={r:S.right,w:S.wrong};
    start(0);
    for(let i=0;i<3;i++){
      const q=L.q[L.i];
      if(q.t==="order"){L.sel=q.a.map((_,k)=>k)}else{L.sel=q.o.indexOf(q.a)}
      check();
      if(L.hp<=0)break;
      next();
    }
    const after={r:S.right,w:S.wrong};
    if(after.r-before.r!==3)throw new Error("正确计数异常 "+before.r+"→"+after.r);
  });
  step("统计去重生效",()=>{const k=Object.keys(S.stat);if(k.length!==3)throw new Error("stat 条数="+k.length)});
  step("仿写页",()=>goEditor(0));
  step("返回首页",()=>goHome());
  step("复习模式",()=>goReview(false));
  step("错题只练",()=>goRetry());
  step("清空进度后不崩",()=>{S=fresh();save();goHome()});
  return out;
})()
`;
// 直接把 app 与驱动拼在同一个 Script 作用域里执行
const combined = app + "\n" + driver;
const result = vm.runInContext(combined, ctx, { filename: "combined.js" });
let bad = 0;
for (const line of result) { if (line.startsWith("FAIL")) bad++; console.log(line); }
console.log(bad ? `\n${bad} 项失败` : "\n全部通过");
