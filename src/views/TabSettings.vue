<template>
    <div id="mainframe" class="h-full">
        <h3 class="text-center text-3xl">Settings</h3>
        <div class="settingItem bg-gray-200 dark:bg-gray-700">
            <h4 class="text-center text-2xl">Theme</h4>
            <input type="radio" name="theme" id="themeLight" value="light" v-model="theme"><label for="light">Light theme</label><br>
            <input type="radio" name="theme" id="themeDark" value ="dark" v-model="theme"><label for="dark">Dark theme</label><br>
            <input type="radio" name="theme" id="themeOS" value="OS" v-model="theme"><label for="OS">OS</label>
        </div>

        <button @click="saveChanges" class="bg-gray-200 dark:bg-gray-700" style="padding:4px 7px; border-radius:1px; margin:auto 5px 5px 5px">Save changes</button>
    </div>
</template>

<script>
import $ from "jquery";
export default{
    name: "TabSettings",
    data() {   
        return {
            theme: "OS",
        };
    },
    methods: {
        saveChanges() {
            if (this.theme === "OS") {
                console.log("Not available");
            } else if (this.theme === "dark") {
                $("html").addClass("dark");
            } else {
                $("html").removeClass("dark");
            }
        }
    }
};
</script>

<style>
    .settingItem {
        border-radius: 10px;
        padding: 5px;
        margin: 5px;
        width: 250px;
    }

    .settingItem input {
        margin: 2px 4px
    }
</style>
