const componentElements = document.querySelectorAll("[data-import]");

const renderHtmlComponent = (elements) => {
  for (let element of elements) {
    const importElement = element.getAttribute("data-import");

    fetch(importElement)
      .then((res) => {
        if (!res.ok) {
          throw "Not found";
        }
        return res.text();
      })
      .then((component) => {
        element.innerHTML = component;
        loadComponentScripts(element);
        const componentElements = element.querySelectorAll("[data-import]");
      })
      .catch(() => {
        element.innerHTML = `<h4>Component not found</h4>`;
      });
  }
}

renderHtmlComponent(componentElements);


function loadComponentScripts(element) {
  const scripts = element.querySelectorAll("script");
  for (let script of scripts) {
    const newScript = document.createElement("script");
    if (script.src) {
      newScript.src = script.src;
    }
    if (script.textContent) {
      newScript.textContent = script.textContent;
    }
    script.remove();

    document.body.appendChild(newScript);
  }
}
