const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".search-btn");
const searchIcon = document.querySelector(".search-icon");
const modeBtn = document.querySelector(".mode-btn");
const noResult = document.querySelector(".no-result");
const username = document.querySelector(".username");
const nickname = document.querySelector(".nickname");
const bio = document.querySelector(".bio");
const repos = document.querySelector(".repo-number");
const followers = document.querySelector(".followers-number");
const following = document.querySelector(".following-number");
const locationText = document.querySelector(".location-text");
const twitter = document.querySelector(".twitter-text");
const business = document.querySelector(".business-text");
const github = document.querySelector(".github-text");
const joinedDate = document.querySelector(".joined-date");
const profilePic = document.querySelector(".profile-pic");
const profilePicDisplay = document.querySelector(".img-display ");
const body = document.body;
const container = document.querySelector(".container");
const header = document.querySelector(".header");
const profile = document.querySelector(".profile");
const searchBar = document.querySelector(".search-bar");
const darkIcon = document.querySelector(".dark-icon");
const lightIcon = document.querySelector(".light-icon");
const modeText = document.querySelector(".mode-text");
const infoIcon = document.querySelectorAll(".info-icon");

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

async function getData() {
  const input = inputBox.value;
  if (input == "") alert("Empty field!");
  else {
    const url = `https://api.github.com/users/${input}`;
    inputBox.value = "";
    try {
      if (!noResult.classList.contains("hidden"))
        noResult.classList.add("hidden");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      //localStorage.setItem()=data;
      // format time
      const date = new Date(data.created_at);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      joinedDate.textContent = `${date.getDay()} ${
        months[date.getMonth()]
      } ${data.created_at.slice(0, 4)}`;

      // format profile information
      function setText(element, text) {
        document.querySelector('.profile-content').classList.remove("not-available");
        element.closest("div").classList.remove("not-available");
        if (text === data.nickname && text != undefined) {
          element.textContent = `@${text}`;
        } else {
          if (text || text === 0) {
            element.textContent = text;
            console.log(element.textContent);
          } else {
            if (element === username) element.textContent = "No Username";
            else if (element === bio)
              element.textContent = "this profile has no bio";
            else if(element===nickname) {
              element.textContent = "";
            }
            element.closest("div").classList.add("not-available");
          }
        }
      }
      setText(username, data.name);
      setText(nickname, data.nickname);
      setText(bio, data.bio);
      setText(repos, data.public_repos);
      setText(followers, data.followers);
      setText(following, data.following);
      setText(locationText, data.location);
      setText(twitter, data.twitter_username);
      setText(business, data.company);
      setText(github, data.blog);
      profilePic.src = data.avatar_url;
    } catch (error) {
      noResult.classList.remove("hidden");
      console.error(error.message);
    }
  }
}
searchBtn.addEventListener("click", getData);
searchIcon.addEventListener("click", getData);
profilePic.addEventListener("click", function(){
  profilePicDisplay.classList.remove('hidden');
});
profilePicDisplay.addEventListener("click", function(){
  profilePicDisplay.classList.add('hidden');
});

modeBtn.addEventListener("click", function () {
  // toggling icons
  if (darkIcon.classList.contains("hidden")) {
    // turning light/dark mode
    body.classList.add("lightmode");
    infoIcon.forEach(icon => {
      icon.style.filter='brightness(0.4)';
    });
    profile.style["boxShadow"] = "0 1rem 2rem 16px rgba(43, 52, 66, 0.08)";
    searchBar.style["boxShadow"] = "0 1rem 2rem 16px rgba(43, 52, 66, 0.08)";
    darkIcon.classList.remove("hidden");
    modeText.textContent="DARK";
    lightIcon.classList.add("hidden");
  } else {
    body.classList.remove ("lightmode");
    infoIcon.forEach(icon => {
      icon.style.filter='brightness(1)';
    });
    darkIcon.classList.add("hidden");
    modeText.textContent="LIGHT";
    lightIcon.classList.remove("hidden");
  }
});
