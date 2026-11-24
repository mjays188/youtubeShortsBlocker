// Function to check if the current page is a Short and redirect/block it
function blockShorts() {
  if (window.location.pathname.startsWith('/shorts/')) {
    // Wipe out the visual content safely
    document.documentElement.innerHTML = `
      <head>
        <title>Shorts Blocked</title>
        <style>
          body { margin: 0; padding: 0; background-color: #0f0f0f; }
          .container { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: "Roboto", sans-serif; background: #0f0f0f; color: #fff; text-align: center; }
          h1 { font-size: 24px; margin-bottom: 20px; font-weight: 500; }
          .home-btn { background-color: #f1f1f1; color: #0f0f0f; border: none; padding: 12px 24px; font-size: 14px; font-weight: 500; border-radius: 18px; cursor: pointer; transition: background-color 0.2s ease; text-decoration: none; }
          .home-btn:hover { background-color: #d9d9d9; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>YouTube Shorts is blocked.</h1>
          <button id="goHomeBtn" class="home-btn">Go to Home Page</button>
        </div>
      </body>
    `;
    document.getElementById('goHomeBtn').addEventListener('click', () => {
      window.location.href = 'https://youtube.com';
    });
  }
}

// 1. Run immediately on initial load
blockShorts();

// 2. Intercept YouTube's SPA navigation events
window.addEventListener('yt-navigate-start', blockShorts);
window.addEventListener('yt-page-type-changed', blockShorts);

// Fallback: Listen to history changes if YouTube updates their event names
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    blockShorts();
  }
}).observe(document, { subtree: true, childList: true });
