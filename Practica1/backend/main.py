from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import mysql.connector

app = Flask(__name__)
CORS(app)
mydb = mysql.connector.connect(
    host="localhost:5055", user="root", password="1234", database="centinela_prueba1"
)
mycursor = mydb.cursor()

@cross_origin
@app.route("/ingresos", methods=["GET"])
def get_ingresos():
    # datos = request.json
    sql = "SELECT is_ingresado as tipo, id as ID, fecha_entrada, size as `TIPO VEHÍCULO`, color as `ROL VEHÍCULO` FROM vehiculo WHERE tipo=1"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    return jsonify(myresult)
    