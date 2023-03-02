
const authToken = (email) => {
const currentUser = {
email:email , 
}
fetch(`http://localhost:4000/jwt` , {
method:"POST" ,
headers:{
"Content-Type" : "application/json"
} ,
body:JSON.stringify(currentUser)  , 
}) 
.then(res => res.json()) 
.then(data => localStorage.setItem("book-store" , data.token ))
};

export default authToken;