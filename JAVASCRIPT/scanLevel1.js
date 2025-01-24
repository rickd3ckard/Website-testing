document.addEventListener('DOMContentLoaded', function () {
    fetch('PHP/scanLevel1.php')
        .then(response => response.json())
        .then(data => {
            const fileList = document.querySelector('.websitenavigator');
            data.forEach(item => {
                const link = document.createElement('a');
                link.href = `Level1/${item}`;
                link.textContent = item;
                link.className = 'website-navigator-anchor';

                fileList.appendChild(link);
            });
        })
        .catch(error => console.error('Error:', error));
});