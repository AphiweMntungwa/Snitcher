const dropdown = document.querySelectorAll(".dropdown");
const spans = document.querySelectorAll("#optionspan");
let checkNum = 0;

for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener("click", function toggleDrop() {
        checkNum += 1;
        if (checkNum % 2 !== 0) {
            dropdown[i].style.display = 'block';
        }
        else {
            dropdown[i].style.display = 'none';
        }
    });
}