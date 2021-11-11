document.querySelector("body").classList.add("bg-gradient");
const editButton = document.querySelectorAll(".submitreview");
const updateDiv = document.querySelectorAll(".updatediv");
const rating = document.querySelectorAll("#rating");
const ranges = document.querySelectorAll("#range");
const spanId = document.querySelectorAll("#spanid");
const secondSpanId = document.querySelector("#secondspanid");
const textarea = document.querySelectorAll(".textareas");

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

async function testRequest() {
    fetch("http://localhost:3000/test").then((res) => {
        return res.json();
    })
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        })
}

testRequest();

async function editReview() {
    for (let i = 0; i < editButton.length; i++) {
        editButton[i].addEventListener("click", async (e) => {
            e.preventDefault();
            const reviewId = spanId[i].innerText.trim();
            const CampgroundId = secondSpanId.innerText.trim();
            const data = {
                reviews: {
                    rating: ranges[i].value,
                    body: textarea[i].value
                }
            }
            fetch(`http://localhost:3000/index/${CampgroundId}/review/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.rating && data.body) {
                        updateDiv[i].innerText = data.body;
                        rating[i].innerText = data.rating;
                    }
                    else if(data.customMessage){
                        alert(data.customMessage, "you have to put something in");
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        })
    }
}
editReview();
