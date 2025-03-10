//function to show list creation form

function showCreate() {
    document.getElementById("createForm").style.display = "block";
}

document.getElementById("showBtn").addEventListener("click", showCreate);

//function to hide list creation form

function cancelCreate() {
    document.getElementById("createForm").style.display = "none";
};

document.getElementById("cancelBtn").addEventListener("click", cancelCreate);

//function to create a list

function createList(listname, listitems) {
    let table = document.getElementById("table");
    document.getElementsByClassName("list")[0].style.display = "block";
    localStorage.setItem("name", listname);

    //clear table and create top rows for list

    table.innerHTML = "";

    table.innerHTML = '<tr id="toprow"><td colspan="3"><div id="toprow-wrapper"><div id="settings"></div><div id="deletelist"></div></div></td></tr>';

    let gearrow = document.createElement("tr");
    gearrow.id = "gearrow";
    gearrow.innerHTML = '<td colspan="3"><div id="showsettings">⚙️</div></td>';
    table.appendChild(gearrow);
    
    let headerrow = document.createElement("tr");
    headerrow.innerHTML = '<tr id="header"><th colspan=3 id="name">' + listname + '</th></tr>';
    table.appendChild(headerrow);

    //list items
    for (let i = 0; i < listitems.length; i++) {
        if (listitems[i].trim() != "") {

            //check for checkbox state

            let checkbox = false;

            if (listitems[i].endsWith("(V'#8]i=fWF-^t7cBN-3S)_checked")) {
                listitems[i] = listitems[i].replace("(V'#8]i=fWF-^t7cBN-3S)_checked", "");
                checkbox = true;
            };

            //create row with item

            let row = document.createElement("tr");
            let uniqueid = Date.now() + i;
            row.id = "row" + uniqueid;
            row.innerHTML = '<td><input class="checkbox" type="checkbox" id="checkbox' + uniqueid + '"></td><td class="item" id="item' + uniqueid + '">' + listitems[i] + '</td><td><b class="delete" id="delete' + uniqueid + '">&#10006;</b></td>';
            table.appendChild(row);
            localStorage.setItem("item_" + uniqueid, listitems[i]);
            if (checkbox == true) {
                localStorage.setItem("checkbox_" + uniqueid, "true");
                document.getElementById("checkbox" + uniqueid).checked = true;
                document.getElementById("item" + uniqueid).style.textDecoration = "line-through";
            };
            
            //save item order

            let order = JSON.parse(localStorage.getItem("item_order")) || [];
            order.push(uniqueid);
            localStorage.setItem("item_order", JSON.stringify(order));

            //function to use checkbox
            
            document.getElementById("checkbox" + uniqueid).addEventListener("click", function () {
                if (document.getElementById("checkbox" + uniqueid).checked) {
                    document.getElementById("item" + uniqueid).style.textDecoration = "line-through";
                    localStorage.setItem("checkbox_" + uniqueid, "true");
                    completedCounter();
                    filterItems();
                } else {
                    document.getElementById("item" + uniqueid).style.textDecoration = "none";
                    localStorage.removeItem("checkbox_" + uniqueid);
                    completedCounter();
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
                completedCounter()
            });
        }
    };

    //create bottom row

    let borderrow = document.createElement("tr");
    borderrow.innerHTML = '<td colspan="3" class="borderrow"></td>';
        table.appendChild(borderrow);

    let bottomrow = document.createElement("tr");
    bottomrow.className = "bottomrow";
    bottomrow.innerHTML = '<td colspan="3"><div id="bottomrow-wrapper"><div id="counter"></div><div></div><div id="filter"></div></div></td>';
    table.appendChild(bottomrow);

    //create counter function

    function completedCounter() {
        let counter = document.getElementById("counter");
        let checkboxes = document.getElementsByClassName("checkbox");
        let completed = 0;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                completed++;
            }
        }
        counter.innerHTML = "";
        if (completed == checkboxes.length) {
            counter.innerHTML = "Completed: " + completed + "/" + checkboxes.length + "! 🎉";
        } else {
            counter.innerHTML = "Completed: " + completed + "/" + checkboxes.length;
        }
    };

    completedCounter();

    //create filter menu and function

    let filter = document.getElementById("filter");
    filter.innerHTML = '<select id="mySelect"><option value="show">Show All</option><option value="hide">Hide Completed</option></select>';
    
    function filterItems() {
        let value = document.getElementById("mySelect").value;
        let checkboxes = document.getElementsByClassName("checkbox");
        if (value == "show") {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxes[i].parentNode.parentNode.style.display = "";
                }
            }
        } else if (value == "hide") {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxes[i].parentNode.parentNode.style.display = "none";
                }
            }
        }
    };

    filter.addEventListener("change", filterItems);

    //create color and front size buttons

    let settings = document.getElementById("settings");
    settings.innerHTML = '<div id="fontsize">&#128474;</div><div id="yellowbox" style="background-color: #fff68b;"></div><div id="greenbox" style="background-color: #cdfc93;"></div><div id="bluebox" style="background-color: #88d6f5;"></div>';

    //create color buttons function
    function changeColor(color) {
        if (color == "yellow") {
            document.getElementById("table").style.background = "radial-gradient(circle, hsla(55, 73%, 77%, 1) 50%, hsla(55, 100%, 77%, 1) 100%)";
            localStorage.setItem("color", "yellow");
        } else if (color == "green") {
            document.getElementById("table").style.background = "radial-gradient(circle, hsla(86, 57%, 76%, 1) 50%, hsla(87, 95%, 78%, 1) 100%)";
            localStorage.setItem("color", "green");
        } else if (color == "blue") {
            document.getElementById("table").style.background = "radial-gradient(circle, hsla(197, 69%, 76%, 1) 50%, hsla(197, 84%, 75%, 1) 100%)";
            localStorage.setItem("color", "blue");
        }
    }

    if (localStorage.getItem("color") == null) {
        localStorage.setItem("color", "yellow");
    }

    if (localStorage.getItem("color") == "green") {
        changeColor("green");
    } else if (localStorage.getItem("color") == "blue") {
        changeColor("blue");
    } else if (localStorage.getItem("color") == "yellow") {
        changeColor("yellow");
    }
        
    document.getElementById("yellowbox").addEventListener("click", function() { 
        changeColor("yellow"); 
    });

    document.getElementById("greenbox").addEventListener("click", function() { 
        changeColor("green"); 
    });

    document.getElementById("bluebox").addEventListener("click", function() { 
        changeColor("blue"); 
    });

    //create front size function

    document.getElementById("fontsize").addEventListener("click", function () {
        if (document.getElementById("table").style.fontSize === "" || document.getElementById("table").style.fontSize === "100%") {
            document.getElementById("table").style.fontSize = "105%";
        } else if (document.getElementById("table").style.fontSize === "105%") {
            document.getElementById("table").style.fontSize = "95%";
        } else if (document.getElementById("table").style.fontSize === "95%") {
            document.getElementById("table").style.fontSize = "100%";
        }
    });

    //create delete list button

    let deletelist = document.getElementById("deletelist");
    deletelist.innerHTML = "Delete List";

    deletelist.addEventListener("click", function () {
        if (!confirm("Are you sure? This list will be permanently deleted.")) {
            return;
        }
        localStorage.clear();
        table.innerHTML = "";
        document.getElementsByClassName("list")[0].style.display = "none";
    });

    //showing and hiding top row functions

    let gear = document.getElementById("showsettings");
    gear.addEventListener("click", function () {
        let toprow = document.getElementById("toprow");
        let style = window.getComputedStyle(toprow);
        if (style.display === "none") {
            toprow.style.display = "table-row";
        } else {
            toprow.style.display = "none";
        }
    });

    //clearing input fields and error messages

    document.getElementById("listname").value = "";
    document.getElementById("listitems").value = "";
    document.getElementById("listname").style.border = "1px solid black";
    document.getElementById("listitems").style.border = "1px solid black";

    if (document.getElementById("errorname")) {
        document.getElementById("errorname").remove();
    }
    if (document.getElementById("erroritems")) {
        document.getElementById("erroritems").remove();
    }

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

    if (listname.trim() == "") {
        if (document.getElementById("errorname")) {
            document.getElementById("errorname").remove();
        }
        nameinput.style.border = "1px solid red";
        nameinput.insertAdjacentHTML("afterend", '<b class="error" id="errorname"><br>*Please enter a list name.</b>');
        error = true;
    } else if (listname.length > 21) {
        if (document.getElementById("errorname")) {
            document.getElementById("errorname").remove();
        }
        nameinput.style.border = "1px solid red";
        nameinput.insertAdjacentHTML("afterend", '<b class="error" id="errorname"><br>*List name must be between 1-21 characters.</b>');
        error = true;
    } else {
        if (document.getElementById("errorname")) {
            document.getElementById("errorname").remove();
        }
        nameinput.style.border = "1px solid black";
    };

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
        let order = JSON.parse(localStorage.getItem("item_order"));

        //marking the checkbox status

        order.forEach(uniqueid => {
            let key = "item_" + uniqueid;
            if (localStorage.getItem(key)) {
                let item = localStorage.getItem(key);
                let checkbox = "checkbox_" + uniqueid;
                if (localStorage.getItem(checkbox) === "true") {
                    item += "(V'#8]i=fWF-^t7cBN-3S)_checked";
                }
                listitems.push(item);
            }
        });

        let color = localStorage.getItem("color");
        
        localStorage.clear();

        localStorage.setItem("color", color);

        createList(listname, listitems);
    }
});

//function to upload a file

document.getElementById("uploadBtn").addEventListener("click", function () {
    
    if (table.hasChildNodes()) {
        if (!confirm("This will overwrite the current list. Are you sure?")) {
            return;
        }
    }

    let fileinput = document.createElement('input');
    fileinput.type = 'file';
    fileinput.accept = '.txt';

    fileinput.addEventListener('change', function() {
        let file = fileinput.files[0];
        let reader = new FileReader();

        reader.onload = function(event) {
            let error = false;
            let listname = file.name.split('.')[0];
            if (listname.length > 21) {
                alert("File name must be between 1-21 characters.");
                error = true;
            }
            let listitems = event.target.result.split('\n');
            if (listitems.length == 0 || listitems.filter(item => item.trim() !== "").length == 0) {
                alert("File must contain at least one list item.");
                error = true;
            }

            if (error == true) {
                return;
            }

            localStorage.clear();
            createList(listname, listitems);
        };

        reader.readAsText(file);
    });

    fileinput.click();
});
