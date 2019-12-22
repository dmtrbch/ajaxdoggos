const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";

const breeds = document.querySelector(".breeds"),
      breedOptions = document.querySelector(".breed-options"),
      loader = document.querySelector(".loader"),
      idiot = document.querySelector(".idiot");

const promise = fetch(BREEDS_URL);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
        const breeds = processedResponse.message,
            breedsArray = Object.keys(breeds);
        breedsArray.forEach(function(breed, index){
          addBreed(breed, index);
        });
    });

breedOptions.addEventListener("change", function() {
  const breed = breedOptions.options[breedOptions.selectedIndex].text,
        isZero = breedOptions.options[breedOptions.selectedIndex].value;
        
  if(isZero !== '0') {
    const DOGGOS_URL = `https://dog.ceo/api/breed/${breed}/images`,
          promise = fetch(DOGGOS_URL);
    removeAllImages();
    hideIdiot();
    showLoader();
    promise
      .then(function(response) {
        const processingPromise = response.json();
        return processingPromise;
      })
      .then(function(processedResponse) {
        const dogs = processedResponse.message;
        hideLoader();
        addImages(dogs);
      })
  } else {
    removeAllImages();
    showIdiot();
  }
  
});

function addBreed(breed, index) {
  var opt = document.createElement("option");
  opt.value = index + 1;
  opt.innerHTML = breed;
  breedOptions.appendChild(opt);
}

function removeAllImages() {
  while (breeds.firstChild) {
    breeds.removeChild(breeds.firstChild);
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showIdiot() {
  idiot.style.display = 'block';
}

function hideIdiot() {
  idiot.style.display = 'none';
}

function addImages(dogs) {
  dogs.forEach(function(dog, index) {
    const img = document.createElement("img");
    img.src = dog;
    img.alt = `doggo_${index}`;
    breeds.appendChild(img);
  })
}

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);

