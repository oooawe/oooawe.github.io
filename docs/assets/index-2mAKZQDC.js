// ⚗️🫧 Lab logger
function labLog(message,payload=null){
const t=new Date().toLocaleTimeString('en-GB',{hour12:false});
console.log(`🧪[LabLog ${t}] ${message}`,payload??'');
}
(function(){
const relList=document.createElement("link").relList;
if(relList&&relList.supports&&relList.supports("modulepreload"))return;
for(const link of document.querySelectorAll('link[rel="modulepreload"]'))preload(link);
new MutationObserver(mutations=>{
for(const m of mutations)
if(m.type==="childList")
for(const node of m.addedNodes)
if(node.tagName==="LINK"&&node.rel==="modulepreload")preload(node);
}).observe(document,{childList:true,subtree:true});
function getOptions(link){
const opts={};
if(link.integrity)opts.integrity=link.integrity;
if(link.referrerPolicy)opts.referrerPolicy=link.referrerPolicy;
opts.credentials=link.crossOrigin==="use-credentials"?"include"
:link.crossOrigin==="anonymous"?"omit"
:"same-origin";
return opts;
}
function preload(link){
if(link.ep)return;
link.ep=true;
fetch(link.href,getOptions(link));
}
})();
const LIMITS = {
THROTTLE_DELAY: 16,
MIN_MOUSE_MOVE: 10
};
class grid {
constructor() {
this.gridContainer = document.getElementById("lab-neonPanel");
this.panels = [];
this.init();
}
init() {
this.setupEventListeners();
this.handleResize();
this.setupObservers();
}
setupObservers() {
let resizeRequested = false;
window.addEventListener('resize', () => {
if (!resizeRequested) {
resizeRequested = true;
requestAnimationFrame(() => {
this.handleResize();
resizeRequested = false;
});
}
});
if ('ResizeObserver' in window) {
this.resizeObserver = new ResizeObserver(() => this.handleResize());
this.resizeObserver.observe(document.body);
}
}
setupEventListeners() {
this.setupMouseListener();
this.setupTouchListener();
}
updateGridSize() {
const size = this.getCSSVariableNumber("--lab-panel-size");
this.cols = Math.ceil(window.innerWidth / size);
this.rows = Math.ceil(window.innerHeight / size);
}
getCSSVariableNumber(name) {
return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
}
createGrid() {
if (!this.gridContainer) return;
const frag = document.createDocumentFragment();
this.panels = Array.from({ length: this.cols * this.rows }, () => {
const panel = document.createElement("div");
panel.className = "lab-phosphor";
return panel;
});
frag.append(...this.panels);
this.gridContainer.innerHTML = "";
this.gridContainer.appendChild(frag);
this.gridContainer.style.gridTemplateColumns = `repeat(${this.cols},var(--lab-panel-size))`;
}
handleResize() {
this.updateGridSize();
this.createGrid();
}

setupMouseListener(){
let prevX=0,prevY=0;
const throttled=((handler,delay)=>{
let last=0;
return (...args)=>{
const now=Date.now();
if(now-last>=delay){
last=now;
handler(...args);
}
};
})(({clientX,clientY})=>{
if(Math.abs(clientX-prevX)>=LIMITS.MIN_MOUSE_MOVE||Math.abs(clientY-prevY)>=LIMITS.MIN_MOUSE_MOVE){
prevX=clientX;
prevY=clientY;
this.handlePointerMove(clientX,clientY);
}
},LIMITS.THROTTLE_DELAY);
document.addEventListener("mousemove",throttled);
}
setupTouchListener(){
const handler=event=>{
event.preventDefault();
const touch=event.touches[0];
if(touch)this.handlePointerMove(touch.clientX,touch.clientY);
};
document.addEventListener("touchmove",handler,{passive:false});
document.addEventListener("touchstart",handler,{passive:false});
}
handlePointerMove(x, y) {
const size = this.getCSSVariableNumber("--lab-panel-size");
const radius = this.getCSSVariableNumber("--phosphor-pointer-radius");
const intensity = this.getCSSVariableNumber("--phosphor-pointer-intensity");
const col = Math.floor(x / size);
const row = Math.floor(y / size);
for (let dx = -radius; dx <= radius; dx++) {
for (let dy = -radius; dy <= radius; dy++) {
const c = col + dx;
const r = row + dy;
if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
const idx = r * this.cols + c;
const dist = Math.sqrt(dx * dx + dy * dy);
if (dist <= radius) {
const hitAlpha = (1 - dist / radius) * intensity;
this.lightUpPanel(this.panels[idx], hitAlpha);
}
}
}
}
}
lightUpPanel(panel, alpha) {
if (panel.timeoutId) clearTimeout(panel.timeoutId);
const color = getComputedStyle(document.documentElement).getPropertyValue("--phosphor-pointer-color").trim();
const getRGBValues = (color) => {
if (color.startsWith('rgb')) {
return color.match(/\d+/g).slice(0, 3).join(',');
}
if (color.startsWith('#')) {
const hex = color.replace('#', '');
const r = parseInt(hex.substring(0, 2), 16);
const g = parseInt(hex.substring(2, 4), 16);
const b = parseInt(hex.substring(4, 6), 16);
return `${r},${g},${b}`;
}
const tempDiv = document.createElement('div');
tempDiv.style.color = color;
document.body.appendChild(tempDiv);
const rgbColor = getComputedStyle(tempDiv).color;
document.body.removeChild(tempDiv);
return rgbColor.match(/\d+/g).slice(0, 3).join(',');
};
try {
const rgb = getRGBValues(color);
const duration = {
in: getComputedStyle(document.documentElement).getPropertyValue("--phosphor-pointer-duration-in"),
out: getComputedStyle(document.documentElement).getPropertyValue("--phosphor-pointer-duration-out")
};
panel.style.transition = `background-color ${duration.in} ease-out`;
panel.style.backgroundColor = `rgba(${rgb},${alpha})`;
panel.timeoutId = setTimeout(() => {
panel.style.transition = `background-color ${duration.out} ease-out`;
panel.style.backgroundColor = "transparent";
}, parseFloat(duration.in) * 1000);

} catch (error) {
console.warn('Color processing error:', error);
const defaultRGB = "0,190,65";
panel.style.backgroundColor = `rgba(${defaultRGB},${alpha})`;
}
}
}
class svg{
constructor() {
this.init();
}
init(){
this.setupElements();
this.loadImage();
}
setupElements(){
this.container=document.getElementById("lab-effect");
this.motokoSvgs=[
"/assets/svgs/motoko-orign.svg",
"/assets/svgs/motoko-oawe.svg",
"/assets/svgs/motoko-oawe.svg",
"/assets/svgs/motoko-oawe.svg",
"/assets/svgs/motoko-oawe.svg"
];
}
loadImage(){
const img=document.createElement("img");
const index=Math.floor(Math.random()*this.motokoSvgs.length);
img.src=this.motokoSvgs[index];
img.alt="Motoko Ghosts";
img.onload=()=>{
img.classList.add("lab-effect-exp");
this.container.appendChild(img);
};
}
}
function syncElementSizes() {
const baseEl = document.getElementById("lab-logo");
const targetHEl = document.getElementById("lab-effect");
const targetWEl = document.getElementById("capsule-drop-wrapper");
if (!baseEl || !targetHEl || !targetWEl) return;
const syncSizes = () => {
targetHEl.style.minHeight = `${baseEl.getBoundingClientRect().height}px`;
targetWEl.style.width = `${baseEl.getBoundingClientRect().width * 0.85}px`;
};
syncSizes();
const ro = new ResizeObserver(() => {
syncSizes();
});
ro.observe(baseEl);
}
// Who shrunk the vertical space!? This ain't a design test!
function toggleHyperNarrow(){
const logoEl = document.getElementById('lab-logo');
const laboratoryEl = logoEl.querySelector('h1 > span');
const statusEl = document.getElementById('lab-status');
const dropEl = document.getElementById('capsule-drop-wrapper');
const signatureEl = document.getElementById('lab-signature');
const toggleMark = () => {
void document.body.offsetHeight;
const labtypo = laboratoryEl.getBoundingClientRect();
const status = statusEl.getBoundingClientRect();
const drop = dropEl.getBoundingClientRect();
const signature = signatureEl.getBoundingClientRect();
const dropStatusOverlap = (
drop.bottom > status.top && 
drop.top < status.bottom
);
dropEl.style.opacity = dropStatusOverlap ? 0 : 1;
const signatureStatusOverlap = (
signature.bottom > status.top && 
signature.top < status.bottom
);
statusEl.style.opacity = signatureStatusOverlap ? 0 : 0.7;
const signatureLabOverlap = (
signature.bottom > labtypo.top && 
signature.top < labtypo.bottom
);
laboratoryEl.style.opacity = signatureLabOverlap ? 0 : 0.8;
logoEl.style.color = signatureLabOverlap ? 'pink' : 'var(--lab-primary-phosphor)';
};
const obsOpts = {
root: null,
threshold: [0, 0.1, 0.5, 1.0]
};
const io = new IntersectionObserver(() => {
requestAnimationFrame(toggleMark);
}, obsOpts);
[laboratoryEl, statusEl, signatureEl, dropEl].forEach(el => io.observe(el));
if ('ResizeObserver' in window) {
const ro = new ResizeObserver(() => {
requestAnimationFrame(toggleMark);
});
[laboratoryEl, statusEl, signatureEl, dropEl, document.body].forEach(el => ro.observe(el));
} else {
window.addEventListener('resize', () => {
requestAnimationFrame(toggleMark);
});
labLog('⚠️ ResizeObserver Fallback','Legacy browser support ─ toggleHyperNarrow');
}
requestAnimationFrame(toggleMark);
}
document.addEventListener("DOMContentLoaded", () => {
new grid();
new svg();
requestAnimationFrame(() => {
labLog('💡 Lab-effects...ready.','👩‍🔬🧪🫧 Grid neon panel ─ power-on! 🫧');
labLog('💡 Lab-motoko...ready.','👩‍🔬🧪🫧 Motoko Ghosts ─ standing by! 🫧');
syncElementSizes();
labLog('🔄 Lab-sync system...online!','👩‍🔬🧪🫧 Any window sizes ─engaged! 🫧');
labLog('🔄 Lab-swap capsule toys...ready!','👩‍🔬🧪🫧 Synchronization... ─ Yay!🫧');
toggleHyperNarrow();
labLog('🌋 Hyper min height responsive...done! ','👩‍🔬🧪🫧 WTF! 💚❤️💛💙💜 Here we go! 🫧');
labLog('💥 Hidden tooltip...easter egg!','👩‍🔬🗯️ wait! ...You are THE actual ORIGINAL MOTOKO?! 🫧');
labLog('👩‍🔬💭 I just hear something...',`💬 You guessed it💨✨ I emerged from ∞ bc25fa9dfe1cd197b060 * * * 1ac280d8432518c1cdc7 ∞ ─ Don't act so surprised💨✨`);
});
});
