/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.
 
  This example code is in the public domain.
 */
 
// Pin 13 has an LED connected on most Arduino boards.
// give it a name:
int led = 13;
int buttonPin = 2;
int buttonState = 0;

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
  
  if(buttonState == HIGH) {
    digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
    Serial.println("led is on");
    delay(1000);               // wait for a second
  } else {
    digitalWrite(led, LOW);
    delay(1000);
  }
  
}
