const API_BASE = "http://localhost:4000";

async function importImages() {
  const folderUrl = document.getElementById("folderUrl").value;

  if (!folderUrl) {
    alert("Please enter Google Drive folder URL");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/import/google-drive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderUrl }),
    });

    if (!response.ok) {
      throw new Error("Import failed");
    }

    alert("Image import started successfully");
    loadImages();
  } catch (error) {
    console.error(error);
    alert("Error importing images");
  }
}

async function loadImages() {
  try {
    const response = await fetch(`${API_BASE}/images`);
    const images = await response.json();

    const container = document.getElementById("images");
    container.innerHTML = "";

    if (images.length === 0) {
      container.innerHTML = "<p>No images found</p>";
      return;
    }

    images.forEach((img) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${img.s3_url}" />
        <p><strong>${img.name}</strong></p>
        <p>${img.mime_type}</p>
        <p>${img.size} bytes</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    alert("Error loading images");
  }
}
