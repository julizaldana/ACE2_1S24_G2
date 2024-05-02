import processing.serial.*;

Serial myPort;  // Objeto para la comunicación serial
int counter = 0;  // Contador para el número de caras detectadas
boolean buffer = false;  // Buffer para almacenar los datos recibidos
int readAnterior = 0;

void setup() {
  size(400, 400);
  // Cambia esto al puerto correcto y el mismo baudrate que en el código de Python
  myPort = new Serial(this, "COM2", 9600);

}

void draw() {
  
  //print(myPort.available());
  //Leer del puerto serial
  if (myPort.available() > 0) {
    int readdd = (int) myPort.read();
    if (readAnterior != readdd){
      counter += readdd;  // Leer un byte y agregarlo al buffer
      println(readdd);
    }
    readAnterior = readdd;
    //  counter += readdd;  // Leer un byte y agregarlo al buffer
    //  println(readdd);
    //if (readdd == 1 && !buffer) {
    //  println(readdd);
    //}
    //if(readdd == 1 && !buffer){
    //  buffer = !buffer;
    //  counter += readdd;  // Leer un byte y agregarlo al buffer
    //  println(readdd);
    //}
    //if (readdd == 0 && !buffer){
    //  buffer = true;
    //}
  }
    
  background(255);
  stroke(0);        // Establece el color de trazo en negro
  fill(255, 0, 0);  // Establece el color de relleno en rojo
  //// Procesar el buffer si contiene el final de línea
  //if (buffer.indexOf('\n') >= 0) {
  //  // Separar los datos en un array basado en la coma
  //  String[] datos = buffer.substring(0, buffer.indexOf('\n')).split(",");
  //  // Limpiar el buffer
  //  buffer = buffer.substring(buffer.indexOf('\n') + 1);
    
  //  // Verificar si el primer elemento del array es '1', lo que indica detección de cara
  //  if (datos.length > 0 && datos[0].equals("1")) {
  //    counter++;  // Incrementar el contador si se detecta una cara
  //  }
  //}
  
  // Mostrar el contador
  ellipse(width/2, height/2, 100, 100);  // Dibuja una elipse en el centro del lienzo
  fill(0, 100, 0);  // Establece el color de relleno en rojo
  textSize(32);
  textAlign(CENTER, CENTER);
  text(counter, width/2, height/2);
  text("Rostros", width/2, height/2 + 100);
}
