<template>
    <div class="mb-3">
        <ul class='navigator-mobile'>
            <li v-for="(item, i) in menuItems" :key="i" v-if="canShow(item)">
                <a 
                    class="navigator-item hover-trigger" 
                    v-if="canShow(item) && !item.children" 
                    v-bind:href="item.link" 
                    @click.prevent="goto(item)"
                    :class="{'active': item.active}"
                    
                ><font-awesome-icon v-if='item.icon' :icon='item.icon' /> {{item.label}}</a>

                <a 
                    class="navigator-item hover-trigger" 
                    v-if="canShow(item) && item.children" 
                    v-bind:href="item.link"
                    @click.prevent='toggleItem(item)'
                >
                    <font-awesome-icon v-if='item.icon' :icon='item.icon' />
                    {{item.label}}
                    <font-awesome-icon :icon='item.toggled ? "caret-up" : "caret-down"' />
                </a>
                <ul v-if='item.toggled' class='navigator-mobile mt-2 mb-2'>
                    <li v-for='child in item.children'>
                        <a
                            class='navigator-item child-item'
                            v-if='canShow(child)'
                            v-bind:href='child.link'
                            :class="{'active': child.active}"
                            @click.prevent="goto(child)"
                        >
                            <font-awesome-icon v-if='child.icon' :icon='child.icon' />
                            {{child.label}}
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import {Component, Mixins, Prop, Vue, Watch} from "vue-property-decorator";
import {Route} from "vue-router";
import {TrackingService} from "@/services/tracking.service";
import {User} from "@/services/auth.service";
import ServiceService from "../services/service.service";
import ConfigMixin from "../mixins/ConfigMixin";
import WebUtils from "hcore/dist/webUtils"

interface IMenuItem {
    label: string;
    link: string;
    active: boolean;
    icon?: string;
    privilege?: string;
    toggled?: boolean;
    parent?: IMenuItem;
    children?: IMenuItem[] | (() => Promise<IMenuItem[]>);
}

@Component({
    name: "Navigator"
})
export default class Navigator extends Mixins(ConfigMixin) {

    @Prop({default: null})
    public user!: User;

    private currentItem: IMenuItem | undefined;
    private tracking!: TrackingService;

    private hoveredItem: IMenuItem | undefined;
    private toggledItem: IMenuItem | undefined;

    private menuItems: IMenuItem[] = [
        { label: "Home", icon: 'home', link: "/", active: false },
        { label: "Services", icon: 'code', link: "/service", toggled: true, active: false, children: async () => {
            const services = new ServiceService();
            const res = await services.get();
            if (res.success) {
                return res.result.map(service => {
                    return {
                        label: service.name,
                        link: '/service/' + service.slug,
                        active: false,
                        icon: service.icon,
                    }
                }) 
            } else {
                return [];
            }
        }},
        { label: "Projects", icon: 'project-diagram', link: "/projects", active: false },
        { label: "Blog", icon: 'rss', link: "/blog", active: false },
        // { label: "About", link: "/about", active: false },
        { label: "Contact", icon: 'address-book', link: "/contact", active: false },
        { label: "Admin", icon: 'user-shield', link: "/admin", active: false, privilege: "ADMIN" },
    ]

    private cleanup(e: any) {
        if (this.toggledItem) {
            if (e.target.classList.value.indexOf('dropdown') === -1) {
                this.toggledItem.toggled = false;
                this.toggledItem = void 0;
                this.$forceUpdate();
            }
        }

        if (this.hoveredItem) {
            if (e.target.classList.value.indexOf('hover-trigger') === -1) {
                this.hoveredItem = void 0;
                this.$forceUpdate();
            }
        }
    }

    private getItem(path: string): IMenuItem | undefined {
        for (const item of this.menuItems) {
            if (item.link === path) {
                return item;
            }

            if (item.children && typeof(item.children) !== 'function') {
                for (const child of item.children) {
                    if (child.link === path) {
                        item.active = true;
                        return child;
                    }
                }
            }
        }

        return void 0;
    }

