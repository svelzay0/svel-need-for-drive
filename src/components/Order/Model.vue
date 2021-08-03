<template>
    <div class="order__model">   
        <div class="model__loading">
            <loader v-if="loading" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../Loader";

export default {
  name: "Model",
  components: { Loader },
  computed: { 
      ...mapGetters("home", ["loading"])
  }
}

</script>