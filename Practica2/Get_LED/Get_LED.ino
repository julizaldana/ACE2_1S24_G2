#include <cvzone.h>

SerialData serialData(3, 1); //Se esperan 3 valores
int valsRec[3]; // array donde entran los enteros desde el codigo de python


void setup() {
  pinMode(12, OUTPUT);  //PIN SEÑAL LUZ LED VERDE
  pinMode(13, OUTPUT); //PIN SEÑAL LUZ LED ROJA
  pinMode(11, OUTPUT); //PIN SEÑAL DE MODULO BUZZER ACTIVO
  serialData.begin();
}

void loop() {
  serialData.Get(valsRec);
  digitalWrite(12, valsRec[0]); //se controla la luz led verde
  digitalWrite(13, valsRec[1]); //se controla la luz led roja
  if (valsRec[2]==1) {
    digitalWrite(11, HIGH); //se activa el buzzer
    delay(1000);            //el buzzer se activa por 1 segundo
    digitalWrite(11,LOW);   //desactiva el buzzer
  }
  delay(10);
}