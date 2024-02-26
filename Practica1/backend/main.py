from flask import Flask, jsonify  # , request
from flask_cors import CORS, cross_origin
from datetime import datetime
import mysql.connector

app = Flask(__name__)
CORS(app)

def conectar():
    return mysql.connector.connect(
        host="localhost",
        port="5055",
        user="root",
        password="1234",
        database="centinela_prueba1",
    )
    
@cross_origin
@app.route("/ingresos", methods=["GET"])
def get_ingresos():
    # datos = request.json
    connection = conectar()
    mycursor = connection.cursor()
    sql = "SELECT * FROM vehiculos"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    resultados_bonitos_para_panaza = [
        {
            "tipo": "1",
            "ID": result[0],
            "FECHA": datetime.strftime(result[4], "%Y-%m-%d"),
            "HORA": datetime.strftime(result[4], "%H:%M:%S"),
            "TIPO VEHÍCULO": result[2],
            "ROL VEHÍCULO": result[3],
        }
        for result in myresult
    ]
    connection.close()
    return jsonify(resultados_bonitos_para_panaza)


@cross_origin
@app.route("/egresos", methods=["GET"])
def get_egresos():
    connection = conectar()
    mycursor = connection.cursor()
    sql = "SELECT * FROM vehiculos WHERE is_ingresado='0'"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    resultados_bonitos_para_panaza = [
        {
            "tipo": "1",
            "ID": result[0],
            "FECHA": datetime.strftime(result[5], "%Y-%m-%d"),
            "HORA": datetime.strftime(result[5], "%H:%M:%S"),
            "TIPO VEHÍCULO": result[2],
            "ROL VEHÍCULO": result[3],
        }
        for result in myresult
    ]
    connection.close()
    return jsonify(resultados_bonitos_para_panaza)


@cross_origin
@app.route("/graphs", methods=["GET"])
def get_contadores():
    # datos = request.json
    connection = conectar()
    mycursor = connection.cursor()
    datos = {
        "ocupados": 0,
        "disponibles": 0,
        "personal": 0,
        "mediano": 0,
        "grande": 0,
        "ajenos": 0,
        "estudiante": 0,
        "trabajador": 0,
        "catedratico": 0,
    }
    personas_vehiculo = {"personal": 1, "mediano": 2, "grande": 4}
    sql = "SELECT COUNT(*) FROM vehiculos where is_ingresado=1;"
    mycursor.execute(sql)

    datos["ocupados"] = mycursor.fetchone()[0]
    datos["disponibles"] = 200 - datos["ocupados"]
    sql = "SELECT tipo_vehiculo, COUNT(*) FROM vehiculos group by tipo_vehiculo;"
    mycursor.execute(sql)
    cantidades_maximas = mycursor.fetchall()
    for cantidades in cantidades_maximas:
        datos[cantidades[0]] = personas_vehiculo[cantidades[0]] * cantidades[1]
    sql = "SELECT rol_vehiculo, COUNT(*) FROM vehiculos group by rol_vehiculo;"
    mycursor.execute(sql)
    vehiculos_rol = mycursor.fetchall()
    for vehiculos in vehiculos_rol:
        datos[vehiculos[0]] = vehiculos[1]
    connection.close()
    return jsonify(datos)


@cross_origin
@app.route("/flujoactual", methods=["GET"])
def get_flujos():
    connection = conectar()
    mycursor = connection.cursor()
    sql = "SELECT * FROM vehiculos WHERE is_ingresado='0'"
    mycursor.execute(sql)
    
    connection.close()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
