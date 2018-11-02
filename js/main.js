document.addEventListener("DOMContentLoaded", init());



function init() {


    let pages = document.querySelectorAll(".page");

    document.querySelector("#btnSend").addEventListener("click", function () {
        pages[0].classList.remove("active");
        pages[1].classList.add("active");
        getData();
    });

    document.querySelector("#btnBack").addEventListener("click", function () {
        pages[0].classList.add("active");
        pages[1].classList.remove("active");

        removeData();

    });





}


function getData() {

    let numDigits = document.querySelector("#digits").value;
    let numMax = document.querySelector("#max").value;
    let pages = document.querySelectorAll(".page");

    if (numDigits > 10 || numDigits < 1 || numMax > 99 || numMax < 2) {
        alert("INPUTS ARE OUT OF RANGE. Digits must be between 1 and 6 and range must be between 2 and 99")
        pages[0].classList.add("active");
        pages[1].classList.remove("active");
        document.querySelector("#digits").value = document.querySelector("#digits").defaultValue;
        document.querySelector("#max").value = document.querySelector("#max").defaultValue;


    } else {



        let formData = new FormData();
        formData.append("digits", numDigits);
        formData.append("max", numMax);
        let ul = document.querySelector(".num_list");

        let url = 'https://davidst.edumedia.ca/mad9014/nums.php?'
        let customSettings = {
            mode: 'cors',
            method: 'post',
            body: formData
        };
        let request = new Request(url, customSettings);

        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                data.numbers.forEach(function (item) {
                    let li = document.createElement("li");
                    let txt = document.createTextNode(item);
                    li.appendChild(txt);
                    ul.appendChild(li);
                })

            })
            .catch(function (error) {
                alert(error);
            });


    }


}

function removeData() {


    let ul = document.querySelector(".num_list");
    ul.innerHTML = "";
    document.querySelector("#digits").value = document.querySelector("#digits").defaultValue;
        document.querySelector("#max").value = document.querySelector("#max").defaultValue;



}
