# SIH Zero-Trust Agent - PRODUCTION-ONLY Launcher
# Strictly production builds. Never runs dev servers.

$serverDir = Join-Path $PSScriptRoot "server"
$extDir = Join-Path $PSScriptRoot "extension"
$serverProcess = $null

# ═══════════════════════════════════════════
# PHASE A: Ghost Killer (Clear-Port3000)
# ═══════════════════════════════════════════
function Clear-Port3000 {
    $connections = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($connections) {
        Write-Host "⚠️  Ghost process detected on port 3000! Assassinating..." -ForegroundColor Yellow
        foreach ($conn in $connections) {
            $procId = $conn.OwningProcess
            taskkill /F /T /PID $procId 2>$null
        }
        Start-Sleep -Seconds 1
        $stillThere = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
        if ($stillThere) {
            Write-Host "⛔ CRITICAL: Ghost process survived. Run PowerShell as Administrator." -ForegroundColor Red
        }
        else {
            Write-Host "✅ Port 3000 freed." -ForegroundColor Green
        }
    }
    else {
        Write-Host "✅ Port 3000 is clear." -ForegroundColor Green
    }
}

# ─── PHASE A: Execute Ghost Killer ───
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PHASE A: Ghost Killer (Port 3000 Cleanup)" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Clear-Port3000

# ═══════════════════════════════════════════
# PHASE B: Env Validation
# ═══════════════════════════════════════════
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PHASE B: Environment Validation" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

$envPath = Join-Path $serverDir ".env"
$envValid = $true
$missingKeys = @()

if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    if ($envContent -notmatch 'ROUTER_URL') { $envValid = $false; $missingKeys += 'ROUTER_URL' }
    if ($envContent -notmatch 'ROUTER_API_KEY') { $envValid = $false; $missingKeys += 'ROUTER_API_KEY' }
    if ($envContent -notmatch 'SECRET_PASSWORD') { $envValid = $false; $missingKeys += 'SECRET_PASSWORD' }
}
else {
    $envValid = $false
}

if (-not $envValid) {
    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "  ❌ MISSING OR INVALID .env FILE IN server/ DIRECTORY!" -ForegroundColor Red
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "  Missing variables: $($missingKeys -join ', ')" -ForegroundColor Red
    Write-Host "  The server requires server/.env with:" -ForegroundColor Red
    Write-Host "    ROUTER_URL=<your-router-url>" -ForegroundColor Red
    Write-Host "    ROUTER_API_KEY=<your-api-key>" -ForegroundColor Red
    Write-Host "    SECRET_PASSWORD=<your-secret-password>" -ForegroundColor Red
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
else {
    Write-Host "✅ .env validation passed (ROUTER_URL, ROUTER_API_KEY, SECRET_PASSWORD)." -ForegroundColor Green
}

# ═══════════════════════════════════════════
# PHASE C: Extension Production Build
# ═══════════════════════════════════════════
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PHASE C: Extension Production Build" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Push-Location $extDir

if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing extension dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Host "❌ npm install failed in extension/." -ForegroundColor Red; Pop-Location; exit 1 }
}

Write-Host "🔨 Building extension (wxt build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Extension build failed." -ForegroundColor Red; Pop-Location; exit 1 }

Pop-Location
Write-Host "✅ Extension Production Build Complete (.output/chrome-mv3)" -ForegroundColor Green

# ═══════════════════════════════════════════
# PHASE D: Server Start (Production)
# ═══════════════════════════════════════════
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PHASE D: Server Start (Production)" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

if (!(Test-Path (Join-Path $serverDir "node_modules"))) {
    Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
    Push-Location $serverDir
    npm install
    Pop-Location
    if ($LASTEXITCODE -ne 0) { Write-Host "❌ npm install failed in server/." -ForegroundColor Red; exit 1 }
}

Write-Host "🚀 Starting production server on port 3000..." -ForegroundColor Yellow
$serverProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run start" -WorkingDirectory $serverDir -PassThru

if ($serverProcess) {
    Write-Host "✅ Server started (PID: $($serverProcess.Id))." -ForegroundColor Green
}
else {
    Write-Host "❌ Failed to start server." -ForegroundColor Red
    exit 1
}

# ═══════════════════════════════════════════
# PHASE E: Chrome Automation
# ═══════════════════════════════════════════
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PHASE E: Chrome Automation" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Start-Process "chrome.exe" "chrome://extensions/"
Write-Host "✅ Chrome extensions page opened." -ForegroundColor Green

# ═══════════════════════════════════════════
# PHASE F: Visual Polish & Watchdog
# ═══════════════════════════════════════════
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "🚀 SIH PRODUCTION STACK IS LIVE!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "  📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "  1. Click 'Load unpacked' in Chrome." -ForegroundColor White
Write-Host "  2. Select the 'extension/.output/chrome-mv3' folder." -ForegroundColor White
Write-Host "  3. Go to Wikipedia and run the agent." -ForegroundColor White
Write-Host ""
Write-Host "  🔗 Server: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop all services." -ForegroundColor White
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# ═══════════════════════════════════════════
# PHASE G: Graceful Annihilation (try/finally)
# ═══════════════════════════════════════════
try {
    while (!$serverProcess.HasExited) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Write-Host ""
    Write-Host "🛑 Shutting down... Destroying process trees..." -ForegroundColor Yellow
    if ($serverProcess -and !$serverProcess.HasExited) {
        taskkill /F /T /PID $serverProcess.Id 2>$null
    }
    Clear-Port3000
    Write-Host "✅ Port 3000 freed." -ForegroundColor Green
}
