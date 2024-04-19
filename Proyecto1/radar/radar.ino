#include <Servo.h>

const int trigPin = 9;    // Pin de salida del sensor ultrasónico (Trigger)
const int echoPin = 10;   // Pin de entrada del sensor ultrasónico (Echo)
const int servoPin = 7;   // Pin de control del servomotor
const int setDistance = 30;  // Distancia en centímetros para detectar un objeto
int distance;

Servo myServo;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  myServo.attach(servoPin);
  myServo.write(90);  // Inicializa el servomotor en posición central
}

void loop() {
  distance = getDistance();
  
  if (distance < setDistance) {
    int angle = map(distance, 0, setDistance, 0, 180);  // Mapea la distancia al ángulo del servomotor
    myServo.write(angle);  // Mueve el servomotor al ángulo calculado
    Serial.print("Objeto detectado a ");
    Serial.print(distance);
    Serial.println(" cm");
  } else {
    myServo.write(90);  // Vuelve el servomotor a la posición central
  }
  
  delay(100);  // Espera 100 milisegundos antes de la siguiente lectura
}

int getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH);
  
  int distance = duration * 0.0344 / 2;  // Calcula la distancia en centímetros
  
  return distance;
}
