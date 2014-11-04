#include <SendOnlySoftwareSerial.h>

#include <Adafruit_SoftServo.h>

 
#define SERVOPIN 0 //servo control line on pin 0

Adafruit_SoftServo conServo; //continuous Servo object

SendOnlySoftwareSerial mySerial (3); //Tx pin


int yInput = 2; //analogRead(2) = trinket pin 4

int accSampleSize = 10;

boolean goingFwd = true;
 
void setup() 
{ 
  // Set up the interrupt that will refresh the servo for us automagically
  OCR0A = 0xAF;            // any number is OK
  TIMSK |= _BV(OCIE0A);    // Turn on the compare interrupt (below!)
  
  mySerial.begin(9600);
  
  conServo.attach(SERVOPIN);  // attaches the servo on pin 0 to the servo object
  halt(); //tell servo to go to start position ("per quirk?" - Adafruit)  
  delay(15);
} 
 
void loop() 
{ 
  int yRaw = ReadAxis(yInput);
  
  mySerial.println(255);
  
  /*if (goingFwd == true){
    if (yRaw < 355){
      goFwd();
    } else {
      goBk();
      goingFwd = false;
    }
  } else {
    if (yRaw > 285){
      goBk();
    } else {
      goFwd();
      goingFwd = true;
    }
  }*/
  
  delay(15);
} 

void goFwd() {
  conServo.write(0);
}

void goBk(){
  conServo.write(180);
}

void halt(){
  conServo.write(90);
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


/* INTERRUPT TIMER */
// We'll take advantage of the built in millis() timer that goes off
// to keep track of time, and refresh the servo every 20 milliseconds
// The SIGNAL(TIMER0_COMPA_vect) function is the interrupt that will be
// Called by the microcontroller every 2 milliseconds
volatile uint8_t counter = 0;
SIGNAL(TIMER0_COMPA_vect) {
  // this gets called every 2 milliseconds
  counter += 2;
  // every 20 milliseconds, refresh the servos!
  if (counter >= 20) {
    counter = 0;
    conServo.refresh();
  }
}

