document.addEventListener('DOMContentLoaded', function () {
    const tabContainer = document.getElementById('year-report-tabs');
    if (!tabContainer) return;

const indicator = tabContainer.querySelector('.tab-indicator');
const tabs = Array.from(tabContainer.querySelectorAll('input[role="tab"]'));
const panels = Array.from((tabContainer.parentElement || document).querySelectorAll('[data-tab-panel]'));
    if (!indicator || tabs.length === 0) return;

    const getTabIndex = (tab) => {
    const index = tab.dataset.tabIndex;
    return typeof index === 'string' ? index : tabs.indexOf(tab).toString();
    };

    const showPanelForTab = (tab) => {
    const targetIndex = getTabIndex(tab);
    panels.forEach((panel) => {
        const isActive = panel.dataset.tabPanel === targetIndex;
        panel.classList.toggle('hidden', !isActive);
        panel.setAttribute('aria-hidden', (!isActive).toString());
    });
    };

    const updateIndicator = (currentTab) => {
    if (!currentTab) return;
    indicator.style.width = `${currentTab.offsetWidth}px`;
    indicator.style.transform = `translateX(${currentTab.offsetLeft}px)`;
    };

    const activateTab = (tab, { skipAnimation } = {}) => {
    if (!tab) return;
    if (skipAnimation) {
        indicator.style.transition = 'none';
    }
    updateIndicator(tab);
    showPanelForTab(tab);
    if (skipAnimation) {
        requestAnimationFrame(() => {
        indicator.style.removeProperty('transition');
        });
    }
    };

    tabs.forEach((tab) => {
    tab.addEventListener('change', () => {
        if (tab.checked) {
        activateTab(tab);
        }
    });
    });

    window.addEventListener('resize', () => {
    const activeTab = tabs.find((tab) => tab.checked);
    activateTab(activeTab);
    });

    const initialTab = tabs.find((tab) => tab.checked) || tabs[0];
    activateTab(initialTab, { skipAnimation: true });
});
