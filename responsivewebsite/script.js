const accesskey ="XIcpp8ks4MPyKYawVnW0YhZhYuUnisaXFrTCDCR_VpI"

const formEl =document.querySelector("form");
const inputEl =document.getElementById("search-input");
const searchResults =document.querySelector(".search-results");
const searchmore =document.getElementById("search-more-btn");

let inputdata="";
let page=1;

async function searchimages(){
    inputdata=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;
    
    const response=await fetch(url);
    const data=await response.json();
    
    const results=data.results;

    if(page===1){
        searchResults.innerHTML=""
    }

    results.map((results)=>{
        const imagewrapper= document.createElement('div');
        imagewrapper.classList.add("search-result");
        const image=document.createElement('img');
        image.src=results.urls.small;   //this
        image.alt=results.alt_description;    //this
        const imagelink =document.createElement('a');
        imagelink.href=results.links.innerHTML;   //this
        imagelink.target="_blank";
        imagelink.textContent=results.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imagelink);
        searchResults.appendChild(imagewrapper);
    });
    page++;
    if(page>1){
        searchmore.style.display="block";
    }
}
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchimages();
});
searchmore.addEventListener("click",()=>{
    searchimages();
});