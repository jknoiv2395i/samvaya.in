import http.server
import socket
import threading
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class DualStackThreadingServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception:
            pass
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        super().server_bind()

class FunnelHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Print concise request log
        sys.stdout.write(f"[{self.log_date_time_string()}] {self.client_address[0]} - {format % args}\n")
        sys.stdout.flush()

def start_server_on_port(port):
    try:
        server = DualStackThreadingServer(('::', port), FunnelHTTPHandler)
        print(f"-> Serving on http://localhost:{port}/ and http://127.0.0.1:{port}/")
        sys.stdout.flush()
        server.serve_forever()
    except Exception as e:
        print(f"Could not bind port {port} (might be in use): {e}")
        sys.stdout.flush()

if __name__ == '__main__':
    print(f"Starting Funnel Web Server from directory:\n{DIRECTORY}\n")
    sys.stdout.flush()

    # Start primary port 8080 and secondary port 3000 concurrently
    t8080 = threading.Thread(target=start_server_on_port, args=(8080,), daemon=True)
    t3000 = threading.Thread(target=start_server_on_port, args=(3000,), daemon=True)
    
    t8080.start()
    t3000.start()

    # Keep main thread alive
    try:
        t8080.join()
    except KeyboardInterrupt:
        print("\nServer stopped.")
