window.addEventListener("load", backgroundInit);     //backgroundInit() 호출하는 것과 동일함!!!!

const background_container = document.querySelector(".js-background");
const IMAGE_COUNT = 5;

function generateRandomNumber() {
    const num = Math.floor(Math.random() * IMAGE_COUNT) + 1;
    return num;
}
function paintBackgroundImage() {
    const random_num = generateRandomNumber();
    const image_URL = `url("images/${random_num}.jpg")`;
    background_container.style.backgroundImage = image_URL;
}

function backgroundInit() {
    paintBackgroundImage();
}