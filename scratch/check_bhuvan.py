import urllib.request, ssl, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://bhuvan-app1.nrsc.gov.in/thematic/thematic/usertasks/download1/tooldown1.php',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

m = re.search(r"<select id='theme'[^>]*>(.*?)</select>", html, re.DOTALL | re.I)
if m:
    opts = re.findall(r'<option[^>]*>(.*?)</option>', m.group(1), re.I)
    print(f"Theme options ({len(opts)}):", opts[:10])
    for opt in opts:
        if 'disaster' in opt.lower() or 'flood' in opt.lower():
            print("Matched option:", opt)
