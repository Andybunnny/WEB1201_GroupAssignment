// wait for the "Download CV" button to be clicked
document.getElementById('cvBtn').addEventListener('click', function () {

    // download the CV as a text file with the following content
    const cvContent = 
`DARVESH DANA
Frontend Developer

EDUCATION
BSc (Hons) Computer Science - 2024 to Present

SKILLS
HTML5, CSS3, JavaScript, Java

PROJECTS
Granbakery - Order & Checkout System
Granbakery - Home & About Pages
`;

    // Wrap the text in a Blob so the browser can treat it as a downloadable file
    const blob = new Blob([cvContent], { type: 'text/plain' });

    // Create a temporary URL that points to the blob
    const url = URL.createObjectURL(blob);

    // Create an invisible <a> tag to trigger the download
    const a = document.createElement('a');
    a.href = url;               // point the link at the blob URL
    a.download = 'Darvesh_Dana_CV.txt'; // set the filename the browser will save it as
    a.click();                  // click the link to start the download

    // Free up memory by releasing the temporary blob URL now that it's no longer needed
    URL.revokeObjectURL(url);
});