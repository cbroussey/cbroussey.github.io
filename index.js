const titles = ["Colin Broussey", "Projets", "CV", "Contact"]

const animSpeed = 380;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitFor(condition, action, delay) {
    if (!condition()) setTimeout(() => {waitFor(condition, action, delay)}, delay)
    else action()
}

function main() {
    // document.getElementById("wave").setAttribute("viewBox", `0 0 1440 ${Math.ceil(60*window.innerHeight/100)}`); 
    window.currentTab = 1;
    window.tabs = document.getElementsByClassName("tab")
    tabs[0].style.backgroundColor = "rgba(255, 255, 255, 0.4)"
    for(let i = 0; i < tabs.length; i++) {
        // tabs[i].style.cursor = "pointer"
        tabs[i].onclick = function(){ setTab(i) }
    }
    // window.buttons = document.getElementsByClassName("button")
    // for(let i = 0; i < buttons.length; i++) buttons[i].style.cursor = "pointer"
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
    let ls = ""
    for (let i = 0; i < window.tabs.length; i++) ls += window.tabs[i].innerText + " "
    write("ls", 30, ls)
    waitFor(() => {return window.writing == false}, () => {setTab(0)}, 100)
}

async function write(text, speed=30, result="") {
    window.blink = false
    window.writing = true
    cmd.children[cmd.children.length - 1].innerHTML = cmd.children[cmd.children.length - 1].innerHTML.slice(0, -1) + text[0] + "_"
    if(text.length - 1) {
        setTimeout(function(){ write(text.slice(1), speed, result) }, speed)
    } else {
        cmd.children[cmd.children.length - 1].innerHTML = cmd.children[cmd.children.length - 1].innerHTML.slice(0, -1)
        setTimeout(() => {
            if (result != "") document.getElementById("cmd").innerHTML += `<li>${result}</li>`
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
        window.tabs[tab].style.backgroundColor = "var(--tabActiveCol)"
        cmd = document.getElementById("cmd")
        // let contenu = await fetch(`${titles[tab]}.html`)
        titre.classList.remove("enterLeft")
        void titre.offsetWidth;
        titre.classList.add("exitLeft")
        var lines = document.querySelectorAll(`#page${window.currentTab} > *:not(h1)`)
        for (let i = 0; i < lines.length; i++) {
            lines[i].classList.remove("enter")
            void lines[i].offsetHeight;
            lines[i].classList.add("exit")
        }
        async function animate(i = 0) {
            if (i < lines.length) {
                // console.log(lines[i])
                // document.querySelectorAll("body > *")[i].style.animation = "slide-in .8s ease-in-out both"
                //lines[i].style.animation = "slide-in .8s ease-in-out both"
                lines[i].classList.add("enter")
                lines[i].style.opacity = ""
                setTimeout(function(){ animate(i + 1) }, 50)
            }
        }
        setTimeout(() => {
            titre.style.display = "none"
            document.querySelector(`#page${window.currentTab}`).style.display = "none"
            titre.innerHTML = `${titles[tab]}`
            if (titles[tab].length > 8) titre.style.top = "0.7em"
            else titre.style.top = "1.2em"
            // let titre = document.querySelector(`#page${tab} > h1`)
            titre.classList.remove("exitLeft")
            void titre.offsetWidth;
            document.getElementById("wavecontainer").style.marginTop = `${document.getElementById("cmd").getBoundingClientRect().bottom}px`
            document.getElementById("wave").classList.add("enterLeft")
            document.getElementById("wave").style.display = "flex"
            titre.classList.add("enterLeft")
            titre.style.display = ""
            // document.querySelector("#page0").classList.add("enterLeft")
            for (let i = 0; i < lines.length; i++) {
                lines[i].style.opacity = "0"
                lines[i].classList.remove("exit")
            }
            lines = document.querySelectorAll(`#page${tab} > *:not(h1)`)
            animate();
            document.querySelector(`#page${tab}`).style.display = "flex"
            document.getElementById("bottomFill").style.display = ""
            window.currentTab = tab
        }, animSpeed)
        await write(`cd ${window.tabs[tab].children[0].innerHTML}`)
    }
    if(document.querySelector('#tabs').style.display) {
        document.querySelector('#tabs').style.display = "";
        // document.querySelector('.button:first-of-type').style.display = "flex";
    }
}

function hamburgerMenu(open) {
    if(!document.querySelector('#tabs').style.display) {
        // document.querySelector('.button:first-of-type').style.display = "";
        document.querySelector('#tabs').style.display = "flex";
    }
    else {
        document.querySelector('#tabs').style.display = "";
        // document.querySelector('.button:first-of-type').style.display = "flex";
    }
}

function goToContent() {
    if (!window.writing) {
        write('more');
        waitFor(() => {return window.writing == false}, () => {document.querySelector('#wavecontainer').scrollIntoView()}, 100);
    }
}

function reload() {
    if (!window.writing) {
        write('exit');
        waitFor(() => {return window.writing == false}, () => {location.href = ''}, 100)
    }
}

function adapt() {
    document.getElementById("cmd").scrollTop = document.getElementById("cmd").scrollHeight
}

function scrolled() {
    //console.log("scroll")
    if (document.querySelector("#wrapper").scrollTop > 30) {
        document.querySelector("#up").style.display = "flex"
    } else {
        document.querySelector("#up").style.display = "none"
    }
}

window.addEventListener("resize", adapt);

document.addEventListener("DOMContentLoaded", e => {
    //document.getElementById("wrapper").addEventListener("scroll", scrolled);
})