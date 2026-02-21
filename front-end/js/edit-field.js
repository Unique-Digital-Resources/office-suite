// Core editor functionality
function execCmd(command, value = null) {
    try {
        const editor = document.getElementById('editor-page');
        editor.focus();
        
        if (value) {
            document.execCommand(command, false, value);
        } else {
            document.execCommand(command);
        }
        
        // Re-focus editor to maintain cursor position
        editor.focus();
    } catch (error) {
        console.error(`Command failed: ${command}`, error);
        showToast(`Command failed: ${command}`);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function insertImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            execCmd('insertImage', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        input.value = ''; // Reset input
    }
}

function insertTable() {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    
    if (rows && cols) {
        const table = document.createElement('table');
        table.style.border = '1px solid #000';
        table.style.borderCollapse = 'collapse';
        
        for (let i = 0; i < parseInt(rows); i++) {
            const row = table.insertRow();
            for (let j = 0; j < parseInt(cols); j++) {
                const cell = row.insertCell();
                cell.style.border = '1px solid #000';
                cell.style.padding = '5px';
                cell.textContent = 'Cell';
            }
        }
        
        const editor = document.getElementById('editor-page');
        editor.appendChild(table);
        editor.appendChild(document.createElement('br'));
    }
}

function createLink() {
    const url = prompt('Enter URL:', 'https://');
    if (url) {
        execCmd('createLink', url);
    }
}

function insertDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleString();
    execCmd('insertText', dateStr);
}

function insertSymbol() {
    const symbols = ['©', '®', '™', '€', '£', '¥', '¢', '∞', 'π', '÷', '×', '√', '≈', '≠', '≤', '≥'];
    const symbol = prompt('Select a symbol:\n' + symbols.join(' '), symbols[0]);
    if (symbol) {
        execCmd('insertText', symbol);
    }
}

function changePageColor() {
    const color = prompt('Enter color (name or hex):', 'white');
    if (color) {
        const editor = document.getElementById('editor-page');
        editor.style.backgroundColor = color;
    }
}

// Additional ribbon groups for other tabs
document.addEventListener('DOMContentLoaded', function() {
    // Illustrations group (Insert tab)
    const illustrationsTools = [
        { type: 'button', title: 'Pictures', icon: 'image', onclick: () => document.getElementById('img-upload').click() },
        { type: 'button', title: 'Shapes (Simulation)', icon: 'polygon', onclick: () => showToast('Insert Shape (Simulation)') },
        { type: 'button', title: 'Chart (Simulation)', icon: 'chart-bar', onclick: () => showToast('Insert Chart (Simulation)') }
    ];
    createRibbonGroup('rbn-illustrations', 'Illustrations', illustrationsTools);

    // Links group (Insert tab)
    const linksTools = [
        { type: 'button', title: 'Link', icon: 'link', onclick: () => createLink() },
        { type: 'button', title: 'Bookmark (Simulation)', icon: 'bookmark-simple', onclick: () => showToast('Bookmark (Simulation)') }
    ];
    createRibbonGroup('rbn-links', 'Links', linksTools);

    // Header & Footer group (Insert tab)
    const headerFooterTools = [
        { type: 'button', title: 'Header', icon: 'article', onclick: () => showToast('Header Edit (Simulation)') },
        { type: 'button', title: 'Footer', icon: 'footer', onclick: () => showToast('Footer Edit (Simulation)') },
        { type: 'button', title: 'Page Number', icon: 'hash', onclick: () => showToast('Insert Page Number (Simulation)') }
    ];
    createRibbonGroup('rbn-header-footer', 'Header & Footer', headerFooterTools);

    // Text group (Insert tab)
    const textTools = [
        { type: 'button', title: 'Text Box (Simulation)', icon: 'textbox', onclick: () => showToast('Text Box (Simulation)') },
        { type: 'button', title: 'WordArt (Simulation)', icon: 'paint-brush-broad', onclick: () => showToast('WordArt (Simulation)') },
        { type: 'button', title: 'Date & Time', icon: 'calendar-blank', onclick: () => insertDateTime() }
    ];
    createRibbonGroup('rbn-text', 'Text', textTools);

    // Symbols group (Insert tab)
    const symbolsTools = [
        { type: 'button', title: 'Equation (Simulation)', icon: 'function', onclick: () => showToast('Insert Equation (Simulation)') },
        { type: 'button', title: 'Symbol', icon: 'copyright', onclick: () => insertSymbol() }
    ];
    createRibbonGroup('rbn-symbols', 'Symbols', symbolsTools);

    // Document Formatting group (Design tab)
    const documentFormattingTools = [
        { type: 'button', title: 'Themes (Simulation)', icon: 'palette', onclick: () => showToast('Themes (Simulation)') },
        { type: 'button', title: 'Colors (Simulation)', icon: 'paint-bucket', onclick: () => showToast('Colors (Simulation)') },
        { type: 'button', title: 'Fonts (Simulation)', icon: 'text-aa', onclick: () => showToast('Fonts (Simulation)') },
        { type: 'button', title: 'Effects (Simulation)', icon: 'magic-wand', onclick: () => showToast('Effects (Simulation)') }
    ];
    createRibbonGroup('rbn-document-formatting', 'Document Formatting', documentFormattingTools);

    // Page Background group (Design tab)
    const pageBackgroundTools = [
        { type: 'button', title: 'Watermark (Simulation)', icon: 'drop', onclick: () => showToast('Watermark (Simulation)') },
        { type: 'button', title: 'Page Color', icon: 'paint-bucket', onclick: () => changePageColor() },
        { type: 'button', title: 'Page Borders (Simulation)', icon: 'border-all', onclick: () => showToast('Page Borders (Simulation)') }
    ];
    createRibbonGroup('rbn-page-background', 'Page Background', pageBackgroundTools);

    // Page Setup group (Layout tab)
    const pageSetupTools = [
        { type: 'button', title: 'Margins (Simulation)', icon: 'layout', onclick: () => showToast('Margins (Simulation)') },
        { type: 'button', title: 'Orientation (Simulation)', icon: 'arrows-down-up', onclick: () => showToast('Orientation (Simulation)') },
        { type: 'button', title: 'Size (Simulation)', icon: 'file', onclick: () => showToast('Page Size (Simulation)') },
        { type: 'button', title: 'Columns (Simulation)', icon: 'layout-template', onclick: () => showToast('Columns (Simulation)') },
        { type: 'button', title: 'Breaks (Simulation)', icon: 'file-split', onclick: () => showToast('Breaks (Simulation)') },
        { type: 'button', title: 'Line Numbers (Simulation)', icon: 'list-ol', onclick: () => showToast('Line Numbers (Simulation)') },
        { type: 'button', title: 'Hyphenation (Simulation)', icon: 'text-hyphen', onclick: () => showToast('Hyphenation (Simulation)') }
    ];
    createRibbonGroup('rbn-page-setup', 'Page Setup', pageSetupTools);

    // Editing group (Home tab)
    const editingTools = [
        { type: 'button', title: 'Find', icon: 'magnifying-glass', onclick: () => showToast('Find feature (Simulation)') },
        { type: 'button', title: 'Clear Formatting', icon: 'eraser', onclick: () => execCmd('removeFormat') }
    ];
    createRibbonGroup('rbn-editing', 'Editing', editingTools);
});
