(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a44c3e8e"],{"0fd9":function(t,a,e){"use strict";var n=e("ade3"),r=e("5530"),i=(e("13d5"),e("caad"),e("2532"),e("99af"),e("b64b"),e("5319"),e("ac1f"),e("4ec9"),e("d3b7"),e("3ca3"),e("ddb0"),e("159b"),e("4b85"),e("2b0e")),s=e("d9f7"),o=e("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function u(t,a){return c.reduce((function(e,n){return e[t+Object(o["G"])(n)]=a(),e}),{})}var d=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},f=u("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},b=u("justify",(function(){return{type:String,default:null,validator:v}})),h=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},p=u("alignContent",(function(){return{type:String,default:null,validator:h}})),g={align:Object.keys(f),justify:Object.keys(b),alignContent:Object.keys(p)},m={align:"align",justify:"justify",alignContent:"align-content"};function _(t,a,e){var n=m[t];if(null!=e){if(a){var r=a.replace(t,"");n+="-".concat(r)}return n+="-".concat(e),n.toLowerCase()}}var k=new Map;a["a"]=i["a"].extend({name:"v-row",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},f),{},{justify:{type:String,default:null,validator:v}},b),{},{alignContent:{type:String,default:null,validator:h}},p),render:function(t,a){var e=a.props,r=a.data,i=a.children,o="";for(var c in e)o+=String(e[c]);var l=k.get(o);return l||function(){var t,a;for(a in l=[],g)g[a].forEach((function(t){var n=e[t],r=_(a,t,n);r&&l.push(r)}));l.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(n["a"])(t,"align-".concat(e.align),e.align),Object(n["a"])(t,"justify-".concat(e.justify),e.justify),Object(n["a"])(t,"align-content-".concat(e.alignContent),e.alignContent),t)),k.set(o,l)}(),t(e.tag,Object(s["a"])(r,{staticClass:"row",class:l}),i)}})},"20f6":function(t,a,e){},"2fa4":function(t,a,e){"use strict";e("20f6");var n=e("80d2");a["a"]=Object(n["i"])("spacer","div","v-spacer")},"4b85":function(t,a,e){},"62ad":function(t,a,e){"use strict";var n=e("ade3"),r=e("5530"),i=(e("13d5"),e("a9e3"),e("b64b"),e("5319"),e("ac1f"),e("4ec9"),e("d3b7"),e("3ca3"),e("ddb0"),e("caad"),e("159b"),e("2ca0"),e("4b85"),e("2b0e")),s=e("d9f7"),o=e("80d2"),c=["sm","md","lg","xl"],l=function(){return c.reduce((function(t,a){return t[a]={type:[Boolean,String,Number],default:!1},t}),{})}(),u=function(){return c.reduce((function(t,a){return t["offset"+Object(o["G"])(a)]={type:[String,Number],default:null},t}),{})}(),d=function(){return c.reduce((function(t,a){return t["order"+Object(o["G"])(a)]={type:[String,Number],default:null},t}),{})}(),f={col:Object.keys(l),offset:Object.keys(u),order:Object.keys(d)};function v(t,a,e){var n=t;if(null!=e&&!1!==e){if(a){var r=a.replace(t,"");n+="-".concat(r)}return"col"!==t||""!==e&&!0!==e?(n+="-".concat(e),n.toLowerCase()):n.toLowerCase()}}var b=new Map;a["a"]=i["a"].extend({name:"v-col",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])({cols:{type:[Boolean,String,Number],default:!1}},l),{},{offset:{type:[String,Number],default:null}},u),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,a){var e=a.props,r=a.data,i=a.children,o=(a.parent,"");for(var c in e)o+=String(e[c]);var l=b.get(o);return l||function(){var t,a;for(a in l=[],f)f[a].forEach((function(t){var n=e[t],r=v(a,t,n);r&&l.push(r)}));var r=l.some((function(t){return t.startsWith("col-")}));l.push((t={col:!r||!e.cols},Object(n["a"])(t,"col-".concat(e.cols),e.cols),Object(n["a"])(t,"offset-".concat(e.offset),e.offset),Object(n["a"])(t,"order-".concat(e.order),e.order),Object(n["a"])(t,"align-self-".concat(e.alignSelf),e.alignSelf),t)),b.set(o,l)}(),t(e.tag,Object(s["a"])(r,{class:l}),i)}})},6728:function(t,a,e){"use strict";e.d(a,"a",(function(){return i}));var n=e("1da1"),r=(e("96cf"),e("ed08")),i=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(a,e,n){var i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={},t.prev=1,t.next=4,Object(r["f"])("".concat(a,"/verifikasi"),e,n);case 4:s=t.sent,s.status>=200&&s.status<300?(i.color="success",i.text="Surat berhasil diverifikasi!"):(i.color="error",i.text="Terjadi kesalahan! Mohon coba lagi"),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](1),i.color="error",i.text=t.t0;case 11:return t.abrupt("return",i);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(a,e,n){return t.apply(this,arguments)}}()},"8ce9":function(t,a,e){},"99d9":function(t,a,e){"use strict";e.d(a,"a",(function(){return i})),e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return o})),e.d(a,"d",(function(){return c}));var n=e("b0af"),r=e("80d2"),i=Object(r["i"])("v-card__actions"),s=Object(r["i"])("v-card__subtitle"),o=Object(r["i"])("v-card__text"),c=Object(r["i"])("v-card__title");n["a"]},ca7b:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-badge",{attrs:{dark:"",color:"orange",overlap:"",value:t.countChatUnread>0,content:t.countChatUnread}},[e("v-btn",{staticClass:"btn text-none",attrs:{color:"yellow accent-4",dark:"",depressed:"",rounded:""},on:{click:t.goToChat}},[e("v-icon",{attrs:{small:""}},[t._v("mdi-chat")]),t._v(" Chat ")],1)],1)},r=[],i=(e("a9e3"),{props:{countChatUnread:Number,chatPageUrl:String,detailPageUrl:String,endpointUrl:String},methods:{goToChat:function(){this.$store.dispatch("chat/setChat",{detailPageUrl:this.detailPageUrl,endpointUrl:this.endpointUrl}),this.$router.push(this.chatPageUrl)}}}),s=i,o=e("2877"),c=e("6544"),l=e.n(c),u=e("15fd"),d=e("5530"),f=(e("ff44"),e("132d")),v=e("a9ad"),b=e("7560"),h=e("f2e7"),p=e("f40d"),g=e("fe6c"),m=e("58df"),_=e("80d2"),k=Object(m["a"])(v["a"],Object(g["b"])(["left","bottom"]),b["a"],h["a"],p["a"]).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return Object(d["a"])({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(t){return"calc(100% - ".concat(Object(_["g"])(t||this.offset),")")},genBadge:function(){var t=this.$vuetify.lang,a=this.$attrs["aria-label"]||t.t(this.label),e=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":a,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),n=this.$createElement("span",e,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[n]):n},genBadgeContent:function(){if(!this.dot){var t=Object(_["s"])(this,"badge");return t||(this.content?String(this.content):this.icon?this.$createElement(f["a"],this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(t){var a=[this.genBadgeWrapper()],e=[Object(_["s"])(this)],n=this.$attrs,r=(n["aria-atomic"],n["aria-label"],n["aria-live"],n.role,n.title,Object(u["a"])(n,["aria-atomic","aria-label","aria-live","role","title"]));return this.inline&&this.left?e.unshift(a):e.push(a),t("span",{staticClass:"v-badge",attrs:r,class:this.classes},e)}}),j=e("8336"),O=Object(o["a"])(s,n,r,!1,null,null,null);a["a"]=O.exports;l()(O,{VBadge:k,VBtn:j["a"],VIcon:f["a"]})},ce7e:function(t,a,e){"use strict";var n=e("5530"),r=(e("8ce9"),e("7560"));a["a"]=r["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var a;return this.$attrs.role&&"separator"!==this.$attrs.role||(a=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(n["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(n["a"])({role:"separator","aria-orientation":a},this.$attrs),on:this.$listeners})}})},f40d:function(t,a,e){"use strict";var n=e("2b0e");a["a"]=n["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}})},fedf:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("btn-kembali",{attrs:{path:"/keluarga/ketua/surat/surat-keterangan-beasiswa"}}),e("h1",{staticClass:"mb-5"},[t._v("Detail Surat Keterangan Beasiswa")]),e("v-row",[e("v-col",[e("v-card",{attrs:{flat:""}},[e("v-card-title",[e("h3",[t._v("Detail Informasi")]),e("v-spacer"),e("button-chat",{attrs:{countChatUnread:t.countChatUnread,chatPageUrl:"/keluarga/ketua/surat/surat-keterangan-beasiswa/chat/"+t.data.id,detailPageUrl:"/keluarga/ketua/surat/surat-keterangan-beasiswa/detail/"+t.data.id,endpointUrl:t.url}}),1===t.data.ketua_lingkungan_approval?e("v-chip",{staticClass:"ml-2",attrs:{color:1===t.data.ketua_lingkungan_approval?"green":"grey lighten-2"}},[e("span",{staticClass:"color-white"},[t._v(" Terverifikasi ")])]):t._e()],1),e("v-divider"),e("v-card-text",{staticClass:"pa-6"},[e("div",{staticClass:"mb-15"},[e("h2",{staticClass:"mb-5"},[t._v("Informasi Siswa")]),e("v-divider",{staticClass:"mb-5"}),e("label",[t._v("No. surat")]),e("p",[t._v(t._s(t.data.no_surat))]),e("label",[t._v("Tanggal surat")]),e("p",[t._v(t._s(t.data.created_at))])],1),e("div",{staticClass:"mb-15"},[e("h2",{staticClass:"mb-5"},[t._v("Informasi Umat")]),e("v-divider",{staticClass:"mb-5"}),e("label",[t._v("Nama")]),e("p",[t._v(t._s(t.data.nama))]),e("label",[t._v("Tempat, tanggal lahir")]),e("p",[t._v(t._s(t.data.tempat_lahir+", "+t.data.tgl_lahir))]),e("label",[t._v("Alamat")]),e("p",[t._v(t._s(t.data.alamat))]),e("label",[t._v("No. telepon")]),e("p",[t._v(t._s(t.data.no_telp))]),e("label",[t._v("Sekolah/kelas")]),e("p",[t._v(t._s(t.data.sekolah)+" / "+t._s(t.data.kelas))])],1),e("div",{staticClass:"mb-15"},[e("h2",{staticClass:"mb-5"},[t._v("Informasi Orang Tua")]),e("v-divider",{staticClass:"mb-5"}),e("label",[t._v("Nama ayah")]),e("p",[t._v(t._s(t.data.nama_ayah))]),e("label",[t._v("Pekerjaan ayah")]),e("p",[t._v(t._s(t.data.pekerjaan_ayah))]),e("label",[t._v("Nama ibu")]),e("p",[t._v(t._s(t.data.nama_ibu))]),e("label",[t._v("Pekerjaan ibu")]),e("p",[t._v(t._s(t.data.pekerjaan_ibu))]),e("label",[t._v("Alamat")]),e("p",[t._v(t._s(t.data.alamat_ortu))])],1),e("h2",{staticClass:"mb-5"},[t._v("Keterangan Beasiswa")]),e("v-divider",{staticClass:"mb-5"}),e("label",[t._v("Status beasiswa")]),e("p",[t._v(t._s(t.data.status_beasiswa))]),e("label",[t._v("Permohonan")]),e("p",[t._v(t._s(t.data.permohonan))]),e("label",[t._v("File syarat beasiswa")]),e("div",{staticClass:"mt-1"},[e("v-btn",{staticClass:"text-none",attrs:{outlined:"",small:"",color:"blue"},on:{click:function(a){return t.downloadFile(t.data.file_syarat_beasiswa)}}},[t._v(" klik untuk melihat file ")])],1)],1),0===t.data.ketua_lingkungan_approval?e("v-card-actions",{staticClass:"py-3 px-5"},[e("v-spacer"),0===t.data.ketua_lingkungan_approval?e("v-btn",{staticClass:"btn text-none",attrs:{color:"blue accent-4",dark:"",depressed:""},on:{click:t.verify}},[t._v(" Verifikasi ")]):t._e()],1):t._e()],1)],1)],1),e("snackbar")],1)},r=[],i=e("1da1"),s=(e("96cf"),e("99af"),e("ed08")),o=e("6728"),c=e("5a50"),l=e("ca7b"),u={components:{ButtonChat:l["a"]},data:function(){return{url:"/surat-keterangan-beasiswa",data:{},countChatUnread:0}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(s["i"])("".concat(t.url,"/").concat(t.$route.params.id));case 2:return t.data=a.sent,t.data.tgl_lahir=Object(s["b"])(t.data.tgl_lahir),a.next=6,Object(s["i"])("/chat/count-unread/".concat(t.$route.params.id));case 6:t.countChatUnread=a.sent,t.countChatUnread=t.countChatUnread.count_unread;case 8:case"end":return a.stop()}}),a)})))()},computed:{isVerifyDisabled:function(){return!!this.data.ketua_lingkungan_approval}},methods:{downloadFile:function(t){return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:window.open("".concat(c["a"],"/files/").concat(t),"_blank");case 1:case"end":return a.stop()}}),a)})))()},verify:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$store.dispatch("loading/openLoading"),t.$store.commit("snackbar/resetSnackbar"),t.data.role="ketua lingkungan",t.data.ketua_lingkungan=t.$store.state.keluarga.nama_kepala_keluarga,a.next=6,Object(o["a"])(t.url,t.data.id,t.data);case 6:return e=a.sent,"success"===e.color&&t.$router.push("/keluarga/ketua/surat/surat-keterangan-beasiswa"),a.next=10,Object(s["i"])("".concat(t.url,"/").concat(t.$route.params.id));case 10:t.data=a.sent,t.$store.dispatch("snackbar/openSnackbar",e),t.$store.dispatch("loading/closeLoading");case 13:case"end":return a.stop()}}),a)})))()}}},d=u,f=e("2877"),v=e("6544"),b=e.n(v),h=e("8336"),p=e("b0af"),g=e("99d9"),m=e("cc20"),_=e("62ad"),k=e("ce7e"),j=e("0fd9"),O=e("2fa4"),C=Object(f["a"])(d,n,r,!1,null,null,null);a["default"]=C.exports;b()(C,{VBtn:h["a"],VCard:p["a"],VCardActions:g["a"],VCardText:g["c"],VCardTitle:g["d"],VChip:m["a"],VCol:_["a"],VDivider:k["a"],VRow:j["a"],VSpacer:O["a"]})},ff44:function(t,a,e){}}]);
//# sourceMappingURL=chunk-a44c3e8e.09e35fac.js.map