import processing.serial.*;

Serial myPort;  // Objeto para la comunicación serial
int counter = 0;  // Contador para el número de caras detectadas
String buffer = "";  // Buffer para almacenar los datos recibidos

void setup() {
  size(400, 400);
  // Cambia esto al puerto correcto y el mismo baudrate que en el código de Python
  myPort = new Serial(this, "COM7", 9600);
}

void draw() {
  background(255);
  
  // Leer del puerto serial
  while (myPort.available() > 0) {
    buffer += (char)myPort.read();  // Leer un byte y agregarlo al buffer
  }
  
  // Procesar el buffer si contiene el final de línea
  if (buffer.indexOf('\n') >= 0) {
    // Separar los datos en un array basado en la coma
    String[] datos = buffer.substring(0, buffer.indexOf('\n')).split(",");
    // Limpiar el buffer
    buffer = buffer.substring(buffer.indexOf('\n') + 1);
    
    // Verificar si el primer elemento del array es '1', lo que indica detección de cara
    if (datos.length > 0 && datos[0].equals("1")) {
      counter++;  // Incrementar el contador si se detecta una cara
    }
  }
  
  // Mostrar el contador
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Faces Detected: " + counter, width/2, height/2);
}
