<template>
    <div class="container-lg">
        <div class="navigator primary-font w-100 row mb-3" @mouseleave="cleanup">
            <span v-for="(item, i) in menuItems" :key="i" v-if="canShow(item)">
                <a 
                    class="navigator-item hover-trigger" 
                    v-if="canShow(item) && !item.children" 
                    v-bind:href="item.link" 
                    @click.prevent="goto(item)"
                    @mouseenter="cleanup"
                    @mouseleave="cleanup"
                    @mouseover="setHover(item)"
                    :class="{'active': item.active, 'hovered': isHovered(item)}"
                    
                >{{item.label}}</a>
                <span v-if="canShow(item) && item.children" class="dropdown">
                    <a 
                        class="navigator-item dropdown-trigger dropdown-toggle hover-trigger" 
                        href="#"
                        @mouseover="hoverItem(item); setHover(item)"
                        @click.prevent="toggleItem(item)"
                        @mouseleave="cleanup"
                        :class="{'active': item.active, 'hovered': isHovered(item)}"
                    >{{item.label}}</a>
                    <div class="dropdown-content-container hover-trigger" :class="{visible: item.toggled}" @mouseleave="cleanup">
                        <div class="dropdown-content" :class="{'draw-left': i % 2 == 1}">
                            <div class='dropdown-inner-content'>
                                <div class='dropdown-link-container' v-for="(child, j) in item.children" :key="i + '-' + j">
                                    <a
                                        class="dropdown-link hover-trigger" 
                                        
                                        :class="{
                                            'bordered-link': j != 0, 
                                            'selected': child.active,
                                            'alt': j % 2 == 0,
                                            'first': j == 0,
                                            'last': j == item.children.length - 1,
                                        }" 
                                        v-if="canShow(child)"
                                        :href="child.link"
                                        @click.prevent="goto(child)"
                                    ><font-awesome-icon v-if='child.icon' :icon='child.icon' style='width: 25px' /> {{child.label}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </span>
        </div>
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

    @Prop()
    public user!: User;

    private currentItem: IMenuItem | undefined;
    private tracking!: TrackingService;

    private hoveredItem: IMenuItem | undefined;
    private toggledItem: IMenuItem | undefined;

    private menuItems: IMenuItem[] = [
        { label: "Home", link: "/", active: false },
        { label: "Services", link: "/service", toggled: true, active: false, children: async () => {
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
        { label: "Projects", link: "/projects", active: false },
        { label: "Blog", link: "/blog", active: false },
        // { label: "About", link: "/about", active: false },
        { label: "Contact", link: "/contact", active: false },
        { label: "Admin", link: "/admin", active: false, privilege: "ADMIN" },
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

        if (item.parent) {
            item.parent.toggled = false;
            this.$forceUpdate();
        }
        
        if (!this.currentItem || item.link !== this.currentItem.link) {
            this.$router.push({path: item.link});
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

    .navigator-item {
        min-width: 200px;
        font-size: 24px;
        font-weight: bold;
        margin: $nav-padding / 2;
    }

    a {
        color: black !important;
        text-decoration: none !important;
    }

    .hovered {
        color: $primaryColor !important;
    }

    @media screen and (max-width: 455px) {
        .draw-left {
            margin-left: -160px;
        }
    }

    .active {
        //color: $primaryColor !important;
        border-bottom: 4px solid $primaryColor !important;
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

    .dropdown-link:hover {
        //background-color: $primaryColor;
        color: $primaryColor !important;
        
        
    }

    .selected {
        color: $primaryColor !important;
        text-decoration: underline !important;
        text-underline-offset: 5px;
    }

    .bordered-link {
        //border-top: 1px solid black;
    }

</style>