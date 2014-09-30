/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.
 
  This example code is in the public domain.
 */
 
// Pin 13 has an LED connected on most Arduino boards.
// give it a name:
int led = 13;
int buttonPin = 2;
int ledState = 1;
int buttonState = 1;
int prvBtnState = 0;

long time = 0; //time counter in millis
long debounce = 200; //debounce gauge in millis

// the setup routine runs once when you press reset:
void setup() {                
  Serial.begin(9600);
  // initialize the digital pin as an output.
  pinMode(led, OUTPUT);    
  pinMode(buttonPin, INPUT); 
}

// the loop routine runs over and over again forever:
void loop() {
  
  buttonState = digitalRead(buttonPin);
  
  //if button is pressed and wasn't before, and we've waited long enough for a debounce...
  if(buttonState == HIGH && prvBtnState == LOW && (millis() - time > debounce)) {
    
    //switch the led:
    if (ledState == HIGH) {
      ledState = LOW;
      Serial.println("turning led off");
    } else {
      ledState = HIGH;
      Serial.println("turning led on");
    }
    
    time = millis();
  }
  
  digitalWrite(led, ledState);
  
  prvBtnState = buttonState;
  
}
