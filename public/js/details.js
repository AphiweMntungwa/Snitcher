// function toggleFunction() {
//     const dropdown = document.querySelectorAll(".dropdown");
//     const spans = document.querySelectorAll("#optionspan");
//     const editReviewButton = document.querySelectorAll(".editReview");
//     const toggleForm = document.querySelectorAll(".toggleform");



//     let checkNum = 0;
//     let checkNumSecond = 0;

//     for (let i = 0; i < spans.length; i++) {
//         spans[i].addEventListener("click", function toggleDrop() {
//             checkNum += 1;
//             if (checkNum % 2 !== 0) {
//                 dropdown[i].style.display = 'block';
//             }
//             else {
//                 dropdown[i].style.display = 'none';
//                 checkNumSecond = 0;
//                 toggleForm[i].style.display = "none";
//                 checkNum = 0;
//             }
//         });
//     }


//     for (let j = 0; j < editReviewButton.length; j++) {
//         editReviewButton[j].addEventListener("click", function editButton() {
//             checkNumSecond += 1;
//             if (checkNumSecond % 2 !== 0) {
//                 toggleForm[j].style.display = "block";
//             }
//             else {
//                 toggleForm[j].style.display = "none";
//                 checkNumSecond = 0;
//             }
//         })
//     }
// }


