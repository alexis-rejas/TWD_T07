from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder='templates', static_folder='static', static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/node_modules/<path:filename>')
def serve_node_modules(filename):
    return send_from_directory(os.path.join(os.getcwd(), 'node_modules'), filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
