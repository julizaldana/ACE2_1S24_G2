##descargar paquete cvzone y mediapipe para detección de caras
import cv2 
import cvzone  
from cvzone.FaceDetectionModule import FaceDetector
from cvzone.SerialModule import SerialObject
import serial

cap = cv2.VideoCapture(0)
detector = FaceDetector()

arduino_port = 'COM7'
arduino_baudrate = 9600
arduino = serial.Serial(arduino_port, arduino_baudrate, timeout=1)

while True:
    success, img = cap.read()

    img, bboxs = detector.findFaces(img)

    if bboxs:
        arduino.write(b'1\n')
        for bbox in bboxs:
            # bbox contains 'id', 'bbox', 'score', 'center'

            # ---- Get Data  ---- #
            center = bbox["center"]
            x, y, w, h = bbox['bbox']
            score = int(bbox['score'][0] * 100)

            # ---- Draw Data  ---- #
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) ##RECTANGULO VERDE


    else:
        arduino.write(b'0\n')
        img, bbox = cvzone.putTextRect(
            img, "No se detecto una cara", (50, 50),  # Image and starting position of the rectangle
            scale=2, thickness=2,  # Font scale and thickness
            colorT=(255, 255, 255), colorR=(255, 0, 255),  # Text color and Rectangle color
            font=cv2.FONT_HERSHEY_PLAIN,  # Font type
            offset=15,  # Offset of text inside the rectangle
            border=2, colorB=(0, 255, 0)  # Border thickness and color
        )

    cv2.imshow("Practica 2 - ACE2 - Grupo 2", img)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()