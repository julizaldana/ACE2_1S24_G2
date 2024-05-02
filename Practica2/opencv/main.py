##descargar paquete cvzone y mediapipe para detección de caras
import cv2 
import cvzone  
from cvzone.FaceDetectionModule import FaceDetector
from cvzone.SerialModule import SerialObject
import serial
#import time

# Arduino official doc:https://www.arduino.cc/en/serial/begin
# by default Arduino set 8 bit frame, parity none and 1 stop bit

puerto = serial.Serial(
    port="COM2",
    baudrate=9600,
    bytesize=serial.EIGHTBITS,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
)

arduinoport = serial.Serial(
    port="COM7",
    baudrate=9600,
    bytesize=serial.EIGHTBITS,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
)


cap = cv2.VideoCapture(0)
detector = FaceDetector()
#arduinoboard = SerialObject('COM7') ## Se hace una conexión de forma serial con el Arduino en el puerto COM7, donde se está conectado el Arduino MEGA
# processing = SerialObject('COM2') ## Se hace una conexión de forma serial con el Arduino en el puerto COM7, donde se está conectado el Arduino MEGA

while True:
    success, img = cap.read()

    img, bboxs = detector.findFaces(img)

    if bboxs:
        arduinoport.write(b"\x01\x00\x01") #Se manda a arduino
        puerto.write(b"\x01") #Se manda a processing
        # puerto.close()
        for bbox in bboxs:
            # bbox contiene 'id', 'bbox', 'score', 'center'

            # ---- Se obtiene data  ---- #
            center = bbox["center"]
            x, y, w, h = bbox['bbox']
            score = int(bbox['score'][0] * 100)

            # ---- Dibujar data en recuadro  ---- #
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) ##RECTANGULO VERDE


    else:
        arduinoport.write(b"\x00\x01\x00") #Se manda a arduino
        puerto.write(b"\x00")   #Se manda a processing
        #puerto.close()
        img, bbox = cvzone.putTextRect(
            img, "No se detecto una cara", (50, 50),  # Posicion para el rectangulo
            scale=2, thickness=2,  # Escala del font y el grueso
            colorT=(255, 255, 255), colorR=(255, 0, 255),  # Color del texto y del rectangulo
            font=cv2.FONT_HERSHEY_PLAIN,  # Tipo de font
            offset=15,  # Offset of text inside the rectangle
            border=2, colorB=(0, 255, 0)  # Grueso de borde y color
        )

    cv2.imshow("Practica 2 - ACE2 - Grupo 2", img)
    if cv2.waitKey(1) == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()