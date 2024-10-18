
// Loading buttons
const loadAllButtons = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
  const data = await response.json();
  displayAllButtons(data.categories);
};

// display buttons
displayAllButtons = (buttons) => {
  const mainButtonContainer = document.getElementById("btnContainer");
  buttons.forEach((button) => {
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `<button id ="btn-${button.category}" onclick="loadPetsByCategory('${button.category}')" class = "py-2 md:py-3 px-4 md:px-8 flex items-center border rounded-xl font-bold text-lg md:text-xl lg:text-2xl gap-2 btn-category">
        <img src=${button.category_icon} class="w-5 md:w-8"> ${button.category}
        </button>
        `;
    mainButtonContainer.append(buttonContainer);
  });
};

// load all pets
const loadAllPets = async () => {
  const response = await fetch(
    " https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPets(data.pets);
  document.getElementById("sortByPrice").addEventListener("click",() =>{
    const sortedPets = sortPetsDescending([...data.pets])
    displayAllPets(sortedPets);
  });
};


// load pet details
const showDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  showmodal(data.petData);
};

// load category
const loadPetsByCategory = async (category) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();


  // removing active class
  removeActiveClass();
  // adding active class
    const activeBtn= document.getElementById(`btn-${category}`);
    activeBtn.classList.remove("rounded-xl")
   activeBtn.classList.add(
     "border-1",
     "border-[#0e7a81]",
     "rounded-full",
     "bg-[#0e7a811a]"
   );
  displayPetsByCategory(data.data);
  // sort by price
  document.getElementById("sortByPrice").addEventListener("click", () => {
    const sortedPets = sortPetsDescending([...data.data]);
    displayPetsByCategory(sortedPets);
  });
};

