document.addEventListener('DOMContentLoaded', function() {
    const paragraphTools = [
        { type: 'button', title: 'Bullets', icon: 'list-bullets', cmd: 'insertUnorderedList' },
        { type: 'button', title: 'Numbering', icon: 'list-numbers', cmd: 'insertOrderedList' },
        { type: 'button', title: 'Decrease Indent', icon: 'text-indent', onclick: () => execCmd('outdent') },
        { type: 'button', title: 'Increase Indent', icon: 'text-outdent', onclick: () => execCmd('indent') },
        { type: 'separator' },
        { type: 'button', title: 'Align Left', icon: 'text-align-left', cmd: 'justifyLeft' },
        { type: 'button', title: 'Center', icon: 'text-align-center', cmd: 'justifyCenter' },
        { type: 'button', title: 'Align Right', icon: 'text-align-right', cmd: 'justifyRight' }
    ];

    createRibbonGroup('rbn-paragraph', 'Paragraph', paragraphTools);
});
