<template>
<div>
<Homeheed />
<Homeheader />
<Homehero />
<sd />
  <Homefooter /> </div>
</template>
<script>
import Homeheed from "../components/Homeheed.vue";
import Homeheader from "../components/Homeheader.vue";
import Homehero from "../components/Homehero.vue";
import Homefooter from "../components/Homefooter.vue";
import sd from "@/components/sd.vue";
export default {
name: "Homepage",
components: {
Homeheed,
Homeheader,
sd,
 Homefooter
 }
};
</script>
