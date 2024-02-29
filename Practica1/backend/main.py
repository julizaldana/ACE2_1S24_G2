from flask import Flask, jsonify, request
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
    sql = "SELECT COUNT(*) FROM vehiculos where is_ingresado=1;"
    mycursor.execute(sql)
    datos["ocupados"] = mycursor.fetchone()[0]
    datos["disponibles"] = 200 - datos["ocupados"]

    fecha_hoy = datetime.strftime(datetime.now(), "%Y-%m-%d")
    sql = f"SELECT tipo_vehiculo, COUNT(*) FROM vehiculos where DATE_FORMAT(fecha_entrada, '%Y-%m-%d') = '{fecha_hoy}' group by tipo_vehiculo;"
    mycursor.execute(sql)
    cantidades_maximas = mycursor.fetchall()
    personas_vehiculo = {"personal": 1, "mediano": 2, "grande": 4}
    for cantidades in cantidades_maximas:
        datos[cantidades[0]] = personas_vehiculo[cantidades[0]] * cantidades[1]
    sql = "SELECT rol_vehiculo, COUNT(*) FROM vehiculos where is_ingresado='1' group by rol_vehiculo;"
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


@cross_origin
@app.route("/vehiculoactual", methods=["GET"])
def get_vehiculo_rol_actual():
    connection = conectar()
    mycursor = connection.cursor()
    fecha_hoy = datetime.strftime(datetime.now(), "%Y-%m-%d")
    sql = f"""SELECT DATE_FORMAT(fecha_entrada, '%Y-%m-%d') as fecha, rol_vehiculo, COUNT(*) AS total
    FROM vehiculos
    where DATE_FORMAT(fecha_entrada, '%Y-%m-%d') = '{fecha_hoy}'
    GROUP BY fecha, rol_vehiculo
    ORDER BY fecha ASC;"""
    mycursor.execute(sql)
    vehiculos_rol = mycursor.fetchall()
    labels = []
    labels_rol = {"estudiante": 0, "catedratico": 1, "trabajador": 2, "ajenos": 3}
    datasets = [
        {"label": "estudiante", "data": [], "backgroundColor": "#76aee1"},
        {"label": "catedratico", "data": [], "backgroundColor": "#47d4f5"},
        {"label": "trabajador", "data": [], "backgroundColor": "#66ecc9"},
        {"label": "ajenos", "data": [], "backgroundColor": "#e8e279"},
    ]
    if len(vehiculos_rol) <= 0:
        return jsonify({"labels": labels, "datasets": datasets})
    fecha_actual = vehiculos_rol[0][0]  # fecha
    labels.append(fecha_actual)
    for vehiculos in vehiculos_rol:
        if fecha_actual != vehiculos[0]:
            # saber si entra de verdad aqui
            for i in range(len(datasets)):
                if len(datasets[i]["data"]) != len(labels):
                    datasets[i]["data"].append(0)
            fecha_actual = vehiculos[0]
            labels.append(fecha_actual)
        datasets[labels_rol[vehiculos[1]]]["data"].append(vehiculos[2])
    connection.close()

    # para validar si quedo disparejo al final
    for i in range(len(datasets)):
        if len(datasets[i]["data"]) != len(labels):
            datasets[i]["data"].append(0)
    return jsonify({"labels": labels, "datasets": datasets})


@cross_origin
@app.route("/historialvehiculos", methods=["POST"])
def get_vehiculo_rol_todos():
    datos = request.json
    print(datos["startDate"], datos["endDate"])
    connection = conectar()
    mycursor = connection.cursor()
    # fecha_inicio = datetime.strftime(datos["startDate"], "%Y-%m-%d")
    # fecha_final = datetime.strftime(datos["endDate"], "%Y-%m-%d")
    sql = f"""SELECT DATE_FORMAT(fecha_entrada, '%Y-%m-%d') as fecha, rol_vehiculo, COUNT(*) AS total
    FROM vehiculos
    where DATE_FORMAT(fecha_entrada, '%Y-%m-%d') >= '{datos["startDate"]}'
    and
    DATE_FORMAT(fecha_entrada, '%Y-%m-%d') <= '{datos["endDate"]}'
    GROUP BY fecha, rol_vehiculo
    ORDER BY fecha ASC;"""
    mycursor.execute(sql)
    vehiculos_rol = mycursor.fetchall()
    labels = []
    labels_rol = {"estudiante": 0, "catedratico": 1, "trabajador": 2, "ajenos": 3}
    datasets = [
        {"label": "estudiante", "data": [], "backgroundColor": "#76aee1"},
        {"label": "catedratico", "data": [], "backgroundColor": "#47d4f5"},
        {"label": "trabajador", "data": [], "backgroundColor": "#66ecc9"},
        {"label": "ajenos", "data": [], "backgroundColor": "#e8e279"},
    ]
    if len(vehiculos_rol) <= 0:
        return jsonify({"labels": labels, "datasets": datasets})
    fecha_actual = vehiculos_rol[0][0]  # fecha
    labels.append(fecha_actual)
    for vehiculos in vehiculos_rol:
        if fecha_actual != vehiculos[0]:
            for i in range(len(datasets)):
                if len(datasets[i]["data"]) != len(labels):
                    datasets[i]["data"].append(0)
            fecha_actual = vehiculos[0]
            labels.append(fecha_actual)
        datasets[labels_rol[vehiculos[1]]]["data"].append(vehiculos[2])
    connection.close()

    # para validar si quedo disparejo al final
    for i in range(len(datasets)):
        if len(datasets[i]["data"]) != len(labels):
            datasets[i]["data"].append(0)
    return jsonify({"labels": labels, "datasets": datasets})


@cross_origin
@app.route("/personaactual", methods=["GET"])
def get_persona_dia():
    # datos = request.json
    connection = conectar()
    mycursor = connection.cursor()
    sql = """select date_format(fecha_entrada, '%Y-%m-%d') as fecha, tipo_vehiculo, count(*) 
    from vehiculos
    group by fecha, tipo_vehiculo
    order by date_format(fecha_entrada, '%Y-%m-%d');"""
    mycursor.execute(sql)
    personas_dia = mycursor.fetchall()
    if len(personas_dia) <= 0:
        return jsonify({"labels": [], "data": []})

    labels = []
    data = []
    personas_vehiculo = {"personal": 1, "mediano": 2, "grande": 4}
    fecha_actual = personas_dia[0][0]  # fecha
    labels.append(fecha_actual)
    for cantidades in personas_dia:
        if fecha_actual != cantidades[0]:
            fecha_actual = cantidades[0]
            labels.append(fecha_actual)
        if len(labels) != len(data):
            data.append(0)
        data[len(labels) - 1] += personas_vehiculo[cantidades[1]] * cantidades[2]
    return jsonify({"labels": labels, "data": data})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
