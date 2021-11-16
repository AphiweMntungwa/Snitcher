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

