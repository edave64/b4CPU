import { boot } from 'quasar/wrappers';

// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ Vue }) => {
  Vue.mixin({
    methods: {
      translate(x: number, y: number) {
        return `transform: translate(${x}px, ${y}px)`;
      },
    },
  });
});
