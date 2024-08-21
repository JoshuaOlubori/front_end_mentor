document.addEventListener("DOMContentLoaded", () => {
  const alertDiv = document.querySelector("#alert");
  const shareDiv = document.querySelector("#share");

  const siblingOfAlert = document.querySelector("#siblingOfAlert");

  const alertDivMd = document.querySelector("#alert-md");

  const isMediumScreen = window.matchMedia("(min-width: 768px)");

  function handleScreenChange(e) {
    if (e.matches) {
      // Medium screen and above
      // Disable the first function
      alertDiv.classList.add("hidden");
      siblingOfAlert.classList.add("rounded-b-xl");
      shareDiv.removeEventListener("click", showAlert);
      // shareDivInner.removeEventListener("click", hideAlert);
      alertDiv.removeEventListener("mouseout", hideAlert);

      // Enable the second function
      shareDiv.addEventListener("click", showAlertMd);

      shareDiv.addEventListener("mouseout", hideAlertMd);
    } else {
      // Below medium screen
      // Enable the first function
      shareDiv.addEventListener("click", showAlert);
      alertDiv.addEventListener("mouseout", hideAlert);
      // shareDivInner.addEventListener("click", hideAlert);

      // Disable the second function
      alertDivMd.classList.add("md:hidden");
      shareDiv.removeEventListener("click", showAlertMd);

      shareDiv.removeEventListener("mouseout", hideAlertMd);
    }
  }

  function showAlert() {
    alertDiv.classList.remove("hidden");
    siblingOfAlert.classList.remove("rounded-b-xl");
    shareDiv.classList.add("hidden");
  }

  function hideAlert() {
    alertDiv.classList.add("hidden");
    siblingOfAlert.classList.add("rounded-b-xl");
    shareDiv.classList.remove("hidden");
  }

  function showAlertMd() {
    alertDivMd.classList.remove("md:hidden");
  }

  function hideAlertMd() {
    alertDivMd.classList.add("md:hidden");
  }

  // Initial check
  handleScreenChange(isMediumScreen);

  // Listen for screen size changes
  isMediumScreen.addEventListener("change", handleScreenChange);
});
