#Requires -Version 5.1
<#
.SYNOPSIS
    SIH Zero-Trust AI Web Agent - Automated Launcher
.DESCRIPTION
    Checks Node.js, installs deps, starts server + extension dev build,
    prints a colored ASCII banner, and handles Ctrl+C gracefully.
.EXAMPLE
    .\s.ps1
#>

param(
    [int]$ServerPort = 3000,
    [string]$ServerDir = "server",
    [string]$ExtensionDir = "extension"
)

$ErrorActionPreference = "Stop"
$script:serverProcess = $null
$script:extensionProcess = $null

function Write-ColorText {
    param([string]$Text, [string]$Color = "White")
    Write-Host $Text -ForegroundColor $Color
}

function Stop-AllProcesses {
    Write-ColorText "`n  Shutting down..." Yellow
    if ($script:serverProcess -and !$script:serverProcess.HasExited) {
        Stop-Process -Id $script:serverProcess.Id -Force -ErrorAction SilentlyContinue
        Write-ColorText "  [OK] Server stopped" Green
    }
    if ($script:extensionProcess -and !$script:extensionProcess.HasExited) {
        Stop-Process -Id $script:extensionProcess.Id -Force -ErrorAction SilentlyContinue
        Write-ColorText "  [OK] Extension dev server stopped" Green
    }
    exit 0
}

# Register Ctrl+C handler
$null = Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Stop-AllProcesses }

Clear-Host
Write-ColorText "" Cyan
Write-ColorText "  +----------------------------------------------------+" Cyan
Write-ColorText "  |                                                    |" Cyan
Write-ColorText "  |   SIH Zero-Trust AI Web Agent                      |" Cyan
Write-ColorText "  |   Smart India Hackathon 2025                       |" Cyan
Write-ColorText "  |                                                    |" Cyan
Write-ColorText "  |   Client Redaction + Server VLM + Local UI Vision  |" Cyan
Write-ColorText "  |                                                    |" Cyan
Write-ColorText "  +----------------------------------------------------+" Cyan
Write-ColorText "" Cyan

# Step 1: Check Node.js
Write-ColorText "  [1/4] Checking Node.js installation..." Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-ColorText "  [OK] Node.js $nodeVersion found" Green
} catch {
    Write-ColorText "  [FAIL] Node.js not found!" Red
    Write-ColorText "  Please install Node.js v20+ from https://nodejs.org/" Red
    exit 1
}

# Step 2: Set up and start the server
Write-ColorText "`n  [2/4] Setting up server..." Yellow
Push-Location $ServerDir

if (!(Test-Path "node_modules")) {
    Write-ColorText "  Installing server dependencies..." Cyan
    npm install 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-ColorText "  [FAIL] npm install failed for server" Red
        Pop-Location
        exit 1
    }
    Write-ColorText "  [OK] Server dependencies installed" Green
} else {
    Write-ColorText "  [OK] Server dependencies already present" Green
}

Write-ColorText "  Starting server on port $ServerPort..." Cyan
$script:serverProcess = Start-Process -FilePath "npm" -ArgumentList "run","dev" -PassThru -WindowStyle Hidden -RedirectStandardOutput "server_out.log" -RedirectStandardError "server_err.log"
Pop-Location
Start-Sleep -Seconds 2

# Step 3: Set up and start the extension dev build
Write-ColorText "`n  [3/4] Setting up extension..." Yellow
Push-Location $ExtensionDir

if (!(Test-Path "node_modules")) {
    Write-ColorText "  Installing extension dependencies..." Cyan
    npm install 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-ColorText "  [FAIL] npm install failed for extension" Red
        Pop-Location
        exit 1
    }
    Write-ColorText "  [OK] Extension dependencies installed" Green
} else {
    Write-ColorText "  [OK] Extension dependencies already present" Green
}

Write-ColorText "  Starting WXT dev server..." Cyan
$script:extensionProcess = Start-Process -FilePath "npm" -ArgumentList "run","dev" -PassThru -WindowStyle Normal
Pop-Location

Start-Sleep -Seconds 3

# Step 4: Print success banner
Write-ColorText "" Green
Write-ColorText "  +----------------------------------------------------+" Green
Write-ColorText "  |                                                    |" Green
Write-ColorText "  |   SIH Zero-Trust Agent is LIVE!                    |" Green
Write-ColorText "  |                                                    |" Green
Write-ColorText "  |   Server:  http://localhost:$ServerPort                    |" Green
Write-ColorText "  |   Extension: $ExtensionDir/.output/chrome-mv3-dev   |" Green
Write-ColorText "  |                                                    |" Green
Write-ColorText "  |   Load the extension in Chrome:                   |" Green
Write-ColorText "  |   1. Open chrome://extensions/                    |" Green
Write-ColorText "  |   2. Enable Developer Mode                        |" Green
Write-ColorText "  |   3. Click Load unpacked                          |" Green
Write-ColorText "  |   4. Select the folder above                      |" Green
Write-ColorText "  |                                                    |" Green
Write-ColorText "  |   Press Ctrl+C to stop all services.              |" Green
Write-ColorText "  |                                                    |" Green
Write-ColorText "  +----------------------------------------------------+" Green
Write-ColorText "" Green

# Wait for Ctrl+C
Write-ColorText "  Waiting for Ctrl+C to shut down..." Gray
try {
    while ($true) {
        Start-Sleep -Seconds 1
        if ($script:serverProcess.HasExited -or $script:extensionProcess.HasExited) {
            Write-ColorText "`n  [WARN] A process exited unexpectedly!" Yellow
            break
        }
    }
} finally {
    Stop-AllProcesses
}