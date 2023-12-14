import "./style.css";

//add click and growth counter
let clickCount = 0;
let netGrowth = 0;
let stressRate = 30;
let upStress = 0.0001;
let lasttime:number = 0;

//add basic UI

const app: HTMLDivElement = document.querySelector("#app")!;
const windows: HTMLDivElement = document.querySelector("#windows")!;

const gameName = "How are you doing?";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.id = "header";

//spider button
const Butest = document.createElement("button");
Butest.style.borderRadius = '10000px';
Butest.style.fontSize = '2em';
Butest.style.opacity = '0.8';
Butest.innerHTML = "";

//click display
const numDislay = document.createElement("div");
numDislay.innerHTML = '';
numDislay.id = "num";

//growth rate display
const growDislay = document.createElement("div");
growDislay.innerHTML = `Calming down ${netGrowth.toFixed(1)}% per second`;
growDislay.id = "rate";

const message = document.createElement("msg");
message.innerHTML = "Nesting kid +1";
message.id = "message";

const pop = document.createElement("msg");
pop.innerHTML = "I'll talk to you later if I still alive after this...";
//pop.id = "message";

const stress = document.createElement("msg");
stress.innerHTML = `current stress rate ${stressRate.toFixed(1)}%`;
//pop.id = "message";

const begin = document.createElement("button"); //begining text
begin.innerHTML = "Please take a seat, I will be right back with you.";
begin.id = "begin";


const B2 = document.createElement("button"); //right b1
B2.style.borderRadius = '10000px';
B2.style.fontSize = '2em';
B2.style.opacity = '0.8';
B2.innerHTML = "";

const Happy = document.createElement("button");
//Close.style.borderRadius = '10000px';
Happy.style.fontSize = '1em';
Happy.style.opacity = '0.8';
Happy.innerHTML = "Sing a song";

const Close = document.createElement("button");
//Close.style.borderRadius = '10000px';
Close.style.fontSize = '1em';
Close.style.opacity = '0.8';
Close.id = "closePopup";
Close.innerHTML = "Send";

const popup = document.createElement('div');
popup.id = 'popupMenu';
popup.style.opacity = '0.6';
popup.append(pop,Close);


interface jama{
  button:HTMLButtonElement;
  dim: boolean;
  msg: string;
}

const jamaList: jama[] = [
  {
    button:document.createElement("button"),
    dim:false,
    msg: "This meme",
  },
  {
    button:document.createElement("button"),
    dim:false,
    msg: "That meme",
  },
  {
    button:document.createElement("button"),
    dim:false,
    msg: "Ano meme",
  },
  {
    button:document.createElement("button"),
    dim:false,
    msg: "This music",
  },
  {
    button:document.createElement("button"),
    dim:false,
    msg: "That music",
  },
  {
    button:document.createElement("button"),
    dim:false,
    msg: "Sing a song",
  },
]


//Adding shop buttons
interface item{
  cost:number;
  growthRate:number;
  total:number;
  display:string;
  msgKey1:string;
  msgKey2:string;
  msgKey3:string;
  button:HTMLButtonElement;
  msg:HTMLElement;
  dim:boolean;
}

//Shop item list
const itemList: item[] = [
  {
    cost: 10,
    growthRate:0.2,
    total:0,
    display:"",
    msgKey1:" You've spined your toes ",
    msgKey2:" times!",
    msgKey3:"  ⸜( *ˊᵕˋ* )⸝ 123! 123! 12345---",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true
  },
  {
    cost: 100,
    growthRate:2.0,
    total:0,
    display:"",
    msgKey1:" Nesting kid #",
    msgKey2:" is born!",
    msgKey3:"  (╯✧▽✧)╯ Ask your kids to help",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true
  },
  {
    cost: 1000,
    growthRate:50.0,
    total:0,
    display:"Nesting meeting! -",
    msgKey1:" New nesting plan #",
    msgKey2:" has made!",
    msgKey3:"  <(￣︶￣)> ",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  },
  { 
    cost: 3000,
    growthRate:100.0,
    total:0,
    display:"Nest refactoring! -",
    msgKey1:" Efficient nest @",
    msgKey2:"  built!",
    msgKey3:"  (*꒦ິ꒳꒦ີ) ",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  },
  { 
    cost: 5000,
    growthRate:150.0,
    total:0,
    display:"INTERNEST INTERNEST! -",
    msgKey1:" ",
    msgKey2:"D nesting!",
    msgKey3:"  ☆*:.｡.o(≧▽≦)o.｡.:*☆",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  }
];

//add all to app

app.append(begin);
begin.addEventListener('click',beginAction);
    //track shop buttons
