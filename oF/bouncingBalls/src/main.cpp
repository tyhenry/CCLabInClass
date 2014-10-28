#include "ofMain.h" //includes all oF files
#include "ofApp.h" //includes your oF files

//========================================================================
int main( ){
	ofSetupOpenGL(1024,768,OF_WINDOW);			// <-------- setup the GL context
    //loads a new visible window - OF_WINDOW is the openFrameworks window, OF_FULLSCREEN would be oF in fullscreen

	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp(new ofApp());

}
