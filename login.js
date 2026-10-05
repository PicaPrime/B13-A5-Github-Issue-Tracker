document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  let userName = formData.get("username");
  let password = formData.get("password");

  if (userName === "admin" && password === "admin123") {
    window.location.href = "index.html";
  } else {
    let errorText = document.createElement("h1");
    errorText.innerText = "wrong credentials";
    errorText.className = "text-[25px] font-bold tracking-tight text-error";
    // <h1 id="login-title" class="text-[25px] font-bold tracking-tight">GitHub Issues Tracker</h1>
    document.getElementsByTagName("header")[0].appendChild(errorText);
  }
});
