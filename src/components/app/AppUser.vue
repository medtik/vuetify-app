<template>
    <v-card flat>
        <v-container fluid grid-list-sm>
            <v-layout row>
                <v-flex>
                    <image-icon squared :size="80" :letters-count="2" :src="user.avatar || user.name"></image-icon>
                </v-flex>
                <v-flex>
                    <div class="headline">{{user.name}}</div>
                    <div>{{user.email}}</div>
                    <div>
                        <a @click.prevent.stop="signOut" href="#">Sign out</a>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
    import ImageIcon from "../misc/ImageIcon";

    export default {
        name: 'app-user',
        components: {ImageIcon},
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        methods: {
            signOut()
            {
                this.user.signOut().then(() => {
                   window.location.replace(window.location.toString().split('#')[0]);
                });
            }
        }
    };
</script>