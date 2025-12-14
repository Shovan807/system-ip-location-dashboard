// Button
const infoBtn = document.getElementById("info");

// ===== LOCATION =====
const cityEl      = document.getElementById("city");
const countryEl   = document.getElementById("country");
const regionEl    = document.getElementById("region");
const localTimeEl = document.getElementById("localTime");

// ===== WEATHER =====
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl   = document.getElementById("feelsLike");
const humidityEl    = document.getElementById("humidity");
const pressureEl    = document.getElementById("pressure");
const windSpeedEl   = document.getElementById("windSpeed");
const weatherEl     = document.getElementById("weather");

// ===== IP INFO =====
const ipEl       = document.getElementById("ip");
const locationEl = document.getElementById("location");
const ispEl      = document.getElementById("isp");
const orgEl      = document.getElementById("org");
const asnEl      = document.getElementById("asn");

// ===== BROWSER INFO =====
const browserNameEl    = document.getElementById("browserName");
const browserVersionEl = document.getElementById("browserVersion");
const userAgentEl      = document.getElementById("userAgent");
const platformEl       = document.getElementById("platform");
const languageEl       = document.getElementById("language");
const cookiesEl        = document.getElementById("cookies");
const onlineStatusEl   = document.getElementById("onlineStatus");

// ===== ADDITIONAL LIVE INFO =====
const mouseXEl      = document.getElementById("mouseX");
const mouseYEl      = document.getElementById("mouseY");



// ===== MOUSE TRACKING (Global) =====
document.addEventListener("mousemove", (e) => {
    mouseXEl.textContent = e.clientX;
    mouseYEl.textContent = e.clientY;
});

// ===== MAIN BUTTON CLICK =====
infoBtn.addEventListener("click", async (e) => {
    e.preventDefault();


    try {
        let response1 = await fetch("https://ipinfo.io/json");
        let data = await response1.json();
        IpInformation(data);
    } catch (error) {
        console.error("IP Fetch Error:", error);
        ipEl.textContent = "Error (Adblock?)";
    }

    // 2. Browser Information
    BrowserInformation();

  
    getAdditionalInfo();

  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(gotLocation, failedLocation);
    } else {
        cityEl.textContent = "Geolocation Not Supported";
    }
});

// ===== FUNCTIONS =====

function IpInformation(data) {
console.log(data);
    ipEl.textContent = data.ip || "N/A";

  
    locationEl.textContent =
        data.city
            ? `${data.city}, ${data.region}, ${data.country}`
            : (data.loc || "N/A");

    // org example: "AS24560 Airtel Broadband"
    if (data.org) {
        const parts = data.org.split(" ");

        asnEl.textContent = parts[0];              // AS24560
        ispEl.textContent = parts.slice(1).join(" "); // Airtel Broadband
        orgEl.textContent = data.org;
    } else {
        asnEl.textContent = "N/A";
        ispEl.textContent = "N/A";
        orgEl.textContent = "N/A";
    }
}


function gotLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = "c1a07063546048f1a60120606250212";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Weather API Failed");
            return response.json();
        })
        .then(data => {
            // Location
            cityEl.textContent      = data.location.name;
            countryEl.textContent   = data.location.country;
            regionEl.textContent    = data.location.region;
            localTimeEl.textContent = data.location.localtime;

            // Weather
            temperatureEl.textContent = data.current.temp_c + " °C";
            feelsLikeEl.textContent   = data.current.feelslike_c + " °C";
            humidityEl.textContent    = data.current.humidity + " %";
            pressureEl.textContent    = data.current.pressure_mb + " mb";
            windSpeedEl.textContent   = data.current.wind_kph + " km/h";
            weatherEl.textContent     = data.current.condition.text;
        })
        .catch(err => {
            console.error("Weather Error:", err);
            weatherEl.textContent = "Error loading weather";
        });
}

function failedLocation(error) {
    console.warn("Location permission denied or error:", error);
    cityEl.textContent = "Location Denied";
}

