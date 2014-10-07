int ledPin = 3;
int xInput = A0;
int yInput = A1;
int zInput = A2;

int brightness = 0;
int xAxisLow = 400;
int xAxisHigh = 600;

int sampleSize = 10;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  
  analogReference(EXTERNAL);
}

void loop() {
  int xRaw = ReadAxis(xInput);
  
  Serial.print("X: ");
  Serial.print(xRaw);
  Serial.println();
  
  brightness = map(xRaw, xAxisLow, xAxisHigh, 0, 255);
  analogWrite(ledPin, brightness);
  
  delay(100);
}

int ReadAxis(int axisPin){
  
  long reading = 0;
  analogRead(axisPin);
  delay(1);
  for (int i = 0; i < sampleSize; i++){
    reading += analogRead(axisPin);
  }
  return reading/sampleSize;
}
