//function to show list creation

function showCreate() {
    document.getElementById("createForm").style.display = "block";
}

document.getElementById("showBtn").addEventListener("click", showCreate);

//function to cancel list creation

function cancelCreate() {
    document.getElementById("createForm").style.display = "none";
};

document.getElementById("cancelBtn").addEventListener("click", cancelCreate);

//function to create a list manually

function createList() {
    let table = document.getElementById("table");

    // Confirm overwrite if table exists

    if (table.hasChildNodes()) {
        if (!confirm("This will overwrite the current list. Are you sure?")) {
            return;
        }
    } else {
        document.getElementsByClassName("list")[0].style.display = "block";
    }
    
    // Clear table and create list header element

    let listname = document.getElementById("listname").value;

    table.innerHTML = "";
    table.innerHTML = '<tr><th colspan="2" id="name"></th></tr>';

    let name = document.getElementById("name");

    name.innerHTML = listname;

    // List items

    let listitems = document.getElementById("listitems").value.split("\n");

    for (let i = 0; i < listitems.length; i++) {
        if (listitems[i] != "") {
            table.appendChild(document.createElement("tr")).innerHTML = '<td><input type="checkbox" id="checkbox' + i + '"</td><td id="item' + i + '">' + listitems[i] + '</td>';
            document.getElementById("checkbox" + i).addEventListener("click", function () {
                if (document.getElementById("checkbox" + i).checked) {
                    document.getElementById("item" + i).style.textDecoration = "line-through";
                } else {
                    document.getElementById("item" + i).style.textDecoration = "none";
                }
            });
        }
    }

    // Hide list creation form

    cancelCreate();

};

document.getElementById("createBtn").addEventListener("click", createList);