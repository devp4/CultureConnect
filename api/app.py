from flask import Flask

app = Flask(__name__)

@app.route("/api")
def main():
    return "Hello World"


