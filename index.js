document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    // Example validation logic for email and password
    if (email === "qbayub@gmail.com" && password === "7326") { // Replace with your authentication logic
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('website').style.display = 'block';
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Invalid email or password.';
        errorMessage.style.display = 'block';
    }
});

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
const fileCountElement = document.getElementById("fileCount")?.querySelector('span');
const imageCountElement = document.getElementById("imageCount")?.querySelector('span');
const ideaCountElement = document.getElementById("ideaCount")?.querySelector('span');

const loadFiles = () => {
    const files = JSON.parse(localStorage.getItem("files")) || [];
    fileCountElement.textContent = files.length;
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
};

const uploadFile = () => {
    const files = JSON.parse(localStorage.getItem("files")) || [];
    const file = fileInput.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        files.push({ name: file.name, url });
        localStorage.setItem("files", JSON.stringify(files));
        loadFiles();
        fileInput.value = "";
        updateChartData();
    }
};

const deleteFile = (index) => {
    const files = JSON.parse(localStorage.getItem("files")) || [];
    files.splice(index, 1);
    localStorage.setItem("files", JSON.stringify(files));
    loadFiles();
    updateChartData();
};

const loadImages = () => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    imageCountElement.textContent = images.length;
    imageList.innerHTML = "";
    images.forEach((image, index) => {
        const li = document.createElement("li");
        const imageName = image.name || image.imageName;

        const downloadButton = document.createElement("a");
        downloadButton.textContent = "Download";
        downloadButton.href = image.url;
        downloadButton.download = imageName;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteImage(index);

        li.appendChild(document.createTextNode(imageName));
        li.appendChild(downloadButton);
        li.appendChild(deleteButton);
        imageList.appendChild(li);
    });
};

const uploadImage = () => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    const image = imageInput.files[0];
    if (image) {
        const url = URL.createObjectURL(image);
        images.push({ name: image.name, url });
        localStorage.setItem("images", JSON.stringify(images));
        loadImages();
        imageInput.value = "";
        updateChartData();
    }
};

const deleteImage = (index) => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    images.splice(index, 1);
    localStorage.setItem("images", JSON.stringify(images));
    loadImages();
    updateChartData();
};

const loadIdeas = () => {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    ideaCountElement.textContent = ideas.length;
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
};

const submitIdea = () => {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    const ideaText = ideaInput.value.trim();
    if (ideaText) {
        ideas.push(ideaText);
        localStorage.setItem("ideas", JSON.stringify(ideas));
        loadIdeas();
        ideaInput.value = "";
        updateChartData();
    }
};

const deleteIdea = (index) => {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    ideas.splice(index, 1);
    localStorage.setItem("ideas", JSON.stringify(ideas));
    loadIdeas();
    updateChartData();
};

uploadButton.addEventListener("click", uploadFile);
uploadImageButton.addEventListener("click", uploadImage);
submitIdeaButton.addEventListener("click", submitIdea);

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
    updateChartData();
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
    updateChartData();
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

function DiscordLink() {
    window.open("https://discord.gg/qnkwG9qfRz");
}

function YoutubeLink() {
    window.open("https://www.youtube.com/@QBayub0");
}

function TiktokLink() {
    window.open("https://www.tiktok.com/@qbayub");
}

function Secret() {
    document.getElementById("home").style.display = "none";
    document.getElementById("whitePart").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("blackspace").style.display = "block";
}

function Home() {
    document.getElementById("home").style.display = "flex";
    document.getElementById("whitePart").style.display = "flex";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("blackspace").style.display = "none";
}

function Exit() {
    document.getElementById("website").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

homeTab.click();
loadFiles();
loadImages();
loadIdeas();