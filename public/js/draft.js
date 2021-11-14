document.querySelector("body").classList.add("bg-gradient");
let editButton = [];
let updateDiv = [];
let rating = [];
let ranges = [];
let spanId = [];
let secondSpanId = [];
let textarea = [];
let deleteReviewButton = [];
let reviewDiv = [];
let submitReviewButton = [];
let reviewBody = [];
let reviewRange = [];
let reviewPadding = [];
let script = [];

const casts = function () {
    editButton = document.querySelectorAll(".submitreview");
    updateDiv = document.querySelectorAll(".updatediv");
    rating = document.querySelectorAll(".rating");
    ranges = document.querySelectorAll(".range");
    spanId = document.querySelectorAll("#spanid");
    secondSpanId = document.querySelector("#secondspanid");
    textarea = document.querySelectorAll(".textareas");
    deleteReviewButton = document.querySelectorAll(".deletereviewbutton");
    reviewDiv = document.querySelectorAll(".reviewdiv");
    submitReviewButton = document.querySelector("#longbutton");
    reviewBody = document.querySelector(".submit-body");
    reviewRange = document.querySelector(".submit-range");
    reviewPadding = document.querySelector(".reviewpadding");
    script = document.querySelectorAll("script");
}
casts();

function toggleFunction() {
    const dropdown = document.querySelectorAll(".dropdown");
    const spans = document.querySelectorAll("#optionspan");
    const editReviewButton = document.querySelectorAll(".editReview");
    const toggleForm = document.querySelectorAll(".toggleform");



    let checkNum = 0;
    let checkNumSecond = 0;

    for (let i = 0; i < spans.length; i++) {
        spans[i].addEventListener("click", function toggleDrop() {
            checkNum += 1;
            if (checkNum % 2 !== 0) {
                dropdown[i].style.display = 'block';
            }
            else {
                dropdown[i].style.display = 'none';
                checkNumSecond = 0;
                toggleForm[i].style.display = "none";
                checkNum = 0;
            }
        });
    }


    for (let j = 0; j < editReviewButton.length; j++) {
        editReviewButton[j].addEventListener("click", function editButton() {
            checkNumSecond += 1;
            if (checkNumSecond % 2 !== 0) {
                toggleForm[j].style.display = "block";
            }
            else {
                toggleForm[j].style.display = "none";
                checkNumSecond = 0;
            }
        })
    }
}

toggleFunction();


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

let data = {};
const spit = function () {
    return document.querySelectorAll(".reviewdiv");
}

async function createReview() {
    submitReviewButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const CampgroundId = secondSpanId.innerText.trim();
        function makeData() {
            if (reviewBody.value.trim() !== '') {
                data = {
                    campreview: {
                        rating: reviewRange.value,
                        body: reviewBody.value
                    }
                }
                return data;
            }
        }
        if (makeData()) {
            fetch(`http://localhost:3000/index/${CampgroundId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success New Review:', data);
                    if (data.newReview.rating && data.newReview.body) {
                        const lastCard = spit()[spit().length - 1];
                        const newElement = lastCard.cloneNode(true);
                        reviewPadding.appendChild(newElement);
                        newElement.firstElementChild.firstElementChild.nextElementSibling.
                            nextElementSibling.nextElementSibling.innerText = data.newReview._id;
                        newElement.firstElementChild.firstElementChild.
                            firstElementChild.innerText = data.newReview.rating;
                        newElement.firstElementChild.lastElementChild.innerText = data.newReview.body;
                        newElement.firstElementChild.firstElementChild.nextElementSibling.
                        nextElementSibling.nextElementSibling.nextElementSibling.
                        firstElementChild.nextElementSibling.value = data.newReview.body;
                        casts();
                        toggleFunction();
                        editReview();
                        deleteReview();
                        reviewBody.value = '';
                    }
                    else if (data.customMessage) {
                        alert(data.customMessage);
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        }
    })
}
createReview();

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
                    else if (data.customMessage) {
                        alert(data.customMessage);
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        })
    }
}
editReview();

async function deleteReview() {
    for (let j = 0; j < editButton.length; j++) {
        deleteReviewButton[j].addEventListener("click", async (e) => {
            e.preventDefault();
            const reviewId = spanId[j].innerText.trim();
            const CampgroundId = secondSpanId.innerText.trim();
            fetch(`http://localhost:3000/index/${CampgroundId}/review/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success Delete:', data);
                    if (data.deleted) {
                        reviewDiv[j].remove();
                        toggleFunction();
                    }
                    else if (data.customMessage) {
                        alert(data.customMessage);
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        })
    }
}
deleteReview();