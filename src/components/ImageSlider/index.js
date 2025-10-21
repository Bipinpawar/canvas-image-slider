import React, { useEffect, useRef, useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const dragStartRef = useRef(0);
  const isDraggingRef = useRef(false);

  const [imageList, setImageList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 400 });
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        images.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve(img);
            })
        )
      );

      const totalWidth = loaded.reduce((sum, img) => sum + img.width, 0);
      const maxHeight = Math.max(...loaded.map((img) => img.height));

      setImageList(loaded);
      setCanvasSize(prev => ({ ...prev, height: maxHeight }));
      setContentWidth(totalWidth);
    };

    if (images.length >= 3) {
      loadImages();
    }
  }, [images]);

  //Draw image
  useEffect(() => {
    const canvas = document.getElementById("image_slider");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    let x = scrollPosition;
    imageList.forEach(img => {
      ctx.drawImage(img, x, 0);
      x += img.width;
    });
  }, [imageList, scrollPosition, canvasSize]);

  const startDrag = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartRef.current = e.clientX;

    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", onDragEnd);
  };

  const onDrag = (e) => {
    if (!isDraggingRef.current) return;

    const movement = e.clientX - dragStartRef.current;
    dragStartRef.current = e.clientX;

    setScrollPosition((prev) => {
      const minScroll = Math.min(canvasSize.width - contentWidth, 0);
      const maxScroll = 0;
      const next = prev + movement;
      return Math.max(minScroll, Math.min(maxScroll, next));
    });
  };

  const onDragEnd = () => {
    isDraggingRef.current = false;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", onDragEnd);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", onDragEnd);
    };
  }, []);

  return (
    <div className="image-slider-container">
      <h1>Image Slider</h1>
      <canvas
        id="image_slider"
        width={canvasSize.width}
        height={canvasSize.height}
        className={`image_slider ${isDraggingRef.current ? "drag-active" : ""}`}
        onMouseDown={startDrag}
      />
      <p className="image-slider-help-text">Drag to change image</p>
    </div>
  );
};

export default ImageSlider;
