// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    // Function to switch tabs
    function switchTab(tabId) {
        
        // Hide all tab content
        var tabContents = document.querySelectorAll('.fpg-tab-content');
        tabContents.forEach(function(content) {
            content.style.display = 'none';
        });

        // Deactivate all tab links
        var tabLinks = document.querySelectorAll('.fpg-nav-tab');
        tabLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        // Show the selected tab content
        var selectedTabContent = document.getElementById(tabId);
        if (selectedTabContent) {
            selectedTabContent.style.display = 'block';
        }

        // Activate the selected tab link
        var selectedTabLink = document.querySelector('a[href="#' + tabId + '"]');
        if (selectedTabLink) {
            selectedTabLink.classList.add('active');
        }

        // Update browser URL hash for back/forward navigation
        history.pushState(null, null, '#' + tabId);

        // Store active tab in local storage
        localStorage.setItem('activeTab', tabId);
    }

    // Function to initialize tabs
    function initializeTabs() {
        var activeTab = localStorage.getItem('activeTab');
        var defaultTabId = document.querySelector('.fpg-nav-tab').getAttribute('href').replace('#', '');
        var initialTabId = activeTab || defaultTabId;
        switchTab(initialTabId);
    }

    // Add click event listeners to tab links
    var tabLinks = document.querySelectorAll('.fpg-nav-tab');
    tabLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var tabId = link.getAttribute('href').replace('#', '');
            switchTab(tabId);
        });
    });

    // Handle initial tab state from local storage or default to first tab
    initializeTabs();

    // Handle back/forward browser navigation
    window.addEventListener('popstate', function() {
        var currentTabId = location.hash.replace('#', '');
        switchTab(currentTabId);
    });
});

