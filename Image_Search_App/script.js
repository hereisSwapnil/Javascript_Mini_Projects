let page = 1;

async function getImages(query, page, loadMore_) {
    if (!loadMore_) {
        page = 1;
        let imgGrid = document.getElementById("imgGrid")
        imgGrid.innerHTML = ""
    }
    fetch(`https://api.unsplash.com/search/photos?client_id=P8SWAw3h83ooWjSCetVgH3ui-zrccEQS950Ws3pjmGY&query=${query}&page=${page}`)
        .then(async response => {
            const data = await response.json();
            console.log(data);
            if (data.results.length) {
                let heading_result = document.getElementById('heading_result');
                heading_result.style.display = "none";
                for (const ele in data.results) {
                    let imageUrl = data.results[ele].urls.regular
                    let imgGrid = document.getElementById("imgGrid")
                    imgGrid.innerHTML += `<div class="bg-white overflow-hidden shadow-md rounded-lg h-[500px] flex items-center justify-center">
                    <img src="${imageUrl}"
                        alt="Image 1" class="w-full h-full object-cover" />
                </div>`
                }
                let loadMoreBtn = document.getElementById('loadMoreBtn')
                loadMoreBtn.style.display = "flex"
            } else {
                let heading_result = document.getElementById('heading_result');
                heading_result.style.display = "grid";
                let imgGrid = document.getElementById("imgGrid")
                imgGrid.innerHTML = ""
                let loadMoreBtn = document.getElementById('loadMoreBtn')
                loadMoreBtn.style.display = "none"
            }
        })
}

async function loadMore() {
    let searchInput = searchBox.value;
    getImages(searchInput, ++page, true)
}

const searchBox = document.getElementById("search")

document.addEventListener("keyup", async function (event) {
    if (event.key === "Enter") {
        console.log("Finding");
        let searchInput = searchBox.value;
        await getImages(searchInput, page, false)
    }
})