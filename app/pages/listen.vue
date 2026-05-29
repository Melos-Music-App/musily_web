<template>
  <main class="listen">
    <div class="container listen__inner">
      <NuxtLink to="/" class="listen__back">
        <ArrowLeft :size="20" />
        Back to home
      </NuxtLink>

      <header class="listen__header">
        <p class="listen__kicker">Join the room</p>
        <h1 class="listen__title">Listen together</h1>
        <p class="listen__sub">
          Open this link on a device with Melos to sync playback with friends in real time.
        </p>
      </header>

      <div v-if="code" class="listen__code-block" :class="{ 'listen__code-block--copied': copied }">
        <span class="listen__code-label">Room code</span>
        <div class="listen__code-display">
          <span class="listen__code-value">{{ code }}</span>
          <button type="button" class="listen__copy-btn" :aria-label="copied ? 'Copied' : 'Copy code'" @click="copyCode">
            <i :class="copied ? 'fas fa-check' : 'fas fa-copy'"></i>
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>
      </div>
      <div v-else class="listen__code-empty">
        <i class="fas fa-link"></i>
        <p>No room code in this link. Use a Listen link shared from Melos.</p>
      </div>

      <div class="listen__cards">
        <article class="listen__card listen__card--open">
          <div class="listen__card-icon-wrap listen__card-icon-wrap--primary">
            <Music :size="28" />
          </div>
          <h2 class="listen__card-title">Open in Melos</h2>
          <p class="listen__card-body">
            Set Melos as the default for <strong>akhil-tg.github.io</strong> so Listen links open in the app.
          </p>
          <ol class="listen__steps">
            <li>Tap <strong>Open in Melos</strong> below (or any Listen link).</li>
            <li>Choose <strong>Melos</strong> &rarr; <strong>Always</strong>.</li>
            <li>Or: <strong>Settings &rarr; Apps &rarr; Melos &rarr; Open by default</strong> &rarr; enable for this domain.</li>
          </ol>
          <a v-if="code" :href="openInAppUrl" class="btn btn-primary btn-lg listen__cta" target="_self" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt"></i>
            Open in Melos
          </a>
        </article>

        <article class="listen__card listen__card--download">
          <div class="listen__card-icon-wrap listen__card-icon-wrap--tertiary">
            <Download :size="28" />
          </div>
          <h2 class="listen__card-title">No app yet?</h2>
          <p class="listen__card-body">
            Install Melos from the downloads page, then come back and open the link above.
          </p>
          <NuxtLink to="/downloads" class="btn btn-secondary btn-lg">
            <i class="fas fa-download"></i>
            Download Melos
          </NuxtLink>
        </article>
      </div>

      <div class="listen__features">
        <span class="listen__pill">
          <i class="fas fa-users"></i>
          Synchronized
        </span>
        <span class="listen__pill">
          <i class="fas fa-bolt"></i>
          Blazingly fast
        </span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, Music, Download } from 'lucide-vue-next'

const route = useRoute()
const copied = ref(false)

const code = computed(() => {
  const c = route.query.code
  return typeof c === 'string' ? c : ''
})

const openInAppUrl = computed(() => {
  if (!code.value) return '#'
  const base = 'musily://musily.app/listen'
  return `${base}?code=${encodeURIComponent(code.value)}`
})

