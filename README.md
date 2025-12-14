# System IP & Location Dashboard

A web dashboard built with JavaScript that displays browser, system, IP, and live GPS-based location information using modern Web APIs.

---

## 🚀 Features

- 🌐 **IP Information**
  - Public IP address
  - ISP, organization, and ASN
  - IP-based (approximate) location

- 📍 **Live Location & Weather (GPS)**
  - Real-time city, region, and country
  - Local time
  - Temperature, humidity, pressure, wind speed, and weather condition

- 🖥️ **System Information**
  - CPU cores
  - Approximate device RAM
  - Operating system detection (Windows 10 / 11, macOS, Linux)

- 🪟 **Screen & Window Details**
  - Physical screen resolution
  - Live browser window size (updates on resize)
  - Color depth
  - Device pixel ratio

- 🌍 **Browser Information**
  - Browser name & version
  - User agent
  - Platform
  - Language
  - Cookie support
  - Online / offline status (real-time)

- 🖱️ **Live Mouse Tracking**
  - Mouse X and Y coordinates

---

## 🧠 How It Works

This project uses **client-side JavaScript Web APIs**, including:

- `Navigator API`
- `Geolocation API`
- `Screen API`
- `Network Information`
- `Fetch API`

⚠️ **Important Note:**  
Some values (RAM, storage, system details) are **approximate** and limited by browser security policies.

---

## 📌 Location Accuracy Explained

- **IP-based location** is derived from ISP routing and may show a nearby city.
- **GPS-based location** uses device sensors and is more accurate.

Both are displayed intentionally to demonstrate the difference.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- WeatherAPI
- ipinfo.io API



