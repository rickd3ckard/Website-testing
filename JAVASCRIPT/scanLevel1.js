document.addEventListener('DOMContentLoaded', function () {
    fetch('PHP/scanLevel1.php')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('file-list');
            data.forEach(item => {
                const link = document.createElement('a');
                link.href = `Level1/${item}`;
                link.textContent = item;

                const listItem = document.createElement('div');
                listItem.appendChild(link);

                fileList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
});