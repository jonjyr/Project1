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
    localStorage.setItem("name", listname);

    //clear table and create list header element

    table.innerHTML = "";
    table.innerHTML = '<tr><th colspan="3" id="name"></th></tr>';

    let name = document.getElementById("name");

    name.innerHTML = listname;

    //list items
    for (let i = 0; i < listitems.length; i++) {
        if (listitems[i].trim() != "") {

            //check for checkbox state

            let checkbox = false;

            if (listitems[i].endsWith("_checked")) {
                listitems[i] = listitems[i].replace("_checked", "");
                checkbox = true;
            }

            //create row

            let row = document.createElement("tr");
            let uniqueid = Date.now() + i;
            row.id = "row" + uniqueid;
            row.innerHTML = 
                '<td><input class="checkbox" type="checkbox" id="checkbox' + uniqueid + '"></td><td id="item' + uniqueid + '">' + listitems[i] + '</td><td><b class="delete" id="delete' + uniqueid + '">&#10006;</b></td>';
            table.appendChild(row);
            localStorage.setItem("item_" + uniqueid, listitems[i]);
            if (checkbox == true) {
                localStorage.setItem("checkbox_" + uniqueid, "true");
                document.getElementById("checkbox" + uniqueid).checked = true;
                document.getElementById("item" + uniqueid).style.textDecoration = "line-through";
            }
            
            //determine item order

            let order = JSON.parse(localStorage.getItem("item_order")) || [];
            order.push(uniqueid);
            localStorage.setItem("item_order", JSON.stringify(order));

            //function to use checkbox
            
            document.getElementById("checkbox" + uniqueid).addEventListener("click", function () {
                if (document.getElementById("checkbox" + uniqueid).checked) {
                    document.getElementById("item" + uniqueid).style.textDecoration = "line-through";
                    localStorage.setItem("checkbox_" + uniqueid, "true");
                } else {
                    document.getElementById("item" + uniqueid).style.textDecoration = "none";
                    localStorage.removeItem("checkbox_" + uniqueid);
                }
            });

            //function to show, hide and operate delete button

            document.getElementById("delete" + uniqueid).addEventListener("mouseover", function () {
                document.getElementById("item" + uniqueid).style.color = "red";
            });

            document.getElementById("delete" + uniqueid).addEventListener("mouseout", function () {
                document.getElementById("item" + uniqueid).style.color = "black";
            });

            document.getElementById("row" + uniqueid).addEventListener("mouseover", function () {
                document.getElementById("delete" + uniqueid).style.visibility = "visible";
            });

            document.getElementById("row" + uniqueid).addEventListener("mouseout", function () {
                document.getElementById("delete" + uniqueid).style.visibility = "hidden";
            });

            document.getElementById("delete" + uniqueid).addEventListener("click", function () {
                document.getElementById("row" + uniqueid).remove();
                localStorage.removeItem("item_" + uniqueid);
                if (localStorage.getItem("checkbox_" + uniqueid) === "true") {
                    localStorage.removeItem("checkbox_" + uniqueid);
                }
            });
        }
    }

    //create bottom row

    let borderrow = document.createElement("tr");
    borderrow.innerHTML = '<td colspan="3" class="borderrow"></td>';
        table.appendChild(borderrow);

    let bottomrow = document.createElement("tr");
    bottomrow.className = "bottomrow";
    bottomrow.innerHTML = '<td id="counter">Counter</td><td id="filter">Filter</td><td id="resize">Resize</td>';
    table.appendChild(bottomrow);

    //create counter

    //TODO

    //create filter buttons

    //TODO

    //create toprow settings

    //TODO

    //hide list creation form

    cancelCreate();
    
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

    localStorage.clear();
    createList(listname, listitems);
});

//function to check the local storage and load list if it exists

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("name")) {
        let listname = localStorage.getItem("name");
        let listitems = [];
        let order = JSON.parse(localStorage.getItem("item_order"))

        order.forEach(uniqueid => {
            let key = "item_" + uniqueid;
            if (localStorage.getItem(key)) {
                let item = localStorage.getItem(key);
                let checkbox = "checkbox_" + uniqueid;
                if (localStorage.getItem(checkbox) === "true") {
                    item += "_checked";
                }
                listitems.push(item);
            }
        });
        
        localStorage.clear();
        createList(listname, listitems);
    }
});
