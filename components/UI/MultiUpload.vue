<template>
    <div>
        <input type="file" name="files" multiple accept="image/*" @change="handleChange">
    </div>
</template>

<script>

export default {
    name: 'ImageUpload',
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            files: []
        }
    },
    methods: {
        handleChange(v) {
            this.files = v.target.files;
            for(var i = 0; i < this.files.length; i++) {
                let payload = {};
                payload.file = this.files[i];
                payload.alt = this.files[i].name;
                this.$store.dispatch("images/singleUpload", payload).then(img => {
                    this.images.push(img)
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
    },
}
</script>