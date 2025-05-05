export let selectedTowerType = 'basic';

export function setupUI() {
    const buttons = {
        'basic-tower': 'basic',
        'sniper-tower': 'sniper',
        'rapid-tower': 'rapid'
    };

    for (const [buttonId, type] of Object.entries(buttons)) {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            selectedTowerType = type;
            // Remove 'selected' class from all buttons
            Object.keys(buttons).forEach(id => {
                document.getElementById(id).classList.remove('selected');
            });
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
        });
    }
}