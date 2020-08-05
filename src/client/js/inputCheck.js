function checkInput(leavingFromTxt, goingToTxt) {
  let urlRegx = /^[a-zA-Z\s]{0,255}$/;
  if (urlRegx.test(leavingFromTxt) && urlRegx.test(goingToTxt)) {
    return
  } else {
    alert("PLEASE ENTER VALID NAME");
  }
}

export { checkInput }