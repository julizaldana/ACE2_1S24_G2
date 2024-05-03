from simple_facerec import SimpleFacerec
import cv2
import serial
import time
import requests
import json
import webbrowser
import datetime
import pyautogui as pyto
import time
from access_meet import in_meet, out_meet
from pandas import *

# Encode faces from a folder
sfr = SimpleFacerec()
sfr.load_encoding_images("./faces")

face_cascade = cv2.CascadeClassifier("./haarcascade_frontalface_default.xml")
cap = cv2.VideoCapture(1)
# fourcc= cv2.VideoWriter_fourcc(*'XVID')
ArduinoSerial = serial.Serial("com8", 9600, timeout=0.1)
# out= cv2.VideoWriter('face detection4.avi',fourcc,20.0,(640,480))

time.sleep(1)
state = "iniciando" #iniciando, esperando_boton, reunion (hasta que le den log out) 
url = "http://34.148.81.127:5000"

while cap.isOpened():
    ret, frame = cap.read()
    
    frame = cv2.flip(frame, 1)  # mirror the image
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 6)  # detect the face
    for x, y, w, h in faces:
        if state == "reunion":
            # sending coordinates to Arduino
            string = "X{0:d}Y{1:d}".format((x + w // 2), (y + h // 2))
            print(string)
            ArduinoSerial.write(string.encode("utf-8"))
            time.sleep(0.3)
        # plot the center of the face
        cv2.circle(frame, (x + w // 2, y + h // 2), 2, (0, 255, 0), 2)
        # plot the roi
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 3)
    # plot the squared region in the center of the screen
    cv2.rectangle(
        frame,
        (640 // 2 - 30, 480 // 2 - 30),
        (640 // 2 + 30, 480 // 2 + 30),
        (255, 255, 255),
        3,
    )
    
    match(state):
        case "iniciando":
            # Esta iniciando sesion 
            face_locations, face_names = sfr.detect_known_faces(frame)
            for face_loc, name in zip(face_locations, face_names):
                if name == "Unknown":
                    print("No se reconoce")
                    continue
                y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]
                
                cv2.putText(frame, name,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                
                response = requests.post(f"{url}/api/alertas", data=json.dumps({"message": "Detección y reconocimiento facial exitoso"}), headers={'Content-Type': 'application/json'})
                if response.status_code >= 400:
                    print(f'Error al hacer la solicitud POST: {response.status_code}')
                    continue
                response = requests.post(f"{url}/api/logs", data=json.dumps({"tipo": 1}), headers={'Content-Type': 'application/json'})
                if response.status_code >= 400:
                    print(f'Error al hacer la solicitud POST: {response.status_code}')
                    continue
                state = "esperando_boton"
                print("Inicio de sesion")
                

        case "esperando_boton":
            if ArduinoSerial.in_waiting >= 1:
                bytes = ArduinoSerial.read(1)
                is_presionado = int.from_bytes(bytes[0:1], byteorder="little")
                # 0 SIGNIFICA QUE SE PRESIONO EL BOTON, CUALQUIER OTRO VALOR NO IMPORTA
                if is_presionado == 1: 
                    print(f"Se presionó el botón {is_presionado}")
                    state = "reunion"
                    response = requests.post(f"{url}/api/alertas", data=json.dumps({"message": "Presión del botón multifuncional"}), headers={'Content-Type': 'application/json'})
                    if response.status_code >= 400:
                        print(f'Error al hacer la solicitud POST: {response.status_code}')
                        continue
                    in_meet()
                    
        case "reunion":
            time.sleep(0.1)
            if ArduinoSerial.in_waiting >= 1:
                bytes = ArduinoSerial.read(1)
                is_presionado = int.from_bytes(bytes[0:1], byteorder="little")
                if is_presionado == 1: 
                    print(f"Se presionó el botón logout {is_presionado}")
                    state = "iniciando"
                    response = requests.post(f"{url}/api/alertas", data=json.dumps({"message": "Sesión finalizada"}), headers={'Content-Type': 'application/json'})
                    if response.status_code >= 400:
                        print(f'Error al hacer la solicitud POST: {response.status_code}')
                        continue
                    response = requests.post(f"{url}/api/logs", data=json.dumps({"tipo": 2}), headers={'Content-Type': 'application/json'})
                    if response.status_code >= 400:
                        print(f'Error al hacer la solicitud POST: {response.status_code}')
                        continue
                    # TODO: AQUI VA LA LOGICA PARA CERRAR LA REUNION DE MEET
                    out_meet()


    cv2.imshow("img", frame)
    # press q to Quit
    if cv2.waitKey(10) & 0xFF == ord("q"):
        break
cap.release()
cv2.destroyAllWindows()
