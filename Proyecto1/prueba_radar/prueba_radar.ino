void setup() {
  // Inicializar el puerto serial a 9600 baudios
  Serial.begin(9600);
}

void loop() {
  // Leer el valor de la entrada analógica en el pin A0 del Arduino Mega
  float valor = analogRead(A2);
  float vout = valor*(5.0/1023.0);
  // Convertir el valor leído a distancia en centímetros utilizando la fórmula proporcionada
  float distancia = 12245.0 * pow(valor, -1.278);
  //float distancia = 13.0 * pow(vout, -1.0);

  // Imprimir la distancia correspondiente por el puerto serial
  Serial.print("Distancia: ");
  Serial.print(distancia);  // Imprimir la distancia con 2 decimales
  Serial.println(" cm");

  // Esperar 1 segundo antes de leer nuevamente
  delay(500);
}
