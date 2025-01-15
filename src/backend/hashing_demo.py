import gradio as gr
import hashlib
import random
import firebase_admin
from firebase_admin import firestore

fire_app = firebase_admin.initialize_app()
db = firestore.client()



def process_hash(string):
    return hashlib.sha3_512(string.encode()).hexdigest()

def process_information(dictionary):

    final_string = """"""
    for key, value in dictionary.items():
        if key != "key":
            final_string += f"* **{key.upper()}**: {value}\n"
            continue
        final_string += f"* **ACCESS KEY**: {value}\n"
        

    return final_string

def final_process(user_email, company_email, salt_phrase, passphrase, upload_to_firebase):
    combined_statement = user_email + company_email + salt_phrase
    key = hashlib.sha3_512(combined_statement.encode()).hexdigest()
    value = passphrase
    information = {
        "hashed_user_email": user_email,
        "hashed_company_email": company_email,
        "salt_phrase": salt_phrase,
    }

    if upload_to_firebase:
        db.collection("PASSPHRASE").document(key).set({
            "passphrase": value,
            "information": information
        })

    information["key"] = key
    information["value"] = value

    return process_information(information)

with gr.Blocks() as demo:

    with gr.Row():

        with gr.Column():

            user_email = gr.Textbox(label="User's Email")
            user_email_button = gr.Button("Hash user email")
        
        with gr.Column():
            
            company_email = gr.Textbox(label="Company's Email")
            company_email_button = gr.Button("Hash Company Email")

        salt_phrase = gr.Textbox(label="Company's Salt Phrase")

    with gr.Row():

        passphrase = gr.Textbox(label="User's Passphrase")

        with gr.Column():
            upload_to_firebase = gr.Checkbox(label="Upload to Firebase")
            process_all = gr.Button("Process All")

    display_box = gr.Markdown("Final results here!")


    user_email_button.click(fn=process_hash, inputs=user_email, outputs=user_email)
    company_email_button.click(fn=process_hash, inputs=company_email, outputs=company_email)
    process_all.click(fn=final_process, inputs=[user_email, company_email, salt_phrase, passphrase, upload_to_firebase], outputs=display_box)


demo.launch(share=False, debug=True)
