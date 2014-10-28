#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    xPos = 0;
    xVel = 3;
    yPos = 0;
    yVel = 3;

}

//--------------------------------------------------------------
void ofApp::update(){
    
    xPos += xVel;
    if (xPos > ofGetWidth() || xPos < 0){
        xVel = -(xVel);
    }
    yPos += yVel;
    if (yPos > ofGetHeight() || yPos < 0){
        yVel = -(yVel);
    }

}

//--------------------------------------------------------------
void ofApp::draw(){
    
    ofCircle(xPos, yPos, 20);

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
