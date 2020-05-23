
/**Variable for activity cost*/
let totalCost = 0;

/**Form elements initialize*/
function initialize() {
    const inputName = document.querySelector("#name");
    inputName.focus();
    const otherJob = document.querySelector("#other-title");
    otherJob.hidden = true;

    const jobParent = document.querySelector("#title");
    jobParent.addEventListener("change", (event) => {
        otherJob.hidden = event.target.value !== "other";
    });

    const selectTheme = document.querySelector("#design option");
    selectTheme.hidden = true;

    const colorParent = document.querySelector("#color");
    colorParent.hidden = true;

    const colorDiv = document.querySelector("#colors-js-puns");
    const reminder = document.createElement("label");
    reminder.textContent = "Please select a T-shirt theme";
    colorDiv.appendChild(reminder);

    const colorOptions = document.querySelectorAll("#colors-js-puns option");
    for (let i = 0; i < colorOptions.length; i++) {
        if (i < 3) {
            colorOptions[i].alt = "js puns";
        }
        else {
            colorOptions[i].alt = "heart js";
        }
    }

    const selectDesign = document.querySelector("#design");

    selectDesign.addEventListener("change", (event) => {
        reminder.style.display = "none";
        colorParent.hidden = false;
        const targetValue = event.target.value;
        let count = 0;
        for (let i = 0; i < colorOptions.length; i++) {

            if (targetValue === colorOptions[i].alt) {
                count++;
                if (count === 1) {
                    colorOptions[i].selected = true;
                }
                colorOptions[i].hidden = false;
            }
            else {
                colorOptions[i].hidden = true;
            }
        }
    });

}

initialize();

const checkboxes = document.querySelectorAll(".activities input");
const activities = document.querySelector(".activities");
const costLabel = document.createElement("label");
costLabel.textContent = `Total:$${totalCost}`;
activities.appendChild(costLabel);

/**Warning message initialize***********************************************/
const activityWarning = document.createElement("span");
activities.firstElementChild.appendChild(activityWarning);
activityWarning.textContent = "Must select at least one activity";
activityWarning.style.display = "none";
activityWarning.classList.add("warning");

const nameLabel = document.querySelector("label");
const nameWarning = document.createElement("span");
nameWarning.textContent = "Name can't be blank";
nameWarning.classList.add("warning");
nameWarning.style.display = "none";
nameLabel.appendChild(nameWarning);

const emailLabel = document.querySelectorAll("label")[1];
const emailWarning = document.createElement("span");
emailWarning.textContent = "Must be a valid email address";
emailWarning.classList.add("warning");
emailWarning.style.display = "none";
emailLabel.appendChild(emailWarning);

const ccDiv = document.querySelector(".col-6.col");
const ccWarning = document.createElement("span");
ccWarning.textContent = "Must be 13-16 digits";
ccWarning.classList.add("warning");
ccDiv.firstElementChild.appendChild(ccWarning);
ccWarning.style.display = "none";

const zipDiv = document.querySelectorAll(".col-3")[0];
const zipWarning = document.createElement("span");
zipWarning.textContent = "Must be 5 digits";
zipWarning.classList.add("warning");
zipDiv.firstElementChild.appendChild(zipWarning);
zipWarning.style.display = "none";

const cvvDiv = document.querySelectorAll(".col-3")[1];
const cvvWarning = document.createElement("span");
cvvWarning.textContent = "Must be 3 digits";
cvvWarning.classList.add("warning");
cvvDiv.firstElementChild.appendChild(cvvWarning);
cvvWarning.style.display = "none";
/*************************************************************************************/



/**
 * Event listener for checkboxes
 */
activities.addEventListener("change", (event) => {
    const clicked = event.target;
    const clickedTime = clicked.getAttribute("data-day-and-time");
    const clickedCost = parseInt(clicked.getAttribute("data-cost"));
    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxTime = checkboxes[i].getAttribute("data-day-and-time");
        if (checkboxTime && checkboxTime === clickedTime && checkboxes[i] !== clicked) {
            checkboxes[i].disabled = clicked.checked;
        }
    }
    if (clicked.checked) {
        totalCost += clickedCost;
    }
    else {
        totalCost -= clickedCost;
    }
    costLabel.textContent = `Total:$${totalCost}`;
});

/**pay information *******************************************************/
const payReminder = document.querySelector("#payment option");
payReminder.hidden = true;
const selectPay = document.querySelector("#payment");
const payOptions = document.querySelectorAll("#payment option");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
paypal.hidden = true;
bitcoin.hidden = true;
selectPay.addEventListener("change", (event) => {
    const selected = event.target.value;
    creditCard.hidden = selected !== "credit card";
    paypal.hidden = selected !== "paypal";
    bitcoin.hidden = selected !== "bitcoin";
});
payOptions[1].selected = true;
/****************************************************************************/


/**Validator for input*******************************************************/
const ERROR_BORDER_COLOR = "red";
const VALID_BORDER_COLOR = "white";

/**
 * Check input field
 * @param {string} regex - The regular expression for validation
 * @param {string} elementString - The string of target element
 */
function inputValidator(regex, elementString) {
    const element = document.querySelector(elementString);
    const input = element.value;
    const valid = regex.test(input);
    if (valid) {
        element.style.borderColor = VALID_BORDER_COLOR;
        return true;
    }
    else {
        element.style.borderColor = ERROR_BORDER_COLOR;
        return false;
    }
}

function nameValidator() {
    return inputValidator(/^.*\S.*$/, "#name");
}

function emailValidator() {
    return inputValidator(/^[^@]+@[^@.]+\.[a-z]+$/i, "#mail");
}

/**
 * Check activities checkboxes
 * @param {list} group - List of activity checkboxes 
 */
function activityValidator(group) {
    for (let i = 0; i < group.length; i++) {
        if (group[i].checked) {
            return true;
        }
    }
    return false;
}


/**
 * Check credit card field
 * @param {boolean} valid - The result of input validator
 */
function creditCardValidator(valid) {
    if (!creditCard.hidden) {
        return valid;
    }
    else {
        return true;
    }
}

/**Check card number */
function ccValidatior() {
    return creditCardValidator(inputValidator(/^\d{13,16}$/, "#cc-num"));
}
/**Check zip code */
function zipValidator() {
    return creditCardValidator(inputValidator(/^\d{5}$/, "#zip"));
}
/**Check CVV */
function cvvValidator() {
    return creditCardValidator(inputValidator(/^\d{3}$/, "#cvv"));
}

const form = document.querySelector("form");

/**Event listener for form*/
form.addEventListener("submit", (event) => {
    /**
     * Control warning message
     * @param {boolean} valid - The validation of input field
     * @param {element} element - The warning element
     */
    function checkValid(valid, element) {
        if (valid) {
            element.style.display = "none";
        } else {
            event.preventDefault();
            element.style.display = "";
        }
    }
    checkValid(nameValidator(), nameWarning);
    checkValid(emailValidator(), emailWarning);
    checkValid(activityValidator(checkboxes), activityWarning);
    checkValid(ccValidatior(), ccWarning);
    checkValid(zipValidator(), zipWarning);
    checkValid(cvvValidator(), cvvWarning);
});
/*********************************************************************************************/