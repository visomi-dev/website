import createApp from './createApp'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app', true)
})
