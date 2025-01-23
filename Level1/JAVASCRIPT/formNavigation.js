const formsCollection = document.forms
var formsWidth = formsCollection[0].offsetWidth

const prevBtns = document.querySelectorAll('[id^="PreviousButton"]'); 
const nextvBtns = document.querySelectorAll('[id^="NextButton"]');
const submitBtns = document.querySelectorAll('[id^="SubmitButton"]');

const formsCount = formsCollection.length;
const formsStepsCollection = [];

// Scan all forms on page and create a collection of their pages for each formms.
for (let i = 0; i < formsCount; i++) {
    formsStepsCollection[i] = formsCollection[i].querySelectorAll('[class^="form-field-columns-container-"]');
};

var currentsteps = new Array(formsCount).fill(0)

window.addEventListener('resize', () => {
    formsWidth = formsCollection[0].offsetWidth

    for (let i = 0; i < formsCount; i++) {
        for (let j = 0; j < formsStepsCollection[i].length; j++) {
            const div = formsStepsCollection[i][j]; 

            const style = window.getComputedStyle(div);
            const transform = style.transform;
            const matrixvalues = transform.match(/matrix\((.+)\)/)[1].split(', ');
            const translateX = parseFloat(matrixvalues[4]);

            switch (true) {
                case translateX < 0:
                    div.style.transform = `translateX(-${formsWidth}px)`;
                    break;

                case translateX === 0:
                    div.style.transform = `translateX(0px)`;
                    break;

                case translateX > 0:
                    div.style.transform = `translateX(${formsWidth}px)`;
                    break;

            };
        };
    };
});

for (let i = 0; i < formsCount; i++) {
    for (let j = 0; j < formsStepsCollection[i].length; j++) {
        const div = formsStepsCollection[i][j];
        if (j === 0) {
            div.style.transform = `translateX(0px)`;
        } else { 
            //div.style.visibility = "hidden"
            div.style.transform = `translateX(${formsWidth}px)`;
        }
    }
};

//ajouter pour quand le div se range en colonne.

prevBtns.forEach(button => {
    button.disabled = true
});

submitBtns.forEach(button => {
    button.style.display = 'none'
})

prevBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (currentsteps[index] === 0) {
            console.log("This is the first page!")
            return;
        }

        currentsteps[index]--;
        prevFormStep(button, index);

        if (currentsteps[index] === 0) {
            prevBtns[index].disabled = true
        };

        if (currentsteps[index] !== formsStepsCollection[index].length - 1) {
            nextvBtns[index].style.display = 'inline-block'
            submitBtns[index].style.display = 'none'
        };
    });
});

nextvBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (currentsteps[index] === formsStepsCollection[index].length - 1) {
            console.log("This is the last page!")
            return;
        }

        if (areInputsFilled(formsStepsCollection[index][currentsteps[index]]) == false) {
            return;
        }

        currentsteps[index]++;
        nextFormStep(button, index);

        if (currentsteps[index] > 0) {
            prevBtns[index].disabled = false
        };

        if (currentsteps[index] === formsStepsCollection[index].length - 1 ) {
            submitBtns[index].style.display = 'inline-block'
            nextvBtns[index].style.display = 'none'
        };
    });
});

function nextFormStep(nextButton, index) {
    const actualDiv = formsStepsCollection[index][currentsteps[index] - 1] //0
    const nextDiv = formsStepsCollection[index][currentsteps[index]]; //1

    console.log(formsWidth)

    actualDiv.style.transform = `translateX(-${formsWidth}px)`;
    nextDiv.style.transform = "translateX(0px)";
};

function prevFormStep(prevButton, index) {
    const prevDiv = formsStepsCollection[index][currentsteps[index]] //0
    const actualDiv = formsStepsCollection[index][currentsteps[index] + 1]; //1

    prevDiv.style.transform = "translateX(0px)"
    actualDiv.style.transform = `translateX(${formsWidth}px)`;
};

function areInputsFilled(div) {
    const inputs = div.querySelectorAll('input[required]'); 
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.reportValidity(); 
            allFilled = false; 
        }
    });

    return allFilled; 
};
