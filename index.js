const getImages = (images) => {
  const url = `https://api.pexels.com/v1/search?query=${images}`
  fetch(url, {
    method: "GET",

    headers: {
      Authorization:
        "Bearer 563492ad6f91700001000001ac5703ad44aa488894a27026791f564c",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.photos)
      loadImages(response.photos)
      changeTime(response.photos)
    })
    .catch((err) => console.error(err))
}

let cardNodes = document.querySelectorAll(".card")
let alertNode = document.querySelector(".alert")

const loadImages = (images) => {
  // show alert for 5 seconds
  alertNode.innerText = `${images.length} images loaded`
  alertNode.classList.remove("d-none")
  setTimeout(() => {
    alertNode.classList.add("d-none")
  }, 5000)

  for (let i = 0; i < cardNodes.length; i++) {
    const cardNode = cardNodes[i]
    let svgNode = cardNode.querySelector("svg")
    let imageNode
    if (svgNode) {
      // if there is an svg node replace it with an img
      imageNode = document.createElement("img")
      svgNode.parentNode.replaceChild(imageNode, svgNode)
    } else {
      // img node already exists
      imageNode = cardNode.querySelector("img")
    }

    imageNode.alt = images[i].alt
    imageNode.src = images[i].src.medium
  }
}
const loadPrimary = () => {
  getImages("cat")
}

const loadSecondary = () => {
  getImages("dog")
}

let editButtonNodes = document.querySelectorAll(".card .btn:last-of-type")
let viewButtonNodes = document.querySelectorAll(".card .btn:first-of-type")
let timeNodes = document.querySelectorAll(".card small")

const changeEdit = () => {
  for (let i = 0; i < editButtonNodes.length; i++) {
    const editButtonNode = editButtonNodes[i]

    editButtonNode.innerText = "Hide"
    editButtonNode.addEventListener("click", (event) => {
      event.target.closest(".card").classList.add("d-none")
    })
  }
}

const changeTime = (images) => {
  for (let i = 0; i < timeNodes.length; i++) {
    const timeNode = timeNodes[i]
    timeNode.innerText = images[i].id
  }
}

// ex 6
const jumbotronNode = document.querySelector(".jumbotron .container")
let inputNode = document.createElement("input")
inputNode.className = "form-control"
inputNode.placeholder = "Search"
let buttonNode = document.createElement("button")
buttonNode.className = "btn btn-primary ml-1"
buttonNode.innerText = "Search"
let searchDivNode = document.createElement("div")
searchDivNode.className =
  "search-field form-inline d-flex justify-content-center"
searchDivNode.appendChild(inputNode)
searchDivNode.appendChild(buttonNode)
jumbotronNode.appendChild(searchDivNode)
buttonNode.addEventListener("click", () => {
  getImages(inputNode.value)
})
inputNode.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getImages(inputNode.value)
  }
})

const showModal = () => {
  let imageModalNode = document.getElementById("image-modal")
  for (let i = 0; i < viewButtonNodes.length; i++) {
    const viewButtonNode = viewButtonNodes[i]
    viewButtonNode.setAttribute("data-toggle", "modal")
    viewButtonNode.setAttribute("data-target", "#modal")
    viewButtonNode.addEventListener("click", (event) => {
      let card = event.target.closest(".card")
      console.log(card)
      let imageNode = card.querySelector("img")

      imageModalNode.src = imageNode.src
    })
  }
}
const carousel = () => {
  fetch(`https://api.pexels.com/v1/search?query=forest`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer 563492ad6f91700001000001ac5703ad44aa488894a27026791f564c",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.photos)
      displayCarousel(response.photos)
    })
    .catch((err) => console.error(err))
}

const displayCarousel = (images) => {
  let carouselNode = document.querySelector(".carousel-inner")
  for (let i = 0; i < images.length; i++) {
    const image = images[i]

    carouselNode.innerHTML += `<div class="carousel-item ${
      i === 0 ? "active" : ""
    }">
  <img class="d-block w-100" src="${image.src.large}" alt="${image.alt}" />
</div>`
  }
}
showModal()
changeEdit()
getImages("dog")
carousel()
