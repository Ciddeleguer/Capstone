<div align="center">

# 📡 Smart Classroom Attendance System

### Tap your card. Get marked present. Get back to learning.

An offline, RFID-powered attendance system built on the **ESP32**, designed for the Grade 12 St. Teresa of Calcutta section of Holy Child Academy of Marihatag, Inc.

![ESP32](https://img.shields.io/badge/MCU-ESP32--WROOM--DA-5ba6ff?style=for-the-badge)
![RFID](https://img.shields.io/badge/RFID-MFRC522-ffd166?style=for-the-badge)
![RTC](https://img.shields.io/badge/RTC-DS3231-ff9e64?style=for-the-badge)
![LCD](https://img.shields.io/badge/Display-LCD%2016x2%20I2C-64ffda?style=for-the-badge)
</div>

---

## ✨ What is this?

Roll calls and signature sheets eat into class time. This project replaces them with a single tap.

Each learner holds an RFID card against the reader. The ESP32 reads the card, stamps the exact time using a battery-backed RTC, shows the result on an LCD, and beeps to confirm. Teachers then view and export the records from a web page, and no internet connection is needed.

This repository holds the **documentation website** for the project: the full wiring guide, an interactive pin reference, a connection diagram, and a live **demo** of the attendance portal that you can try in your browser.

---

## 🚀 Features

-  **One-tap attendance**: RFID card scanning with instant logging
-  **Accurate timestamps**: DS3231 real-time clock keeps time even when unpowered
-  **Instant feedback**: 16x2 I2C LCD display plus a buzzer confirmation
-  **Fully offline**: runs on a local network through a captive portal, no cloud required
-  **CSV export**: download attendance records straight into Excel
-  **Interactive pin guide**: hover or tap any pin to see what it does
- ️ **Wiring diagram**: color-coded SVG showing SPI, I2C, buzzer, power, and ground
-  **Live demo**: a simulated portal with a clock, scan log, stats, and auto-clear
-  **Responsive**: works on desktop, tablet, and phone

---

## 🧰 Hardware

| Component | Role |
| --- | --- |
| **ESP32-WROOM-DA** | Brain of the system. Reads the RFID, drives the display, serves the portal |
| **MFRC522** | RFID reader communicating over SPI |
| **DS3231** | Precise real-time clock on I2C |
| **LCD 16x2 (I2C)** | Shows scan results and status |
| **Active Buzzer** | Audible confirmation on every scan |
| **RFID Cards/Tags** | One unique ID per learner |

**Power:** everything runs from the ESP32's 3.3V rail at roughly 200–300 mA total.

---

## 🔌 Pin Connections

| ESP32 Pin | GPIO | Connects To |
| --- | --- | --- |
| 1 | 3.3V | VCC rail (all modules) |
| 2 | GND | GND rail (all modules) |
| 4 | GPIO22 | I2C SCL |
| 5 | GPIO21 | I2C SDA |
| 9 | GPIO17 | Buzzer + |
| 19 | GPIO12 | RFID MISO |
| 20 | GPIO13 | RFID MOSI |
| 21 | GPIO14 | RFID SCK |

**Shared I2C bus:** the RTC (`0x68`) and LCD (`0x27` or `0x3F`) share SDA and SCL, with 4.7kΩ pull-up resistors to 3.3V.

> ⚠️ **Heads up:** the diagram flags that RFID SS/RST currently share GPIO21/GPIO22 with the I2C lines. Double-check your pin assignments before wiring.

---

## 📁 Project

```
rfid-system/
├── index.html        # Pin connections, wiring diagram, system notes
├── demo.html         # Interactive RFID attendance demo
├── css/
│   ├── styles.css    # Main page styling
│   └── demo.css      # Demo page styling
└── js/
    ├── main.js       # Tooltips and back-to-top button
    └── demo.js       # Demo logic: scans, logs, CSV export
```

---

## 🎮 Try the Demo

Click **🚀 Try RFID Demo System** on the home page to open the portal in a new tab.

| Button | What it does |
| --- | --- |
| 📱 **Simulate Scan** | Logs a random learner as if a card was tapped |
| 📥 **Download** | Exports the current records as a CSV file |
| 🗑️ **Clear Logs** | Wipes all demo records |
| 🟢 **Auto Clear** | Automatically trims old records once the log grows past 20 |

The demo also auto-scans every so often, and its clock runs on **Philippine Time (UTC+8)**.

> The demo is a simulation, so no real hardware is needed.

---

## 🧠 Tech Stack

- **Firmware:** C++ on the ESP32
- **Interface:** HTML, CSS, and JavaScript
- **Storage:** local database for learner profiles and attendance records
- **Networking:** offline captive portal on a local network

---

## 👥 The Team

Grade 12 STEM researchers of **Holy Child Academy of Marihatag, Inc.**, March 2026.

Alegre, Leanna Feye Valerie E. · Awa, Aquilino L. Jr. · Blasco, Kent Andrew A. · Cervantes, Imma Conception M. · Deleguer, Cidreck · Ferrer, Alfres E. · Medrano, Reyson R. · Morales, Princess Eliza C. · Quimpan, Prince Mark · Salgado, Del Adrian · Sarabosing, Jade G. · Tamparong, Leira Luz B.

Developed as a research paper for **Inquiry, Investigation, and Immersion**.

---

<div align="center">

**Made with ☕, jumper wires, and a lot of debugging.**

</div>
