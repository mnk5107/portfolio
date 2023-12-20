var clickBtn = (btn) => {
  let result = document.getElementById("result");
  let btnVal = btn.value;

  if (btnVal == "C") {
    result.innerText = "0";
  } else if (btnVal == "=") {
    result.innerText = eval(result.innerText);
    console.log(result.innerText);
  } else {
    if (result.innerText == "0") {
      if (btnVal == ".") {
        result.innerText = "0" + btnVal;
      } else {
        result.innerText = btnVal;
      }
    } else {
      result.innerText += btnVal;
    }
  }
};
