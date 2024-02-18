#include <Arduino_APDS9960.h>

#define INGRESO 6
#define EGRESO 7

struct Vehiculo {
  bool direccion;//True : Ingreso, False : Egreso
  int height; //1 : Personal, 2 : Mediano, 3: Grande
  int color;//1: Rojo, 2: Azul, 3: Amarillo, 4 : Otro
};

Vehiculo vehiculo = Vehiculo{};

//Flags Ingreso y Egresos
bool flagIngreso = false;
bool flagEgreso = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); //Config Baudios Comunicaion Serial}
  while (!Serial);

  //Conf Pines Deteccion Ingreso/Egreso
  pinMode(INGRESO, INPUT);
  pinMode(EGRESO, INPUT);

  //Se inicializa el sensor
  /*
  if (!APDS.begin()) {
    Serial.println("Error initializing APDS-9960 sensor.");
  }
  */

  //Conf Interrupciones deteccion Ingreso/Egreso
  attachInterrupt(0, interrupcionIngreso, FALLING);
  attachInterrupt(1, interrupcionEgreso, FALLING);
}

void loop() {
  if (flagIngreso) {
    detachInterrupt(0);
    ingreso();
    flagIngreso = false;
    attachInterrupt(0, interrupcionIngreso, FALLING);    
  }else if (flagEgreso) {
    detachInterrupt(1);
    egreso();
    flagEgreso = false;
    attachInterrupt(1, interrupcionEgreso, FALLING);
  }
}

void interrupcionIngreso(){
  flagIngreso = true;
}

void interrupcionEgreso(){
  flagEgreso = true;
}

void ingreso(){
  //Registrar Ingreso
  vehiculo.direccion = true;
  //Regitrar la altura y el color
  SetHeightAndColor();
  //Enviar vehiculo(Struct) por comunicacion Serial
  enviarStructPorSerial();
}

void egreso(){
  //Registrar Egreso
  vehiculo.direccion = false;
  //Registrar la altura y el color
  SetHeightAndColor();
  //Enviar vehiculo(Struct) por comunicacion Serial
  enviarStructPorSerial();
}

void SetHeightAndColor(){
  //Espera para que el vehiculo se coloque correctamente
  delay(1500);
  //Se inicializar el Sensor
  APDS.begin();
  //Se espera a una lectura de proximidad
  while (!APDS.proximityAvailable());
  //Leer Proximidad
  int proximity = APDS.readProximity();
  //Convertir Proximidad a altura de Carro
  vehiculo.height = calcularAltura(proximity);
  //Se espera a una lectura de Color
  while (!APDS.colorAvailable());
  //Leer Color en Formato RGB
  int r, g, b;
  APDS.readColor(r,g,b);
  //Convertir RGB a color
  vehiculo.color = obtenerColor(r,g,b);
  //Desabilitar Sensor
  APDS.end();
}

int calcularAltura(int proximity){
  //Verificar si es Vehiculo Personal
  if (proximity > 150) {
    return 0;
  }else if (proximity > 50) {
    return 1;
  }else if (proximity > 0) {
    return 2;
  }
}

int obtenerColor(int r, int g, int b){
  //Verificacion Amarillo
  if (abs(r - g) < 20 && abs(r - b) > 50 ) {
    return 3;
  }// Verifiacion Rojo
  else if (r > 100 && abs(r-g) > 50 && abs(r-b) > 50) {
    return 1;
  }// Verifiacion Azul
  else if (b > 100 && abs(b-r) > 50 && abs(b-g) > 50 ) {
    return 2;
  }else {
    return 4;
  }
}

void enviarStructPorSerial() {
  // Enviar la estructura byte a byte
  byte* datosPtr = (byte*)&vehiculo;
  for (unsigned int i = 0; i < sizeof(vehiculo); i++) {
    Serial.write(*datosPtr);
    datosPtr++;
  }
}

