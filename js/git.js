// const status =() =>{
// let openBtn = document.getElementById("open-btn");
// openBtn.classList.remove("hidden")
// openBtn.classList.add("btn btn-primary")
// let closedBtn = document.getElementById("closed-btn")
// closedBtn.classList.add("hidden")
// closedBtn.classList.remove("btn btn-primary")

// }

loadIssu = () => {
  document.getElementById("all-btn").addEventListener("click", async () => {
    try {
      const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
      );
      const data = await res.json();

      displayallIssu(data.data);
    } catch (err) {
      console.log("error", err);
    }
  });
};
const displayallIssu = (infos) => {
  const perentSec = document.getElementById("perent-sec");
  perentSec.innerHTML = "";

  infos.forEach((element) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
      <div id="child-sec" class=" mx-auto  p-5 flex justify-center items-center  onclick="my_modal_1.showModal()">
            <div class="bg-base-200 p-5 rounded-2xl shadow-md space-y-3  w-full">
                <div class="flex justify-between items-center">
                   <button class="btn btn-soft btn-success"<i class="fa-brands fa-galactic-republic"></i></span></button>
                <div>
                    <button class="btn btn-soft btn-error mx-auto">${element.priority}</button>
                </div>
                </div>
    
                <h3 class="font-bold text-[20px]">${element.title}</h3>
                <p class="line-clamp-1">${element.description}</p>
                <div class="flex justify-between items-center">
                    <div>
                        <button class="btn btn-soft btn-error" <span><i class="fa-solid fa-bug "></i></span>Bug</button>
                    </div>
                    <div>
                        <button class="btn btn-soft  btn-warning" <span><i
                                class="fa-brands fa-galactic-republic"></i></span>Help wanted</button>
                    </div>
                </div>
                   <p class="text-gray-400 text-left"></p>
                   <p class="text-gray-400 text-left"></p> 
            </div> 
            
          
        </div>
    `;

    perentSec.appendChild(newDiv);
  });
};

loadIssu();

const loadCard = () => {
  document
    .getElementById("perent-sec")
    .addEventListener("click", async (event) => {
      const targetValue = event.target.closest(".child-sec");
      if (!targetValue) return;
      const ress = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
      );
      const data = await ress.json();
      displayCard(data.data);
    });
};

const displayCard = (less) => {
  const myModal = document.getElementById("myModal");
  myModal.innerHTML = `<div class="modal-box">
    <h3 class="text-lg font-bold">Hello</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>`;

  document.getElementById("myModall").showModal();
};

loadCard();
