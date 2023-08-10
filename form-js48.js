let formele = document.getElementById("addUserForm");
let nameele = document.getElementById("name");
let emailele = document.getElementById("email");
let nameerr = document.getElementById("nameErrMsg");
let emailerr = document.getElementById("emailErrMsg");

let selectele = document.getElementById("status");
let maleele = document.getElementById("genderMale");
let femaleele = document.getElementById("genderFemale");
let formdata = {
    name: "",
    email: "",
    gender: "",
    status: ""
};
let url = "https://gorest.co.in/public-api/users";

nameele.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameerr.textContent = "Required*";
    } else {
        nameerr.textContent = "";
    }
    formdata.name = event.target.value;
});
emailele.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailerr.textContent = "Required*";
    } else {
        emailerr.textContent = "";
    }
    formdata.email = event.target.value;
});
selectele.addEventListener("change", function(event) {
    formdata.status = event.target.value;
});
maleele.addEventListener("change", function(event) {
    formdata.gender = event.target.value;
});
femaleele.addEventListener("change", function(event) {
    formdata.gender = event.target.value;
});

function tovalidateformdate(formdata) {
    let {
        name,
        email
    } = formdata;
    if (name === "") {
        nameerr.textContent = "Required*";
    }
    if (email === "") {
        emailerr.textContent = "Required*"
    }
}

function topostrequest(formdata) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 49d55cf904b931e61e7f22f159b95c1acece321417e98c47c0d6314f14bafbb2"
        },
        body: JSON.stringify(formdata)
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailerr.textContent = "Email Already Exists";
                }
            }
        });
}

formele.addEventListener("submit", function(event) {
    event.preventDefault();
    topostrequest(formdata);
    tovalidateformdate(formdata);
});