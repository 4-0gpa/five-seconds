from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore
import requests
import sys
import hashlib

import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, origins='*', methods=['GET', 'POST'], supports_credentials=True)
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
    
    data = request.get_json(force=True)
    print(data, file=sys.stderr)

    user = data.get('email', 'NIL')
    hashed_password = data.get('hashedPassword', "NIL")

    doc_ref = db.collection("USERS").document(user)
    doc = doc_ref.get()

    if doc.exists:
        results = doc.to_dict()
        try:
            print(f'{user} {hashed_password} {results["type"]}', file=sys.stderr)
        except: 
            print("not found", file=sys.stderr)
        # passphrase would be under "pass"
        if hashed_password == results['password']:
            return jsonify({
                'user': f'{user}',
                'status': True,
                'type': f"{results['type']}"
            })
        return jsonify({
            'user': f'{user}',
            'status': True,
            'error': "Incorrect Password"
        })
    return jsonify({
            'user': f'{user}',
            'status': False,
            'error': f"User {user} not found"
        })

@app.route("/hash_creation/", methods=['POST'])
def hash_creation():
    data = request.get_json()
    hashed_user_email, hashed_company_email, salt_phrase, passphrase = data.get('hashed_user_email', 'NIL'), data.get('hashed_company_email', 'NIL'), data.get('salt_phrase', 'NIL'), data.get('passphrase', 'NIL')
    if hashed_user_email == 'NIL' or hashed_company_email == 'NIL' or salt_phrase == 'NIL' or passphrase == 'NIL':
        return jsonify({
            'status': '0',
            'error': "Invalid Input"
        })
    combined_statement = hashed_user_email + hashed_company_email + salt_phrase
    key = hashlib.sha3_512(combined_statement.encode()).hexdigest()
    value = passphrase
    information = {
        "hashed_user_email": hashed_user_email,
        "hashed_company_email": hashed_company_email,
        "salt_phrase": salt_phrase
    }

    db.collection("USERS").document(key).set({
        "passphrase": value,
        "information": information
    })
    
    return jsonify({
        'status': True,
    })

## GET HASH OF INDIVIDUAL CUSTOMER -- MUST CHANGE IT TO BE COMPANY/HASH SOON
@app.route("/passphrase/<hash>", methods=["GET"])
def password(hash):

    doc_ref = db.collection("PASSPHRASE").document(hash)
    doc = doc_ref.get()

    if doc.exists:
        results = doc.to_dict()
        return jsonify({
            'results': results,
            'status': '1'
        })
        # passphrase would be under "pass"

    return jsonify({
        'status': '0',
        'error': f"User {hash} not found"
    })

## GET HASH OF CUSTOMERS IN ALL COMPANY
@app.route("/company/<company>", methods=['GET'])
def all_company(company):

    docs = (
        db.collection(company)    
        .stream()
    )
    results = {}

    for doc in docs:
        results[doc.id] = doc.to_dict()
    if len(results) > 0:
        return results
    return jsonify({
        'status': '0',
        'error': f"User {company} not found"
    })


@app.route("/test", methods=['GET'])
def test():
    print("testtttt", file=sys.stderr)
    return "test"

@app.route("/post_test", methods=['POST'])
def post_test():

    print("SKDFKALJKFSD",request.data, file=sys.stderr)
    data = request.get_json(force=True, silent=True)
    testing_var = data.get('test', 'NIL')
    return testing_var