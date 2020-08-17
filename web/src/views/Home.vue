<template>
    <div class="row">
        <canvas width="1000" height="600" id="hagame" />
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Display, Color, NetworkFilesystem, ShaderProgram } from "../../../../HaGame3D/dist/index";

    @Component({
        name: "Home"
    })
    export default class Home extends Vue {

        private display!: Display;
        private fs!: NetworkFilesystem;
        private program!: ShaderProgram;
        private texture!: WebGLTexture;
        private model!: any;

        private pos = [-0.0, -0.0, -6.0];
        private rot = 0;
        private rotationAxis = [1.0, 0.0, 1.0];

        private async mounted () {
            this.display = new Display("hagame");
            this.fs = new NetworkFilesystem(process.env.VUE_APP_WEB_ROOT);
            this.display.getWindow().clearColor = new Color(0, 123 / 255, 255, 1);
            const vertex = await this.fs.readText("shaders/simple_vertex.glsl");
            const frag = await this.fs.readText("shaders/simple_fragment.glsl");

            const cube = await this.fs.readText("models/cube.obj");

            this.model = this.display.loadAndInitializeOBJModel(cube);
            this.texture = this.display.loadTexture(process.env.VUE_APP_WEB_ROOT + "/textures/bricks.jpeg");

            this.display.getWindow().clearColor = Color.Blue();

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
                    "modelViewMatrix": this.display.gl.getUniformLocation(program, "uModelViewMatrix"),
                    "uSampler": this.display.gl.getUniformLocation(program, "uSampler"),
                    "normalMatrix": this.display.gl.getUniformLocation(program,"uNormalMatrix"),
                }
            }

            this.tick();
        }

        private tick() {
            const start = (new Date()).getTime();
            this.display.clear();
            this.rot += 0.05;

            const blockSize = 2;

            for (let i = 0; i < 1000; i++) {
                this.display.renderMesh(this.program, this.model, new Float32Array([-5.0, -10 + i * blockSize, -i * blockSize - 10]), this.rot, new Float32Array([1,0,0]));
            }

            const end = (new Date()).getTime();

            // console.log((end - start) + "ms");

            requestAnimationFrame(this.tick);
        }
    }
</script>
