const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const ideasTab = document.getElementById("ideasTab");
const uploadTab = document.getElementById("uploadTab");
const imageTab = document.getElementById("imageTab");
const graphicTab = document.getElementById("graphicTab");
const homeContainer = document.getElementById("homeContainer");
const uploadContainer = document.getElementById("uploadContainer");
const ideasContainer = document.getElementById("ideasContainer");
const imageContainer = document.getElementById("imageContainer");
const graphicContainer = document.getElementById("graphicContainer");
const submitIdeaButton = document.getElementById("submitIdeaButton");
const ideaInput = document.getElementById("ideaInput");
const ideaList = document.getElementById("ideaList");
const uploadImageButton = document.getElementById("uploadImageButton");
const imageInput = document.getElementById("imageInput");
const imageList = document.getElementById("imageList");

const fileCountElement = document.getElementById("fileCount").querySelector('span');
const imageCountElement = document.getElementById("imageCount").querySelector('span');
const ideaCountElement = document.getElementById("ideaCount").querySelector('span');

// AIzaSyDY51QFnhSEeQr9F1tkQQCUbZb7j0aJ2-E
// UC6kucVIFcxcU7ZXSq5Y4eyg

const loadFiles = () => {
    const files = JSON.parse(localStorage.getItem("files")) || [];
    fileCountElement.textContent = files.length;  // Update file count
    fileList.innerHTML = "";
    files.forEach((file, index) => {
        const li = document.createElement("li");
        const fileName = file.name || file.fileName;
        li.textContent = fileName;

        const downloadButton = document.createElement("a");
        downloadButton.textContent = "Download";
        downloadButton.href = file.url;
        downloadButton.download = fileName;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteFile(index);

        li.appendChild(downloadButton);
        li.appendChild(deleteButton);
        fileList.appendChild(li);
    });
}

const uploadFile = () => {
    const files = JSON.parse(localStorage.getItem("files")) || [];
    const file = fileInput.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        files.push({ name: file.name, url });
        localStorage.setItem("files", JSON.stringify(files));
        loadFiles();
        fileInput.value = ""; // Clear the input
        updateChartData();    // Update chart after file upload
    }
}

const deleteFile = (index) => {
    const files = JSON.parse(localStorage.getItem("files")) || [];
    files.splice(index, 1);
    localStorage.setItem("files", JSON.stringify(files));
    loadFiles();
    updateChartData(); // Update chart after file deletion
}

const loadIdeas = () => {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    ideaCountElement.textContent = ideas.length;  // Update idea count
    ideaList.innerHTML = "";
    ideas.forEach((idea, index) => {
        const li = document.createElement("li");
        li.textContent = idea;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteIdea(index);

        li.appendChild(deleteButton);
        ideaList.appendChild(li);
    });
}

const submitIdea = () => {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    const ideaText = ideaInput.value.trim();
    if (ideaText) {
        ideas.push(ideaText);
        localStorage.setItem("ideas", JSON.stringify(ideas));
        loadIdeas();
        ideaInput.value = ""; // Clear the input
        updateChartData(); // Update chart after idea submission
    }
}

const deleteIdea = (index) => {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    ideas.splice(index, 1);
    localStorage.setItem("ideas", JSON.stringify(ideas));
    loadIdeas();
    updateChartData(); // Update chart after idea deletion
}

// Add functionality for images
const loadImages = () => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    imageCountElement.textContent = images.length;  // Update image count
    imageList.innerHTML = "";
    images.forEach((image, index) => {
        const li = document.createElement("li");
        const imageName = image.name || image.imageName;

        const downloadButton = document.createElement("a");
        downloadButton.textContent = "Download";
        downloadButton.href = image.url;
        downloadButton.download = imageName; // Set the image name for download

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteImage(index);

        li.appendChild(document.createTextNode(imageName));
        li.appendChild(downloadButton);
        li.appendChild(deleteButton);
        imageList.appendChild(li);
    });
}

