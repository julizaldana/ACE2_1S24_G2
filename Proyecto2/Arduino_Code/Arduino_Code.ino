
#include <Servo.h>
Servo servoVer; //Vertical Servo
Servo servoHor; //Horizontal Servo
int x;
int y;
int prevX;
int prevY;
int prevServoX;
int prevServoY;
void setup()
{
  Serial.begin(9600);
  servoVer.attach(6); //Attach Vertical Servo to Pin 5
  servoHor.attach(7); //Attach Horizontal Servo to Pin 6
  servoVer.write(90);
  servoHor.write(90);
  prevServoX = 90;
  prevServoY = 90;
}
void Pos()
{
  if(prevX != x || prevY != y)
  {
    int servoX = map(x, 0, 640, 65, 115);
    int servoY = map(y, 480, 0, 75, 105);
    
    int offsetX = servoX - 90;
    int offsetY = servoY - 90;
    prevServoX = prevServoX + offsetX;
    prevServoY = prevServoY + offsetY;
    prevServoX = min(servoX, 115);
    prevServoX = max(servoX, 65);
    prevServoY = min(servoY, 179);
    prevServoY = max(servoY, 95);
    servoHor.write(prevServoX);
    servoVer.write(prevServoY);
    prevX = x;
    prevY = y;
  }
}
void loop()
{
  if(Serial.available() > 0)
  {
    if(Serial.read() == 'X')
    {
      x = Serial.parseInt();
      if(Serial.read() == 'Y')
      {
        y = Serial.parseInt();
        Pos();
      }
    }
    while(Serial.available() > 0)
    {
      Serial.read();
    }
  }
}
