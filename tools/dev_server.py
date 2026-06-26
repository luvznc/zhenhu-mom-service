from __future__ import annotations

import argparse
import os
import traceback
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:
        return

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=5173)
    parser.add_argument("--root", default=str(Path(__file__).resolve().parents[1]))
    args = parser.parse_args()

    root = Path(args.root).resolve()
    log_path = root / "dev-server-state.log"
    try:
        os.chdir(root)
        server = ThreadingHTTPServer((args.host, args.port), QuietHandler)
        log_path.write_text(f"RUNNING http://{args.host}:{args.port}/ root={root}", encoding="utf-8")
        server.serve_forever()
    except Exception:
        log_path.write_text(traceback.format_exc(), encoding="utf-8")
        raise


if __name__ == "__main__":
    main()
