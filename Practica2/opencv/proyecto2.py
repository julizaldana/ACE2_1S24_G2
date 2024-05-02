import cv2 
from cvzone.FaceDetectionModule import FaceDetector

# Diccionario para mapear IDs de caras con nombres
face_names = {0: "Julio", 1: "Esaú"}

cap = cv2.VideoCapture(0)
detector = FaceDetector()

while True:
    success, img = cap.read()

    img, bboxs = detector.findFaces(img)

    if bboxs:
        for bbox in bboxs:
            # bbox contiene 'id', 'bbox', 'score', 'center'

            # ---- Obtener datos  ---- #
            center = bbox["center"]
            x, y, w, h = bbox['bbox']
            score = int(bbox['score'][0] * 100)
            face_id = bbox['id']

            # ---- Dibujar datos  ---- #
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) ##RECTANGULO VERDE

            # Mostrar el nombre de la persona
            if face_id in face_names:
                cv2.putText(img, face_names[face_id], (x, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

    else:
        img = cv2.putText(img, "No se detecto una cara", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

    cv2.imshow("Practica 2 - ACE2 - Grupo 2", img)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
