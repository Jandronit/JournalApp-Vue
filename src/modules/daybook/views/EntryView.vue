<template>

  <template v-if="entry">

  <div class="entry-title d-flex justify-content-between p-2">

  <div>
    <span class="text-success fs-3 fw-bold">{{ day }}</span>
    <span class="mx-1 fs-3">{{ month }}</span>
    <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
  </div>

  <div>
    <button v-if="entry.id"
            class="btn btn-danger mx-2"
            @click="onDeleteEntry">
      Borrar
      <i class="fas fa-trash-alt"></i>
    </button>
    <button class="btn btn-primary">
      Subir foto
      <i class="fas fa-upload"></i>
    </button>
  </div>

</div>

  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea v-model="entry.text"  placeholder="¿Qué sucedió ahora"></textarea>
  </div>

  <img src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
       alt="entry-picture" class="img-thumbnail">

  </template>

  <Fab icon="fa-save"
       @on:click="saveEntry"></Fab>

</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear';
export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },
  data() {
    return {
      entry: null
    }
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
    day() {
      const { day } = getDayMonthYear( this.entry.date );
      return day;
    },
    month() {
      const { month } = getDayMonthYear( this.entry.date );
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear( this.entry.date );
      return yearDay;
    },
  },
  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),

    loadEntry() {
      let entry;
      if ( this.id === 'new' ) {
        entry = {
          date: new Date().getTime(),
          text: ''
        }
      } else {
        entry = this.getEntryById(this.id);
        if ( !entry ) return this.$router.push({name: 'no-entry'});
      }

        this.entry = entry;
    },
    async saveEntry() {
      if ( this.entry.id ){
        await this.updateEntry( this.entry );
      } else {
        const id = await this.createEntry( this.entry );
        this.$router.push({ name: 'entry', params: { id } });
      }
    },
    async onDeleteEntry() {
      await this.deleteEntry( this.entry.id );
      this.$router.push({ name: 'no-entry' });
    }
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
        this.loadEntry();
    }
  }
}
</script>

<style lang="scss" scoped>

textarea{
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus{
    outline: none;
  }
}

img{
  width: 12.5rem;
  position: fixed;
  bottom: 9.375rem;
  right: 1.25rem;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);}
</style>
