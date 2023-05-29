const titles = ["Colin Broussey", "Projets", "CV", "Contact"]

const animSpeed = 510;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    // document.getElementById("wave").setAttribute("viewBox", `0 0 1440 ${Math.ceil(60*window.innerHeight/100)}`); 
    window.currentTab = 1;
    window.tabs = document.getElementsByClassName("tab")
    tabs[0].style.backgroundColor = "rgba(255, 255, 255, 0.3)"
    for(let i = 0; i < tabs.length; i++) {
        tabs[i].style.cursor = "pointer"
        tabs[i].onclick = function(){ setTab(i) }
    }
    window.buttons = document.getElementsByClassName("button")
    for(let i = 0; i < buttons.length; i++) buttons[i].style.cursor = "pointer"
    let prompt = "colin.broussey@portfolio ~ $ "
    let command = document.getElementById("cmd")
    let delay = 800
    window.blink = true
    async function blink() {
        if(window.blink) {
            if(command.children[command.children.length - 1].innerHTML.slice(-1) == "_") {
                command.children[command.children.length - 1].innerHTML = prompt + " "
            } else {
                command.children[command.children.length - 1].innerHTML = prompt + "_"
            }
        }
        setTimeout(blink, delay)
    }
    blink()
    setTab(0)
}

async function write(text, speed) {
    window.writing = true
    cmd.children[cmd.children.length - 1].innerHTML = cmd.children[cmd.children.length - 1].innerHTML.slice(0, -1) + text[0] + "_"
    if(text.length - 1) {
        setTimeout(function(){ write(text.slice(1), speed) }, speed)
    } else {
        cmd.children[cmd.children.length - 1].innerHTML = cmd.children[cmd.children.length - 1].innerHTML.slice(0, -1)
        setTimeout(() => {
            document.getElementById("cmd").innerHTML += "<li>colin.broussey@portfolio ~ $ _</li>"
            document.getElementById("cmd").scrollTop = document.getElementById("cmd").scrollHeight
            // if(document.getElementById("cmd").children.length > 10) document.getElementById("cmd").replaceChildren(...Array.from(document.getElementById("cmd").querySelectorAll("li")).slice(1))
            window.blink = true
            window.writing = false
        }, 100)
    }
}

async function setTab(tab) {
    if(tab != window.currentTab && !window.writing) {
        window.tabs[window.currentTab].style.backgroundColor = ""
        // let titre = document.querySelector(`#page${window.currentTab} > h1`)
        let titre = document.querySelector("#wavecontainer > h1")
        window.tabs[tab].style.backgroundColor = "rgba(255, 255, 255, 0.3)"
        window.blink = false
        cmd = document.getElementById("cmd")
        // let contenu = await fetch(`${titles[tab]}.html`)
        titre.classList.remove("enterLeft")
        void titre.offsetWidth;
        titre.classList.add("exitLeft")
        let lines = document.querySelectorAll(`#page${tab} > *:not(h1)`)
        async function animate(i = 0) {
            if (i < lines.length) {
                // console.log(lines[i])
                // document.querySelectorAll("body > *")[i].style.animation = "slide-in .8s ease-in-out both"
                lines[i].style.animation = "slide-in .8s ease-in-out both"
                setTimeout(function(){ animate(i + 1) }, 50)
            }
        }
        setTimeout(() => {
            document.querySelector(`#page${window.currentTab}`).style.display = "none"
            titre.innerHTML = `${titles[tab]}`
            if (titles[tab].length > 8) titre.style.top = "0.7em"
            else titre.style.top = "1.2em"
            // let titre = document.querySelector(`#page${tab} > h1`)
            titre.classList.remove("exitLeft")
            void titre.offsetWidth;
            titre.classList.add("enterLeft")
            document.querySelector(`#page${tab}`).style.display = "flex"
            animate();
            window.currentTab = tab
        }, animSpeed)
        await write(`cd ${window.tabs[tab].children[0].innerHTML}`, 30)
    }
}

function adapt() {
    document.getElementById("cmd").scrollTop = document.getElementById("cmd").scrollHeight
}

window.addEventListener("resize", adapt);