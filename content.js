// Walk through all text nodes and replace "Zalo" with "Zalỏ"
function replaceText(node) {
  // Only process text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;
    
    // Replace different variations of Zalo with Zalỏ
    const replacements = [
      { pattern: /Zalo/g, replacement: 'Zalỏ' },
      { pattern: /zalo/g, replacement: 'zalỏ' },
      { pattern: /ZALO/g, replacement: 'ZALỎ' }
    ];
    
    let modified = false;
    for (const { pattern, replacement } of replacements) {
      if (pattern.test(text)) {
        text = text.replace(pattern, replacement);
        modified = true;
      }
    }
    
    if (modified) {
      node.nodeValue = text;
    }
  } else {
    // Recursively process child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

// Replace text in the entire document
replaceText(document.body);

// Watch for dynamically added content
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      replaceText(node);
    });
  });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true
});
