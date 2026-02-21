document.addEventListener('DOMContentLoaded', function() {
    const fontTools = [
        { 
            type: 'select', 
            onchange: (value) => execCmd('fontName', value),
            options: [
                { value: 'Segoe UI', text: 'Segoe UI' },
                { value: 'Arial', text: 'Arial' },
                { value: 'Times New Roman', text: 'Times New Roman' },
                { value: 'Courier New', text: 'Courier New' },
                { value: 'Georgia', text: 'Georgia' }
            ]
        },
        { 
            type: 'select', 
            onchange: (value) => execCmd('fontSize', value),
            options: [
                { value: '1', text: '8' },
                { value: '2', text: '10' },
                { value: '3', text: '12', selected: true },
                { value: '4', text: '14' },
                { value: '5', text: '18' },
                { value: '6', text: '24' },
                { value: '7', text: '36' }
            ]
        },
        { type: 'button', title: 'Bold', icon: 'text-b', cmd: 'bold' },
        { type: 'button', title: 'Italic', icon: 'text-italic', cmd: 'italic' },
        { type: 'button', title: 'Underline', icon: 'text-underline', cmd: 'underline' },
        { type: 'separator' },
        { type: 'color', title: 'Text Color', icon: 'text-a-underline', color: 'red', cmd: 'foreColor' },
        { type: 'color', title: 'Highlight Color', icon: 'highlighter', color: 'yellow', cmd: 'hiliteColor' }
    ];

    // Create a custom row layout for font tools to have two columns
    const groupElement = document.getElementById('rbn-font');
    if (groupElement) {
        // Clear any existing content
        groupElement.innerHTML = '';

        // Create a custom tools row container
        const toolsContainer = document.createElement('div');
        toolsContainer.className = 'tools-row';
        toolsContainer.style.flexDirection = 'column';
        toolsContainer.style.gap = '2px';
        toolsContainer.style.alignItems = 'center';

        // Create first row for font name and size
        const row1 = document.createElement('div');
        row1.className = 'tools-row';
        row1.style.width = '100%';

        const fontNameSelect = createSelectTool({
            onchange: (value) => execCmd('fontName', value),
            options: [
                { value: 'Segoe UI', text: 'Segoe UI' },
                { value: 'Arial', text: 'Arial' },
                { value: 'Times New Roman', text: 'Times New Roman' },
                { value: 'Courier New', text: 'Courier New' },
                { value: 'Georgia', text: 'Georgia' }
            ]
        });

        const fontSizeSelect = createSelectTool({
            onchange: (value) => execCmd('fontSize', value),
            options: [
                { value: '1', text: '8' },
                { value: '2', text: '10' },
                { value: '3', text: '12', selected: true },
                { value: '4', text: '14' },
                { value: '5', text: '18' },
                { value: '6', text: '24' },
                { value: '7', text: '36' }
            ]
        });

        row1.appendChild(fontNameSelect);
        row1.appendChild(fontSizeSelect);

        // Create second row for other font tools
        const row2 = document.createElement('div');
        row2.className = 'tools-row';

        row2.appendChild(createButtonTool({ type: 'button', title: 'Bold', icon: 'text-b', cmd: 'bold' }));
        row2.appendChild(createButtonTool({ type: 'button', title: 'Italic', icon: 'text-italic', cmd: 'italic' }));
        row2.appendChild(createButtonTool({ type: 'button', title: 'Underline', icon: 'text-underline', cmd: 'underline' }));
        row2.appendChild(createSeparatorTool());
        row2.appendChild(createColorTool({ type: 'color', title: 'Text Color', icon: 'text-a-underline', color: 'red', cmd: 'foreColor' }));
        row2.appendChild(createColorTool({ type: 'color', title: 'Highlight Color', icon: 'highlighter', color: 'yellow', cmd: 'hiliteColor' }));

        // Append rows to container
        toolsContainer.appendChild(row1);
        toolsContainer.appendChild(row2);

        // Create group label
        const labelElement = document.createElement('div');
        labelElement.className = 'group-label';
        labelElement.textContent = 'Font';

        // Append to group
        groupElement.appendChild(toolsContainer);
        groupElement.appendChild(labelElement);
    }
});
