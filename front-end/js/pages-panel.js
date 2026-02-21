/**
 * Pages Panel Module
 * Handles the side panel for pages/slides navigation
 */

class PagesPanel {
    constructor() {
        this.panel = document.querySelector('.pages-panel');
        this.toggleBtn = document.getElementById('pages-panel-toggle');
        this.content = document.getElementById('pages-panel-content');
        this.addPageBtn = document.getElementById('add-page-btn');
        this.scrollContainer = document.querySelector('.pages-scroll-container');
        
        this.thumbnails = document.querySelectorAll('.page-thumbnail');
        this.editorPages = document.querySelectorAll('.editor-page');
        
        this.pageCount = this.thumbnails.length;
        this.activePage = 1;
        
        this.init();
    }
    
    init() {
        // Toggle panel collapse
        this.toggleBtn.addEventListener('click', () => this.togglePanel());
        
        // Page thumbnail clicks
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => this.selectPage(e.currentTarget));
        });
        
        // Add new page button
        this.addPageBtn.addEventListener('click', () => this.addNewPage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Scroll observer - highlight thumbnail when page comes into view
        this.setupScrollObserver();
        
        // Set initial active page
        this.setActivePageVisual(1);
    }
    
    setupScrollObserver() {
        const options = {
            root: this.scrollContainer,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const pageNum = parseInt(entry.target.dataset.page);
                    this.updateActiveThumbnail(pageNum);
                }
            });
        }, options);
        
        this.editorPages.forEach(page => observer.observe(page));
    }
    
    togglePanel() {
        this.panel.classList.toggle('collapsed');
        
        // Update aria attributes
        const isCollapsed = this.panel.classList.contains('collapsed');
        this.toggleBtn.setAttribute('aria-expanded', !isCollapsed);
    }
    
    selectPage(thumbnail) {
        const pageNum = parseInt(thumbnail.dataset.page);
        
        // Update active thumbnail
        this.updateActiveThumbnail(pageNum);
        
        // Scroll to the corresponding editor page
        this.scrollToPage(pageNum);
        
        // Focus the editor page
        this.focusPage(pageNum);
        
        // Dispatch custom event
        const event = new CustomEvent('pageSelected', { 
            detail: { page: pageNum } 
        });
        document.dispatchEvent(event);
        
        // Show toast notification
        this.showToast(`Switched to Page ${pageNum}`);
    }
    
    updateActiveThumbnail(pageNum) {
        // Remove active class from all thumbnails
        this.thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to selected thumbnail
        const activeThumbnail = document.querySelector(`.page-thumbnail[data-page="${pageNum}"]`);
        if (activeThumbnail) {
            activeThumbnail.classList.add('active');
        }
        
        this.activePage = pageNum;
    }
    
    setActivePageVisual(pageNum) {
        // Update thumbnail
        this.updateActiveThumbnail(pageNum);
        
        // Update editor page visual
        this.editorPages.forEach(page => page.classList.remove('active-page'));
        const activeEditorPage = document.querySelector(`.editor-page[data-page="${pageNum}"]`);
        if (activeEditorPage) {
            activeEditorPage.classList.add('active-page');
        }
    }
    
    scrollToPage(pageNum) {
        const targetPage = document.querySelector(`.editor-page[data-page="${pageNum}"]`);
        if (targetPage && this.scrollContainer) {
            targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    focusPage(pageNum) {
        const targetPage = document.querySelector(`.editor-page[data-page="${pageNum}"]`);
        if (targetPage) {
            targetPage.focus();
        }
    }
    
    addNewPage() {
        this.pageCount++;
        
        // Create new page thumbnail element
        const newThumbnail = document.createElement('div');
        newThumbnail.className = 'page-thumbnail';
        newThumbnail.dataset.page = this.pageCount;
        newThumbnail.setAttribute('tabindex', '0');
        newThumbnail.innerHTML = `
            <div class="page-thumbnail-preview">
                <span class="page-number">${this.pageCount}</span>
            </div>
            <span class="page-thumbnail-label">Page ${this.pageCount}</span>
        `;
        
        // Add click event listener
        newThumbnail.addEventListener('click', (e) => this.selectPage(e.currentTarget));
        
        // Insert before the add button
        this.content.insertBefore(newThumbnail, this.addPageBtn);
        
        // Create new editor page
        const newEditorPage = document.createElement('div');
        newEditorPage.className = 'editor-page';
        newEditorPage.dataset.page = this.pageCount;
        newEditorPage.setAttribute('contenteditable', 'true');
        
        // Append to scroll container
        this.scrollContainer.appendChild(newEditorPage);
        
        // Update references
        this.thumbnails = document.querySelectorAll('.page-thumbnail');
        this.editorPages = document.querySelectorAll('.editor-page');
        
        // Select the new page
        this.selectPage(newThumbnail);
        
        // Show toast notification
        this.showToast(`Added Page ${this.pageCount}`);
    }
    
    handleKeyboard(e) {
        // Only handle if panel is focused or visible
        if (!this.panel.contains(document.activeElement) && 
            !this.panel.classList.contains('collapsed')) {
            return;
        }
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.navigatePages(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigatePages(1);
                break;
            case 'Enter':
            case ' ':
                if (document.activeElement.classList.contains('page-thumbnail')) {
                    e.preventDefault();
                    this.selectPage(document.activeElement);
                }
                break;
        }
    }
    
    navigatePages(direction) {
        const currentIndex = Array.from(this.thumbnails).findIndex(
            t => t.classList.contains('active')
        );
        
        let newIndex = currentIndex + direction;
        
        // Wrap around
        if (newIndex < 0) newIndex = this.thumbnails.length - 1;
        if (newIndex >= this.thumbnails.length) newIndex = 0;
        
        this.selectPage(this.thumbnails[newIndex]);
        this.thumbnails[newIndex].focus();
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PagesPanel();
});
