<template>
    <div class="navigator primary-font w-100 row">
        <a class="navigator-item" v-for="item in menuItems" v-if="canShow(item)" v-bind:href="item.link" @click.prevent="goto(item)" :class="{'active': item.active}">{{item.label}}</a>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {Route} from "vue-router";
    import {TrackingService} from "@/services/tracking.service";
    import {User} from "@/services/auth.service";

interface IMenuItem {
    label: string;
    link: string;
    active: boolean;
    privilege?: string;
}

@Component({
    name: "Navigator"
})
export default class Navigator extends Vue {

    @Prop()
    public user!: User;

    private currentItem: IMenuItem | undefined;
    private tracking!: TrackingService;

    private menuItems: IMenuItem[] = [
        { label: "Home", link: "/", active: false },
        { label: "Projects", link: "/projects", active: false },
        // { label: "Tools", link: "/tools", active: false },
        // { label: "Forum", link: "/forum", active: false },
        { label: "About", link: "/about", active: false },
        { label: "Contact", link: "/contact", active: false },
        { label: "Admin", link: "/admin", active: false, privilege: "ADMIN" },
    ]

    private getItem(path: string): IMenuItem | undefined {
        for (const item of this.menuItems) {
            if (item.link === path) {
                return item;
            }
        }

        return void 0;
    }

    private async mounted() {
        this.tracking = new TrackingService();

        if (this.currentRoute.name === "Home") {
            this.currentItem = this.getItem(this.currentRoute.path);
            if (this.currentItem) this.currentItem.active = true;
            this.tracking.trackPageVisit("Home", this.$route.query.src ? this.$route.query.src as string : void 0);
        }
    }

    @Watch("currentRoute")
    private routeChange(currentRoute: Route) {
        if (this.currentItem) {
            this.currentItem.active = false;
        }
        this.currentItem = this.getItem(currentRoute.path);
        document.title = "Henry Walters" + (this.currentRoute.name === "Home" ? "" : " - " + currentRoute.name);
        if (this.currentItem) {
            this.currentItem.active = true;
        }
        this.tracking.trackPageVisit(currentRoute.name as string,this.$route.query.src ? this.$route.query.src as string : void 0);
    }

    private goto(item: IMenuItem) {
        if (!this.currentItem || item.link !== this.currentItem.link)
            this.$router.push({name: item.label});
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

    $nav-padding: 10px;

    .navigator {
        display: inline-flex;
        justify-content: space-evenly;
        padding: $nav-padding / 2;
    }

    .navigator-item {
        font-size: 20px;
        margin: $nav-padding / 2;
    }

    a {
        color: black !important;
    }

    .active {
        color: $primaryColor !important;
    }

</style>