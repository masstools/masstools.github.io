document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const suggestionsContainer = document.querySelector('.search-suggestions ul');

  const tools = [
    { name: 'Word Counter', url: '/word-counter.html' },
    { name: 'Case Converter', url: '/case-converter.html' },
    { name: 'Text to ASCII', url: '/text-to-ascii-converter.html' },
    { name: 'Lorem Ipsum Generator', url: '/lorem-ipsum-generator.html' },
    { name: 'Character Counter', url: '/character-counter.html' },
    { name: 'Sort Text', url: '/sort-text.html' },
    { name: 'Find And Replace', url: '/find-and-replace-text.html' },
    { name: 'Reverse List', url: '/reverse-list.html' },
    { name: 'Difference Checker', url: '/difference-checker.html' },
    { name: 'Add Prefix/Suffix', url: '/add-prefix-suffix.html' },
    { name: 'Add Line Breaks', url: '/add-line-breaks.html' },
    { name: 'Remove Line Breaks', url: '/remove-line-breaks.html' },
    { name: 'Concatenate Text', url: '/concatenate-text.html' },
    { name: 'Split Text', url: '/split-text.html' },
    { name: 'Extract Column', url: '/extract-column.html' },
    { name: 'Swap Column', url: '/swap-column.html' },
    { name: 'Reverse Words', url: '/reverse-words.html' },
    { name: 'Reverse Letters', url: '/reverse-letters.html' },
    { name: 'Remove Extra Spaces', url: '/remove-extra-spaces.html' },
    { name: 'Remove Duplicate Lines', url: '/remove-duplicate-lines.html' },
    { name: 'Remove Empty Lines', url: '/remove-empty-lines.html' },
    { name: 'Remove Letter Accents', url: '/remove-letter-accents.html' },
    { name: 'Remove Unwanted Characters', url: '/remove-unwanted-characters.html' },
    { name: 'Remove Lines Containing/Not Containing', url: '/remove-lines-containing.html' },
    { name: 'Remove Emojis', url: '/remove-emojis.html' },
    { name: 'Strip HTML Tags', url: '/strip-html-tags.html' },
    { name: 'Add Line Numbers', url: '/add-line-numbers.html' },
    { name: 'Replace Smart/Straight Quotes', url: '/replace-quotes.html' },
    { name: 'Tabs to Spaces Converter', url: '/tabs-to-spaces.html' },
    { name: 'Spaces to Tabs Converter', url: '/spaces-to-tabs.html' },
    { name: 'Pad Text', url: '/pad-text.html' },
    { name: 'Word Wrap', url: '/word-wrap.html' },
    { name: 'Justify Text', url: '/justify-text.html' },
    { name: 'Center Text', url: '/center-text.html' },
    { name: 'Upside Down Text', url: '/upside-down-text.html' },
    { name: 'Bold Text Generator', url: '/bold-text-generator.html' },
    { name: 'Italic Text Generator', url: '/italic-text-generator.html' },
    { name: 'Old English Text Generator', url: '/old-english-text-generator.html' },
    { name: 'Cursive Text Generator', url: '/cursive-text-generator.html' },
    { name: 'Normalize Unicode Text', url: '/normalize-unicode-text.html' },
    { name: 'HTML Encode Decode', url: '/html-encode-decode.html' },
    { name: 'URL Encode Decode', url: '/url-encode-decode.html' },
    { name: 'HTML Escape Unescape', url: '/html-escape-unescape.html' },
    { name: 'Unique Username Generator', url: '/unique-username-generator.html' },
    { name: 'Strong Password Generator', url: '/strong-password-generator.html' },
    { name: 'Pronounceable Password Generator', url: '/pronounceable-password-generator.html' },
    { name: 'Random String Generator', url: '/random-string-generator.html' },
    { name: 'Random Word Generator', url: '/random-word-generator.html' },
    { name: 'Filler Text', url: '/filler-text-generator.html' },
    { name: 'Random Number Generator', url: '/random-number-generator.html' },
    { name: 'Random Email Generator', url: '/random-email-generator.html' },
    { name: 'Email Extractor', url: '/email-extractor.html' },
    { name: 'URL Extractor', url: '/url-extractor.html' },
    { name: 'Online Notepad', url: '/online-notepad.html' }
  ];

  if (searchInput && searchButton && suggestionsContainer) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      const matchedTool = tools.find(tool => tool.name.toLowerCase().includes(query));
      if (matchedTool) {
        window.location.href = matchedTool.url;
      } else {
        alert('No tools found matching your search.');
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      suggestionsContainer.innerHTML = '';
      if (query.length > 0) {
        const filteredTools = tools.filter(tool => tool.name.toLowerCase().includes(query));
        filteredTools.forEach(tool => {
          const li = document.createElement('li');
          li.textContent = tool.name;
          li.addEventListener('click', () => {
            window.location.href = tool.url;
          });
          suggestionsContainer.appendChild(li);
        });
        suggestionsContainer.parentElement.classList.toggle('show', filteredTools.length > 0);
      } else {
        suggestionsContainer.parentElement.classList.remove('show');
      }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.parentElement.classList.remove('show');
      }
    });
  }
});