const uploadImage = () => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    const image = imageInput.files[0];
    if (image) {
        const url = URL.createObjectURL(image);
        images.push({ name: image.name, url });
        localStorage.setItem("images", JSON.stringify(images));
        loadImages();
        imageInput.value = ""; // Clear the input
        updateChartData(); // Update chart after image upload
    }
}

const deleteImage = (index) => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    images.splice(index, 1);
    localStorage.setItem("images", JSON.stringify(images));
    loadImages();
    updateChartData(); // Update chart after image deletion
}

// Update Chart Data
const updateChartData = () => {
    const fileCount = JSON.parse(localStorage.getItem("files"))?.length || 0;
    const imageCount = JSON.parse(localStorage.getItem("images"))?.length || 0;
    const ideaCount = JSON.parse(localStorage.getItem("ideas"))?.length || 0;

    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Files', 'Images', 'Ideas'],
            datasets: [{
                label: 'Count',
                data: [fileCount, imageCount, ideaCount],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event Listeners for Navigation
uploadButton.onclick = uploadFile;
submitIdeaButton.onclick = submitIdea;
uploadImageButton.onclick = uploadImage;

homeTab.onclick = () => {
    homeContainer.style.display = "block";
    uploadContainer.style.display = "none";
    ideasContainer.style.display = "none";
    imageContainer.style.display = "none";
    graphicContainer.style.display = "none";
    homeTab.classList.add("active");
    uploadTab.classList.remove("active");
    ideasTab.classList.remove("active");
    imageTab.classList.remove("active");
    graphicTab.classList.remove("active");
    updateChartData(); // Update chart data when going to home
};

uploadTab.onclick = () => {
    homeContainer.style.display = "none";
    uploadContainer.style.display = "block";
    ideasContainer.style.display = "none";
    imageContainer.style.display = "none";
    graphicContainer.style.display = "none";
    homeTab.classList.remove("active");
    uploadTab.classList.add("active");
    ideasTab.classList.remove("active");
    imageTab.classList.remove("active");
    graphicTab.classList.remove("active");
    loadFiles();
};

ideasTab.onclick = () => {
    homeContainer.style.display = "none";
    uploadContainer.style.display = "none";
    ideasContainer.style.display = "block";
    imageContainer.style.display = "none";
    graphicContainer.style.display = "none";
    homeTab.classList.remove("active");
    uploadTab.classList.remove("active");
    ideasTab.classList.add("active");
    imageTab.classList.remove("active");
    graphicTab.classList.remove("active");
    loadIdeas();
};

imageTab.onclick = () => {
    homeContainer.style.display = "none";
    uploadContainer.style.display = "none";
    ideasContainer.style.display = "none";
    imageContainer.style.display = "block";
    graphicContainer.style.display = "none";
    homeTab.classList.remove("active");
    uploadTab.classList.remove("active");
    ideasTab.classList.remove("active");
    imageTab.classList.add("active");
    graphicTab.classList.remove("active");
    loadImages();
};

graphicTab.onclick = () => {
    homeContainer.style.display = "none";
    uploadContainer.style.display = "none";
    ideasContainer.style.display = "none";
    imageContainer.style.display = "none";
    graphicContainer.style.display = "block";
    homeTab.classList.remove("active");
    uploadTab.classList.remove("active");
    ideasTab.classList.remove("active");
    imageTab.classList.remove("active");
    graphicTab.classList.add("active");
    updateChartData(); // Update chart data when viewing graphics
};

function youtube1() {
    window.open("https://www.youtube.com/@QbayubReacts");
}
function youtube2() {
    window.open("https://www.youtube.com/@Qbayub0");
}
function youtube3() {
    window.open("https://www.youtube.com/@QbayubGaming");
}
function youtube4() {
    window.open("https://www.youtube.com/@QbayubExtra");
}

// Trigger the home tab to be visible by default
homeTab.click();
loadFiles();
loadImages();
loadIdeas();