let crystals = [];


// Future upgrade:
// This will connect directly to malabi_registry.json

const registryData = [

{
token_id: 1,
name: "MALABI UNIVERSE #1",
tier: "Common",
domain: "Arithmetic",
symbol: "+",
equation: "a+b=c",
energy: 500,
dimension: "Arithmetic Valley",
ai_personality: "The Calculator"
},

{
token_id: 3,
name: "MALABI UNIVERSE #3",
tier: "Rare",
domain: "Calculus",
symbol: "∫",
equation: "∫f(x)dx",
energy: 1500,
dimension: "Calculus Galaxy",
ai_personality: "The Integrator"
},

{
token_id: 5,
name: "MALABI UNIVERSE #5",
tier: "Epic",
domain: "Number Theory",
symbol: "φ",
equation: "φ = 1.618033",
energy: 4000,
dimension: "Golden Ratio Realm",
ai_personality: "The Harmonizer"
},

{
token_id: 7,
name: "MALABI UNIVERSE #7",
tier: "Legendary",
domain: "Unsolved Problems",
symbol: "ζ",
equation: "ζ(s)",
energy: 10000,
dimension: "Unknown Dimension",
ai_personality: "The Unknown"
},

{
token_id: 8,
name: "MALABI UNIVERSE #8",
tier: "Mythic",
domain: "Prime Formula",
symbol: "◆",
equation: "997",
energy: 30000,
dimension: "Genesis Core",
ai_personality: "The Prime Oracle"
}

];


crystals = registryData;



function explore(){


let id =
document
.getElementById("tokenInput")
.value;



let result =
document
.getElementById("result");



result.innerHTML =
"🔮 Searching the Genesis Matrix...";



setTimeout(()=>{


let crystal =
crystals.find(

item => item.token_id == id

);



if(crystal){


result.innerHTML = `

<h2>${crystal.name}</h2>

<p>
⭐ Tier:
${crystal.tier}
</p>


<p>
🔢 Domain:
${crystal.domain}
</p>


<p>
Symbol:
${crystal.symbol}
</p>


<p>
Equation:
${crystal.equation}
</p>


<p>
⚡ Energy:
${crystal.energy} MALABI
</p>


<p>
🌌 Dimension:
${crystal.dimension}
</p>


<hr>


<p>

🤖 Prime Oracle:

<br><br>

"Welcome, explorer.

Your Equation Crystal is connected to
${crystal.ai_personality}.

Continue discovering the mathematical universe."

</p>

`;

}


else{


result.innerHTML =

"⚠️ Crystal not found. The Prime Formula has not registered this identity.";

}



},700);


}