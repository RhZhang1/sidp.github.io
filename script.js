const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.close();
  if (lightboxImage) {
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }
};

document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = trigger.dataset.lightboxSrc || "";
    lightboxImage.alt = trigger.dataset.lightboxAlt || "";

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    }
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.open) {
    closeLightbox();
  }
});

const copyButton = document.querySelector("[data-copy-bib]");

copyButton?.addEventListener("click", async () => {
  const status = copyButton.querySelector("[data-copy-status]");
  const text = copyButton.querySelector("code")?.innerText ?? "";

  try {
    await navigator.clipboard.writeText(text);
    if (status) status.textContent = "Copied";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    const code = copyButton.querySelector("code");

    if (code && selection) {
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (status) status.textContent = "Selected";
  }

  window.setTimeout(() => {
    if (status) status.textContent = "Copy BibTeX";
  }, 1800);
});
