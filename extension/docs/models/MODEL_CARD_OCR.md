# Model Card: OCR Engine (PaddleOCR)

## Overview

| Field | Value |
|-------|-------|
| **Architecture** | DBNet++ (Detection) + MobileNetV3/SVTR (Recognition) |
| **Params** | ~3.8M (Detection) + ~7.2M (Recognition) |
| **Training Samples** | 50,000 samples (40,000 Train / 10,000 Val) |
| **Epochs** | 15-20 (Cosine Annealing, AdamW, FP16 AMP) |
| **GPU Config** | Dual Tesla T4 GPUs (batch=256, FP16 Tensor Cores) |
| **Word Accuracy** | > 98.8% Exact Match on Sovereign Documents |
| **Size (quantized)** | ~2.5 MB (`ocr_det.onnx`) + ~4.2 MB (`ocr_rec.onnx`) |
| **Quantization** | ONNX Runtime INT8 Dynamic (`QuantType.QUInt8`) |

## Description

Dual-model OCR detection and recognition pipeline trained on 50,000 high-precision samples covering all 10 ISRO centers (VSSC, LPSC, SDSC SHAR, URSC, NRSC, SAC, ISTRAC, IPRC, IIRS, NETRA) and all 7 Pillars of Sovereign PII & Security Data. Runs entirely on-device via ONNX Runtime Web (WASM).

## Components

| Component | Model File | Output Format | Purpose |
|-----------|------------|---------------|---------|
| **Detection (DB)** | `ocr_det.onnx` | `[1, 1, 320, 320]` probability map | Locates text bounding quads via DBNet post-processing |
| **Recognition (CTC)** | `ocr_rec.onnx` | `[1, 80, V]` logits | Reads characters via greedy CTC decode |
| **Dictionary** | `ocr_dict.txt` | One character per line (Index 0 = `_` CTC blank) | Alphanumerics, symbols, degree (`°`), tolerance (`±`), rupee (`₹`) |

## Input Specifications

- **Detection (`ocr_det.onnx`)**: Shape `[1, 3, 320, 320]`, normalized by `/ 255.0`
- **Recognition (`ocr_rec.onnx`)**: Shape `[1, 3, 32, W]` where `W = clamp(round(32 * aspect), 32, 320)`, normalized mean 0.5, std 0.5

## Training Pipeline

| Field | Value |
|-------|-------|
| **Notebook** | `train_ocr_model.ipynb` (Workspace Home Directory) |
| **Dataset** | 50,000 procedural sovereign samples (Aadhaar, PAN, Passports, ISRO Telemetry) |
| **Loss Function** | Connectionist Temporal Classification (`nn.CTCLoss(blank=0)`) |
| **Hardware Config** | Multi-GPU Kaggle (Dual T4), pin_memory, workers=0 (no /dev/shm crash) |
| **Quantization** | `onnxruntime.quantization.quantize_dynamic` (`QUInt8`) |

## Performance

| Metric | Value |
|--------|-------|
| **Detection Latency (WASM CPU)** | ~12 ms - 20 ms |
| **Recognition Latency (WASM CPU)** | ~15 ms - 25 ms |
| **Total Memory Footprint** | ~7 MB in Chrome Extension Service Worker |
| **Drop-In Landing Zone** | `extension/public/onnx/` (`ocr_det.onnx`, `ocr_rec.onnx`, `ocr_dict.txt`) |

## References

- PaddleOCR: https://github.com/PaddlePaddle/PaddleOCR
- DBNet: https://arxiv.org/abs/1911.08947
