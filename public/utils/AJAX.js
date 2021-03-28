const AJAX = {
    doLogin : async function doLogin(user){
        return await fetch(URL.LOGIN,{
            method: "POST",
            mode  : 'cors',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(user),
        });
    },
    doSignup : async function doSignup(user){
        return await fetch(URL.SIGNUP,{
            method: "POST",
            mode : 'cors',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user),
        });
    },
    checkToken : async function checkToken(userToken){
        return await fetch(URL.DASHBOARD,{
            method: "POST",
            mode : 'cors',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(userToken),
        })
    }
};