// display all pets
const displayAllPets = (data) => {
  const petContainer = document.getElementById("petsContainer");
  petContainer.innerHTML ="";

  data.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="p-4 rounded-md border">
                    <div class="rounded-md">
                        <img src=${
                          pet.image
                        } class="w-full object-cover rounded-md" alt="">
                    </div>
                    <div class=" py-2 border-b">
                       <h4 class="font-bold text-lg">${pet.pet_name}</h4> 
                      <p><i class="fa-solid fa-table"></i> Breed: ${
                        pet.breed ? pet.breed : "Not available"
                      }</p> 
                      <p><i class="fa-solid fa-calendar-days"></i> Birth: ${
                        pet.date_of_birth ? pet.date_of_birth : "Not Available"
                      }</p> 
                      <p><i class="fa-solid fa-mercury"></i> Gender: ${
                        pet.gender ? pet.gender : "Not available"
                      }</p> 
                      <p><i class="fa-solid fa-dollar-sign"></i> Price:${
                        pet.price ? pet.price : "Not available"
                      } $</p> 
                    </div>
                    <div class="pt-4 flex items-center justify-between gap-1">
                       <button onclick=showLikedImage('${
                         pet.image
                       }') class=" px-2 border rounded-md hover:border-[#0E7A81]"><i class="fa-regular fa-thumbs-up lg:text-3xl"></i></button>

                       <button onclick="countdownModal(this)" class="action-btn py-1 px-2 border rounded-md font-bold text-[#0E7A81] text-xs md:text-sm lg:text-lg hover:bg-[#0E7A81] hover:text-white">
                        Adopt
                       </button> 

                       <button onclick="showDetails(${
                         pet.petId
                       })" class="py-1 px-2 border rounded-md font-bold text-[#0E7A81] text-xs md:text-sm lg:text-lg  hover:bg-[#0E7A81] hover:text-white">Details</button> 
                    </div>
                 </div>
         `;
    petContainer.append(div);
  });
};
// display pets by category
const displayPetsByCategory = (categories) => {
  loadingSpinner();
  const petContainer = document.getElementById("petsContainer");
  petContainer.innerHTML = "";
  if (categories.length == 0) {
    petContainer.innerHTML = `
        <div class="bg-gray-100 flex flex-col items-center justify-center px-6 py-8 lg:py-20 space-y-3">
            <img src="images/error.webp" class="w-20 md:w-auto" alt="">
            <h2 class="font-bold text-sm md:text-xl lg:text-2xl text-center">No Information Available</h2>
           </div>
        `;
    petContainer.classList.remove("grid");
    return;
  } else {
    petContainer.classList.add("grid");
  }
  categories.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="p-4 rounded-md border">
                    <div class="rounded-md">
                        <img src=${
                          pet.image
                        } class="w-full object-cover rounded-md" alt="">
                    </div>
                    <div class=" py-2 border-b">
                       <h4 class="font-bold text-lg">${pet.pet_name}</h4> 
                      <p><i class="fa-solid fa-table"></i> Breed: ${
                        pet.breed ? pet.breed : "Not available"
                      }</p> 
                      <p><i class="fa-solid fa-calendar-days"></i> Birth: ${
                        pet.date_of_birth ? pet.date_of_birth : "Not available"
                      }</p> 
                      <p><i class="fa-solid fa-mercury"></i> Gender: ${
                        pet.gender ? pet.gender : "Not available"
                      }</p> 
                      <p><i class="fa-solid fa-dollar-sign"></i> Price:${
                        pet.price ? pet.price : "Not available"
                      } $</p> 
                    </div>
                    <div class="pt-4 flex items-center justify-between gap-1 ">
                       <button onclick=showLikedImage('${
                         pet.image
                       }') class=" px-2 border rounded-md hover:border-[#0E7A81]"><i class="fa-regular fa-thumbs-up lg:text-3xl"></i></button>

                       <button onclick="countdownModal(this)" class=" py-1 px-2 border rounded-md font-bold text-[#0E7A81] text-xs md:text-sm lg:text-lg  hover:bg-[#0E7A81] hover:text-white" >
                        Adopt
                       </button> 

                       <button onclick="showDetails(${
                         pet.petId
                       })" class="py-1 px-2 border rounded-md font-bold text-[#0E7A81] text-xs md:text-sm lg:text-lg  hover:bg-[#0E7A81] hover:text-white">Details</button> 
                    </div>
                 </div>
         `;
    petContainer.append(div);
  });
};
// show liked images
function showLikedImage(images) {
  const div = document.createElement("div");
  div.classList.add("p-2");
  div.innerHTML = `<img src=${images} class="rounded-md">`;
  const likedImageContainer = document.getElementById("likedImageContainer");
  likedImageContainer.appendChild(div);
}
// modal
const showmodal = (data) => {
  const modalBox = document.getElementById("modalBox");
  const div = document.createElement("div");
  div.innerHTML = `
     <dialog id="my_modal_4" class="modal">
    <div class="modal-box">
    <div class="flex flex-col">
      <div id="modal-data" class="rounded-md">
                        <img id="images" src=${data.image} class="w-full object-cover rounded-md" alt="">
                    </div>
                    <div  class=" py-4 border-b ">
                      <h4 id="name" class="font-bold text-lg">${data.pet_name}</h4>
                       <div class="flex justify-between"> 
                      <div>
                        <p class="flex items-center"><img src="images/grid.png" class="w-4 font-bold"> Breed:<span id="breed"> ${data.breed}</span></p> 
                      <p><i class="fa-solid fa-calendar-days"></i> Birth:<span id="birth"> ${data.date_of_birth}</span></p> 
                      <p><i class="fa-solid fa-mercury"></i> Gender: <span id="gender">${data.gender}</span></p> 
                      </div>

                       <div>
                      <p><i class="fa-solid fa-virus-covid"></i> vaccinated_status: <span id="vaccine">${data.vaccinated_status}</span></p> 
                      <p><i class="fa-solid fa-dollar-sign"></i> Price:<span id="price">${data.price}</span> $</p> 
                      </div>
                       </div>
                    </div>
                    <h4 class="font-bold text-lg py-3">Detail Information</h4>
                    <p><span id="details">${data.pet_details}</span></p> 
    <div class="modal-action">
      <form  method="dialog " class="mx-auto">
        <button id="close-button" class="btn text-[#0E7A81]">Close</button>
      </form>
    </div>
    </div>
  </div>
    </dialog>
    `;
  modalBox.append(div);
  const modal = document.getElementById("my_modal_4");
  resetModal();
  modal.showModal();

  function resetModal() {
    document.getElementById("images").src = `${data.image}`;
    document.getElementById("name").innerText = `${data.pet_name}`;
    document.getElementById("breed").innerText = `${
      data.breed ? data.breed : "Not available"
    }`;
    document.getElementById("birth").innerText = `${
      data.date_of_birth ? data.date_of_birth : "Not available"
    }`;
    document.getElementById("gender").innerText = `${
      data.gender ? data.gender : "Not available"
    }`;
    document.getElementById("vaccine").innerText = `${data.vaccinated_status}`;
    document.getElementById("price").innerText = `${
      data.price ? data.price : "Not available"
    }`;
    document.getElementById("details").innerText = `${data.pet_details}`;
  }
  document.getElementById("close-button").addEventListener("click", (event) => {
    event.preventDefault();
    this.document.getElementById("my_modal_4").close();
    resetModal();
  });
};



// addopt button
const countdownModal = (buttons) => {
   
  const countdownTimer = document.getElementById("countdownTimer");
   countdownTimer.innerText = 3;
  const button = document.getElementById("close-button");

  let countdownValue = 3;
  countdownTimer.innerText = countdownValue;
   document.getElementById("my_modal_1").showModal();
   startCountdown();

  function startCountdown() {
    countdownInterval = setInterval(() => {
      countdownValue --; 
      countdownTimer.innerText = countdownValue; 
      if (countdownValue <= 1) {
        clearInterval(countdownInterval);
        button.click();
        buttons.disabled=true;
        buttons.innerText="Adopted"
        buttons.classList =
          "bg-gray-400 text-white  text-xs md:text-sm px-2 py-1 rounded cursor-not-allowed";
      }
    }, 1000);
  }
};

// sort by price
function sortPetsDescending(products) {
  return products.sort((a, b) => b.price - a.price);
}

// loading spinner
function loadingSpinner() {
 
  document.getElementById("postLoader").classList.remove("hidden");
  document.getElementById("mainPetsContainer").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("postLoader").classList.add("hidden");
    document.getElementById("mainPetsContainer").classList.remove("hidden");
  }, 2000); 
}
// category button active inactive
const removeActiveClass =() =>{
  const buttons = document.querySelectorAll(".btn-category");
  buttons.forEach(button =>{
    button.classList.remove(
      "border-2",
      "border-[#0e7a81]",
      "rounded-full",
      "bg-[#0e7a811a]"
    );
    button.classList.add("rounded-xl");
  })
} 
loadingSpinner();
loadAllButtons();
loadAllPets();
