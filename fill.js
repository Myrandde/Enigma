function fill() {
    let rowKeys1 = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"];
    let rowKeys2 = ["A", "S", "D", "F", "G", "H", "J", "K"]; 
    let rowKeys3 = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];
    let rows = [rowKeys1, rowKeys2, rowKeys3];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let key = document.createElement("div");
        //class="flex flex-row"
        key.classList.add("flex", "flex-row");
        key.id = "keyrow-" + (i + 1);
        document.getElementById("keyboard").appendChild(key);
        
        let plug = document.createElement("div");
        plug.classList.add("mx-5", "my-2", "p-5", "rounded-full");
        plug.id = "plugrow-" + (i + 1);
        document.getElementById("plugboard").appendChild(plug);

        for (let j = 0; j < row.length; j++) {
            // <div class="mx-5 my-2 p-5 rounded-full" id="key-A">A</div>
            let key = document.createElement("div");
            key.classList.add("mx-5", "my-2", "p-5", "rounded-full");
            key.id = "key-" + row[j];
            key.innerHTML = row[j];
            document.getElementById("keyrow-" + (i + 1)).appendChild(key);
            
            let plug = document.createElement("button");
            //<button onclick="plug('A')" class="mx-5 my-2 p-5 active:bg-blue-900 rounded-full" id="plug-A">A</button>
            plug.classList.add("mx-5", "my-2", "p-5", "rounded-full", "active:bg-blue-900");
            plug.id = "plug-" + row[j];
            plug.innerHTML = row[j];
            plug.onclick = function() {
                addPlug(row[j]);
            }
            document.getElementById("plugrow-" + (i + 1)).appendChild(plug);
        }
    }
}

fill();
