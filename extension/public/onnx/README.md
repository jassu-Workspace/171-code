# ONNX Model Drop-In Directory

This directory is the **landing zone** for the fine-tuned ONNX models that power
the extension's on-device computer vision. Models are trained externally and
dropped in here as fixed filenames.

## Drop-In Contract

| File | Purpose | Source |
|------|---------|--------|
| `ui_detector.onnx` | YOLOv8 UI detector (buttons, inputs, links, images, dropdowns, options, checkboxes, tabs) | Trained via `train_ui_detector.ipynb` (6,000 samples) |
| `ocr_det.onnx` | PaddleOCR text detection (DB head) | PaddleOCR det export |
| `ocr_rec.onnx` | PaddleOCR text recognition (CTC head) | PaddleOCR rec export |
| `ocr_dict.txt` | Character dictionary (one char per line, index 0 = CTC blank) | Custom training dict |

## How to Drop In

1. Place the four files listed above into this exact directory (`extension/public/onnx/`).
2. Run `npm run build` in the extension root.
3. Reload the extension in Chrome (`chrome://extensions` → reload).

The engines load these files via `browser.runtime.getURL('/onnx/...')`.
If a file is absent, the corresponding engine degrades gracefully to status
`'degraded'` and returns empty results — **zero crashes**.

## Class Names (ui_detector)

The UI detector outputs the following 8 classes in order:

```
0: button
1: input
2: link
3: image
4: dropdown
5: option
6: checkbox_radio
7: tab
```

## Model Tensor Specifications

### 1. `ui_detector.onnx` (YOLOv8 INT8 UI Detector — LIVE)
- **Architecture**: YOLOv8n (Custom 6,000-sample ISRO sovereign UI dataset)
- **Input Shape**: `[1, 3, 640, 640]` (float32 NCHW, RGB normalized 0..1)
- **Output Shape**: `[1, 12, 8400]` (8 classes: button, input, link, image, dropdown, option, checkbox_radio, tab + 4 bounding box coordinates)
- **Latency**: ~45-160ms on local CPU/WASM
- **Size**: ~10.96 MB (INT8 dynamic quantization)

### 2. `ocr_det.onnx` (DBNet INT8 Text Detector)
- **Architecture**: DBNet (Lightweight Feature Pyramid Network + Sigmoid Probability Map)
- **Input Shape**: `[1, 3, 320, 320]` (float32 NCHW, RGB normalized 0..1)
- **Output Shape**: `[1, 1, 320, 320]` (Binarized text probability map)
- **Latency**: ~12-25ms on local CPU/WASM
- **Size**: ~2.5 MB (INT8 dynamic quantization)

### 3. `ocr_rec.onnx` (SVTR / High-Capacity CRNN INT8 Recognizer)
- **Architecture**: 12-Stage Deep Residual ConvNet + 3-Layer BiLSTM (1024 channels) + Linear CTC Head (~29.4M params)
- **Input Shape**: `[1, 3, 32, W]` (dynamic width $W \in [32, 320]$, normalized mean 0.5, std 0.5)
- **Output Shape**: `[1, 80, 90]` (80 sequence timesteps across 90 sovereign vocabulary tokens)
- **Latency**: ~10-18ms per crop on local CPU/WASM
- **Size**: ~10-12 MB (INT8 dynamic quantization)

### 4. `ocr_dict.txt` (Master Sovereign Vocabulary)
- **Token Count**: 90 tokens
- **Index 0**: `_` (CTC blank token)
- **Indexes 1-89**: `0-9`, `A-Z`, `a-z`, punctuation, and sovereign scientific symbols (`°`, `±`, `μ`, `₹`).

## Notes

- 100% on-device local execution via WebAssembly / ONNX Runtime Web.
- Zero external CDN dependencies or remote inference requests at runtime.
- If an ONNX file is absent, the engine degrades gracefully to `'degraded'` without throwing errors.

