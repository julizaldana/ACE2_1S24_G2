from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from datetime import datetime
import mysql.connector

app = Flask(__name__)
CORS(app)

ALERTS = []  # ["dfasdf", ""]


def conectar():
    return mysql.connector.connect(
        host="db",
        port="3310",
        user="root",
        password="1234",
        database="proyecto2",
    )


@cross_origin
@app.route("/api/logs", methods=["GET"])
def get_logs():
    start = request.args.get("start")
    end = request.args.get("end")
    values = []
    condicion_fechas = ""
    if start:
        values.append(start)
        condicion_fechas += (
            "DATE_FORMAT(l.FECHA, '%Y-%m-%d') >= DATE_FORMAT(%s, '%Y-%m-%d')"
        )
    if end:
        values.append(end)
        if len(values) > 0:
            condicion_fechas += " and"
        condicion_fechas += (
            " DATE_FORMAT(l.FECHA, '%Y-%m-%d') <= DATE_FORMAT(%s, '%Y-%m-%d')"
        )

    connection = conectar()
    mycursor = connection.cursor()
    sql = f"""SELECT * FROM logs as l
                WHERE {condicion_fechas} ORDER BY l.FECHA"""
    mycursor.execute(sql, values)
    logs = mycursor.fetchall()
    response = []
    for log in logs:
        response.append(
            {
                "ID": log[0],
                "FECHA": log[1],
                "NTIPO": "LOGIN" if log[2] == 1 else "LOGOUT",
                "TIPO": log[2],
            }
        )
    connection.close()
    return jsonify(response)


@cross_origin
@app.route("/api/logs", methods=["POST"])
def post_logs():
    datos: dict = request.json  # {"tipo": 1}
    if "tipo" not in datos:
        return jsonify({"code": 404})

    connection = conectar()
    mycursor = connection.cursor()

    sql = "INSERT INTO logs(fecha,tipo) VALUES(%s,%s)"
    values = (datetime.now(), datos["tipo"])
    mycursor.execute(sql, values)
    connection.commit()
    return jsonify({"code": 200})


@cross_origin
@app.route("/api/alertas", methods=["GET"])
def get_alertas():
    response = {"message": "", "isAlert": False}
    if len(ALERTS) > 0:
        response.update(message=ALERTS[0], isAlert=True)
        ALERTS.pop(0)
    return jsonify(response)


@cross_origin
@app.route("/api/alertas", methods=["POST"])
def post_alertas():
    datos: dict = request.json  # {"message": "df"}
    if "message" not in datos:
        return jsonify({"code": 404})
    ALERTS.append(datos["message"])
    return jsonify({"code": 200})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
