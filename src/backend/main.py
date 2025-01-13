from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore
import requests

app = Flask(__name__)
CORS(app)

# Application Default credentials are automatically created.
fire_app = firebase_admin.initialize_app()
db = firestore.client()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login/personal", methods=["POST"])
def test():
    credentials = request.get_json()
    return 


## GET HASH OF INDIVIDUAL CUSTOMER -- MUST CHANGE IT TO BE COMPANY/HASH SOON
@app.route("/passphrase/<hash>")
def password(hash):

    doc_ref = db.collection("PASSPHRASE").document(hash)
    doc = doc_ref.get()

    if doc.exists:
        return doc.to_dict()
        # passphrase would be under "pass"
    else:
        return "No such document!"

## GET HASH OF CUSTOMERS IN ALL COMPANY
@app.route("/all_company/<company>")
def all_company(company):

    docs = (
        db.collection(company)    
        .stream()
    )
    results = {}

    for doc in docs:
        results[doc.id] = doc.to_dict()

    return results