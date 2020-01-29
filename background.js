// window.addEventListener("load", backgroundInit);     //backgroundInit() 호출하는 것과 동일함!!!!

const background_container = document.querySelector(".js-background");
const BACKGROUND_IMAGES = [
    "blackBackgroundAndPencil.jpg",
    "coffeeAndPencil.jpg",
    "macbook.jpg",
    "macbookPro.jpg",
    "mackbookBlack.jpg",
    "manWithTech.jpg",
    "porsche.jpg",
    "porscheHandle.jpg",
    "stairs.jpg"
];
const IMAGE_COUNT = BACKGROUND_IMAGES.length;

function generateRandomNumber() {
    const num = Math.floor(Math.random() * IMAGE_COUNT);
    return num;
}
function paintBackgroundImage() {
    const random_idx = generateRandomNumber();
    const image_URL = `url("images/${BACKGROUND_IMAGES[random_idx]}")`;
    background_container.style.backgroundImage = image_URL;
}

function backgroundInit() {
    paintBackgroundImage();
    // background_container.addEventListener("animationstart", clockInit);
    // background_container.addEventListener("animationstart", greetingInit);
}

backgroundInit();