const cards = document.querySelector(".cards");
const catagory = document.querySelector(".catagory");
const spanAll = document.querySelectorAll(".catagory span");

const baseURL = "https://newsapi.org/v2";
const apiKey = "&apiKey=7a5ec2015b834026b9ed156bc7490a8b";
const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";

// const newsA = "https://newsapi.org/v2/top-headlines?country=us&apiKey=7a5ec2015b834026b9ed156bc7490a8b";
// const newsB = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7a5ec2015b834026b9ed156bc7490a8b";
// const newsD = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7a5ec2015b834026b9ed156bc7490a8b";
// const newsC = "https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=7a5ec2015b834026b9ed156bc7490a8b";


async function dataRequest(url){
    try{
        const response = await fetch(baseURL + url + apiKey);
        const json =  response.json();
        return json;
    }catch(error){
        console.log(error);
    }
}

function urlRequest(url){
dataRequest(url).then(data => {
    
  data.articles.forEach(item => {
    console.log(item);
    cards.innerHTML += ` <div class="card">
                            <div class="image">
                                <img src="${item.urlToImage ? item.urlToImage : backupImage} " alt="Default news image">
                            </div>
                            <div class="information">
                                <div
                                    <p class="title">${item.title}</p>
                                    <p class="description">>${item.description}</p>
                                    <p class="time">
                                        <span>${item.publishedAt.replace("Z","").split("T")[1]}</span>
                                        <span>${item.publishedAt.replace("Z","").split("T")[0]}</span>
                                    </p>
                                </div>                           
                                <div class="other">
                                    <span class="source">${item.source.name}</span>
                                    <a class="url" href="${item.url}" target="_blank">Read Article<i class="bi bi-arrow-right"></i></a>
                                </div>
                        </div>`;
  }
    );
})
}

catagory.addEventListener("click",(event) =>{
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlRequest(event.target.dataset.id);
        
        spanAll.forEach(item =>{
            item.classList.remove("active");
        });
        event.target.classList.add("active");

    }
});

urlRequest("/top-headlines?country=us");

