let doLogin =  ()=>{
   
    let loginFields = document.getElementsByClassName('loginForm');
    let loginFormError = document.getElementsByClassName('loginFormError');
    emptyError(loginFormError);
    
    if( loginFields[0].value =="" && loginFields[1].value !="" ){
        document.getElementById('loginEmailError').innerText="Please Enter Email Id";
    }
    else if( loginFields[0].value !="" && loginFields[1].value == "" ){
        document.getElementById('loginPasswordError').innerText="Please Enter Password";
    }
    else if(loginFields[0].value !="" && loginFields[1].value != ""){
        // fetch
          
        let user = {"emailID" : loginFields[0].value ,"password" : loginFields[1].value };
        AJAX.doLogin(user).then(res => res.json()).then((data)=>{
            console.log(data.status);
            if(data.status == "200"){
                let userToken = { "token" : data.token, "emailID": data.emailID};
                localStorage.setItem("userToken",JSON.stringify(userToken));
                emptyFields(loginFields);
                location.href = "dashboard.html";
            }
            else{
                emptyFields(loginFields);
                document.getElementById('loginError').innerText="Invalid EmailID or Password";
            }
        }).catch(err=>  document.getElementById('loginError').innerText="Database Connectivity Error");
    }
    else{
        document.getElementById('loginError').innerText="Please Enter EmailID and Password";
    }
}

let doSignup = ()=>{
    
    let signupFields = document.getElementsByClassName('sigupForm');
    let signupFormError = document.getElementsByClassName('signupFormError'); 
    emptyError(signupFormError);

    if(signupFields[0].value == "" && signupFields[1].value != "" && signupFields[2].value != "" && signupFields[3].value != ""){
        document.getElementById('signupFNameError').innerText = "Please Enter First Name";
    }
    else if(signupFields[0].value != "" && signupFields[1].value == "" && signupFields[2].value != "" && signupFields[3].value != ""){
        document.getElementById('signupLNameError').innerText = "Please Enter Last Name";
    }
    else if(signupFields[0].value != "" && signupFields[1].value != "" && signupFields[2].value == "" && signupFields[3].value != ""){
        document.getElementById('signupEmailError').innerText = "Please Enter Email ID";
    }
    else if(signupFields[0].value != "" && signupFields[1].value != "" && signupFields[2].value != "" && signupFields[3].value == ""){
        document.getElementById('signupPasswordError').innerText = "Please Enter Password";
    }
    else if(signupFields[0].value != "" && signupFields[1].value != "" && signupFields[2].value != "" && signupFields[3].value != ""){
        // fetch
        let emailValidate = new RegExp("^[A-Za-z0-9]+@[a-z]+.[a-z]{2,}$");
        let passValidate = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        if(emailValidate.test(signupFields[2].value) && passValidate.test(signupFields[3].value)){
            let user = {
                "fname" : signupFields[0].value,
                "lname" : signupFields[1].value,
                "emailID" : signupFields[2].value,
                "password" : signupFields[3].value
            }
            AJAX.doSignup(user).then(res => res.json()).then((data)=>{
                    
                    if(data.status == 200){
                        alert('Account Created SuccessFully');
                        emptyFields(signupFields);
                    }
                    else{
                        document.getElementById('signupError').innerText = "UserName Already Taken";
                    }
                }).catch(err=> console.log(err));
        }
        else if(emailValidate.test(signupFields[2].value) == false ){
            document.getElementById('signupEmailError').innerText = "Invalid Emaild Address";
        }
        else if(passValidate.test(signupFields[3].value) == false){
            document.getElementById('signupPasswordError').innerText = "Password should be >8 special chracter,capital chracter";
        }
    }
    else{
        document.getElementById('signupError').innerText = "Enter Details to Proceed";
    }
}

let emptyFields = (arr)=>{
    for(let i=0;i<arr.length;i++){
        arr[i].value = "";
    }
}
let emptyError = (err)=>{
    for(let i=0;i<err.length;i++){
        err[i].innerText = "";
    }
}

let registerEvents = ()=>{
    let loginBtn =  document.getElementById('login');
    loginBtn.addEventListener('click',doLogin);

    let signupbtn = document.getElementById('signup');
    signupbtn.addEventListener('click',doSignup);
}

window.addEventListener('load',registerEvents);