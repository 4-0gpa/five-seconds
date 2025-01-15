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
CORS(app, origins='http://localhost:3000/*', methods=['GET', 'POST'], supports_credentials=True)
# Application Default credentials are automatically created.
fire_app = firebase_admin.initialize_app()
db = firestore.client()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login", methods=['POST', 'OPTIONS']) 
#essentially, only matters what email user uses to log in as the type of account is checked at the firebase level.
def getUser():
    print(request, file=sys.stderr)

    if request.method == 'OPTIONS':
        return jsonify({
            'status': False,
            'error': "OPTIONS"
        }) 
    
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
            'status': False,
            'error': "Incorrect Password"
        })
    return jsonify({
            'user': f'{user}',
            'status': False,
            'error': f"User {user} not found"
        })

@app.route("/hash_creation", methods=['POST'])
def hash_creation():
    data = request.get_json()
    hashed_user_email, hashed_company_email, salt_phrase, passphrase = data.get('hashed_user_email', 'NIL'), data.get('hashed_company_email', 'NIL'), data.get('salt_phrase', 'NIL'), data.get('passphrase', 'NIL')
    if hashed_user_email == 'NIL' or hashed_company_email == 'NIL' or salt_phrase == 'NIL' or passphrase == 'NIL':
        return jsonify({
            'status': False,
            'error': "Invalid Input"
        })
    combined_statement = hashed_user_email + hashed_company_email + salt_phrase
    key = hashlib.sha3_512(combined_statement.encode()).hexdigest()
    value = passphrase
    information = {
        "hashed_user_email": hashed_user_email,
        "hashed_company_email": hashed_company_email,
        "salt_phrase": salt_phrase,
        "passphrase": value,
        "key": key
    }

    db.collection("PASSPHRASE").document(key).set({
        "passphrase": value,
        "information": information
    })
    
    return jsonify({
        'status': True,
        'information': information
    })

## GET HASH OF INDIVIDUAL CUSTOMER -- MUST CHANGE IT TO BE COMPANY/HASH SOON
@app.route("/passphrase/<hash>", methods=["GET"])
def retrieve_passphrase(hash):

    doc_ref = db.collection("PASSPHRASE").document(hash)
    doc = doc_ref.get()

    if doc.exists:
        results = doc.to_dict()
        return jsonify({
            'results': results,
            'status': True
        })
        # passphrase would be under "pass"

    return jsonify({
        'status': False,
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
        return jsonify({
            'results': results,
            'status': True
        })
    return jsonify({
        'status': False,
        'error': f"User {company} not found"
    })

@app.route("/test", methods=['GET'])
def test():
    print("testtttt", file=sys.stderr)
    return "test"

@app.route("/post_test", methods=['POST'])
def post_test():
    # Print the raw data to stderr
    print("Received data:", request.data, file=sys.stderr)
    
    # Try to get JSON data from the request
    data = request.get_json(force=True, silent=False)
    
    # If parsing failed, data will be None
    if data is None:
        print("Failed to parse JSON", file=sys.stderr)
        return "Invalid JSON", 400
    
    # Retrieve the 'test' field from the JSON (default to 'NIL' if not found)
    testing_var = data.get('test', 'NIL')
    print("Extracted value for 'test':", testing_var, file=sys.stderr)
    
    return f"Received test value: {testing_var}"

if __name__ == '__main__':
    app.run(debug=True)