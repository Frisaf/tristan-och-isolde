const restart_button = document.querySelector("#restartBtn")
const go_back_btn = document.querySelector("#goBackBtn")

function restart() {
    const answer = confirm("Are you sure you want to restart? All your progress will be reset.")

    if (answer === true) {
        window.location.href = "/"
    }
}

function go_back() {
    window.history.go(-1)
}

function add_choice() {
    console.log("choice added")
}

restart_button.addEventListener("click", restart)

if (go_back_btn != null) {
    go_back_btn.addEventListener("click", go_back)
}