(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{675:function(t,e,o){"use strict";o.r(e);o(85),o(284);var l=o(123),n=o(20),d={components:{mdbBtn:l.mdbBtn,mdbContainer:l.mdbContainer,mdbRow:l.mdbRow,mdbCol:l.mdbCol,mdbModalHeader:l.mdbModalHeader,mdbModalTitle:l.mdbModalTitle,mdbModalBody:l.mdbModalBody,mdbModalFooter:l.mdbModalFooter,mdbModal:l.mdbModal},data:function(){return{galleryContent:[],img:{id:"",content:"",alt:"",imgId:""},selectImageModel:!1,selectVideoModel:!1,uploadMsg:"",file:"",video:{id:"",content:"",alt:"",videoId:""},head:{url:"",alt:"",id:""},msg:{message:"",type:""},type:""}},computed:{videoList:function(){return this.$store.getters["videos/getVideos"]},imageList:function(){return this.$store.getters["images/getImages"]},media:function(){return this.$store.getters["media/getMedia"]}},mounted:function(){var t=this;setTimeout((function(){t.setData()}),1500)},methods:{setData:function(){this.head=this.media.head,this.galleryContent=this.media.galleryContent},reset:function(){this.galleryContent=[],this.img={id:"",content:"",alt:"",imgId:""},this.uploadMsg="",this.file="",this.video={id:"",content:"",alt:"",videoId:""},this.type=""},updateMedia:function(){var t=this;n.g.doc(this.media.id).update({head:this.head,galleryContent:this.galleryContent}).then((function(){t.reset(),t.setData(),t.msg={type:"success",message:"Media updated"},setTimeout((function(){t.msg={type:"",message:""}}),2e3)})).catch((function(e){t.msg={type:"warning",message:e.message},setTimeout((function(){t.msg={type:"",message:""}}),2e3)}))},submitForm:function(){this.updateMedia()},selectImage:function(){this.selectImageModel=!0},selectVideo:function(){this.selectVideoModel=!0},saveImageSelection:function(){this.selectImageModel=!1,console.log(this.galleryContent)},saveVideoSelection:function(){this.selectVideoModel=!1,console.log(this.galleryContent)},selectedVideo:function(t){t.videoId=t.id,this.galleryContent.push(t)},selectedImage:function(t){t.imgId=t.id,this.galleryContent.push(t)},removeItem:function(t){for(var i=0;i<this.galleryContent.length;i++)(this.galleryContent[i].imgId===t||this.galleryContent[i].videoId===t)&&this.galleryContent.splice(i,1)}}},c=o(77),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("mdb-container",[o("image-upload",{attrs:{image:t.head},on:{"update:image":function(e){t.head=e}}}),t._v(" "),o("form",{staticClass:"pt-2 d-flex flex-column",on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[o("mdb-container",[o("mdb-row",[o("mdb-col",[o("h3",[t._v("Media content")]),t._v(" "),o("div",{staticClass:"d-flex flex-row"},[o("mdb-btn",{on:{click:t.selectImage}},[t._v("Select image")]),t._v(" "),o("mdb-btn",{on:{click:t.selectVideo}},[t._v("Select video")])],1),t._v(" "),o("mdb-row",t._l(t.galleryContent,(function(e,l){return o("mdb-col",{key:l,staticClass:"col-6 col-md-4"},[e.imgId?o("img",{staticClass:"img-fluid",attrs:{src:e.url,alt:e.alt}}):t._e(),t._v(" "),e.videoId?o("video",{staticClass:"video-fluid z-depth-1",attrs:{autoplay:"",loop:"",muted:""},domProps:{muted:!0}},[o("source",{attrs:{src:e.url,type:"video/mp4"}})]):t._e(),t._v(" "),o("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(o){return t.removeItem(e.id)}}},[t._v("Delete")])])})),1)],1)],1),t._v(" "),o("mdb-col",{staticClass:"col-12 pt-3"},[o("mdb-btn",{attrs:{type:"submit"}},[t._v("Update")])],1)],1)],1),t._v(" "),o("transition",{attrs:{name:"fade"}},[""!=t.msg.message?o("div",{staticClass:"pl-5 mt-4 text-white text-center",class:"bg-"+t.msg.type},[o("p",[t._v(t._s(t.msg.message))])]):t._e()]),t._v(" "),o("mdb-modal",{attrs:{top:"",position:"top","full-height":"",direction:"top",show:t.selectImageModel},on:{close:function(e){t.selectImageModel=!1}}},[o("mdb-modal-header",[o("mdb-modal-title",[t._v("Select image")])],1),t._v(" "),o("mdb-modal-body",[o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row"},t._l(t.imageList,(function(img,e){return o("div",{key:e,staticClass:"col-4 p-0"},[o("div",{staticClass:"custom-control custom-checkbox custom-control-inline"},[o("img",{staticClass:"img-fluid",attrs:{src:img.url,alt:img.alt}}),t._v(" "),o("input",{staticClass:"custom-control-input",attrs:{id:img.id,type:"checkbox"},on:{click:function(e){return t.selectedImage(img)}}}),t._v(" "),o("label",{staticClass:"custom-control-label",attrs:{for:img.id}},[t._v("\n                "+t._s(img.alt)+"\n              ")])])])})),0)])]),t._v(" "),o("mdb-modal-footer",[o("mdb-btn",{attrs:{color:"secondary"},nativeOn:{click:function(e){t.selectImageModel=!1}}},[t._v("Close")]),t._v(" "),o("mdb-btn",{attrs:{color:"primary"},on:{click:t.saveImageSelection}},[t._v("Confirm")])],1)],1),t._v(" "),o("mdb-modal",{attrs:{top:"",position:"top","full-height":"",direction:"top",show:t.selectVideoModel},on:{close:function(e){t.selectVideoModel=!1}}},[o("mdb-modal-header",[o("mdb-modal-title",[t._v("Select video")])],1),t._v(" "),o("mdb-modal-body",[o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row"},t._l(t.videoList,(function(e,l){return o("div",{key:l,staticClass:"col-4 p-0"},[o("div",{staticClass:"custom-control custom-checkbox custom-control-inline"},[o("video",{staticClass:"video-fluid z-depth-1",attrs:{autoplay:"",loop:"",muted:""},domProps:{muted:!0}},[o("source",{attrs:{src:e.url,type:"video/mp4"}})]),t._v(" "),o("input",{staticClass:"custom-control-input",attrs:{id:e.id,type:"checkbox"},on:{click:function(o){return t.selectedVideo(e)}}}),t._v(" "),o("label",{staticClass:"custom-control-label",attrs:{for:e.id}},[t._v("\n                "+t._s(e.alt)+"\n              ")])])])})),0)])]),t._v(" "),o("mdb-modal-footer",[o("mdb-btn",{attrs:{color:"secondary"},nativeOn:{click:function(e){t.selectVideoModel=!1}}},[t._v("Close")]),t._v(" "),o("mdb-btn",{attrs:{color:"primary"},on:{click:t.saveVideoSelection}},[t._v("Confirm")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);