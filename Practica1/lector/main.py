from datetime import datetime
import mysql.connector
import serial
import time

puerto = serial.Serial(port="COM2", timeout=1)
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="centinela_prueba1",
    port="5055",
)
mycursor = mydb.cursor()

puerto.reset_input_buffer()
while True:
    try:
        time.sleep(0.5)
        if puerto.in_waiting >= 9:
            bytes = puerto.read(9)
            is_ingresando = bool(int.from_bytes(bytes[0:1]))  # 1:ingresado, 2:saliente
            size = int.from_bytes(bytes[1:5])  # int 1:personal, 2:mediano, 3: grande
            color = int.from_bytes(bytes[5:9])  # int 1:rojo(estudiante), 2:azul(trabajador), 3:amarillo(profe), 4:otro
            print("Leido is_ingresando:", is_ingresando, "size:",size, "color:",color)
            if is_ingresando:
                sql = "INSERT INTO vehiculos(is_ingresado,tipo_vehiculo,rol_vehiculo,fecha_entrada) VALUES(%s,%s,%s,%s)"
                values = (
                    "1",
                    size,
                    color,
                    datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S"),
                )
                mycursor.execute(sql, values)
                mydb.commit()
                print(mycursor.rowcount, "vehiculo ingresado")
            else:
                sql = "SELECT id FROM vehiculos WHERE is_ingresado=%s and tipo_vehiculo=%s and rol_vehiculo=%s;"
                values = ("1", size, color)
                mycursor.execute(sql, values)
                myresult = mycursor.fetchall()
                if len(myresult) == 0:
                    print("El vehiculo no se encontro su ingreso")
                    continue
                sql = "UPDATE vehiculos SET is_ingresado=%s, fecha_salida=%s WHERE id=%s"
                values = (
                    "0",
                    datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S"),
                    myresult[0][0],
                )
                mycursor.execute(sql, values)
                mydb.commit()
                print(mycursor.rowcount, "Vehiculo saliente")
        """ else:
            print("Leyendo", puerto.in_waiting) """
    except serial.SerialException:
        print("Port is not available")
        break
    except serial.PortNotOpenError:
        print("Attempting to use a port that is not open")
        print("End of script")
        break
