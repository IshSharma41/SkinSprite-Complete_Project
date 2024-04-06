from flask import Flask, request, jsonify
import base64
import io
from PIL import Image
import cv2
import joblib
from keras.preprocessing import image
import numpy as np

predictor1 = joblib.load('cnn_model.pkl')
predictor2 = joblib.load('VG19_model_better.pkl')
class_mapping = {
    0: 'Acne and Rosacea ',
    1: 'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions',
    2: 'Atopic Dermatitis ',
    3: 'Cellulitis Impetigo and other Bacterial Infections',
    4: 'Eczema',
    5: 'Exanthems and Drug Eruptions',
    6: 'Hepres',
    7: 'Light Diseases and Disorders of Pigmentation',
    8: 'Lupus',
    9: 'Melanoma Skin Cancer Nevi and Moles',
    10: 'Poison Ivy  and other Contact Dermatitis',
    11: 'Psoriasis pictures Lichen Planus and related diseases',
    12: 'Seborrheic Keratoses and other Benign Tumors',
    13: 'Systemic Disease',
    14: 'Tinea Ringworm Candidiasis and other Fungal Infection',
    15: 'Urticaria Hives',
    16: 'Vascular Tumors',
    17: 'Warts Molluscum and other Viral Infections',
    18: 'vasculitis '
}

app = Flask(__name__)

@app.route('/receive-image', methods=['POST'])
def receive_image():
    try:

        data = request.json
        image_base64 = data.get('image', '')


        image_bytes = base64.b64decode(image_base64)
        img = Image.open(io.BytesIO(image_bytes))

        cv2.imwrite('image.jpg', np.array(img))

        image_1 = img.resize((64, 64))
        image_array = np.array(image_1)
        image_array = np.expand_dims(image_array, axis=0)
        result = predictor1.predict(image_array)

        if result[0][0] == 0:
            prediction = {'not infected': 100}
        else:
            img_resized = img.resize((224, 224))
            img_array = image.img_to_array(img_resized)
            img_array = np.expand_dims(img_array, axis=0)
            img_array /= 255.0
            class_probabilities = predictor2.predict(img_array)[0]
            prediction = {class_mapping[i]: float(prob * 100) for i, prob in enumerate(class_probabilities)}

        json_content = {"prediction": prediction}
        return jsonify(json_content)

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=5000)
