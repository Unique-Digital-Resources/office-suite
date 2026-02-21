document.addEventListener('DOMContentLoaded', function() {
    const pagesTools = [
        { type: 'button', title: 'Cover Page', icon: 'file-text', onclick: () => showToast('Cover Page (Simulation)') },
        { type: 'button', title: 'Blank Page', icon: 'plus', onclick: () => execCmd('insertParagraph') },
        { type: 'button', title: 'Page Break', icon: 'page-break', onclick: () => execCmd('insertHorizontalRule') }
    ];

    createRibbonGroup('rbn-pages', 'Pages', pagesTools);
});
