<template>
    <div class="row">
        <canvas width="1000" height="600" id="hagame" />
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Display, Color, NetworkFilesystem, ShaderProgram } from "hagame/dist/index"

    @Component({
        name: "Home"
    })
    export default class Home extends Vue {

        private display!: Display;
        private fs!: NetworkFilesystem;
        private program!: ShaderProgram;
        private texture!: WebGLTexture;

        private async mounted () {
            this.display = new Display("hagame");
            this.fs = new NetworkFilesystem(process.env.VUE_APP_WEB_ROOT);
            this.display.getWindow().clearColor = new Color(0, 123 / 255, 255, 1);
            const vertex = await this.fs.readText("shaders/simple_vertex.glsl");
            const frag = await this.fs.readText("shaders/simple_fragment.glsl");

            this.texture = this.display.loadTexture(process.env.VUE_APP_WEB_ROOT + "/textures/bricks.jpeg");

            const program = this.display.loadShaderProgram(vertex, frag);

            this.program = {
                program,
                attribLocations: {
                    "vertexPosition": this.display.gl.getAttribLocation(program, "aVertexPosition"),
                    //"vertexColor": this.display.gl.getAttribLocation(program, "aVertexColor"),
                    "textureCoord": this.display.gl.getAttribLocation(program, "aTextureCoord"),
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
            this.display.clear();
            this.display.render(this.program, this.display.initializeBuffers(), this.texture);
            requestAnimationFrame(this.tick);
        }
    }
</script>
