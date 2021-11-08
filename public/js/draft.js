document.querySelector("body").classList.add("bg-gradient");
(function () {
    'use strict'
    let forms = document.querySelectorAll('.cs-validate')
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();
// const footer = document.querySelector(".footer");
// const secondfooter = document.querySelector(".secondfooter");
// const setDivH = document.querySelectorAll(".set-div-h");
// if (setDivH.length <= 1) {
//     footer.classList.add("newfooter");
// }else{
//     footer.classList.remove("newfooter");
// }


