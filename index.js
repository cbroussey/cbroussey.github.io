function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    // document.getElementById("wave").setAttribute("viewBox", `0 0 1440 ${Math.ceil(60*window.innerHeight/100)}`); 
    window.currentTab = 0;
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
}

async function write(text, speed) {
    window.writing = true
    cmd.children[cmd.children.length - 1].innerHTML = cmd.children[cmd.children.length - 1].innerHTML.slice(0, -1) + text[0] + "_"
    if(text.length - 1) {
        setTimeout(function(){ write(text.slice(1), speed) }, speed)
    } else {
        cmd.children[cmd.children.length - 1].innerHTML = cmd.children[cmd.children.length - 1].innerHTML.slice(0, -1)
        sleep(100).then(() => {
            document.getElementById("cmd").innerHTML += "<li>colin.broussey@portfolio ~ $ _</li>"
            document.getElementById("cmd").scrollTop = document.getElementById("cmd").scrollHeight
            // if(document.getElementById("cmd").children.length > 10) document.getElementById("cmd").replaceChildren(...Array.from(document.getElementById("cmd").querySelectorAll("li")).slice(1))
            window.blink = true
            window.writing = false
        })
    }
}

async function setTab(tab) {
    if(tab != window.currentTab && !window.writing) {
        window.tabs[window.currentTab].style.backgroundColor = ""
        window.currentTab = tab
        window.tabs[window.currentTab].style.backgroundColor = "rgba(255, 255, 255, 0.3)"
        window.blink = false
        cmd = document.getElementById("cmd")
        await write(`cd ${window.tabs[tab].children[0].innerHTML}`, 30)
    }
}