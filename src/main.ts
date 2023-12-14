import "./style.css";

//add click and growth counter
let clickCount = 0;
let netGrowth = 0;
let stressRate = 70;
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
growDislay.innerHTML = "-";
growDislay.id = "rate";

const message = document.createElement("msg");
message.innerHTML = "";
message.id = "message";

const pop = document.createElement("msg");
pop.innerHTML = "I'll talk to you later if I'm still alive after this...";
//pop.id = "message";

const stress = document.createElement("msg");
stress.innerHTML = `current stress rate ${stressRate.toFixed(1)}%`;
//pop.id = "message";

let  away:number = 0;
let fillingRate:number = 0;
const fillingStatus = document.createElement("msg");
fillingStatus.innerHTML = `${away.toFixed(1)}% filling finished`;
fillingStatus.style.position= 'absolute';
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
Happy.innerHTML = "";
Happy.disabled = true;



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


if (away >= 100){
  pop.innerHTML = "That's it for today!"
  fillingStatus.innerHTML = `Filled: 100%`;
}

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
    growthRate:0.05,
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
    cost: 20,
    growthRate:1,
    total:0,
    display:"",
    msgKey1:" She grabed the #",
    msgKey2:" drill",
    msgKey3:"  (╯✧▽✧)╯ Count Dr. Riley's hand action",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true
  },
  {
    cost: 100,
    growthRate:2,
    total:0,
    display:"",
    msgKey1:" New tech product #QWY5",
    msgKey2:" has been released!",
    msgKey3:"  <(￣︶￣)> Listen to TV ads",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  },
  { 
    cost: 200,
    growthRate:3,
    total:0,
    display:"",
    msgKey1:" (*&^^&*VFGTYH",
    msgKey2:"  &$%^YTFH",
    msgKey3:"  (*꒦ິ꒳꒦ີ) ",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  },
  { 
    cost: 500,
    growthRate:10.0,
    total:0,
    display:"",
    msgKey1:" Ants have ",
    msgKey2:" feet",
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

let hCounter: number = 0;
let lightMsg: string[] = [
  "Back for a tune-up? Let's make that smile sparkle again!",
  "Just like a car, every smile sometimes needs a little refilling.",
  "Round two for your tooth, but don't worry, it'll be good as new!",
  "We're not just filling a tooth, we're restoring your brilliant smile!",
  "A little refill today for a lot more smiles tomorrow.",
  "Think of this as a spa day for your tooth, a little pampering is due!"
];
let darkMsg: string[] = [
  "This might hurt more than last time...",
  "Your screams will echo, but no one will hear.",
  "The tooth's pain is just the beginning.",
  "Feel the drill, it's like whispers from the abyss.",
  "I'll carve a smile that will never fade.",
  "Each refill brings you closer to the eternal silence.",
  "You can't escape the chair once the filling starts.",
  "The deeper I drill, the darker it gets.",
  "Your mouth can't scream when it's wide open.",
  "Shh, the pain is just a lullaby.",
  "This tooth will haunt more than just your mouth.",
  "Feel the shadows wrap around each tooth.",
  "The filling is permanent, like your stay here.",
  "Not just filling a tooth, I'm sealing your fate.",
  "This won't be just a refill, but a full takeover.",
  "As the drill whirs, so does the void inside.",
  "Your tooth's cavity is nothing compared to the void.",
  "The chair is a portal, the drill is the key.",
  "With each refill, a part of you stays forever.",
  "Don't worry, this pain is just the prelude."
];

windows.append(message,Happy);
//Happy.disabled = false;
Happy.addEventListener('click', Sing);

function updateFilling(){
  windows.append(fillingStatus);
  fillingStatus.innerHTML = `${away.toFixed(1)}% filling finished`;
}

function Sing(){
  if(hCounter<10){
    console.log("HAPPY");
    message.innerHTML =lightMsg[hCounter%5];
  }
  else{
  let randomNumber: number = Math.floor(Math.random() * 20);
  message.innerHTML = darkMsg[randomNumber];
  stressRate+=2;}
  hCounter++;
}


function beginAction(){
  if(t){
    pop.innerHTML = "Byebye mommy ;_; ";}
  begin.style.display = 'none';
  Happy.disabled = false;
  app.append(header,Butest, numDislay,growDislay,stress);
  //windows.append(B2);
  //B2.innerHTML = "meme";
  //app.append(itemList[0].button);
  //itemList[0].button.addEventListener('click',()=>trackShop(itemList[0]));
  addButton(itemList); // build shop
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
function addButton(itemList: item[]){
  for(const i in itemList){
    const k = itemList[i].button;
    k.disabled = true;
    k.innerHTML = '';
    app.append(k);
    k.addEventListener('click',()=>trackShop(itemList[i]));
  }

}

//controls click counter and game title display
function updateClickCount() {  
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = ` Trembling ${clickCount.toFixed(0)}`;
    stress.innerHTML = `current stress rate ${stressRate.toFixed(1)}%`
  }
  switch(clickCount.toFixed(0)){
    case '5':
      updateGameName("header","Are you ready?");
      showPopup(t,"Send me some relax memes please");
      //app.append(jamaList[1].button);
      break;
    case '8': 
      //windows.append(B2);
      updateGameName("header","Kaz, put on this glasses for me please.");
      showPopup(t,"Mom, hug me when I come back");
      break;
    case '14': 
      //windows.append(B2);
      updateGameName("header","It wouldn't be very hurt, alright?");
      showPopup(t,"Uhhh, It's literally my first time!");      break;
    case '30':      //windows.append(B2);
      
      showPopup(t,"OMG I'm shaking.");      break;
    case '32':       
      showPopup(t,"My toes are not relaxed.");      break;
    case '50':
      showPopup(t,"I'm sweating!!");
      break;
    case '60':
      showPopup(t,"Kaz is gonna be alright!!!");
      break;
      case '80':
        showPopup(t,"Kaz is gonna be alright!!!");
        break;
    case '1000':
      showPopup(t,"@#%^&");
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
  stressRate -=0.1;
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
    showPopup(t,'AHHHHHHHHHH');   
    clickCount -= i.cost;
    i.cost = i.cost*1.1;
    i.button.innerHTML = i.display+i.cost.toFixed(1)+i.msgKey3;
    netGrowth += i.growthRate;
    i.total += 1;    
    stressRate -= i.growthRate*10;
    if(i.dim == true){            
      app.append(i.msg);
      i.dim = false;
    }
    i.msg.textContent = i.msgKey1 + i.total + i.msgKey2;
    

    growDislay.innerHTML = `Calming down ${(netGrowth*0.01).toFixed(3)}% per second`;

    if(clickCount < i.cost){      
      i.button.disabled=true;
    }
}

function updateChecker(checker: number,negstress: number,bond: number){
  if(bond<checker){
    stressRate -= negstress;
  }
  bond +=1;
}

let tearCounter : number = 0;
jamaList[0].button.addEventListener('mouseover',()=>{updateChecker(5,5,tearCounter)});
//tracks time in second
////////////// This is inspired by Michael Long from CMPM121 Fall 2023
function movediv(time:number){

  const passed = time - lasttime;
  lasttime = time;
  const toadd = passed*0.001* netGrowth;

  clickCount += toadd;
  away += passed*0.001* fillingRate;
  const stressHolder = (passed*upStress) - netGrowth*0.001;

  stressRate+= stressHolder;

  if(stressRate>=99){
    upStress=0;
    stressRate =99;
    //updateGameName("header","Kaz! Kaz!!! Wake up!! NOOOOO ")
  }
  if(stressRate>=90){
    windows.append(jamaList[0].button);
    jamaList[0].button.innerHTML="Tear down a bit";
    upStress =0.0001;
    
  }
  if(stressRate >=80){
    updateGameName("header","Please relax. We can not start if you are shaking.");
    upStress =0.0004;
  }
  if(stressRate <=75){
    updateGameName("header","Please relax your face muscle.");
    
  }
  
  if(stressRate <=68){
    updateGameName("header","Open- up a bit more for me please! Thanks");
    fillingRate=0;
    upStress =0.0007;
  }
  if(stressRate <=65){
    fillingRate = 0.1;
    updateGameName("header","OK! Kaz, let's start the filling.");
    
    Happy.innerHTML = "Try to talk a few words";    
  }
  if(stressRate <=60){
    if(Happy){
      //Happy.disabled = false;
      updateGameName("header","It won't be too hurt, I promise");
      Happy.innerHTML = "Talk a few wods";   
    
  }}
  if(stressRate <=50){
    fillingRate = 0;
    if(Happy){
    updateGameName("header","You are relaxed! Good job");
    Happy.innerHTML = "Blast a laugh";    
  }}
  if(stressRate <=25){
   
    Happy.innerHTML = "Sing a song";

  }
  if(stressRate <=10){
    upStress=0;
    stressRate =10;
    updateGameName("header","Kaz! Kaz!!! STOP LAUGHING!!! YOU ARE BLEEDING!! ")
        
  }
  updateFilling();
  updateClickCount();  
  updateShop(itemList);
  requestAnimationFrame(movediv);
}
////////////////
