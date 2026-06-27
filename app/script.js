const crystals = [
    {
        id: 1,
        name: "MALABI UNIVERSE #1",
        tier: "Common",
        domain: "Arithmetic",
        symbol: "+",
        equation: "a+b=c",
        energy: 500,
        dimension: "Arithmetic Valley",
        ai: "The Calculator"
    },

    {
        id: 3,
        name: "MALABI UNIVERSE #3",
        tier: "Rare",
        domain: "Calculus",
        symbol: "∫",
        equation: "∫f(x)dx",
        energy: 1500,
        dimension: "Calculus Galaxy",
        ai: "The Integrator"
    },

    {
        id: 5,
        name: "MALABI UNIVERSE #5",
        tier: "Epic",
        domain: "Number Theory",
        symbol: "φ",
        equation: "φ = 1.618033",
        energy: 4000,
        dimension: "Golden Ratio Realm",
        ai: "The Harmonizer"
    },

    {
        id: 7,
        name: "MALABI UNIVERSE #7",
        tier: "Legendary",
        domain: "Unsolved Problems",
        symbol: "ζ",
        equation: "ζ(s)",
        energy: 10000,
        dimension: "Unknown Dimension",
        ai: "The Unknown"
    },

    {
        id: 8,
        name: "MALABI UNIVERSE #8",
        tier: "Mythic",
        domain: "Prime Formula",
        symbol: "◆",
        equation: "997",
        energy: 30000,
        dimension: "Genesis Core",
        ai: "The Prime Oracle"
    }
];


function explore(){

    let id = document.getElementById("tokenInput").value;

    let crystal = crystals.find(
        item => item.id == id
    );


    let result = document.getElementById("result");


    if(crystal){

        result.innerHTML = `

        <h2>${crystal.name}</h2>

        <p>Tier: ${crystal.tier}</p>

        <p>Domain: ${crystal.domain}</p>

        <p>Symbol: ${crystal.symbol}</p>

        <p>Equation: ${crystal.equation}</p>

        <p>Energy: ${crystal.energy} MALABI</p>

        <p>Dimension: ${crystal.dimension}</p>

        <hr>

        <p>
        🤖 Prime Oracle:
        Welcome, this crystal is guided by ${crystal.ai}.
        </p>

        `;

    }

    else{

        result.innerHTML =
        "Crystal not found in the Genesis Registry.";

    }

}