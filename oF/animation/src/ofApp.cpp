#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    ofSetCircleResolution(50);
    
    //setup all the coins
    for (int i=0; i<numCoins; i++){
        coins[i].setup();
    }

}

//--------------------------------------------------------------
void ofApp::update(){
    
    //move the coins
    for (int i=0;i<numCoins;i++){
        coins[i].move();
    }

}

//--------------------------------------------------------------
void ofApp::draw(){
    
    //enables z-buffering (3D view)
    ofEnableDepthTest();
    
    //set background as gradient
    ofBackgroundGradient(ofColor(128), ofColor(0));
    
    //draw coins
    for (int i=0;i<numCoins;i++){
        coins[i].display();
    }

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
    for (int i = 0;i<NUMCOINS;i++){
        coins[i].setup();
    }
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
