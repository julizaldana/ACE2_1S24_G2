from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from datetime import datetime
import mysql.connector

app = Flask(__name__)
CORS(app)

DIMENSIONES_HABITACIONES = [
    {"x": 50, "y": 60},
    {"x": 70, "y": 60},
    {"x": 80, "y": 60},
    {"x": 90, "y": 60},
    {"x": 100, "y": 60},
]

habitacion_actual = 1


def conectar():
    return mysql.connector.connect(
        host="db",
        port="5055",
        user="root",
        password="1234",
        database="proyecto1",
    )


# endpoint para devolver las coordenadas por fecha de una habitacion *
# endpoint para cambiar el numero de habitacion *
# endpoint para registrar las coordenadas con el numero de habitacion
# endpoint para devolver la habitacion actual y las dimensiones de esa habitacion *


@cross_origin
@app.route("/api/habitaciones/<int:habitacion>", methods=["GET"])
def get_habitacion(habitacion):
    start = request.args.get("start")
    end = request.args.get("end")
    values = [int(habitacion)]
    condicion_fechas = ""
    if start:
        values.append(start)
        condicion_fechas += (
            "and DATE_FORMAT(p.fecha, '%Y-%m-%d') >= DATE_FORMAT(%s, '%Y-%m-%d')"
        )
    if end:
        values.append(end)
        condicion_fechas += (
            " and DATE_FORMAT(p.fecha, '%Y-%m-%d') <= DATE_FORMAT(%s, '%Y-%m-%d')"
        )

    connection = conectar()
    mycursor = connection.cursor()
    sql = f"""SELECT c.fila, c.columna, COUNT(*) as pasadas 
                FROM coordenadas as c
                INNER JOIN pasada as p on p.id=c.id_pasada 
                WHERE p.habitacion = %s {condicion_fechas} GROUP BY fila, columna;"""
    mycursor.execute(sql, values)
    coordenadas = mycursor.fetchall()
    response = {
        "no_habitacion": int(habitacion),
        "tamano_x": DIMENSIONES_HABITACIONES[int(habitacion) - 1]["x"],
        "tamano_y": DIMENSIONES_HABITACIONES[int(habitacion) - 1]["y"],
        "pasadas_total": 15,
        "coordenadas": [
            {"x": coordenada[0], "y": coordenada[1], "pasadas": coordenada[2]}
            for coordenada in coordenadas
        ],
    }
    sql = "select count(*) from pasada where habitacion = %s"
    mycursor.execute(sql, [int(habitacion)])
    pasadas = mycursor.fetchone()
    response["pasadas_total"] = pasadas[0]
    connection.close()
    return jsonify(response)


@cross_origin
@app.route("/api/habitaciones/<int:habitacion>", methods=["PUT"])
def put_habitacion(habitacion):
    global habitacion_actual
    habitacion_actual = habitacion
    return jsonify({"code": 200})


@cross_origin
@app.route("/api/habitaciones/actual", methods=["GET"])
def get_habitacion_actual():
    global habitacion_actual
    return jsonify(
        {
            "habitacion": habitacion_actual,
            "tamano_x": DIMENSIONES_HABITACIONES[int(habitacion_actual) - 1]["x"],
            "tamano_y": DIMENSIONES_HABITACIONES[int(habitacion_actual) - 1]["y"],
        }
    )
    
@cross_origin
@app.route("/api/habitaciones", methods=["POST"])
def post_habitacion_actual():
    datos = request.json # {"coordenadas": []}
    
    connection = conectar()
    mycursor = connection.cursor()
        
    sql = "INSERT INTO pasada(habitacion,fecha) VALUES(%s,%s)"
    values = (
        habitacion_actual,
        datetime.now()
    )
    mycursor.execute(sql, values)
    id_insertado = mycursor.lastrowid

    if "coordenadas" not in datos:
        return jsonify({"code": 404})
    
    for coordenada in datos["coordenadas"]:
        sql = "INSERT INTO coordenadas(fila, columna, id_pasada) VALUES (%s,%s,%s)"
        values = (
            coordenada["fila"],
            coordenada["columna"],
            id_insertado
        )
        mycursor.execute(sql, values)
    connection.commit()
    return jsonify({"code": 200})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
