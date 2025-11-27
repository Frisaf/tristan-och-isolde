const restart_button = document.querySelector("#restartBtn")
const go_back_btn = document.querySelector("#goBackBtn")
const roll_button = document.querySelector("#rollBtn")
const roll_result = document.querySelector("#result")
const above10 = document.querySelector("#above10")
const below10 = document.querySelector("#below10")

async function restart() {
    const answer = confirm("Are you sure you want to restart? All your progress will be reset.")

    if (answer === true) {
        const response = await fetch("/restart", {method: "POST"})

        if (response.ok) {
            window.location.href = "/"
        }
        else {
            alert("Could not restart :(")
        }
    }
}

function go_back() {
    window.history.go(-1)
}

function roll() {
    result = Math.ceil(Math.random() * 20);
    roll_result.textContent = result

    if (result < 10) {
        below10.style.display = "unset"
    }

    else {
        above10.style.display = "unset"
    }

    roll_button.setAttribute("disabled", "disabled")
}

restart_button.addEventListener("click", restart)
roll_button.addEventListener("click", roll)

if (go_back_btn != null) {
    go_back_btn.addEventListener("click", go_back)
}