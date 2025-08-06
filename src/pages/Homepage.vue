<template>
<div>
<Homeheed />
<Homeheader />
<Homehero />
<Homevision />
<Homeprogram />
<Homeevents />
<Homemediacenter />
<Homepartners />
<Homestatistics />
<Homefooter />
</div>
</template>
<script>
import Homeheed from "../components/Homeheed.vue";
import Homeheader from "../components/Homeheader.vue";
import Homeevents from "../components/Homeevents.vue";
import Homehero from "../components/Homehero.vue";
import Homeprogram from "../components/Homeprogram.vue";
import Homevision from "../components/Homevision.vue";
import Homemediacenter from "../components/Homemediacenter.vue";
import Homepartners from "../components/Homepartners.vue";
import Homestatistics from "../components/Homestatistics.vue";
import Homefooter from "../components/Homefooter.vue";
export default {
name: "Homepage",
components: {
Homeheed,
Homeheader,
Homeevents,
Homehero,
Homeprogram,
Homevision,
Homemediacenter,
Homepartners,
Homestatistics,
Homefooter
  }
};
</script>
