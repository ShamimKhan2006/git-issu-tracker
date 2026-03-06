document.getElementById("sign-btn").addEventListener("click", () =>{
  const inputName = document.getElementById("input-name");
  const inputnameValue=inputName.value
  const inputPassword = document.getElementById("input-password");
   const inputpassValue=inputPassword.value

if(inputnameValue.trim() !== ""  && inputpassValue === "admin123"){
    alert("login succedfull")

}else{
    alert("login fail")
}
})




