async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (err) {
        console.error(err);
    }
}

async function initComponents() {

    await loadComponent(
        "navbar-container",
        "/components/navbar.html"
    );

    await loadComponent(
        "footer-container",
        "/components/footer.html"
    );

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "") || "index";

    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", initComponents);