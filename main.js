const tilescontainer = document.querySelector(".tiles");
const colors = ["maroon", "purple", "green", "yellow", "navy", "teal", "gold", "crimson"];
const colorspicklist = [...colors, ...colors];
const tilecount = colorspicklist.length;

//game state
let revealedcount = 0;
let activetile = null;
let awaitingendofmove = false;

function buildtile(color) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");
    
    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");
        if (
            awaitingendofmove
            || revealed === "true"
            || element === activetile
        ) {
            return;
        }
        element.style.backgroundColor = color;
        if (!activetile) {
            activetile = element;
            return;
        }

        const colortomatch = activetile.getAttribute("data-color")
        if (colortomatch === color) {
            activetile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            awaitingendofmove = false;
            activetile = null;
            revealedcount += 2;

            if (revealedcount === tilecount)
                alert("YOU WIN REFRESH TO PLAY AGAIN.....")

            return;
        }

        awaitingendofmove = true;
        setTimeout(() => {
            element.style.backgroundColor = null;
            activetile.style.backgroundColor = null;

            awaitingendofmove = false;
            activetile = null;
        }, 1000);


    });
    return element;
}

//building of tiles

for (let i = 0; i < tilecount; i++) {
    const randomindex = Math.floor(Math.random() * colorspicklist.length);
    const color = colorspicklist[randomindex];
    const tile = buildtile(color);
    colorspicklist.splice(randomindex, 1)
    tilescontainer.appendChild(tile);

}
