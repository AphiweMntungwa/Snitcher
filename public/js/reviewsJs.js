document.querySelector("body").classList.add("bg-gradient");
let editButton, updateDiv, rating, ranges, spanId, secondSpanId,
    textarea, deleteReviewButton, reviewDiv,
    reviewBody, reviewRange, reviewPadding, icons = [];
const submitReviewButton = document.querySelector("#longbutton");
const logger = document.querySelector('div[logger="logger"]');
const cite = document.querySelectorAll("cite");


const casts = function() {
    editButton = document.querySelectorAll(".submitreview");
    updateDiv = document.querySelectorAll(".updatediv");
    rating = document.querySelectorAll(".rating");
    ranges = document.querySelectorAll(".range");
    spanId = document.querySelectorAll("#spanid");
    secondSpanId = document.querySelector("#secondspanid");
    textarea = document.querySelectorAll(".textareas");
    deleteReviewButton = document.querySelectorAll(".deletereviewbutton");
    reviewDiv = document.querySelectorAll(".reviewdiv");
    reviewBody = document.querySelector(".submit-body");
    reviewRange = document.querySelectorAll('input[name="rating"]');
    reviewPadding = document.querySelector(".reviewpadding");
    icons = document.querySelectorAll(".icon")
    auth();
}
casts();

function auth() {
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.display = "inline";
        const checker = reviewDiv[i].firstElementChild.nextElementSibling;
        if (!checker || checker.innerText !== "Authorised") {
            console.log(checker);
            icons[i].style.display = "none";
        }
    }
}

function addCite(elmnt) {
    elmnt.firstElementChild
        .insertAdjacentHTML("afterend", '<cite class="d-none">Authorised</cite>');
}

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
            } else {
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
            } else {
                toggleForm[j].style.display = "none";
                checkNumSecond = 0;
            }
        })
    }
}

toggleFunction();


let data = {};
const spit = function() {
    return document.querySelectorAll(".reviewdiv");
}

async function createReview() {
    submitReviewButton.addEventListener("click", async(e) => {
        e.preventDefault();
        const CampgroundId = secondSpanId.innerText.trim();


        function makeData() {

            let starValue = [];
            for (star of reviewRange) {
                if (star.checked) {
                    starValue = star.value;
                }
            }

            if (reviewBody.value.trim() !== '') {
                data = {
                    campreview: {
                        rating: starValue,
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
                    console.log('Message New Review:', data);
                    if (data.errorMessage) {
                        logger.style.display = "block";
                        logger.innerText = data.errorMessage;
                    } else if (data.newReview.rating !== undefined && data.newReview.body) {
                        function lastCardReview() {
                            if (spit().length > 1) {
                                const lastCard = spit()[spit().length - 1];
                                const newElement = lastCard.cloneNode(true);
                                return newElement;
                            } else {
                                const lastCard = spit()[spit().length - 1];
                                const newElement = lastCard.cloneNode(true);
                                newElement.style.display = 'block';
                                return newElement
                            }

                        }

                        const newElement = lastCardReview();
                        reviewPadding.appendChild(newElement);
                        //the display:none id we use to make ajax requests - "/:id" variable 
                        newElement.firstElementChild.firstElementChild.nextElementSibling.
                        nextElementSibling.nextElementSibling.innerText = data.newReview._id;

                        //the block with rating in orange
                        newElement.firstElementChild.firstElementChild.
                        firstElementChild.innerText = data.newReview.rating;

                        //the area of the review
                        newElement.firstElementChild.lastElementChild.innerText = data.newReview.body;

                        //
                        newElement.firstElementChild.firstElementChild.nextElementSibling.
                        nextElementSibling.nextElementSibling.nextElementSibling.
                        firstElementChild.nextElementSibling.value = data.newReview.body;

                        //the area with the author's name
                        newElement.firstElementChild.firstElementChild.nextElementSibling
                            .nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
                            .nextElementSibling.innerText = `- ${data.author.username}`;

                        const starRating = document.querySelectorAll(".star-rating")
                        starRating[starRating.length - 1].setAttribute('data-rating', data.newReview.rating)
                        addCite(newElement);



                        casts();
                        toggleFunction();
                        editReview();
                        deleteReview();
                        reviewBody.value = '';
                    } else if (data.customMessage) {
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
        editButton[i].addEventListener("click", async(e) => {
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
                    console.log('Message Update:', data);
                    if (data.errorMessage) {
                        logger.style.display = "block";
                        logger.innerText = data.errorMessage;
                    } else if (data.rating && data.body) {
                        updateDiv[i].innerText = data.body;
                        rating[i].innerText = data.rating;
                    } else if (data.customMessage) {
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
        deleteReviewButton[j].addEventListener("click", async(e) => {
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
                    console.log('Message Delete:', data);
                    if (data.errorMessage) {
                        logger.style.display = "block";
                        logger.innerText = data.errorMessage;
                    } else if (data.deleted) {
                        reviewDiv[j].remove();
                        toggleFunction();
                    } else if (data.customMessage) {
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