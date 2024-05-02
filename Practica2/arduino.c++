#include <cvzone.h>

unsigned long previousMillis = 0;  // Guarda el tiempo del último cambio
const long interval = 1000;  

void setup() {
  pinMode(12, OUTPUT);  //PIN SEÑAL LUZ LED VERDE
  pinMode(13, OUTPUT);  //PIN SEÑAL LUZ LED ROJA
  pinMode(11, OUTPUT);  //PIN SEÑAL DE MODULO BUZZER ACTIVO
  digitalWrite(12, LOW);
  digitalWrite(13, LOW);
  digitalWrite(11, HIGH);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() >= 3) {
    byte datos[3];
    Serial.readBytes(datos, 3);
    //Serial.println(datos);
    if (datos[0] == 1) {
      digitalWrite(12, 1);  //se controla la luz led verde
      digitalWrite(13, 0);  //se controla la luz led roja
    } else {
      digitalWrite(12, 0);  //se controla la luz led verde
      digitalWrite(13, 1);  //se controla la luz led roja
    }
    if (datos[1] == 1 ) {
      digitalWrite(11, LOW);  //se activa el buzzer
      //delay(1000);             //el buzzer se activa por 1 segundo
   //desactiva el buzzer
    }
    delay(10);
  }
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {  // Comprobar si ha pasado el intervalo
    // Realizar las acciones que deseas después del intervalo
    // Por ejemplo, encender un LED
     digitalWrite(11, HIGH);  // Invertir el estado del LED

    // Actualizar el tiempo del último cambio
    previousMillis = currentMillis;
  }
}