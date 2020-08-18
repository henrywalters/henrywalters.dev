<template>
    <div class="row">
        <canvas width="1000" height="600" id="hagame" />
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    import {Display, Color, NetworkFilesystem, ShaderProgram, Clock, Timer, Profiler, AVERAGE_CALCULATION, InputManager, KeyboardAndMouseInput, GAMEPAD_FLAG } from "../../../../HaGame3D/dist/index";
    // import {Display, Color, NetworkFilesystem, ShaderProgram } from "hagame/dist/index";
    import {mat4, vec3, vec2} from "gl-matrix";

    @Component({
        name: "Home"
    })
    export default class Home extends Vue {

        private display!: Display;
        private fs!: NetworkFilesystem;
        private program!: ShaderProgram;
        private texture!: WebGLTexture;
        private model!: any;
        private sphereModel!: any;

        private inputManager!: InputManager;

        private pos = [-0.0, -0.0, -6.0];
        private rot = 0;
        private timer!: Timer;
        private rotationAxis = [1.0, 0.0, 1.0];

        private profiler!: Profiler<number>;

        private t = 0;

        private async mounted () {

            this.inputManager = new InputManager();
            this.inputManager.addDevice(new KeyboardAndMouseInput());

            console.log(this.inputManager.getDevice(0));

            this.display = new Display("hagame");
            this.fs = new NetworkFilesystem(process.env.VUE_APP_WEB_ROOT);
            this.display.getWindow().clearColor = new Color(0, 123 / 255, 255, 1);
            const vertex = await this.fs.readText("shaders/simple_vertex.glsl");
            const frag = await this.fs.readText("shaders/simple_fragment.glsl");

            const cube = await this.fs.readText("models/cube.obj");

            const sphere = await this.fs.readText("models/sphere.obj");

            this.sphereModel = this.display.loadAndInitializeOBJModel(sphere);

            this.model = this.display.loadAndInitializeOBJModel(cube);
            this.texture = this.display.loadTexture(process.env.VUE_APP_WEB_ROOT + "/textures/bricks.jpeg");

            this.display.getWindow().clearColor = Color.Blue();

            this.timer = new Timer();
            this.profiler = new Profiler<number>("Render Time", AVERAGE_CALCULATION);
            this.profiler.onProfile((avg: number) => {
                console.log("FPS: " + (1000 / avg).toFixed(2));
            });

            const program = this.display.loadShaderProgram(vertex, frag);

            this.program = {
                program,
                attribLocations: {
                    "vertexPosition": this.display.gl.getAttribLocation(program, "aVertexPosition"),
                    //"vertexColor": this.display.gl.getAttribLocation(program, "aVertexColor"),
                    //"textureCoord": this.display.gl.getAttribLocation(program, "aTextureCoord"),
                    "vertexNormal": this.display.gl.getAttribLocation(program, "aVertexNormal"),
                },
                uniformLocations: {
                    "projectionMatrix": this.display.gl.getUniformLocation(program, "uProjectionMatrix"),
                    "modelMatrix": this.display.gl.getUniformLocation(program, "uModelMatrix"),
                    "viewMatrix": this.display.gl.getUniformLocation(program, "uViewMatrix"),
                    "uSampler": this.display.gl.getUniformLocation(program, "uSampler"),
                    "normalMatrix": this.display.gl.getUniformLocation(program,"uNormalMatrix"),
                }
            }
            //this.display.prepareMeshBuffers(this.program, this.model);
            //this.display.prepareMeshBuffers(this.program, this.sphereModel);
            this.timer.start();
            this.tick();
        }

        private tick() {

            this.display.clear();

            this.rot += 0.05;

            const blockSize = 3;

            const speed = 0.2;
            const lookSpeed = 0.05;

            const keyboard = this.inputManager.getDevice(0);

            let movement = new Float32Array([0.0, 0.0, 0.0]);

            if (keyboard.getState(GAMEPAD_FLAG.MOVE_UP)) {
                movement[2] = -speed;
            }

            if (keyboard.getState(GAMEPAD_FLAG.MOVE_DOWN)) {
                movement[2] = speed;
            }

            if (keyboard.getState(GAMEPAD_FLAG.MOVE_RIGHT)) {
                movement[0] = speed;
            }

            if (keyboard.getState(GAMEPAD_FLAG.MOVE_LEFT)) {
                movement[0] = -speed;
            }

            if (keyboard.getState(GAMEPAD_FLAG.LOOK_RIGHT)) {
                this.display.rotateCamera([0.0, -lookSpeed, 0.0]);
            }

            if (keyboard.getState(GAMEPAD_FLAG.LOOK_LEFT)) {
                this.display.rotateCamera([0.0, lookSpeed, 0.0])
            }
            /*
            if (keyboard.getState(GAMEPAD_FLAG.LOOK_UP)) {
                this.display.rotateCamera([-lookSpeed, 0.0, 0.0]);
            }

            if (keyboard.getState(GAMEPAD_FLAG.LOOK_DOWN)) {
                this.display.rotateCamera([lookSpeed, 0.0, 0.0]);
            }
            */
            vec3.rotateY(movement, movement, new Float32Array([0.0, 0.0, 0.0]), this.display.getCameraRot()[1]);
            //vec3.rotateX(movement, movement, new Float32Array([0.0, 0.0, 0.0]), this.display.getCameraRot()[0]);

            this.display.moveCameraPos(movement);

            this.display.prepareMeshBuffers(this.program, this.model);

            for (let i = 0; i < 10; i++) {
                this.display.renderMesh(this.program, this.model, new Float32Array([-5.0, 0.0, -i * blockSize - 10]), this.rot, new Float32Array([1,0,0]));
            }

            for (let i = 0; i < 10; i++) {
                this.display.renderMesh(this.program, this.model, new Float32Array([5.0, 0.0, -i * blockSize - 10]), this.rot, new Float32Array([1,0,0]));
            }

            this.t += 0.05;

            const radius = 3;

            this.display.prepareMeshBuffers(this.program, this.sphereModel);

            this.display.renderMesh(this.program, this.sphereModel, new Float32Array([Math.sin(this.t) * radius, Math.cos(this.t) * radius + Math.cos(this.t) * 3, -this.t]), 0, new Float32Array([0, 0, 0]));

            this.profiler.sample(this.timer.stop());
            this.timer.start();

            requestAnimationFrame(this.tick);
        }
    }
</script>
