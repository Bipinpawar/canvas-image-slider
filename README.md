# Image Slider (Canvas Based)

A simple image slider built with React that uses a `<canvas>` to render multiple images side-by-side. Users can drag to scroll through images. 

```

## 📁 Project Structure

canvas-image-slider/
│
├─ public/
│ ├─ images/ 
│ │ ├─ img1.png
| | ├─ img2.png
| | ├─ img3.png
│ │ └─ img4.png
│ ├─ index.html
│ └─ favicon.ico
│
├─ src/
│ ├─ components/
│ │ ├─ ImageSlider
│ ├─ App.js # Main App component
│ ├─ index.js # Entry point
│
├─ build/ # Generated after npm run build
│ ├─ index.html
| |─ images
| |─ favicon.ico
| |─ asset-manifest.json
│ ├─ static/
│ │ ├─ css/
│ │ ├─ js/
│
├─ package.json
├─ package-lock.json
└─ README.md


## 🔧 Features

- Canvas rendering for smooth performance
- Mouse drag to scroll images
- Prevents dragging past first or last image
- Built with Create React App

---

## 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/Bipinpawar/canvas-image-slider.git

cd canvas-image-slider

# Install serve if not already installed
npm install -g serve

# serve the build folder
serve -s build 

```
