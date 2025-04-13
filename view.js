const whole = document.getElementsByClassName("whole")[0];
const container = document.getElementsByClassName("container")[0];
const closeBtn = document.getElementsByClassName("close-btn")[0];
let submitbtn = document.getElementById("submit"); 

closeBtn.addEventListener('click', () => {
    container.style.display = 'none';
});

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNote() {
    whole.innerHTML = "";

    if (notes.length === 0) {
        whole.innerHTML = `<p>No notes available.</p>`;
        return;
    }

    notes.forEach((note, index) => {
        const item = document.createElement("div");
        item.classList.add("view-container");

        item.innerHTML = `
            <div class="viewtitle">${note.title}</div>
            <div class="viewcontent">${note.description}</div>
            <div class="viewbottom">${note.whatday}</div>
            <div class="viewbtns">
                <button class="edit-btn" data-index="${index}">
                    <i class="uil uil-edit"></i>
                </button>
                <button class="delete-btn" data-index="${index}">
                    <i class="uil uil-trash-alt"></i>
                </button>
            </div>
        `;

        whole.appendChild(item);
    });

    edit();
    remove();
}

function edit() {
    const editbtn = document.querySelectorAll(".edit-btn");

    editbtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute("data-index");
            const note = notes[index];

            container.style.display = 'block';

            
            document.getElementById("title").value = note.title;
            document.getElementById("description").value = note.description;

            const newSubmit = submitbtn.cloneNode(true);
            submitbtn.parentNode.replaceChild(newSubmit, submitbtn);
            submitbtn = newSubmit;

            submitbtn.addEventListener('click', () => {
                const newTitle = document.getElementById("title").value.trim();
                const newDesc = document.getElementById("description").value.trim();

                if (newTitle && newDesc) {
                    notes[index].title = newTitle;
                    notes[index].description = newDesc;

                    localStorage.setItem("notes", JSON.stringify(notes));

                    container.style.display = "none";
                    document.getElementById("title").value = "";
                    document.getElementById("description").value = "";

                    renderNote();
                }
            });
        });
    });
}

function remove() {
    const delbtn = document.querySelectorAll(".delete-btn");
    delbtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute("data-index");
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNote();
        });
    });
}

renderNote();
