// ===== Sidebar toggle =====
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  sidebar.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');
}
function closeSidebarFn() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  sidebar.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebarFn);
document.getElementById('closeSidebar').addEventListener('click', closeSidebarFn);

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebarFn();
});

// ===== Icons behavior =====
const makeToggleActive = (btn) => {
  btn.classList.toggle('active');
  setTimeout(() => btn.classList.remove('active'), 400); // quick visual feedback
};

document.getElementById('voiceBtn').addEventListener('click', () => {
  makeToggleActive(voiceBtn);
  // Demo voice: try Web Speech API if available
  if ('webkitSpeechRecognition' in window) {
    const rec = new webkitSpeechRecognition();
    rec.lang = 'en-US';
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      document.getElementById('q').value = said;
      // auto-search
      submitSearch(said);
    };
    rec.start();
  } else {
    alert('Voice search coming soon on this browser.');
  }
});

document.getElementById('createBtn').addEventListener('click', () => {
  makeToggleActive(createBtn);
  alert('Create: Upload feature coming soon.');
});

document.getElementById('bellBtn').addEventListener('click', () => {
  makeToggleActive(bellBtn);
  alert('No new notifications on your subscribed channels.');
});

// ===== Tabs filter (color swap + filtering) =====
const tabs = document.querySelectorAll('.category-tabs .tab');
const cards = document.querySelectorAll('.video-grid .video');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // active style (color exchange)
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const cat = tab.dataset.cat;
    if (cat === 'all') {
      cards.forEach(c => c.style.display = '');
    } else {
      cards.forEach(c => {
        c.style.display = (c.dataset.cat === cat) ? '' : 'none';
      });
    }
    // scroll to top of grid for better UX on mobile
    document.getElementById('videoGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Search in same page (iframe) =====
// const form = document.getElementById("ytSearch");
// const input = document.getElementById("q");
// const iframe = document.getElementById("ytResults");

// form.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const query = input.value.trim();
//     if (query) {
//         iframe.style.display = "block";
//         iframe.src = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
//     }
// });

// ===== Search in same Tab (iframe) Redirect👌 =====
   const form = document.getElementById("ytSearch");
  const input = document.getElementById("q");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop reload
    const query = input.value.trim();
    if (query) {
      window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    }
  });

// ===== Rotating ad banner (changes over time) =====
const ads = [
  { img: 'images/ads/ad1.jpg', link: '#' },
  { img: 'images/ads/ad2.jpg', link: '#' },
  { img: 'images/ads/ad3.jpg', link: '#' },
];
let adIndex = 0;
const adImg = document.getElementById('adImg');
const adLink = document.getElementById('adLink');

function rotateAd() {
  adIndex = (adIndex + 1) % ads.length;
  adImg.src = ads[adIndex].img;
  adLink.href = ads[adIndex].link;
}
setInterval(rotateAd, 6000); // change every 6s



// ===== Smoothness improvements =====
// Avoid layout jump when iframe appears:
results.addEventListener('load', () => {
  results.style.opacity = '1';
});
results.style.transition = 'opacity .2s ease';
results.style.opacity = '0';
