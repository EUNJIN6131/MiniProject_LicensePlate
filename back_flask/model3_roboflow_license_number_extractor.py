from roboflow import Roboflow

rf = Roboflow(api_key="IhcDYxqLRcjLRLZ2Dc1J")
project = rf.workspace().project("license_plate_recognition-k9hpj")
model = project.version(6).model

file_path = "./dataset/train/9669/e7552456-9767-4ffe-ac28-52028ea30484.jpg"

# Infer on a local image
result = model.predict(file_path, confidence=20, overlap=30).json()
predictions = result['predictions']

sorted_predictions = sorted(predictions, key=lambda x: (round(x['x']), x['confidence']), reverse=False)

highest_confidence_by_x = {}

for prediction in sorted_predictions:
    rounded_x = round(prediction['x'])
    if rounded_x not in highest_confidence_by_x or prediction['confidence'] > highest_confidence_by_x[rounded_x]['confidence']:
        highest_confidence_by_x[rounded_x] = prediction

for x, prediction in highest_confidence_by_x.items():
    print(f'class: {prediction["class"]}, confidence: {prediction["confidence"]:.2f}')