function BrowserInformation() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    const getVersion = (regex) => {
        const match = userAgent.match(regex);
        return match ? match[1] : "Unknown";
    };

    if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
        browserName = "Opera";
        browserVersion = getVersion(/OPR\/([\d.]+)/);
    } else if (userAgent.includes("Edg")) {
        browserName = "Microsoft Edge";
        browserVersion = getVersion(/Edg\/([\d.]+)/);
    } else if (userAgent.includes("Chrome")) {
        browserName = "Google Chrome";
        browserVersion = getVersion(/Chrome\/([\d.]+)/);
    } else if (userAgent.includes("Firefox")) {
        browserName = "Mozilla Firefox";
        browserVersion = getVersion(/Firefox\/([\d.]+)/);
    } else if (userAgent.includes("Safari")) {
        browserName = "Safari";
        browserVersion = getVersion(/Version\/([\d.]+)/);
    }

    browserNameEl.textContent    = browserName;
    browserVersionEl.textContent = browserVersion;
    userAgentEl.textContent      = userAgent;
    
    // Platform (Technical name)
    const platform = navigator.platform;
    platformEl.textContent = platform === "Win32" ? "Windows" : platform;

    languageEl.textContent       = navigator.language;
    cookiesEl.textContent        = navigator.cookieEnabled ? "Yes" : "No";
    onlineStatusEl.textContent   = navigator.onLine ? "Online" : "Offline";
}
function getAdditionalInfo() {

    
    if (window.__infoLoaded) return;
    window.__infoLoaded = true;


    const $ = id => document.getElementById(id);

    const cpuEl = $("cpu");
    const ramEl = $("ram");

    const screenWidthEl = $("screenWidth");
    const screenHeightEl = $("screenHeight");
    const screenResolutionEl = $("screenResolution");
    const windowSizeEl = $("windowSize");   
    const colorDepthEl = $("colorDepth");
    const pixelRatioEl = $("pixelRatio");

    const osEl = $("os");
    const onlineEl = $("online");

 
    if (cpuEl) {
        cpuEl.textContent = navigator.hardwareConcurrency
            ? navigator.hardwareConcurrency + " Cores"
            : "Not Available";
    }

   
    if (ramEl) {
        ramEl.textContent = navigator.deviceMemory
            ? "~" + navigator.deviceMemory + " GB"
            : "Not Available";
    }

    const updateScreen = () => {

       
        if (screenWidthEl) screenWidthEl.textContent = screen.width + " px";
        if (screenHeightEl) screenHeightEl.textContent = screen.height + " px";
        if (screenResolutionEl)
            screenResolutionEl.textContent = `${screen.width} x ${screen.height}`;

       
        if (windowSizeEl)
            windowSizeEl.textContent = `${window.innerWidth} x ${window.innerHeight}`;

        if (colorDepthEl) colorDepthEl.textContent = screen.colorDepth + " bits";
        if (pixelRatioEl)
            pixelRatioEl.textContent = window.devicePixelRatio + "x";
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);

    /* --------- OS Detection --------- */
    if (osEl) {
        if (navigator.userAgentData?.platform) {
            navigator.userAgentData
                .getHighEntropyValues(["platformVersion"])
                .then(ua => {
                    if (navigator.userAgentData.platform === "Windows") {
                        const major = parseInt(ua.platformVersion.split(".")[0]);
                        osEl.textContent = major >= 13 ? "Windows 11" : "Windows 10";
                    } else {
                        osEl.textContent = navigator.userAgentData.platform;
                    }
                })
                .catch(() => {
                    osEl.textContent = navigator.userAgentData.platform;
                });
        } else {
            let platform = navigator.platform || "Unknown";
            if (platform.includes("Win")) platform = "Windows";
            else if (platform.includes("Mac")) platform = "macOS";
            else if (platform.includes("Linux")) platform = "Linux";
            osEl.textContent = platform;
        }
    }

    
    const updateOnlineStatus = () => {
        if (!onlineEl) return;
        onlineEl.textContent = navigator.onLine ? "Online" : "Offline";
        onlineEl.style.color = navigator.onLine ? "green" : "red";
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();
}
