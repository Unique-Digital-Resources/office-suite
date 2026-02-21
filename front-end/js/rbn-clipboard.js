document.addEventListener('DOMContentLoaded', function() {
    const clipboardTools = [
        { type: 'button', title: 'Paste', icon: 'clipboard-text', onclick: () => execCmd('paste') },
        { type: 'button', title: 'Cut', icon: 'scissors', onclick: () => execCmd('cut') },
        { type: 'button', title: 'Copy', icon: 'copy', onclick: () => execCmd('copy') }
    ];

    createRibbonGroup('rbn-clipboard', 'Clipboard', clipboardTools);
});
