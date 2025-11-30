<template>
  <main class="home-page">
    <HeroSection />
    <FeaturesSection />
    <StatsSection />
    <CTASection />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Musily: A great music app.',
  ogTitle: 'Musily: A great music app.',
  description: 'Enjoy your music with a great music app. Free, open-source, no ads, no telemetry.',
  ogDescription: 'Enjoy your music with a great music app. Free, open-source, no ads, no telemetry.',
  twitterTitle: 'Musily: Enjoy your music with a great music app.',
  twitterDescription: 'Enjoy your music with a great music app. Free, open-source, no ads, no telemetry.',
})
</script>

<style scoped lang="scss">
main {
  flex: 1;
}
</style>
