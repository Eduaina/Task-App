const componentElements = document.querySelectorAll("[data-import]");

// const displayImports = (elements) => {
//   for (let element of elements) {
//     const importElement = element.getAttribute("data-import");

//     fetch(importElement)
//       .then((res) => {
//         if (!res.ok) {
//           throw "Not found";
//         }
//         return res.text();
//       })
//       .then((component) => {
//         element.innerHTML = component;
//         // loadComponentStyles(element);
//         loadComponentScripts(element);

//         const nestedImports = element.querySelectorAll("[data-import]");
//         displayImports(nestedImports);
//       })
//       .catch(() => {
//         element.innerHTML = `<h4>Component not found</h4>`;
//       });
//   }
// }

// displayImports(componentElements);


// function loadComponentScripts(element) {
//   const scripts = element.querySelectorAll("script");
//   for (let script of scripts) {
//     const newScript = document.createElement("script");
//     if (script.src) {
//       newScript.src = script.src;
//     }
//     if (script.textContent) {
//       newScript.textContent = script.textContent;
//     }
//     script.remove();

//     element.appendChild(newScript);
//   }
// }









async function displayImports(elements) {
  for (let element of elements) {
    const importFile = element.getAttribute("data-import");

    try {
      const res = await fetch(importFile);
      if (!res.ok) throw "Component not found";

      const html = await res.text();
      element.innerHTML = html;

      loadComponentScripts(element);

      const nested = element.querySelectorAll("[data-import]");
      if (nested.length > 0) {
        await displayImports(nested);
      }

      element.removeAttribute("data-import");
    } catch (err) {
      element.innerHTML = "<h4>Component not found</h4>";
    }
  }
}

displayImports(componentElements);



function loadComponentScripts(element) {
  const scripts = element.querySelectorAll("script");

  for (let script of scripts) {
    const newScript = document.createElement("script");

    if (script.src) newScript.src = script.src;
    if (script.textContent) newScript.textContent = script.textContent;

    script.remove();
    element.appendChild(newScript);
  }
}

// Expose a helper to wait on imports
window.loadAllComponents = async function () {
  const rootImports = document.querySelectorAll("[data-import]");
  await displayImports(rootImports);
};













// function loadComponentStyles(element) {
//   const links = element.querySelectorAll("link[rel='stylesheet']");

//   for (let link of links) {
//     const newLink = document.createElement("link");
//     newLink.rel = "stylesheet";
//     newLink.href = link.href;
//     document.head.appendChild(newLink);
//     link.remove();
//   }
// }

// loadComponentStyles(element);