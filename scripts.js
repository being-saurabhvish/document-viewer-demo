document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const documentList = document.getElementById('documentList');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('document');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Upload the file to File.io (or any other free file hosting service)
            const response = await fetch('https://file.io', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload file.');

            const result = await response.json();
            const link = result.link;  // This is the URL of the uploaded file.

            // Display the link in the list
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link;
            anchor.textContent = file.name;
            anchor.target = "_blank";
            anchor.className = "document-link";
            listItem.appendChild(anchor);
            documentList.appendChild(listItem);

        } catch (err) {
            alert('Error uploading file: ' + err.message);
        }
    });

    documentList.addEventListener('click', (e) => {
        if (e.target.classList.contains('document-link')) {
            e.preventDefault();
            const pdfWindow = window.open("", "_blank");
            pdfWindow.document.write(
                `<iframe src="${e.target.href}" width="100%" height="100%" style="border:none;"></iframe>`
            );
        }
    });
});
