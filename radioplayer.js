// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

async function radioPlayer() {
  const channelsMedia = document.getElementById("channels");

  const respons = await fetch("https://api.sr.se/api/v2/channels/?format=json");

  const radioStation = await respons.json();

  console.log(radioStation);

  radioStation.channels.forEach((stationData) => {
    const radioDiv = document.createElement("div");
    radioDiv.classList.add("playlist");
    radioDiv.style.backgroundColor = `#${stationData.color}`;

    const radioImg = document.createElement("div");
    radioImg.classList.add("playlistImg");
    const stationImg = document.createElement("img");
    stationImg.src = stationData.image;

    // BOX START

    const boxarea = document.createElement("div");
    boxarea.classList.add("infobox");

    const stationName = document.createElement("h2");
    stationName.textContent = stationData.name;

    const stationTag = document.createElement("p");
    stationTag.textContent = stationData.tagline;

    const audioControll = document.createElement("audio");
    audioControll.controls = true;
    audioControll.src = stationData.liveaudio.url;

    // BOX END

    // APPENDCHILD FOR BOXAREA

    radioDiv.appendChild(radioImg);
    radioImg.appendChild(stationImg);

    radioDiv.appendChild(boxarea);
    boxarea.appendChild(stationName);
    boxarea.appendChild(stationTag);
    boxarea.appendChild(audioControll);

    channelsMedia.appendChild(radioDiv);
  });
}

radioPlayer();
