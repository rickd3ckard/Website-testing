const steps = [];
const seenClasses = new Set();

document.querySelectorAll('[class^="form-field-columns-container-"]').forEach((step) => {
    // Extract the class that matches the pattern
    const className = Array.from(step.classList).find(cls => cls.startsWith('form-field-columns-container-'));

    if (className && !seenClasses.has(className)) {
        seenClasses.add(className); // Mark this class as seen
        steps.push(step); // Add the element to the steps array
    }
});

const forms = document.querySelectorAll('form');
const numberOfForms = forms.length;

const stepsContainer = document.querySelector('.form-pages-container');
const prevBtn = document.getElementById('PreviousButton');
const nextBtn = document.getElementById('NextButton');
const submitBtn = document.getElementById('SubmitButton');
let currentStep = 0;

prevBtn.disabled = currentStep === 0;
nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-block';
submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-block' : 'none';

function nextFormSteps() {
    const actualDiv = steps[currentStep - 1] //0 -> first page
    const nextDiv = steps[currentStep]; //1 -> second page

    actualDiv.style.transform = "translateX(-1000px)"
    nextDiv.style.transform = "translateX(0px)";  

    prevBtn.disabled = currentStep === 0;
    nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-block' : 'none';
}

function previousFormSteps() {
    const actualDiv = steps[currentStep + 1] //0
    const nextDiv = steps[currentStep]; //1

    actualDiv.style.transform = "translateX(1000px)"
    nextDiv.style.transform = "translateX(0px)";

    prevBtn.disabled = currentStep === 0;
    nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-block' : 'none';
}

prevBtn.addEventListener('click', () => {
    if (currentStep === 0) {
        console.log("This is the first page!")
        return;
    }
    currentStep--;
    previousFormSteps(); 
});

nextBtn.addEventListener('click', () => {
    if (currentStep === steps.length - 1 ) {
        console.log("This is the last page!")
        return; 
    }

    console.log(areInputsFilled(steps[currentStep]))

    if (areInputsFilled(steps[currentStep]) == false) {
         return;
    }

    currentStep++;
    nextFormSteps();    
});


function areInputsFilled(div) {
    const inputs = div.querySelectorAll('input[required]'); // Select required inputs
    let allFilled = true; // Assume all inputs are filled initially

    // Iterate over each input
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.reportValidity(); // Trigger the browser's built-in validation message
            allFilled = false; // If any input is empty, set allFilled to false
        }
    });

    return allFilled; // Return true if all inputs are filled, false otherwise
}
