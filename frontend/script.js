async function importImages() {
  const folderUrl = document.getElementById("folderUrl").value;

  try {
    const res = await fetch("http://localhost:4000/import/google-drive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderUrl }),
    });

    if (!res.ok) throw new Error("Failed to import images");

    alert("Images imported successfully!");
    loadImages();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function loadImages() {
  try {
    const res = await fetch("http://localhost:4000/images");
    if (!res.ok) throw new Error("Failed to fetch images");

    const images = await res.json();
    const container = document.getElementById("images");
    container.innerHTML = "";

    images.forEach(img => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${img.s3Url}" alt="${img.name}" />
        <p>${img.name}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// Load images when page loads
window.onload = loadImages;
