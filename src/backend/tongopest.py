from flask import Flask
import firebase_admin
from firebase_admin import firestore

# 

fire_app = firebase_admin.initialize_app()
db = firestore.client()

docs = (
        db.collection("SINGTEL")    
        .stream()
    )

for doc in docs:
    print(f"{doc.id} => {doc.to_dict()}")
