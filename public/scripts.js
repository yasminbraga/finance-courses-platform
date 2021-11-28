const addLinkField = () => {
  const linksDiv = document.querySelector("#links");

  const linkInput = document.querySelectorAll(".input-link");

  const newInput = linkInput[linkInput.length - 1].cloneNode();

  if (newInput.value == "") return false;

  newInput.value = "";
  linksDiv.appendChild(newInput);
};

const addLinkButton = document.querySelector("#add-link");
if (addLinkButton) {
  addLinkButton.addEventListener("click", addLinkField);
}
