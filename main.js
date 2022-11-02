const form = document.getElementById("searchMe");//target the form tag in the html file
const search = document.getElementById("lyricSearch");//target th input field
const output = document.getElementById("search-result");

const api = "https://api.lyrics.ovh";

//structuring how the result will be displayed using the suggestion mode the API supports
function showData(data) {
    output.innerHTML = `
    <ul class="lyrics">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//declaring async function to fetch data from api
async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();

    showData(data);
}

//calling the function that gets and displays the lyrics
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics;
    if (lyrics === undefined){
        alert('lyrics doesnt exist in this api');
        console.log('lyrics does not exist in this api');
    }
  
    output.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p id="lyrics-display">${lyrics}</p>`;
  
}

//listening if the clicked event is on the span tag, so lyrics can be called and displayed
output.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})


//listening for a submit event

form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        startSearch(searchValue);
    }
})
