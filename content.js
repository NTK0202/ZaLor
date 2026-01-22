// Walk through all text nodes and replace "Zalo" with "Zalỏ"
function replaceText(node) {
  // Only process text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    const originalText = node.nodeValue;
    
    // Replace different variations of Zalo with Zalỏ
    let text = originalText;
    text = text.replace(/Zalo/g, 'Zalỏ');
    text = text.replace(/zalo/g, 'zalỏ');
    text = text.replace(/ZALO/g, 'ZALỎ');
    
    // Only update if text actually changed
    if (text !== originalText) {
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
if (document.body) {
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
}
