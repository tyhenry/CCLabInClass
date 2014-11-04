//
//  coin.cpp
//  animation
//
//  Created by Tyler Henry on 11/4/14.
//
//

#include "coin.h"

//constructor for a 3D "coin"

Coin::Coin() {
    posX = ofGetWindowWidth() * 0.5;
    posY = 0;
    posZ = 0;
    
    r = 122;
    g = 122;
    b = 122;
}

void Coin::setup() {
    //this function sets up a coin with random:
    //radius, posX, posZ,
    //silver or gold color,
    //spin speed/direction
    
    radius = ofRandom(40,70);
    
    posX = ofRandom(radius,(ofGetWindowWidth()-radius)); //between the window edges
    posY = (0 - (ofRandom(radius, (ofGetWindowHeight()*2)))); //start above top of screen
    posZ = ofRandom(-125,125); //250 depth
    
    // angle of rotation from 2 to 20
    rotAngX = ofRandom(2, 90);
    rotAngY = ofRandom(2, 90);
    rotAngZ = ofRandom(2, 90);
    
    rotX = 0;
    rotY = 0;
    rotZ = 0;
    
    velX = 0; //no move along X
    velY = 4; //speed of gravity
    velZ = 0; //no move along Z
    
    
    //set color to silver or gold
    float colSelect = ofRandom(0,1);
    if (colSelect >= 0.5){
        //silver (grey)
        r = 182;
        g = 182;
        b = 182;
    } else {
        //gold(-ish)
        r = 218;
        g = 183;
        b = 74;
    }
    
    
}

void Coin::move() {
    
    posX += velX;
    posY += velY;
    posZ += velZ;
    
    float time = ofGetElapsedTimef(); //Get time in seconds
    
    //rotate at [rotation angle] per second
    rotX = time * rotAngX;
    rotY = time * rotAngY;
    rotZ = time * rotAngZ;
    

    if (posY > (ofGetWindowHeight() + radius)){
        setup();
    }
}

void Coin::display() {
    
    
    ofPushMatrix();
    
        //move coordinate system to center of coin
        ofTranslate(posX,posY,posZ);
    
        //rotate coordinate system to current rotation
        ofRotateX(rotX);
        ofRotateY(rotY);
        ofRotateZ(rotZ);
    
        //set color
        ofSetColor(r,g,b);
    
        //draw coin
        ofCircle(0, 0, 0, radius);
    
    ofPopMatrix();
    
}