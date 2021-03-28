let logout = ()=>{
    localStorage.clear();
    location.href = "index.html";
}

let validateToken = ()=>{
    var userToken = JSON.parse(localStorage.getItem("userToken"));
    AJAX.checkToken(userToken).then(res => res.json()).then((data)=>{
        if(data.status == 404){
            location.href = "index.html";
        }
        else{
           document.getElementById("username").innerText = userToken.emailID;
        }
    }).catch(err=> console.log(err));  
    
    
    document.getElementById('logOut').addEventListener('click',logout);
    
}

window.addEventListener('load',validateToken);