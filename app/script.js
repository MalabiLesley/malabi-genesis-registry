let crystals = [];


fetch("../data/malabi_registry.json")
.then(response => response.json())
.then(data => {

    crystals = data.tokens;

})
.catch(error => {

    console.log(
        "Registry connection error:",
        error
    );

});


function explore(){

    let id = document.getElementById("tokenInput").value;

    let crystal = crystals.find(
        item => item.token_id == id
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
        ${crystal.ai_personality}
        </p>

        `;

    }

    else {

        result.innerHTML =
        "Crystal not found in Genesis Registry.";

    }

}