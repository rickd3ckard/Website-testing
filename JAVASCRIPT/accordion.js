const accordionItems = document.getElementsByClassName("accordion-item");

for (let i = 0; i < accordionItems.length; i++) {
    accordionItems[i].addEventListener("click", function () {
        const content = this.querySelector('.accordion-content');

        // If active, collapse the content
        if (this.classList.contains("active")) {
            content.style.height = content.scrollHeight + "px"; // Set to full height for transition
            setTimeout(() => {
                content.style.height = "0";
            }, 1); // Trigger height to zero

        } else { // If not active, expand the content
            content.style.height = (content.scrollHeight + 35) + "px"; // Set to full height for transition + padding bottom & top
            setTimeout(() => {
                content.style.height = "auto"; // Remove height restriction after transition
            }, 500); // Match transition duration
        }

        this.classList.toggle("active");
    });
}