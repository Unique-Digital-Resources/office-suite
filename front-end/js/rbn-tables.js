document.addEventListener('DOMContentLoaded', function() {
    const tablesTools = [
        { type: 'button', title: 'Table', icon: 'table', onclick: () => insertTable() }
    ];

    createRibbonGroup('rbn-tables', 'Tables', tablesTools);
});
