import hashlib
import random
import firebase_admin
from firebase_admin import firestore

letters = "qwertyuiopasdfghjklzxcvbnm"
"""letters = ["a", "b","c", "d","e", "f","g", "h","i", "j","k", "l","m", "n",
           "o", "p","q", "r","s", "t","u", "v","w", "x","y", "z",]"""

for i in range(10):

    email = "hi"
    for x in range(random.randint(7,9)):
        email += random.choice(letters)
        email += "@gmail.com"
    hashed_email = hashlib.sha3_512(bytes(email, "utf-8")).hexdigest()
    print(hashed_email)






random_emails = []

m = hashlib.sha3_512().hexdigest()