    private async created() {
        this.tracking = new TrackingService();

        for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].toggled = false;
            if (this.menuItems[i].children) {
                if (typeof(this.menuItems[i].children) === 'function') {
                    // @ts-ignore
                    this.menuItems[i].children = await this.menuItems[i].children();
                }
                // @ts-ignore
                for (let j = 0; j < this.menuItems[i].children.length; j++) {
                    // @ts-ignore
                    this.menuItems[i].children[j].parent = this.menuItems[i];
                }
            }
        }

        if (this.currentRoute.name === "Home") {
            this.currentItem = this.getItem(this.currentRoute.path);
            if (this.currentItem) this.currentItem.active = true;
            this.tracking.trackPageVisit("Home", this.getConfig("WEB_ROOT") + this.$route.path, this.$route.query.src ? this.$route.query.src as string : void 0);
        }
    }

    @Watch("currentRoute")
    private routeChange(currentRoute: Route) {
        if (this.currentItem) {
            this.currentItem.active = false;
            if (this.currentItem.parent) {
                this.currentItem.parent.active = false;
            }
        }
        this.currentItem = this.getItem(currentRoute.path);
        document.title = "Henry Walters" + (this.currentRoute.name === "Home" ? "" : " - " + currentRoute.name);
        if (this.currentItem) {
            this.currentItem.active = true;
        }

        this.tracking.trackPageVisit(currentRoute.name as string,
            this.getConfig("WEB_ROOT") + this.$route.path, 
            this.$route.query.src ? this.$route.query.src as string : void 0
        );
    }

    private toggleItem(item: IMenuItem) {
        item.toggled = !item.toggled;
        this.toggledItem = item.toggled ? item : void 0;
        this.$forceUpdate();
    }

    private isHovered(item: IMenuItem) {
        return this.hoveredItem && this.hoveredItem.link === item.link;
    }

    private hoverItem(item: IMenuItem) {
        if (!WebUtils.isMobile()) {
            item.toggled = true;
            this.toggledItem = item;
            this.$forceUpdate();
        }
        
    }

    private setHover(item: IMenuItem) {
        this.hoveredItem = item;
        this.$forceUpdate();
    }

    private goto(item: IMenuItem) {

        if (!this.currentItem || item.link !== this.currentItem.link) {
            this.$router.push({path: item.link});
            this.$emit('nav-close');
        }
        
    }

    private canShow(item: IMenuItem) {
        if (item.privilege) {
            if (!this.user) return false;
            for (const privilege of this.user.privileges) {
                if (privilege === item.privilege) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    private get currentRoute() {
        return this.$route;
    }
}

</script>

<style lang="scss" scoped>

    @import "@/assets/theme.scss";

    $nav-padding: 15px;

    $dd-radius: 3px;

    .navigator {
        display: inline-flex;
        justify-content: space-between;
        padding: $nav-padding / 2;
    }

    li {
        margin-bottom: 5px;
    }

    .navigator-item {
        min-width: 200px;
        font-size: 20px;
        margin: $nav-padding / 2;
        margin-bottom: 10px;
    }

    .child-item {
        margin-left: 2rem;
        font-size: 18px;
    }

    a {
        color: $lightGray;
        text-decoration: none !important;
    }

    a:hover {
        color: $lightGray;
    }

    @media screen and (max-width: 455px) {
        .draw-left {
            margin-left: -160px;
        }
    }

    .active {
        color: white !important;
    }

    .dropdown {
        //position: relative;
        display: inline-block;
    }

    .visible {
        display: block !important;
    }

    .dropdown-content-container {
        display: none;
        position: absolute;
        
        // box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
        z-index: 1000;
        text-align: left;

    }

    .dropdown-content {
        margin-top: 10px;
    }
    
    .dropdown-inner-content {

        opacity: 1;
        border: 3px solid $primaryGray;
        background-color: white;
        min-width: 315px;
        // box-shadow: 3px 3px 10px 5px darken(rgb(44, 44, 44), 10%);
        color: white;
        border-radius: 0;
        margin-bottom: -10px;
        // border-radius: $dd-radius;
    }

    .dropdown-content a {
        color: black;
        overflow: none;
        margin: 12px 16px;
        text-decoration: none;
        font-size: 20px;
        display: block;
        z-index: 1000;
    }

    .alt {
        // background-color: rgb(201, 201, 201);
    }

    .first {
        //border-radius: $dd-radius $dd-radius 0 0;
    }

    .last {
        //border-radius: 0 0 $dd-radius $dd-radius;
    }

    .dropdown-link {
        font-size: 24px;
    }

    .bordered-link {
        //border-top: 1px solid black;
    }

    .navigator-mobile {
        list-style-type: none;
        font-size: 12px;
        padding: 0;

        li {
            font-size: 8px;
        }
    }

</style>