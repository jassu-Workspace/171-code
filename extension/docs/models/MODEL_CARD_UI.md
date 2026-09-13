# Model Card: UI Detector

## Overview

| Field | Value |
|-------|-------|
| **Architecture** | YOLOv8s / YOLOv8n Object Detector |
| **Params** | 11.2M (YOLOv8s) / 3.2M (YOLOv8n) |
| **Training Samples** | 6,000 samples (5,000 Train / 1,000 Val) |
| **Epochs** | 35-40 (AdamW, lr0=0.001, patience=10) |
| **GPU Config** | NVIDIA CUDA (Multi-GPU / Single GPU, FP16 AMP, batch=-1 auto-saturation) |
| **mAP@0.5** | > 0.94 (All classes) |
| **Size (quantized)** | ~10.8 MB (INT8 dynamic quantization) |
| **Quantization** | ONNX Runtime INT8 Dynamic (`QuantType.QUInt8`) |

## Description

YOLOv8-based UI element detector fine-tuned on 6,000 high-fidelity samples grounded in ISRO sovereign portals (Bhuvan, Bhoonidhi, MOSDAC, VEDAS, GeM procurement, InPASS patents, ISTRAC telemetry) and complex web interfaces. Specifically trained to resolve dropdowns, select options, tabs, and checkboxes. Runs entirely on-device via ONNX Runtime Web (WASM).

## Classes

| Index | Class | Target UI Elements |
|:---:|---|---|
| 0 | `button` | Action buttons, Submit, Zoom In/Out, Reset, Download, Filter |
| 1 | `input` | Search bars, coordinate fields (Lat/Long), datepickers, textareas |
| 2 | `link` | Navigation breadcrumbs, quick links, footer anchors, docs |
| 3 | `image` | Map viewports, GIS canvases, satellite thumbnails, telemetry charts |
| 4 | `dropdown` | Select triggers, comboboxes, layer pickers, filter dropdowns |
| 5 | `option` | Select options, listbox menu items, dropdown popup items |
| 6 | `checkbox_radio` | Checkboxes (layer visibility, cloud mask), radio buttons |
| 7 | `tab` | Navigation tabs, accordion headers, category pills |

## Input

- Shape: `[1, 3, 640, 640]` (NCHW, RGB, normalized 0..1)
- Source: base64 screenshot from `browser.tabs.captureVisibleTab()`

## Output

- Format: `[1, 12, 8400]` (Native channel-first) or `[1, 8400, 12]` (Transposed anchor-first)
- Post-processed by NMS (IoU threshold 0.45, Conf threshold 0.40) to `UIElement[]`

## Training Pipeline

| Field | Value |
|-------|-------|
| **Notebook** | `train_ui_detector.ipynb` (Workspace Home Directory) |
| **Dataset** | 6,000 synthetic procedural samples simulating ISRO portals |
| **Base Model** | `yolov8s.pt` (Ultralytics) |
| **Hardware Saturation** | 100% CPU cores (multiprocessing + DataLoader workers), RAM caching (`cache='ram'`), Multi-GPU VRAM saturation |
| **Export** | ONNX opset 17 (`model.export(format='onnx', imgsz=640, opset=17)`) |
| **Quantization** | `onnxruntime.quantization.quantize_dynamic` (`QUInt8`) |

## Performance

| Metric | Value |
|--------|-------|
| **Inference (WASM CPU)** | ~45ms - 75ms |
| **Memory Footprint** | ~11 MB in Chrome Extension Service Worker |
| **Drop-In Landing Zone** | `extension/public/onnx/ui_detector.onnx` |

## References

- YOLOv8: https://github.com/ultralytics/ultralytics
- ONNX Runtime Quantization: https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html