async function copyCode() {
  if (!code.value) return
  try {
    await navigator.clipboard.writeText(code.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    const el = document.createElement('input')
    el.value = code.value
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

useSeoMeta({
  title: 'Listen Together - Melos',
  ogTitle: 'Listen Together - Melos',
  description: 'Join a Listen Together room and sync playback with friends in real time using Melos.',
  ogDescription: 'Join a Listen Together room and sync playback with friends in real time using Melos.',
  twitterTitle: 'Listen Together - Melos',
  twitterDescription: 'Join a Listen Together room and sync playback with friends in real time using Melos.',
  robots: 'noindex, nofollow',
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables' as *;

.listen {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 32px 0 48px;
  overflow-x: hidden;

  @media (min-width: 480px) {
    padding: 40px 0 80px;
  }
}

.listen__inner {
  max-width: 680px;
  margin: 0 auto;
}

.listen__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  padding: 8px 14px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 600;
  color: $primary-color;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;

  @media (min-width: 480px) {
    margin-bottom: 40px;
  }

  &:hover {
    background: rgba($primary-color, 0.12);
  }
}

.listen__header {
  margin-bottom: 28px;

  @media (min-width: 480px) {
    margin-bottom: 44px;
  }
}

.listen__kicker {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: $primary-color;
  margin: 0 0 8px;
}

.listen__title {
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, $primary-color 0%, $text-color 80%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 16px;
}

.listen__sub {
  font-size: 18px;
  color: $on-surface-color;
  line-height: 1.6;
  max-width: 42ch;
  margin: 0;
}

.listen__code-block {
  background: rgba($primary-color, 0.12);
  border: 1px solid rgba($primary-color, 0.2);
  border-radius: 24px;
  padding: 24px 20px;
  margin-bottom: 24px;
  animation: listen-enter 0.5s cubic-bezier(0.2, 0, 0, 1) backwards;

  @media (min-width: 480px) {
    padding: 32px 36px;
    margin-bottom: 32px;
  }

  &--copied {
    background: rgba($primary-color, 0.18);
    border-color: $primary-color;
  }
}

.listen__code-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.9;
  margin-bottom: 12px;
  color: $primary-color;
}

.listen__code-display {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.listen__code-value {
  font-family: ui-monospace, 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  letter-spacing: 0.15em;
  line-height: 1;
  color: $text-color;
  word-break: break-all;
}

.listen__copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border: none;
  border-radius: 9999px;
  background: rgba($primary-color, 0.25);
  color: $text-color;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba($primary-color, 0.35);
  }

  &:active {
    transform: scale(0.97);
  }

  i {
    font-size: 16px;
  }
}

.listen__code-empty {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 20px;
  background: rgba($text-color, 0.03);
  border: 1px solid rgba($text-color, 0.06);
  color: $on-surface-color;
  animation: listen-enter 0.5s cubic-bezier(0.2, 0, 0, 1) 0.05s backwards;

  @media (min-width: 480px) {
    padding: 24px 28px;
    margin-bottom: 32px;
  }

  i {
    font-size: 24px;
    flex-shrink: 0;
    opacity: 0.6;
    color: $primary-color;
  }

  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
  }
}

.listen__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 28px;

  @media (min-width: 620px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
}

.listen__card {
  border-radius: 24px;
  padding: 24px 20px;
  background: rgba($text-color, 0.02);
  border: 1px solid rgba($text-color, 0.06);

  @media (min-width: 480px) {
    padding: 28px 24px;
  }
}

.listen__card:nth-child(1) {
  animation: listen-enter 0.5s cubic-bezier(0.2, 0, 0, 1) 0.08s backwards;
}

.listen__card:nth-child(2) {
  animation: listen-enter 0.5s cubic-bezier(0.2, 0, 0, 1) 0.14s backwards;
}

.listen__card-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.listen__card-icon-wrap--primary {
  background: rgba($primary-color, 0.15);
  color: $primary-color;
}

.listen__card-icon-wrap--tertiary {
  background: rgba(255, 179, 217, 0.15);
  color: #ffb3d9;
}

.listen__card-title {
  font-size: 20px;
  font-weight: 700;
  color: $text-color;
  margin: 0 0 10px;
}

.listen__card-body {
  font-size: 15px;
  color: $on-surface-color;
  line-height: 1.65;
  margin: 0 0 16px;

  strong {
    color: $text-color;
  }
}

.listen__steps {
  margin: 0 0 22px 1.2em;
  padding: 0;
  font-size: 14px;
  color: $on-surface-color;
  line-height: 1.75;

  li {
    margin-bottom: 6px;
  }

  strong {
    color: $text-color;
  }
}

.listen__cta {
  margin-top: 4px;
}

.listen__features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.listen__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 9999px;
  background: rgba($primary-color, 0.08);
  color: $primary-color;
  font-size: 14px;
  font-weight: 700;
  animation: listen-enter 0.5s cubic-bezier(0.2, 0, 0, 1) 0.2s backwards;

  i {
    font-size: 14px;
  }
}

@keyframes listen-enter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
