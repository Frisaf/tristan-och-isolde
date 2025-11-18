const restart_button = document.querySelector("#restartBtn")

function restart() {
    const answer = confirm("Are you sure you want to restart? All your progress will be reset.")

    if (answer === true) {
        window.location.href = "/"
    }
}

restart_button.addEventListener("click", restart)