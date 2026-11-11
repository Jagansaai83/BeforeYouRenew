"""Package tracked and new nonignored source; never include credentials or runtime data."""
import subprocess, zipfile, pathlib, json
root=pathlib.Path(__file__).resolve().parent.parent
files=set(subprocess.check_output(["git","ls-files","--cached","--others","--exclude-standard","-z"],cwd=root).decode().split("\0"))
out=root/"public/BeforeYouRenew-source.zip"
with zipfile.ZipFile(out,"w",zipfile.ZIP_DEFLATED) as z:
 for name in sorted(files):
  p=root/name
  if not name or not p.is_file() or p==out or name.startswith((".dev.vars",".env")) and name!=".env.example": continue
  data=p.read_bytes()
  if name==".openai/hosting.json": data=json.dumps({"d1":"DB","r2":None},indent=2).encode()
  info=zipfile.ZipInfo("BeforeYouRenew/"+name,(2026,11,10,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
  z.writestr(info,data)
print(out)
