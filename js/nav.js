const header = `
    <header class="site-header">
        <nav>
            <a href="index.html">
                <img src="/assets/favicon/web-app-manifest-512x512.png" class="brand-logo"alt="Pilgrimage Homeschool Logo" />
                <span>Pilgrimage Homeschool</span>
            </a>
            <ul>
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="/about/index.html" class="nav-link">About</a></li>
                <li><a href="/contact/index.html" class="nav-link">Contact</a></li>
            </ul>
        </nav>
    </header>
`;

const footer = `
    <footer class="site-footer">
        <p>&copy; Pilgrimage Homeschool 2026. All rights reserved.</p>
    </footer>
`;

document.body.insertAdjacentHTML("afterbegin", header);
document.body.insertAdjacentHTML("beforeend", footer);