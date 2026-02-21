function createRibbonGroup(groupId, label, tools) {
    const groupElement = document.getElementById(groupId);
    if (!groupElement) {
        console.error(`Ribbon group element not found: ${groupId}`);
        return;
    }

    // Create tools row
    const toolsRow = document.createElement('div');
    toolsRow.className = 'tools-row';

    // Add each tool to the row
    tools.forEach(tool => {
        let toolElement;

        if (tool.type === 'button') {
            toolElement = createButtonTool(tool);
        } else if (tool.type === 'select') {
            toolElement = createSelectTool(tool);
        } else if (tool.type === 'color') {
            toolElement = createColorTool(tool);
        } else if (tool.type === 'separator') {
            toolElement = createSeparatorTool();
        } else {
            console.warn(`Unknown tool type: ${tool.type}`);
            return;
        }

        if (toolElement) {
            toolsRow.appendChild(toolElement);
        }
    });

    // Create group label
    const labelElement = document.createElement('div');
    labelElement.className = 'group-label';
    labelElement.textContent = label;

    // Append tools and label to group
    groupElement.appendChild(toolsRow);
    groupElement.appendChild(labelElement);
}

function createButtonTool(tool) {
    const button = document.createElement('button');
    button.className = 'tool-btn';
    button.title = tool.title;
    
    if (tool.cmd) {
        button.dataset.cmd = tool.cmd;
        button.addEventListener('click', () => execCmd(tool.cmd));
    } else if (tool.onclick) {
        button.addEventListener('click', tool.onclick);
    }

    if (tool.icon) {
        const icon = document.createElement('i');
        icon.className = `ph ph-${tool.icon}`;
        if (tool.color) {
            icon.style.color = tool.color;
        }
        button.appendChild(icon);
    }

    return button;
}

function createSelectTool(tool) {
    const select = document.createElement('select');
    select.className = 'tool-select';
    
    if (tool.onchange) {
        select.addEventListener('change', (e) => tool.onchange(e.target.value));
    }

    tool.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        if (option.selected) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });

    return select;
}

function createColorTool(tool) {
    const button = document.createElement('button');
    button.className = 'tool-btn';
    button.title = tool.title;

    const icon = document.createElement('i');
    icon.className = `ph ph-${tool.icon}`;
    if (tool.color) {
        icon.style.color = tool.color;
    }

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.style.position = 'absolute';
    colorInput.style.opacity = '0';
    colorInput.style.width = '100%';
    colorInput.style.height = '100%';
    colorInput.style.cursor = 'pointer';

    if (tool.cmd) {
        colorInput.addEventListener('change', (e) => execCmd(tool.cmd, e.target.value));
    } else if (tool.onchange) {
        colorInput.addEventListener('change', (e) => tool.onchange(e.target.value));
    }

    button.appendChild(icon);
    button.appendChild(colorInput);

    return button;
}

function createSeparatorTool() {
    const separator = document.createElement('div');
    separator.className = 'separator';
    return separator;
}
