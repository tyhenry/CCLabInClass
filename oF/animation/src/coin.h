//
//  coin.h
//  animation
//
//  Created by Tyler Henry on 11/4/14.
//
//

#pragma once
#include "ofMain.h"

class Coin {
public:
    
    //constructor
    Coin();
    
    //variables
    float posX, posY, posZ;
    float velX, velY, velZ;
    float rotX, rotY, rotZ;
    float rotAngX, rotAngY, rotAngZ;
    
    float radius;
    
    float r, g, b;
    
    //methods
    void setup();
    void move();
    void display();
    
};