from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore
import requests
import sys

import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, origins='*', methods=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], supports_credentials=True)
# Application Default credentials are automatically created.
fire_app = firebase_admin.initialize_app()
db = firestore.client()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login/", methods=['POST', 'OPTIONS']) 
#essentially, only matters what email user uses to log in as the type of account is checked at the firebase level.
def getUser():

    if request.method == 'OPTIONS':
        return '', 200  
    
    data = request.get_json()

    user = data.get('email', 'NIL')
    hashed_password = data.get('hashedPassword', "NIL")

    doc_ref = db.collection("USERS").document(user)
    doc = doc_ref.get()

    if doc.exists:
        results = doc.to_dict()
        try:
            app.logger.info(f'{user} {hashed_password} {results["type"]}')
        except: 
            app.logger.info("not found")
        # passphrase would be under "pass"
        if hashed_password == results['password']:
            return jsonify({
                'user': f'{user}',
                'status': '1',
                'type': f"{results['type']}"
            })
        return jsonify({
            'user': f'{user}',
            'status': '0',
            'error': "Incorrect Password"
        })

    return jsonify({
            'user': f'{user}',
            'status': '0',
            'error': f"User {user} not found"
        })

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
@app.route("/company/<company>")
def all_company(company):

    docs = (
        db.collection(company)    
        .stream()
    )
    results = {}

    for doc in docs:
        results[doc.id] = doc.to_dict()

    return results