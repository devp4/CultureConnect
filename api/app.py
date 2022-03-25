from flask import Flask, request
import firebase_admin
from firebase_admin import db

app = Flask(__name__)

####### CHANGE ENV TO PRODUCTION WHEN COMPLETE #######


# FireBase Authentication
cred = firebase_admin.credentials.Certificate("secrets.json")
data_base = firebase_admin.initialize_app(
    cred,
    {"databaseURL": "https://culture-connect-b33c8-default-rtdb.firebaseio.com/"}   
)


@app.route("/api/get-posts", methods=["GET"])
def get_posts():
    # Grab Posts from Firebase Database
    ref = db.reference("snippets")
    data = ref.get()

    return data


@app.route("/api/create-post", methods=["POST"])
def create_post():
    '''
    POST FORMAT
        title (string): title of post 
        text (string): description of post 
        url (string): url of image

        {
            title: "title
            text: "text"
            url: "url"
        }
    
    '''
    
    request_data = request.get_json()
    ref = db.reference("snippets")
    ref.push(request_data)

    return "Post Created"

@app.route("/api/search-post", methods=["POST"])
def search_post():
    request_data = request.get_json()

    ref = db.reference("snippets")
    data = ref.get()
    parsed_data = {}

    for item in data: 
        if request_data["search_term"] in data[item]["title"].lower(): 
            parsed_data[item] = data[item]

    return parsed_data
    