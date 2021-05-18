
let main = document.getElementById("image_div")
let input = document.getElementById("search")
let first = document.getElementById("first_div")
let second = document.getElementById("second_div")
let third = document.getElementById("third_div")
let f = 0
let s = 1
let t = 2

let page = 1
let images = []
let first_arr = []
let second_arr = []
let third_arr = []

const createFirstCard = (image,des,likes) => {
    let box = document.createElement("div")
    box.setAttribute("class", "image_box")
    let img = document.createElement("img")
    let details = document.createElement("div")
    details.setAttribute("class", "details")
    let tag = document.createElement("p")
    tag.innerHTML = des
    img.src = image
    box.appendChild(img)
    details.appendChild(tag)
    box.appendChild(details)
    first.appendChild(box)
    console.log(box)
}
const createSecondCard = (image,des,likes) => {
    let box = document.createElement("div")
    box.setAttribute("class", "image_box")
    let img = document.createElement("img")
    img.src = image
    let details = document.createElement("div")
    details.setAttribute("class", "details")
    let tag = document.createElement("p")
    tag.innerHTML = des
    box.appendChild(img)
    details.appendChild(tag)
    box.appendChild(details)
    second.appendChild(box)
    console.log(box)
}
const createThirdCard = (image,des,likes) => {
    let box = document.createElement("div")
    box.setAttribute("class", "image_box")
    let img = document.createElement("img")
    img.src = image
    let details = document.createElement("div")
    details.setAttribute("class", "details")
    let tag = document.createElement("p")
    tag.innerHTML = des
    box.appendChild(img)
    details.appendChild(tag)
    box.appendChild(details)
    third.appendChild(box)
    console.log(box)
}


const fetchImage = (q, page) => {
    if(q.length === 0){
        q = "random"
    }
    fetch(
        `https://api.unsplash.com/search/photos?client_id=gfOFYkEseSN7KRbhiyU2ckFssPgnSiClx_utWbq-b8k&page=${page || "1"}&query=${q}`,
    )
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            let data = result.results
            images = [...images,...data]
            for (i in images){
                if(i == f){
                    first_arr.push(images[i])
                    f = f + 3
                }
                if(i == s){
                    second_arr.push(images[i])
                    s = s + 3
                }
                if(i == t){
                    third_arr.push(images[i])
                    t = t + 3
                }
            }
            
            for (i in first_arr){
                let image = first_arr[i].urls.small
                let des = first_arr[i].alt_description
                let likes = first_arr[i].likes
                createFirstCard(image, des, likes)
            }
            for (i in second_arr){
                let image = second_arr[i].urls.small
                let des = second_arr[i].alt_description
                let likes = second_arr[i].likes
                createSecondCard(image, des, likes)
            }
            for (i in third_arr){
                let image = third_arr[i].urls.small
                let des = third_arr[i].alt_description
                let likes = third_arr[i].likes
                createThirdCard(image, des, likes)
            }
        })
        .catch((error) => console.log("error", error));
};


input.addEventListener("keyup",debounce())
function debounce(fetchImage){ 
    first_arr = []
    second_arr = []
    third_arr = []
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            // fetchImage(input.value,page)
            console.log(input.value)
        }, 3000); 
    }
}


fetchImage("india", page)

window.addEventListener("scroll", function(){
    if(window.pageYOffset >= document.body.scrollHeight-800)
		{
            fetchImage("london", page++)
		}
})


