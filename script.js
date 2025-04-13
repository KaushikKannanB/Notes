const closeBtn = document.getElementsByClassName("close-btn")[0];
const container = document.getElementsByClassName("container")[0];

const addBtn = document.getElementsByClassName("add-btn")[0];
const submitbtn = document.getElementById("submit");
const viewbtn = document.getElementById("view");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
const currentTheme = localStorage.getItem("darkMode") === "true" ? "dark" : "light";


document.body.classList.add(currentTheme);

closeBtn.addEventListener('click', () => {
    container.style.display = 'none';
});

addBtn.addEventListener('click', () => {
    container.style.display = 'block';
});

submitbtn.addEventListener('click', () => {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("description").value.trim();


    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const noteToAdd = {
        title: title,
        description: content,
        whatday: formatted
    };

    notes.push(noteToAdd);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    setTimeout(() => {
        window.location.href = "view.html";
    }, 100);
});
