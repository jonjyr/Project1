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

//function to create a list

function createList(listname, listitems) {
    let table = document.getElementById("table");
    document.getElementsByClassName("list")[0].style.display = "block";

    //clear table and create list header element

    table.innerHTML = "";
    table.innerHTML = '<tr><th colspan="3" id="name"></th></tr>';

    let name = document.getElementById("name");

    name.innerHTML = listname;

    //list items

    for (let i = 0; i < listitems.length; i++) {
        if (listitems[i].trim() != "") {
            let row = document.createElement("tr");
            row.id = "row" + i;
            row.innerHTML = 
                '<td><input class="checkbox" type="checkbox" id="checkbox' + i + '"></td><td id="item' + i + '">' + listitems[i] + '</td><td><b class="delete" id="delete' + i + '">&#10006;</b></td>';
            table.appendChild(row);

            //function to use checkbox
            
            document.getElementById("checkbox" + i).addEventListener("click", function () {
                if (document.getElementById("checkbox" + i).checked) {
                    document.getElementById("item" + i).style.textDecoration = "line-through";
                    localStorage.setItem("checkbox" + i, "true");
                } else {
                    document.getElementById("item" + i).style.textDecoration = "none";
                    localStorage.setItem("checkbox" + i, "false");
                }
            });

            //function to show, hide and operate delete button

            document.getElementById("delete" + i).addEventListener("mouseover", function () {
                document.getElementById("item" + i).style.color = "red";
            });

            document.getElementById("delete" + i).addEventListener("mouseout", function () {
                document.getElementById("item" + i).style.color = "black";
            });

            document.getElementById("row" + i).addEventListener("mouseover", function () {
                document.getElementById("delete" + i).style.visibility = "visible";
            });

            document.getElementById("row" + i).addEventListener("mouseout", function () {
                document.getElementById("delete" + i).style.visibility = "hidden";
            });

            document.getElementById("delete" + i).addEventListener("click", function () {
                document.getElementById("item" + i).parentNode.remove();
                
        });
        }
    }

    //hide list creation form

    cancelCreate();

    //save list to local storage

    localStorage.setItem("name", listname);
    localStorage.setItem("items", JSON.stringify(listitems));

};

//function to create a list manually

document.getElementById("createBtn").addEventListener("click", function () {
    let listname = document.getElementById("listname").value;
    let listitems = document.getElementById("listitems").value.split("\n");

    //validate list name input

    let nameinput = document.getElementById("listname");
    let error = false;

    if (listname == "") {
        if (document.getElementById("errorname")) {
            document.getElementById("errorname").remove();
        }
        nameinput.style.border = "1px solid red";
        nameinput.insertAdjacentHTML("afterend", '<b class="error" id="errorname"><br>*Please enter a list name.</b>');
        error = true;
    } else if (listname.length == 1 || listname.length > 50) {
        if (document.getElementById("errorname")) {
            document.getElementById("errorname").remove();
        }
        nameinput.style.border = "1px solid red";
        nameinput.insertAdjacentHTML("afterend", '<b class="error" id="errorname"><br>*List name must be between 2-50 characters.</b>');
        error = true;
    } else {
        if (document.getElementById("errorname")) {
            document.getElementById("errorname").remove();
        }
        nameinput.style.border = "1px solid black";
    }

    //validate list items input

    let listinput = document.getElementById("listitems");

    if (listinput.value == "" || listinput.value.split("\n").filter(item => item.trim() !== "").length == 0) {
        if (document.getElementById("erroritems")) {
            document.getElementById("erroritems").remove();
        }
        listinput.style.border = "1px solid red";
        listinput.insertAdjacentHTML("afterend", '<b class="error" id="erroritems"><br>*Please enter at least one list item.</b>');
        error = true;
    } else {
        if (document.getElementById("erroritems")) {
            document.getElementById("erroritems").remove();
        }
        listinput.style.border = "1px solid black";
    }

    if (error == true) {
        return;
    }

    //confirm overwrite if table exists

    if (table.hasChildNodes()) {
        if (!confirm("This will overwrite the current list. Are you sure?")) {
            return;
        }
    }

    createList(listname, listitems);
});

//function to check the local storage and load list if it exists

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("name").length != 0) {
        let listname = localStorage.getItem("name");
        let listitems = JSON.parse(localStorage.getItem("items") || "[]");

        createList(listname, listitems);

        //checkbox status from local storage

        for (let i = 0; i < listitems.length; i++) {
            if (localStorage.getItem("checkbox" + i) === "true") {
                document.getElementById("checkbox" + i).checked = true;
                document.getElementById("item" + i).style.textDecoration = "line-through";
            }
        }
    }
});

