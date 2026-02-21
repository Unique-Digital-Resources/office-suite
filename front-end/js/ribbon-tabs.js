document.addEventListener('DOMContentLoaded', function() {
    // Tab management
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabItems.forEach(item => {
        const tabBtn = item.querySelector('.tab-btn');
        tabBtn.addEventListener('click', () => {
            const tabNumber = item.dataset.tab;

            // Remove active class from all tabs and panels
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            item.classList.add('active');
            const targetPanel = document.getElementById(`tab-${tabNumber}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Tool button active state management
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tool-btn') && e.target.dataset.cmd) {
            // Toggle active state for the clicked button
            e.target.classList.toggle('active-tool');
            
            // Remove active state from other buttons with the same command
            const command = e.target.dataset.cmd;
            document.querySelectorAll('.tool-btn[data-cmd]').forEach(btn => {
                if (btn !== e.target && btn.dataset.cmd === command) {
                    btn.classList.remove('active-tool');
                }
            });
        }
    });
});
