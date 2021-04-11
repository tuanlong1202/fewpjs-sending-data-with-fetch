// Add your code here
let frmData = {
    name: "",
    email: ""
};

let configObj = {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(frmData)
};

const username = document.getElementById('username');
const email = document.getElementById('email');

document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('submit').addEventListener('click',function() {
        submitData(username.value, email.value);
    });
})

function submitData(userName, eMail) {
    //
    if (collectData(userName, eMail)) {
        configObj.body = JSON.stringify(frmData);
        return fetch('http://localhost:3000/users',configObj)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(object) {
                        console.log(object);
                        let eleDiv = document.createElement('div');
                        eleDiv.style.display = 'block';
                        eleDiv.className = 'something';
                        eleDiv.textContent = object['id'];
                        document.body.appendChild(eleDiv);
                    })
                    .catch(function(error) {
                        alert(error.message);
                        console.log(error.message);
                        let eleDiv = document.createElement('div');
                        eleDiv.style.display = 'block';
                        eleDiv.className = 'something';
                        eleDiv.textContent = error.message;
                        document.body.appendChild(eleDiv);
                    });
    }
    return false;
}

function collectData(userName,eMail) {
    // Database integrity
    if (dataIntegrity(userName, eMail)) {
        // set data form
        frmData.name = userName;
        frmData.email = eMail;
        return true;
    }
    return false;

}

function dataIntegrity(userName, eMail) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (userName == "") {
        msgInform('User name could not be empty!');
        username.focus();
        return false;
    } else if (eMail == "") {
        msgInform('Email could not be empty!');
        email.focus();
        return false;
    } else if (reg.test(eMail) == false) {
        msgInform('Email address invalid');
        email.focus();
        return false;
    }
    return true;
}

function msgInform(message) {
    let modal = document.getElementById('modal');
    let msg = document.getElementById('modal-message');
    msg.innerText = message; // message to show out
    modal.className = ''; // turn on message
    setTimeout(function(){
        modal.className="hidden";// turn off message
    },3e3);
}

