document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  });
});

const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
      const target = document.querySelector('#exhibits');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) el.classList.add('active');
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); 
const viewport = document.getElementById('museumViewport');
const panImg = document.getElementById('pan-image');
let isZoomed = false; 

if (viewport && panImg) {
  viewport.addEventListener('click', (e) => {
    isZoomed = !isZoomed;
        panImg.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";

    if (isZoomed) {
      const rect = viewport.getBoundingClientRect();
      const zoomLevel = 2.5; 
      const x = (e.clientX - rect.left) * zoomLevel - rect.width / 2;
      const y = (e.clientY - rect.top) * zoomLevel - rect.height / 2;

      panImg.style.transform = `scale(${zoomLevel}) translate(${-x / zoomLevel}px, ${-y / zoomLevel}px)`;
      panImg.style.cursor = "zoom-out";
    } else {
      panImg.style.transform = `scale(1) translate(0, 0)`;
      panImg.style.cursor = "zoom-in";
    }
  });

  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const zoomLevel = isZoomed ? 2.5 : 1;
    
    const mouseXRatio = (e.clientX - rect.left) / rect.width;
    const mouseYRatio = (e.clientY - rect.top) / rect.height;

    if (isZoomed) {
   
      panImg.style.transition = "transform 0.1s ease-out";
      
      const moveX = mouseXRatio * (rect.width - rect.width * zoomLevel);
      const moveY = mouseYRatio * (rect.height - rect.height * zoomLevel);

      panImg.style.transform = `scale(${zoomLevel}) translate(${moveX / zoomLevel}px, ${moveY / zoomLevel}px)`;
    } else {
      panImg.style.transition = "transform 0.1s ease-out";
      const panRange = 100; 
      const moveX = (mouseXRatio - 0.5) * -panRange;
      const moveY = (mouseYRatio - 0.5) * -panRange;
      panImg.style.transform = `scale(1) translate(${moveX}px, ${moveY}px)`;
    }
  });

  viewport.addEventListener('mouseleave', () => {
    isZoomed = false;
    panImg.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    panImg.style.transform = `scale(1) translate(0, 0)`;
  });
}
const modal = document.getElementById("gameModal");
const closeBtn = document.getElementById("closeGame");

const openGamePopup = () => {
  if (modal) {
      modal.style.display = "flex";
      const webMusic = document.getElementById("webMusic");
      if (webMusic) webMusic.pause();
  }
};

window.addEventListener('load', () => {
  openGamePopup(); 
});

if (closeBtn) {
  closeBtn.onclick = function() {
      modal.style.display = "none";
      // Mở lại nhạc web khi đóng game
      const webMusic = document.getElementById("webMusic");
      if (webMusic) webMusic.play();
  };
}
