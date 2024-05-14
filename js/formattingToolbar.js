// Get the necessary elements from the document
const formTitle = document.getElementById('form-title');
const toolbarWrapper = document.getElementById('toolbar-wrapper');
const addDescriptionLink = document.getElementById('add-description');
const formDescription = document.getElementById('form-description');
const settingsIcon = document.getElementById('settings-icon');

// Function to execute text formatting commands on the form title
function execCommandWithArg(command) {
    document.execCommand(command, false, null);
}

// Function to toggle underline style
function toggleUnderline() {
    const isUnderlined = formTitle.style.textDecoration === 'underline';
    formTitle.style.textDecoration = isUnderlined ? 'none' : 'underline';
}

// Function to toggle bold style
function toggleBold() {
    const isBold = document.queryCommandState('bold');
    if (!isBold) {
        // If not bold, apply bold style
        execCommandWithArg('bold');
    } else {
        // If bold, remove bold style
        execCommandWithArg('removeFormat');
    }
}

// Function to toggle italic style
function toggleItalic() {
    const isItalic = document.queryCommandState('italic');
    if (!isItalic) {
        // If not italic, apply italic style
        execCommandWithArg('italic');
    } else {
        // If italic, remove italic style
        execCommandWithArg('removeFormat');
    }
}

// Listen for clicks on the toolbar buttons
toolbarWrapper.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the click event

    const target = event.target;
    if (target.classList.contains('format-button')) {
        const command = target.getAttribute('data-command');
        if (command === 'underline') {
            toggleUnderline(); // Toggle underline style
        } else if (command === 'bold') {
            toggleBold(); // Toggle bold style
        } else if (command === 'italic') {
            toggleItalic(); // Toggle italic style
        } else {
            execCommandWithArg(command); // Execute the formatting command on the form title
        }
    }
});

// Show the toolbar when the form title is clicked
formTitle.addEventListener('click', () => {
    toolbarWrapper.style.display = 'flex';
});

// Show the description when the settings icon is clicked
settingsIcon.addEventListener('click', (event) => {
    event.preventDefault();
    formDescription.style.display = 'block';
});