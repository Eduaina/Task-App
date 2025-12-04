const componentElements = document.querySelectorAll("[data-import]");

async function displayImports(elements) {
  for (let element of elements) {
    const importFile = element.getAttribute("data-import");
    try {
      if (!importFile) throw "Component path missing";

      const res = await fetch(importFile);
      if (!res.ok) throw `Component not found: ${importFile}`;

      const html = await res.text();
      element.innerHTML = html;

      // Execute scripts inside component
      const scripts = element.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) newScript.src = script.src;
        if (script.textContent) newScript.textContent = script.textContent;
        script.remove();
        element.appendChild(newScript);
      });

      // Handle nested imports
      const nested = element.querySelectorAll("[data-import]");
      if (nested.length > 0) await displayImports(nested);

      element.removeAttribute("data-import");
    } catch (err) {
      console.error(err);
      element.innerHTML = `<h4>${err}</h4>`;
    }
  }
}

// Wait for all root imports
window.loadAllComponents = async function () {
  const rootImports = document.querySelectorAll("[data-import]");
  await displayImports(rootImports);
};
