document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    if (email === "qbayub@gmail.com" && password === "7326") {
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
    document.getElementById("tutorial").style.display = "none";
    document.getElementById("title-container-ai").style.display = "none";
}

function Home() {
    document.getElementById("home").style.display = "flex";
    document.getElementById("whitePart").style.display = "flex";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("blackspace").style.display = "none";
    document.getElementById("tutorial").style.display = "none";
    document.getElementById("title-container-ai").style.display = "none";
}

function Tutorial() {
    document.getElementById("home").style.display = "none";
    document.getElementById("whitePart").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("blackspace").style.display = "none";
    document.getElementById("tutorial").style.display = "block";
    document.getElementById("title-container-ai").style.display = "none";
}

function Titles() {
    document.getElementById("home").style.display = "none";
    document.getElementById("whitePart").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("blackspace").style.display = "none";
    document.getElementById("tutorial").style.display = "none";
    document.getElementById("title-container-ai").style.display = "block";
}

function Exit() {
    document.getElementById("website").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

const generateButton = document.getElementById('generateButton');
const generatedTitles = document.getElementById('generatedTitles');

const titles = [
    "The Ultimate Guide to %topic%", "Exploring the Depths of %topic%", "Why %topic% is the Future",
    "Mastering %topic%: Tips and Tricks", "The Hidden Powers of %topic%", "Unlocking the Secrets of %topic%",
    "Everything You Need to Know About %topic%", "The Art of %topic%", "Innovative Ways to Approach %topic%",
    "The Fundamentals of %topic%", "Unveiling the Mysteries of %topic%", "Is %topic% Worth the Hype?",
    "The Pros and Cons of %topic%", "Navigating the World of %topic%", "Ultimate Strategies for %topic%",
    "Getting Started with %topic%", "How to Conquer %topic%", "10 Things You Didn't Know About %topic%",
    "The Complete Manual for %topic%", "Decoding %topic%", "Future Trends in %topic%", 
    "The Best Practices for %topic%", "Revolutionizing %topic%", "From Beginner to Expert in %topic%",
    "The Complete History of %topic%", "Exploring the Controversies Surrounding %topic%",
    "The Science Behind %topic%", "The Myths of %topic%", "How %topic% has Changed Over Time",
    "Innovations in %topic%", "Building a Career in %topic%", "How %topic% Impacts Our Lives",
    "An In-Depth Look at %topic%", "Top 5 Reasons to Explore %topic%", "Crafting Your Path in %topic%",
    "How %topic% Can Make a Difference", "Understanding the Basics of %topic%",
    "Creative Approaches to %topic%", "The Dos and Don'ts of %topic%", "Why You Should Consider %topic%",
    "The Power of %topic% in Today's World", "Insights into %topic%", "Sustainable Approaches to %topic%",
    "Uncovering the Truth about %topic%", "A Beginner's Guide to %topic%", "The Best Resources for %topic%",
    "Comparing Different Views on %topic%", "How %topic% Shapes Society", "The Role of %topic% in Culture",
    "The Future of %topic% Explained", "Building Relationships Through %topic%", "Lessons from %topic%",
    "How to Make an Impact with %topic%", "The Connection Between %topic% and Success", 
    "How to Share Your Passion for %topic%", "The Myriad Benefits of %topic%", 
    "A Journey Through %topic%", "The Importance of Understanding %topic%", 
    "The Evolution of %topic% Over the Years", "Practical Applications of %topic%", 
    "How %topic% Influences Our Decisions", "The Hidden Benefits of %topic%", 
    "How to Effectively Communicate %topic%", "The Future of Work: %topic%", 
    "How %topic% is Reshaping Industries", "Discovering New Perspectives on %topic%", "The Impact of %topic% on Daily Life", 
    "Innovative Ideas Surrounding %topic%", "Your Ultimate Checklist for %topic%", 
    "Making Connections Through %topic%", "The Intersection of %topic% and Technology", 
    "How to Leverage %topic% in Business", "Fostering Creativity with %topic%", 
    "Tips for Effective Learning in %topic%", "How to Achieve Mastery in %topic%", 
    "Breaking Down Complexities in %topic%", "Engaging with Community Around %topic%", 
    "The Best Tools for Navigating %topic%", "Why %topic% Matters More Than Ever", 
    "Exploring the Global Impact of %topic%", "Making Sense of Conflicting Views on %topic%", 
    "Guiding Principles for %topic%", "How to Build a Strong Foundation in %topic%", 
    "The Hidden Challenges of %topic%", "The Interplay Between %topic% and Economics", 
    "Finding Your Niche in %topic%", "Reimagining the Future of %topic%", 
    "How %topic% Affects Your Well-being", "The Trials and Triumphs in %topic%", 
    "A Comprehensive Breakdown of %topic%", "Engaging with the %topic% Community", 
    "Contributing to the Conversation on %topic%", "The Flaws and Strengths of %topic%", 
    "The Role of Education in %topic%", "How to Approach Challenges in %topic%", 
    "Finding Balance with %topic%", "The Role of Ethics in %topic%", 
    "Unpacking the Complexity of %topic%", "How %topic% has Shaped Our History", 
    "The Science of Persuasion: Understanding %topic%", "Mastering the Dynamics of %topic%", 
    "Overcoming Fear in %topic%", "The Myths and Realities of %topic%", 
    "The Ripple Effect of %topic%", "Perspectives from Experts on %topic%", 
    "A Deep Dive into the Philosophy of %topic%", "How to Transform Passion into %topic%", 
    "Creating a Support Network for %topic%", "Challenges You Might Face in %topic%", 
    "The Secrets to Thriving in %topic%", "Innovative Discoveries in %topic%", 
    "How to Inspire Others Through %topic%", "Exploring Personal Growth through %topic%", 
    "A Critical Analysis of %topic%", "Harnessing the Power of Storytelling in %topic%", 
    "How to Elevate Your Skills in %topic%", "The Multifaceted Nature of %topic%", 
    "Understanding the Global Landscape of %topic%", "Culture and Identity in %topic%", 
    "The Intersection of Art and %topic%", "How to Foster Inclusion through %topic%", 
    "Creating Impactful Content Around %topic%", "Strategies for Effective %topic%", 
    "How %topic% Can Enhance Your Perspective", "Mentorship and Growth in %topic%", 
    "Unveiling the Layers of %topic%", "How to Stay Ahead in %topic%", 
    "Innovative Solutions for Modern Problems in %topic%", "Bridging Gaps with %topic%", 
    "Sharing Success Stories from %topic%", "The Vital Role of %topic% in Leadership", 
    "Collaborative Approaches to %topic%", "Integrating %topic% in Everyday Life", 
    "How to Cultivate a Growth Mindset Around %topic%", "Real World Applications of %topic%", 
    "Exploring Gender Perspectives in %topic%", "The Relationship Between %topic% and Innovation", 
    "Opportunities for Advancement in %topic%", "How to Stay Motivated in %topic%", 
    "The Balancing Act of %topic%", "Exploring Environmental Impact through %topic%", 
    "How to Excel Through %topic%", "Navigating the Challenges of %topic%", 
    "The Culture of Excellence in %topic%", "Engagement Tactics for %topic%", 
    "Creating Sustainable Practices in %topic%", "The Marketing Strategies for %topic%", 
    "How to Advocate for Change in %topic%", "The Crossroads of %topic% and Society", 
    "Reimagining Traditional Views on %topic%", "How to Celebrate Diversity in %topic%", 
    "Engaging Audiences with %topic%", "The Psychology Behind %topic%", 
    "How to Interpret Data in %topic%", "Fostering a Community around %topic%", 
    "The Role of Feedback in %topic%", "How to Start a Conversation About %topic%", 
    "Impactful Narratives in %topic%", "The Art of Engaging Discussions on %topic%", 
    "How %topic% Influences Decision Making", "Building Resilience with %topic%", 
    "How to Cultivate Curiosity through %topic%", "The Link Between %topic% and Mental Health", 
    "The Future of Education: Incorporating %topic%", "The Art of Negotiation in %topic%",
    "How %topic% Shapes Our Perspectives", "The Importance of Transparency in %topic%",
    "Collaboration and Teamwork in %topic%", "The Connection Between %topic% and Creativity",
    "The Role of Technology in Advancing %topic%", "Cultural Sensitivity in %topic%",
    "How to Foster Lifelong Learning in %topic%", "Leadership Lessons from %topic%",
    "Navigating Ethical Dilemmas in %topic%", "Finding Joy in %topic%", 
    "Strategies for Effective Problem Solving in %topic%", "The Power of Networking in %topic%", 
    "How to Pitch Your Ideas on %topic%", "The Interrelationship of %topic% and Personal Growth", 
    "The Journey to Expertise in %topic%", "Crafting a Unique Path in %topic%", 
    "Community Building through %topic%", "The Intersection of %topic% and Social Change", 
    "Challenges and Opportunities in %topic%", "How to Encourage Innovation in %topic%", 
    "The Future of Communication in %topic%", "Overcoming Adversity in %topic%",
    "The Art of Reflection in %topic%", "Creating Positive Change through %topic%"
];

generateButton.addEventListener('click', () => {
    const topicInput = document.getElementById('topicInput').value;
    generatedTitles.innerHTML = '';

    if (!topicInput) {
        generatedTitles.innerHTML = '<p class="title-generator-title">Please enter a topic!</p>';
        return;
    }

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * titles.length);
        const title = titles[randomIndex].replace('%topic%', topicInput);
        const titleElement = document.createElement('div');
        titleElement.className = 'title-generator-title';
        titleElement.textContent = title;
        generatedTitles.appendChild(titleElement);
    }
});

homeTab.click();
loadFiles();
loadImages();
loadIdeas();