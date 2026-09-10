const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="/about/index.html">About</a></li>
            <li><a href="/contact/index.html">Contact</a></li>
        </ul>
    </nav>
`;

footer.innerHTML = `
    <p>Copyright 2026. All rights reserved.</p>
`;