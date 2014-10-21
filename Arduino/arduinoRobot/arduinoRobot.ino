#include <Servo.h> 
 
Servo conServo;  // create servo object

int xInput = A0;
int yInput = A1;
int zInput = A2;

int xAxisLow = 400;
int xAxisHigh = 600;
int yAxisLow;
int yAxisHigh;
int zAxisLow;
int zAxisHigh;

int accSampleSize = 10;

boolean goingFwd = true;
 
void setup() 
{ 
  conServo.attach(9);  // attaches the servo on pin 9 to the servo object 
  Serial.begin(9600);
    
  
} 
 
void loop() 
{ 
  
  int xRaw = ReadAxis(xInput);
  int yRaw = ReadAxis(yInput);
  int zRaw = ReadAxis(zInput);
  
  Serial.print("Z: ");
  Serial.print(zRaw);
  Serial.println();
  
  if (goingFwd == true){
    if (zRaw < 370){
      goFwd();
    } else {
      goBk();
      goingFwd = false;
    }
  } else {
    if (zRaw > 310){
      goBk();
    } else {
      goFwd();
      goingFwd = true;
    }
  }
} 

void goFwd() {
  conServo.write(0);
}

void goBk(){
  conServo.write(180);
}

void halt(){
  conServo.write(91);
}

int ReadAxis(int axisPin){
  
  long reading = 0;
  analogRead(axisPin);
  delay(1);
  for (int i = 0; i < accSampleSize; i++){
    reading += analogRead(axisPin);
  }
  return reading/accSampleSize;
}

