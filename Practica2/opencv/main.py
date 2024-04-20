##descargar paquete cvzone y mediapipe para detección de caras
import cv2 
import cvzone  
from cvzone.FaceDetectionModule import FaceDetector
from cvzone.SerialModule import SerialObject

cap = cv2.VideoCapture(0)
detector = FaceDetector()
arduinoboard = SerialObject('COM7') ## Se hace una conexión de forma serial con el Arduino en el puerto COM7, donde se está conectado el Arduino MEGA

while True:
    success, img = cap.read()

    img, bboxs = detector.findFaces(img)

    if bboxs:
        #Si se detectan caras, envía [1,0,1] para encender la luz led verde y el buzzer
        arduinoboard.sendData([1, 0, 1])
        for bbox in bboxs:
            # bbox contains 'id', 'bbox', 'score', 'center'

            # ---- Get Data  ---- #
            center = bbox["center"]
            x, y, w, h = bbox['bbox']
            score = int(bbox['score'][0] * 100)

            # ---- Draw Data  ---- #
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) ##RECTANGULO VERDE


    else:
        #Si no se dectectan caras, se envía [0,1,0] para apagar la luz verde y buzzer
        arduinoboard.sendData([0, 1, 0])
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