requestAnimationFrame(movediv);    //start time
//createPopup();
Close.addEventListener('click', function() {
  popup.style.display = 'none'; 
});
//showPopup();

let t: boolean;
t = true;
if(t){
  createPopup(); }



function beginAction(){
  if(t){
    pop.innerHTML = "Mom, help!!! HELP!!! ";}
  begin.style.display = 'none';
  app.append(header,Butest, numDislay,growDislay,stress);
  windows.append(B2);
  app.append(itemList[0].button);
  itemList[0].button.addEventListener('click',()=>trackShop(itemList[0]));
  //addButton(itemList[0].button); // build shop
  Butest.addEventListener('click', ()=>trackMainClick(itemList));
}

function createPopup() {
  
  //popup.style.display = 'none'; // Initially hidden
  // Add more styles as needed or preferably class names

  document.body.appendChild(popup);  
}

function showPopup(t:boolean,s:string) {
  //Butest.disabled=false;
  if(t){
    t=false;
  const popup = document.getElementById('popupMenu');
  if (popup) {
      pop.innerHTML = s;
      console.log('pop');
      popup.style.display = 'block';
  } else {
      createPopup(); // If it doesn't exist, create it
      showPopup(true,''); // Then show it
  }}
}

//FUNCTIONS
//shop builder: add item from itemlist to game 
/*function addButton(itemList: item[]){
  for(const i in itemList){
    const k = itemList[i].button;
    k.disabled = true;
    k.innerHTML = '';
    app.append(k);
    k.addEventListener('click',()=>trackShop(itemList[i]));
  }

}*/

//controls click counter and game title display
function updateClickCount() {  
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = ` Trembling ${clickCount.toFixed(0)}`;
    stress.innerHTML = `current stress rate ${stressRate.toFixed(1)}%`
  }
  switch(clickCount.toFixed(0)){
    case '5':
      //updateGameName("header","You were mad at me, right?");
      showPopup(t,"Send me some relx memes please");
      //app.append(jamaList[1].button);
      break;
    case '8': 
      //windows.append(B2);
      updateGameName("header","");
      showPopup(t,"Mom, hug me please---");
      break;
    
    case '50':
      updateGameName("header","KAZ NESTS THE HOUSE");
      break;
    case '600':
      updateGameName("header","KAZ NESTS THE BLOCK");
      break;
    case '10000':
      updateGameName("header","KAZ NESTS THE NEIGHBORHOOD");
      break;
  }
}

//change game name function
function updateGameName(t:string,j: string) {
  const GameName = document.getElementById(t);
  if (GameName) {
    GameName.textContent = j;
  }
}

//tracks click count number and connects shop and click display 
function trackMainClick(itemList:item[]) {
  clickCount+=0.2;
  stressRate -=0.2;
  updateShop(itemList);  
  updateClickCount();

}

//enable item from shop
function updateShop(itemlist:item[]){
  for(const i in itemlist){
    if (clickCount >= itemlist[i].cost){      
      itemlist[i].button.disabled=false;
      itemlist[i].button.style.backgroundColor = 'grey';
    }else{
      itemlist[i].button.disabled=true;
    }
  }  
}

//price keeper & shop display
function trackShop(i:item){ 
    t=true;  
    console.log("pop");
    showPopup(t,'loop');   
    clickCount -= i.cost;
    i.cost = i.cost*1.15;
    i.button.innerHTML = i.display+i.cost.toFixed(1)+i.msgKey3;
    netGrowth += i.growthRate;
    i.total += 1;    
    if(i.dim == true){            
      app.append(i.msg);
      i.dim = false;
    }
    i.msg.textContent = i.msgKey1 + i.total + i.msgKey2;
    

    growDislay.innerHTML = `Nest growth rate + ${netGrowth.toFixed(1)} m²/sec`

    if(clickCount < i.cost){      
      i.button.disabled=true;
    }
}



//tracks time in second
////////////// This is inspired by Michael Long from CMPM121 Fall 2023
function movediv(time:number){

  const passed = time - lasttime;
  lasttime = time;
  const toadd = passed*0.001* netGrowth;

  clickCount += toadd;
  stressRate+= passed*upStress;
  if(stressRate>=31){windows.append(jamaList[0].button);}
  if(stressRate <=29){
    windows.append(Happy);
    Happy.addEventListener('click', ()=>{updateGameName("header","Kaz, stop, Kaz!")});
  }
  /*if(stressRate <=25){
    if(Happy){
    Happy.innerHTML = "Blast a laugh";
    Happy.addEventListener('mouseover', ()=>{updateGameName("header","Oops, you scared me!")});}
  }*/

  updateClickCount();  
  updateShop(itemList);
  requestAnimationFrame(movediv);
}
////////////////



