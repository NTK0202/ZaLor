function replaceText(node) {
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') {
        return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
        const originalText = node.nodeValue;

        let text = originalText;
        text = text.replace(/zalo/gi, match => {
            if (match === match.toUpperCase()) {
                return 'ZALỎ';
            }

            if (match === match.toLowerCase()) {
                return 'zalỏ';
            }

            return 'Zalỏ';
        });

        if (text !== originalText) {
            node.nodeValue = text;
        }
    } else if (node.childNodes) {
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i]);
        }
    }
}

if (document.body) {
    replaceText(document.body);

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                replaceText(node);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
