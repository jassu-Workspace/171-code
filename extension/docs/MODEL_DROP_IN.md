# Model Drop-In Guide

This document describes how to drop trained ONNX models into the extension for
on-device inference. Models are trained externally (e.g. on Kaggle) and copied
into fixed file paths.

## Drop-In Table

| Trained Model File | Copy To | Engine |
|-------------------|---------|--------|
| `ui_detector_quantized.onnx` (YOLOv8s 8-class) | `extension/public/onnx/ui_detector.onnx` | UI Detector (8-Class ISRO/Web YOLOv8) |
| `ocr_det.onnx` (PaddleOCR det) | `extension/public/onnx/ocr_det.onnx` | OCR Detection (DB head) |
| `ocr_rec.onnx` (PaddleOCR rec) | `extension/public/onnx/ocr_rec.onnx` | OCR Recognition (CTC head) |
| `custom_dict.txt` (one char per line) | `extension/public/onnx/ocr_dict.txt` | OCR Dictionary |

## Training Notebook
Train and quantize the custom 8-class model using `train_ui_detector.ipynb` in the repository root directory. The notebook automatically generates 6,000 ISRO portal samples and exports `ui_detector_quantized.onnx`.


## Steps

1. Copy the four files listed above into `extension/public/onnx/`.
2. Run `npm run build` in the extension root.
3. Reload the extension in Chrome (`chrome://extensions` → reload).

The engines load these files via `browser.runtime.getURL('/onnx/...')`.
If a file is absent, the corresponding engine degrades gracefully to status
`'degraded'` and returns empty results — **zero crashes**.

## Verification

After dropping in the models and rebuilding:

1. Open the Mission Control dashboard (`🛰 Open Mission Control` in the popup).
2. The **Local Model Runtime** panel should show green `● LIVE` badges.
3. Run an agent task — the log should show `Local CV processed. Detected N UI element(s).`

## Notes

- All models should be quantized (INT8 or FP16) for acceptable WASM inference speed.
- The ONNX opset should be 11+ for compatibility with onnxruntime-web.
- The dictionary file (`ocr_dict.txt`) must have index 0 = CTC blank (usually `_`), followed by one character per line.
