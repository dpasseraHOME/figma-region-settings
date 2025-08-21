// Region Settings JavaScript
class RegionSettings {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeCounters();
    }

    bindEvents() {
        // Region header click events (expand/collapse)
        document.querySelectorAll('.region-header').forEach(header => {
            header.addEventListener('click', (e) => {
                // Don't trigger if clicking on checkboxes
                if (e.target.closest('.region-checkbox') || e.target.closest('.item-checkbox')) {
                    return;
                }
                this.toggleRegionSection(header.closest('.region-section'));
            });
        });

        // Region checkbox events
        document.querySelectorAll('.region-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleRegionCheckbox(checkbox);
            });
        });

        // Item checkbox events
        document.querySelectorAll('.item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleItemCheckbox(checkbox);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterRegions(e.target.value);
            });
        }

        // Top control buttons
        document.getElementById('enable-all-enabled')?.addEventListener('click', () => {
            this.enableAllRegions('enabled');
        });

        document.getElementById('clear-all-enabled')?.addEventListener('click', () => {
            this.clearAllRegions('enabled');
        });

        document.getElementById('enable-all-base')?.addEventListener('click', () => {
            this.enableAllRegions('base');
        });

        document.getElementById('clear-all-base')?.addEventListener('click', () => {
            this.clearAllRegions('base');
        });

        // Region item click events
        document.querySelectorAll('.region-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.item-checkbox') && !e.target.closest('.base-tag')) {
                    this.selectRegionItem(item);
                }
            });
        });

        // BASE badge click events
        document.querySelectorAll('.base-tag').forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleBaseBadge(badge);
            });
        });
    }

    toggleRegionSection(section) {
        const isExpanded = section.classList.contains('expanded');
        const details = section.querySelector('.region-details');
        const toggleIcon = section.querySelector('.region-toggle i');

        if (isExpanded) {
            // Collapse
            section.classList.remove('expanded');
            section.classList.add('collapsed');
            section.classList.add('collapsing');
            // Keep the same icon, just change rotation via CSS
            
            setTimeout(() => {
                details.style.display = 'none';
                section.classList.remove('collapsing');
            }, 300);
        } else {
            // Expand
            section.classList.remove('collapsed');
            section.classList.add('expanded');
            section.classList.add('expanding');
            details.style.display = 'flex';
            // Keep the same icon, just change rotation via CSS
            
            setTimeout(() => {
                section.classList.remove('expanding');
            }, 300);
        }
    }

    toggleRegionCheckbox(checkbox) {
        const isChecked = checkbox.classList.contains('checked');
        const icon = checkbox.querySelector('i');
        const section = checkbox.closest('.region-section');
        const regionItems = section.querySelectorAll('.region-item .item-checkbox');

        if (isChecked) {
            // Uncheck region and all its items
            checkbox.classList.remove('checked');
            icon.classList.remove('fa-check-circle');
            icon.classList.add('fa-plus-circle');
            
            regionItems.forEach(itemCheckbox => {
                itemCheckbox.classList.remove('checked');
                const itemIcon = itemCheckbox.querySelector('i');
                itemIcon.classList.remove('fa-check-circle');
                itemIcon.classList.add('fa-plus-circle');
                itemCheckbox.closest('.region-item').classList.remove('enabled');
            });
        } else {
            // Check region and all its items
            checkbox.classList.add('checked');
            icon.classList.remove('fa-plus-circle');
            icon.classList.add('fa-check-circle');
            
            regionItems.forEach(itemCheckbox => {
                itemCheckbox.classList.add('checked');
                const itemIcon = itemCheckbox.querySelector('i');
                itemIcon.classList.remove('fa-plus-circle');
                itemIcon.classList.add('fa-check-circle');
                itemCheckbox.closest('.region-item').classList.add('enabled');
            });
        }

        this.updateCounters();
    }

    toggleItemCheckbox(checkbox) {
        const isChecked = checkbox.classList.contains('checked');
        const icon = checkbox.querySelector('i');
        const regionItem = checkbox.closest('.region-item');
        const section = checkbox.closest('.region-section');
        const regionCheckbox = section.querySelector('.region-checkbox');

        if (isChecked) {
            // Uncheck item
            checkbox.classList.remove('checked');
            icon.classList.remove('fa-check-circle');
            icon.classList.add('fa-plus-circle');
            regionItem.classList.remove('enabled');
        } else {
            // Check item
            checkbox.classList.add('checked');
            icon.classList.remove('fa-plus-circle');
            icon.classList.add('fa-check-circle');
            regionItem.classList.add('enabled');
        }

        // Update region checkbox based on item states
        const allItemCheckboxes = section.querySelectorAll('.region-item .item-checkbox');
        const checkedItems = section.querySelectorAll('.region-item .item-checkbox.checked');
        const regionIcon = regionCheckbox.querySelector('i');

        if (checkedItems.length === allItemCheckboxes.length && allItemCheckboxes.length > 0) {
            // All items checked
            regionCheckbox.classList.add('checked');
            regionIcon.classList.remove('fa-plus-circle');
            regionIcon.classList.add('fa-check-circle');
        } else if (checkedItems.length === 0) {
            // No items checked
            regionCheckbox.classList.remove('checked');
            regionIcon.classList.remove('fa-check-circle');
            regionIcon.classList.add('fa-plus-circle');
        } else {
            // Some items checked - keep region unchecked but you could add partial state
            regionCheckbox.classList.remove('checked');
            regionIcon.classList.remove('fa-check-circle');
            regionIcon.classList.add('fa-plus-circle');
        }

        this.updateCounters();
    }

    selectRegionItem(item) {
        // Remove selection from all items
        document.querySelectorAll('.region-item').forEach(i => i.classList.remove('selected'));
        
        // Add selection to clicked item
        item.classList.add('selected');
    }

    filterRegions(searchTerm) {
        const regions = document.querySelectorAll('.region-section');
        const lowerSearchTerm = searchTerm.toLowerCase();

        regions.forEach(region => {
            const regionName = region.querySelector('.region-name').textContent.toLowerCase();
            const regionItems = region.querySelectorAll('.region-item');
            let hasMatchingItem = false;

            // Check if region name matches
            const regionMatches = regionName.includes(lowerSearchTerm);

            // Check if any items match
            regionItems.forEach(item => {
                const itemName = item.querySelector('.item-name').textContent.toLowerCase();
                const itemMatches = itemName.includes(lowerSearchTerm);
                
                if (itemMatches || regionMatches || searchTerm === '') {
                    item.style.display = 'flex';
                    if (itemMatches) hasMatchingItem = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide region based on matches
            if (regionMatches || hasMatchingItem || searchTerm === '') {
                region.style.display = 'block';
            } else {
                region.style.display = 'none';
            }
        });
    }

    enableAllRegions(type) {
        if (type === 'enabled') {
            const regionCheckboxes = document.querySelectorAll('.region-checkbox');
            const itemCheckboxes = document.querySelectorAll('.item-checkbox');

            // Enable all regions
            regionCheckboxes.forEach(checkbox => {
                checkbox.classList.add('checked');
                const icon = checkbox.querySelector('i');
                icon.classList.remove('fa-plus-circle');
                icon.classList.add('fa-check-circle');
            });

            // Enable all items
            itemCheckboxes.forEach(checkbox => {
                checkbox.classList.add('checked');
                const icon = checkbox.querySelector('i');
                icon.classList.remove('fa-plus-circle');
                icon.classList.add('fa-check-circle');
                checkbox.closest('.region-item').classList.add('enabled');
            });

            this.updateCounters();
        } else if (type === 'base') {
            // Enable one BASE badge per region (first one in each region)
            document.querySelectorAll('.region-section').forEach(section => {
                const baseTags = section.querySelectorAll('.base-tag');
                if (baseTags.length > 0) {
                    // Clear all badges in this region first
                    baseTags.forEach(badge => badge.classList.remove('active'));
                    // Activate the first one
                    baseTags[0].classList.add('active');
                }
            });

            this.updateBaseCounters();
        }
    }

    clearAllRegions(type) {
        if (type === 'enabled') {
            const regionCheckboxes = document.querySelectorAll('.region-checkbox');
            const itemCheckboxes = document.querySelectorAll('.item-checkbox');

            // Clear all regions
            regionCheckboxes.forEach(checkbox => {
                checkbox.classList.remove('checked');
                const icon = checkbox.querySelector('i');
                icon.classList.remove('fa-check-circle');
                icon.classList.add('fa-plus-circle');
            });

            // Clear all items
            itemCheckboxes.forEach(checkbox => {
                checkbox.classList.remove('checked');
                const icon = checkbox.querySelector('i');
                icon.classList.remove('fa-check-circle');
                icon.classList.add('fa-plus-circle');
                checkbox.closest('.region-item').classList.remove('enabled');
            });

            this.updateCounters();
        } else if (type === 'base') {
            // Clear all BASE badges
            const baseTags = document.querySelectorAll('.base-tag');
            baseTags.forEach(badge => {
                badge.classList.remove('active');
            });

            this.updateBaseCounters();
        }
    }

    updateCounters() {
        const totalRegions = document.querySelectorAll('.region-section').length;
        const totalItems = document.querySelectorAll('.region-item').length;
        const enabledItems = document.querySelectorAll('.region-item.enabled').length;
        
        // Update main counters
        const enabledBadges = document.querySelectorAll('.top-controls .badge');
        if (enabledBadges.length >= 2) {
            enabledBadges[0].textContent = `${enabledItems}/${totalItems}`;
            enabledBadges[1].textContent = `${enabledItems}/${totalItems}`;
        }

        // Update individual region counters
        document.querySelectorAll('.region-section').forEach(section => {
            const regionItems = section.querySelectorAll('.region-item');
            const enabledRegionItems = section.querySelectorAll('.region-item.enabled');
            const statBadges = section.querySelectorAll('.stat-group .badge');
            
            if (statBadges.length >= 2) {
                statBadges[0].textContent = `${enabledRegionItems.length}/${regionItems.length}`;
                statBadges[1].textContent = `${enabledRegionItems.length}/${regionItems.length}`;
            }
        });
    }

    toggleBaseBadge(badge) {
        const isActive = badge.classList.contains('active');
        const regionSection = badge.closest('.region-section');
        
        if (isActive) {
            // Deactivate this BASE badge
            badge.classList.remove('active');
        } else {
            // First, deactivate all other BASE badges in this region
            const otherBaseTags = regionSection.querySelectorAll('.base-tag.active');
            otherBaseTags.forEach(otherBadge => {
                otherBadge.classList.remove('active');
            });
            
            // Then activate this BASE badge
            badge.classList.add('active');
        }
        
        this.updateBaseCounters();
    }

    updateBaseCounters() {
        // Update base region counters
        document.querySelectorAll('.region-section').forEach(section => {
            const totalBaseTags = section.querySelectorAll('.base-tag');
            const activeBaseTags = section.querySelectorAll('.base-tag.active');
            const statBadges = section.querySelectorAll('.stat-group .badge');
            
            // Update the second badge (Base Regions)
            if (statBadges.length >= 2) {
                const currentText = statBadges[1].textContent;
                const parts = currentText.split('/');
                if (parts.length === 2) {
                    statBadges[1].textContent = `${activeBaseTags.length}/${totalBaseTags.length}`;
                }
            }
        });

        // Update main base regions counter
        const totalBaseTags = document.querySelectorAll('.base-tag');
        const activeBaseTags = document.querySelectorAll('.base-tag.active');
        const mainBadges = document.querySelectorAll('.top-controls .badge');
        
        if (mainBadges.length >= 2) {
            const currentText = mainBadges[1].textContent;
            const parts = currentText.split('/');
            if (parts.length === 2) {
                mainBadges[1].textContent = `${activeBaseTags.length}/${totalBaseTags.length}`;
            }
        }
    }

    initializeCounters() {
        // Set initial counter values
        this.updateCounters();
        this.updateBaseCounters();
        
        // Update counters for regions that have pre-selected items
        document.querySelectorAll('.region-section').forEach(section => {
            const checkedItems = section.querySelectorAll('.item-checkbox.checked');
            const totalItems = section.querySelectorAll('.item-checkbox');
            const regionCheckbox = section.querySelector('.region-checkbox');
            
            if (checkedItems.length === totalItems.length && totalItems.length > 0) {
                regionCheckbox.classList.add('checked');
                const icon = regionCheckbox.querySelector('i');
                icon.classList.remove('fa-plus-circle');
                icon.classList.add('fa-check-circle');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegionSettings();
});

// Add some keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Clear search
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }
    
    if (e.key === 'Enter' && e.target.matches('.region-header, .region-item')) {
        e.target.click();
    }
});

// Add focus states for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Make interactive elements focusable
    document.querySelectorAll('.region-header, .region-item, .region-checkbox, .item-checkbox, .btn-cta').forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Add focus styles
    const style = document.createElement('style');
    style.textContent = `
        .region-header:focus,
        .region-item:focus,
        .btn-cta:focus {
            outline: 2px solid #2fc584;
            outline-offset: 2px;
        }
        
        .region-checkbox:focus,
        .item-checkbox:focus {
            outline: 2px solid #2fc584;
            outline-offset: 1px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
});
