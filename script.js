const c = (element) =>{
	return document.querySelector(element);
}
const spinner = document.getElementById("spinner");
const API_URL = 'http://localhost:3333/deezer/api'
c('.search').addEventListener('click',()=>{
	getDeezerData();
})
const onEnter = (e) =>{
	if(e.key == 'Enter'){
		getDeezerData();
	}
}
c('.search').addEventListener('click',()=>{
	getDeezerData();
})


const getDeezerData = () =>{
	spinner.removeAttribute('hidden');
	const query = c('#input').value;
	if(!query) return;
	const encodedQuery = encodeURIComponent(query);
	const API_FULL_URL = `${API_URL}?q=${encodedQuery}&count=10`;
	fetch(API_FULL_URL).then((response)=>{
		return response.json()
	}).then((Dezzerdata)=>{
		spinner.setAttribute('hidden', '');
		listData(Dezzerdata.data);
	})
}
const run = (btn)=>{
let id = btn.getAttribute('data-key');
console.log(id)
}


const listData = (musics) =>{
	
let content = "";
musics.map((music)=>{
	content+=`
	<div class="post">
				<div class="img-container" style="background-image: url(${music.album.cover})">
					
				</div>
				<div class="artist">
				<div class="artist-info">
				<div class="artist-img" style="background-image: url(${music.artist.picture})">
					
				</div>
				<div class="artist-name">
					<h2>${music.artist.name}</h2>
				</div>
				</div>
				
				<div class="music-name">
					<h2>${music.title_short}</h2>
	
				</div>
			
				<div class="play">
				<audio  data-key=${music.id} controls >
				<source src=${music.preview} onclick="run(this)">
				</audio>
			</div>
			</div>


			</div>

	`;

	

	c('.posts').innerHTML = content;


   
});

}

