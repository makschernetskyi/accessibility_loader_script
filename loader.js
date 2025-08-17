(function() {
    try {
        if (!window.FMD_ID) {
            console.error("Formamind: FMD_ID not found.");
            return;
        }

        const origin = window.location.origin;
        const workerBase = "https://accessibility-cloudflare.red-silence-92e4.workers.dev/w";

        // Load JS
        fetch(`${workerBase}/js?key=${encodeURIComponent(window.FMD_ID)}`, {
            headers: { Origin: origin }
        })
        .then(resp => resp.text())
        .then(jsCode => {
            const script = document.createElement("script");
            script.textContent = jsCode;
            document.head.appendChild(script);
        })
        .catch(err => console.error("Formamind widget JS failed:", err));

        // Load CSS
        fetch(`${workerBase}/css?key=${encodeURIComponent(window.FMD_ID)}`, {
            headers: { Origin: origin }
        })
        .then(resp => resp.text())
        .then(cssCode => {
            const style = document.createElement("style");
            style.textContent = cssCode;
            document.head.appendChild(style);
        })
        .catch(err => console.error("Formamind widget CSS failed:", err));

    } catch (e) {
        console.error("Formamind loader error:", e);
    }
})();
