attribute vec4 aVertexPosition;
//attribute vec3 aVertexNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

attribute vec3 aBarycentric;
varying vec3 vbc;

void main() {
    vbc = aBarycentric;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
}