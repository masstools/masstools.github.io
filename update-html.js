const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
const navContent = `
<ul>
  <li><a href="/">Home</a></li>
  <li class="dropdown">
    <a href="/#tools">Tools</a>
    <div class="dropdown-content" id="tools-menu">
      <!-- Dynamically populated -->
    </div>
  </li>
  <li><a href="/about-us.html">About Us</a></li>
  <li><a href="/contact-us.html">Contact Us</a></li>
  <li><a href="/privacy-policy.html">Privacy Policy</a></li>
  <li><a href="/terms-and-conditions.html">Terms</a></li>
  <li><a href="/Disclaimer.html">Disclaimer</a></li>
</ul>
`;
const searchScript = `
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
if (searchInput && searchButton && window.toolsData) {
  const performSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      alert('Please enter a search query.');
      return;
    }
    const results = [];
    window.toolsData.forEach(category => {
      category.tools.forEach(tool => {
        if (tool.name.toLowerCase().includes(query) || tool.keywords.some(k => k.includes(query))) {
          results.push(tool);
        }
      });
    });
    if (results.length) {
      window.location.href = \`/#search?q=\${encodeURIComponent(query)}\`;
    } else {
      alert('No tools found matching your search.');
    }
  };
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}
`;
const cssContent = `
.dropdown {
  position: relative;
}
.dropdown-content {
  display: none;
  position: absolute;
  background: #fff;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  z-index: 1;
  top: 100%;
  left: 0;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content a {
  display: block;
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-color);
}
.dropdown-content a:hover {
  background: var(--primary-color);
  color: var(--light-color);
}
.dropdown-content .category {
  font-weight: 600;
  padding: 12px 16px;
  background: #f0f0f0;
  color: var(--dark-color);
}
@media (max-width: 768px) {
  .dropdown-content {
    position: static;
    box-shadow: none;
    background: none;
    width: 100%;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
}
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('</head>', '<script src="/tools.js"></script>\n</head>');
  content = content.replace(/<ul>[\s\S]*?<\/ul>/, navContent);
  content = content.replace(/const searchInput = document\.querySelector[\s\S]*?searchInput\.addEventListener\('keypress',[\s\S]*?\}\);/, searchScript);
  content = content.replace('</style>', cssContent + '</style>');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
