from datetime import datetime
import mysql.connector
import serial

puerto = serial.Serial(port="560", timeout=1)
mydb = mysql.connector.connect(
    host="localhost:5055", user="root", password="1234", database="centinela_prueba1"
)
mycursor = mydb.cursor()

puerto.reset_input_buffer()
while True:
    try:
        if puerto.in_waiting() == 3:
            bytes = puerto.read(9)
            is_ingresando = bool(int.from_bytes(bytes[0:1]))  # 1:ingresado, 2:saliente
            size = int.from_bytes(bytes[1:5])  # int 1:personal, 2:mediano, 3: grande
            color = int.from_bytes(bytes[5:9])  # int 1:rojo, 2:azul, 3:amarillo, 4:otro
            if is_ingresando:
                sql = "INSERT INTO vehiculo VALUES(?,?,?,?,?)"
                values = (
                    "1",
                    str(size),
                    str(color),
                    datetime.strftime(datetime.now(), "%Y/%m/%d %H:%M:%S"),
                )
                mycursor.execute(sql, values)
                mydb.commit()
                print(mycursor.rowcount, "Vehiculo ingresado")
            else:
                mycursor.execute(
                    f"SELECT id FROM vehiculo WHERE is_ingresado=1 and size = {str(size)} and color = {str(color)}"
                )
                myresult = mycursor.fetchall()
                if len(myresult) == 0:
                    print("El vehiculo no se encontro su ingreso")
                    continue
                sql = f"UPDATE vehiculo SET is_ingresado=0, fecha_salida={datetime.strftime(datetime.now(), "%Y/%m/%d %H:%M:%S")} WHERE id={myresult[0][0]}"
                mycursor.execute(sql)
                mydb.commit()
                print(mycursor.rowcount, "Vehiculo saliente")
    except serial.SerialException:
        print("Port is not available")
        break
    except serial.portNotOpenError:
        print("Attempting to use a port that is not open")
        print("End of script")
        break
