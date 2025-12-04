function initAuth() {
  const loginSection = document.querySelector(".login");
  const signupSection = document.querySelector(".signup");

  const loginBtns = loginSection.querySelectorAll(".bttn");
  const signupBtns = signupSection.querySelectorAll(".bttn");

  const loginEmail = loginSection.querySelector("#loginEmail input");
  const loginPassword = loginSection.querySelector("#loginPassword input");
  const loginNextBtn = loginSection.querySelector("#loginNext button");
  const loginInvalidMsg = loginSection.querySelector(".invalid-login");

  const signupName = signupSection.querySelector("#signupName input");
  const signupEmail = signupSection.querySelector("#signupEmail input");
  const signupPassword = signupSection.querySelector("#signupPassword input");
  const signupNextBtn = signupSection.querySelector("#signupNext button");
  const signupInvalidMsg = signupSection.querySelector(".invalid-signup");

  function activateBtn(section, btn) {
    section
      .querySelectorAll(".bttn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function showSection(show, hide) {
    show.classList.remove("hidden");
    show.classList.add("active");
    hide.classList.add("hidden");
    hide.classList.remove("active");
  }

  loginBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateBtn(loginSection, btn);
      if (btn.id === "loginTwo") {
        showSection(signupSection, loginSection);
        activateBtn(signupSection, signupSection.querySelector("#signupTwo"));
      }
    });
  });

  signupBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateBtn(signupSection, btn);
      if (btn.id === "signupOne") {
        showSection(loginSection, signupSection);
        activateBtn(loginSection, loginSection.querySelector("#loginOne"));
      }
    });
  });

  function getStoredUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  function saveUser(user) {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  loginNextBtn?.addEventListener("click", async () => {
    loginInvalidMsg.style.display = "none";
    const emailVal = loginEmail?.value.trim().toLowerCase();
    const passVal = loginPassword?.value;

    if (!emailVal || !passVal) {
      loginInvalidMsg.textContent = "Invalid login credentials";
      loginInvalidMsg.style.display = "block";
      return;
    }

    const users = getStoredUsers();
    const matchedUser = users.find(
      (u) => u.email === emailVal && u.password === passVal
    );

    if (!matchedUser) {
      loginInvalidMsg.textContent = "Invalid login credentials";
      loginInvalidMsg.style.display = "block";
      return;
    }

    const originalContent = loginNextBtn.innerHTML;
    loginNextBtn.innerHTML = `<span class="loader"></span> Logging in...`;
    loginNextBtn.disabled = true;

    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = "dashboard.html";
  });

  signupNextBtn?.addEventListener("click", async () => {
    signupInvalidMsg.style.display = "none";
    const nameVal = signupName?.value.trim();
    const emailVal = signupEmail?.value.trim().toLowerCase();
    const passVal = signupPassword?.value;

    if (!nameVal || !emailVal || !passVal) {
      signupInvalidMsg.textContent = "Please fill all fields";
      signupInvalidMsg.style.display = "block";
      return;
    }

    const users = getStoredUsers();
    if (users.some((u) => u.email === emailVal)) {
      signupInvalidMsg.textContent = `A user with this email address has already been registered`;
      signupInvalidMsg.style.display = "block";
      return;
    }

    saveUser({ name: nameVal, email: emailVal, password: passVal });

    const originalContent = signupNextBtn.innerHTML;
    signupNextBtn.innerHTML = `<span class="loader"></span> Creating Account...`;
    signupNextBtn.disabled = true;

    await new Promise((r) => setTimeout(r, 1000));

    showSection(loginSection, signupSection);
    activateBtn(loginSection, loginSection.querySelector("#loginOne"));

    signupNextBtn.innerHTML = originalContent;
    signupNextBtn.disabled = false;
  });
}

window.initAuth = initAuth;
