import hashlib
import random
import firebase_admin
from firebase_admin import firestore

fire_app = firebase_admin.initialize_app()
db = firestore.client()

letters = "qwertyuiopasdfghjklzxcvbnm"

user_ref = firestore.client().collection("USERS")

for i in range(1,11):

    email = f"usertestemail{i}@gmail.com"
    hashed_email = hashlib.sha3_512(bytes(email, "utf-8")).hexdigest()
    type = "user"
    print(email, hashed_email)

    db.collection("USERS").document(email).set({
        "type": "user",
        "password": hashed_email
    })
    







random_emails = []

m = hashlib.sha3_512().hexdigest()