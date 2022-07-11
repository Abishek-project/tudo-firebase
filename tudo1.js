let input = document.querySelector(".input");
let button = document.querySelector(".click");
let list = document.querySelector(".list");
let completedtask = document.querySelector(".completedtask");




button.addEventListener("click", () => {
    if (input.value == 0) {
        alert("enter something");
    }

    else {

        fetch("https://tudo-44f00-default-rtdb.firebaseio.com/main.json", {
            method: 'POST',
            body: JSON.stringify({
                "name": input.value
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })


            .then(response => response.json())
            .then(result => get())
        input.value = ""

    }
})

function get() {
    list.innerHTML = ""
    fetch("https://tudo-44f00-default-rtdb.firebaseio.com/main.json", {
        method: "GET"
    })
        .then(response => response.json())
        .then(result => {
            for (data in result) {

                var li = document.createElement("li");
                li.innerHTML += result[data].name
                li.setAttribute("id", `${data}`)


                let btn1 = document.createElement("button");
                btn1.innerHTML = "EDIT";
                btn1.setAttribute("id", `${data}`)
                btn1.setAttribute("onclick", `edititem('${data}','${result[data].name}')`)



                let btn2 = document.createElement("button");
                btn2.innerHTML = "DELETE";
                btn2.setAttribute("id", `${data}`)
                btn2.setAttribute("onclick", `clearitem('${data}')`)

                li.appendChild(btn1)
                li.appendChild(btn2)
                list.appendChild(li)




            }
        });


}
get()
//delete function
function clearitem(id) {


    fetch(`https://tudo-44f00-default-rtdb.firebaseio.com/main/${id}.json`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(result => get()
        )

}
//edit function
function edititem(id, list) {

    input.value = list
    clearitem(id)

}








