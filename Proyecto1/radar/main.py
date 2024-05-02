import serial
import time
import requests
import json

url = "http://localhost:5000"

coordenadas = [] # {"fila", "columna"}
puerto = serial.Serial(port="COM2", timeout=1)
puerto.reset_input_buffer()

while True:
    try:
        time.sleep(0.5)
        if puerto.in_waiting >= 8:
            bytes = puerto.read(8)
            fila = int.from_bytes(bytes[0:4], byteorder="little", signed=True)
            columna = int.from_bytes(bytes[4:8], byteorder="little", signed=True)
            if fila != -1:
                coordenadas.append({"fila": fila, "columna": columna})
                print(f"Fila: {fila} y columna: {columna} en cola")
                continue
            
            response = requests.post(f"{url}/api/habitaciones", data=json.dumps({"coordenadas": coordenadas}), headers={'Content-Type': 'application/json'})
            if response.status_code >= 400:
                print(f'Error al hacer la solicitud POST: {response.status_code}')
                continue
            
            response = requests.get(f"{url}/api/habitaciones/actual")
            if response.status_code >= 400:
                print(f'Error al hacer la solicitud GET: {response.status_code}')
                continue
            
            response = response.json()
            puerto.write(response["habitacion"].to_bytes(4))
            puerto.write(response["tamano_x"].to_bytes(4))
            puerto.write(response["tamano_y"].to_bytes(4))
            print(f"Coordenadas registradas con exito {coordenadas}")
            coordenadas = []
    except serial.SerialException:
        print("Port is not available")
        break
    except serial.PortNotOpenError:
        print("Attempting to use a port that is not open")
        print("End of script")
        break