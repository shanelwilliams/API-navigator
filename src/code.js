// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
let main = document.querySelector('main')
let apiKey = config.API_KEY
let loc = {}
let photoArray = []
let index = 0
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}
console.log(apiKey)

function success(pos) {
  loc.lat = pos.coords.latitude
  loc.lon = pos.coords.longitude

  let img_url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&${loc.lat}&${loc.lon}&text=mountains`
  fetch(img_url)
    .then(response => response.json())
    .then(data => renderImage(data.photos.photo))
}

navigator.geolocation.getCurrentPosition(success)
console.log(loc)

function renderImage(photoList) {
  photoList.forEach(photo => {
    photoArray.push(constructImageURL(photo))
  });
  const imageUrl = constructImageURL(photoList[index])
  console.log(imageUrl)
  let image = document.createElement('img')
  image.src = imageUrl
  image.classList.add('pictures')
  let button = document.createElement('button')
  button.innerText = 'Next'
  main.append(image, button)
  button.addEventListener('click', nextPhoto)
}

function nextPhoto() {
  const image = document.querySelector('.pictures')
  if (index >= photoArray.length - 1) {
    index = 0
  } else {
    index += 1
  }
  image.src = photoArray[index]
}

function constructImageURL(photoObj) {
  return "https://farm" + photoObj.farm +
    ".staticflickr.com/" + photoObj.server +
    "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}


