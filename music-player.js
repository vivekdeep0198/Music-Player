const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".img img");
const musicName = document.querySelector(".song-details .name");
const musicArtist = document.querySelector(".song-details .artist");
/* main-audio variable define with   */
const mainAudio = document.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#Next");
const progressarea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");
const repeatBtn = document.querySelector("#repeat");
 /* more-list variable define with const */
const musicList = document.querySelector(".more-list");
const showMoreBtn = wrapper.querySelector("#music-list");
const hideMusicBtn = document.querySelector("#close");


let musicIndex = 2;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    
     // calling load music function once window loaded
});

//load music function from allmusic
function loadMusic(indexNumb){
    musicName.innerText = allmusic[indexNumb].name;
    musicArtist.innerText = allmusic[indexNumb].artist;
    musicImg.src = `images/${allmusic[indexNumb].img}.jpg`;
    mainAudio.src = `songs/${allmusic[indexNumb].src}.mp3`;
}
//play music function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause_circle"
    mainAudio.play();
}
//pause music function
function pauseMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "play_circle"
    mainAudio.pause();
}
// play or music button event
playPauseBtn.addEventListener("click", ()=>{
    const ismusicPlay = wrapper.classList.contains("paused");
    ismusicPlay ? pauseMusic():  playMusic();
    
});

// nextmusic function
function nextMusic(){
    //here just increment of musicindex by 1
    musicIndex++;
    loadMusic(musicIndex);
    playMusic();
}

//next audio event
nextBtn.addEventListener("click",()=>{
    nextMusic();// caling next music function
});

// priviousmusic function
function prevMusic(){
    //here just decrement of musicindex by 1
    musicIndex--;
    loadMusic(musicIndex);
    playMusic();
}

//previous audio event
prevBtn.addEventListener("click",()=>{
    prevMusic();// calling previous music function
});

//updating the progress bar width according to music current time

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuartion = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = mainAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });

   progressarea.addEventListener("click",(event) => {
        let progresswidthval = progressarea.clientWidth;
        let clickedoffsetX = event.offsetX;
        let songDuration = mainAudio.duration;

        mainAudio.currentTime = (clickedoffsetX / progresswidthval) * songDuration;
   });

   
    showMoreBtn.addEventListener("click", ()=>{
        musicList.classList.toggle("show") 
        /* musicList select the query class .more-list
        musciList = .more-list
         */
    });

    hideMusicBtn.addEventListener("click", ()=>{
        showMoreBtn.click("")
    });

    const ulTag = document.querySelector("ul");
     for(i=0;i<allmusic.length;i++){

        let liTag = `<li>
                        <div class="row">
                            <span>${allmusic[i].name}</span>
                                <p>${allmusic[i].artist}</p>
                        </div>
                        <audio class="${allmusic[i].src}" src="songs/${allmusic[i].src}.mp3"></audio>
                         <span id="${allmusic[i].src}" class="audio-time">3.40</span>
                        </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuartion = ulTag.querySelector(`#${allmusic[i].src}`);
        let liAudioTag = ulTag.querySelector(`.${allmusic[i].src}`)

        liAudioTag.addEventListener("loadeddata", ()=>{
          
      let audioDuartion = liAudioTag.duration;
      let totalMin = Math.floor(audioDuartion/ 60);
      let totalSec = Math.floor(audioDuartion % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      liAudioDuartion.innerText = `${totalMin}:${totalSec}`;
        })
     }