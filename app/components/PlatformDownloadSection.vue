<template>
  <div class="platform-section">
    <!-- Desktop Layout -->
    <div class="desktop-layout">
      <div class="platform-header">
        <div class="platform-icon">
          <i :class="icon"></i>
        </div>
        <div class="platform-info">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
      </div>

      <div class="downloads-list">
        <!-- Primary download -->
        <a
          v-if="primaryFile"
          :href="primaryFile.url"
          :class="['download-button', 'primary']"
          @click.prevent="downloadFile(primaryFile)"
          :download="primaryFile.name"
        >
          <i class="fas fa-download"></i>
          <div class="button-content">
            <span class="button-label">Download</span>
            <span class="button-size">{{ primaryFile.size }}</span>
          </div>
        </a>

        <!-- Secondary download (only for Linux) -->
        <a
          v-if="secondaryFile"
          :href="secondaryFile.url"
          class="secondary-link"
          @click.prevent="downloadFile(secondaryFile)"
          :download="secondaryFile.name"
        >
          <i class="fas fa-cube"></i>
          <span>Flatpak (not fully supported)</span>
        </a>
      </div>
    </div>

    <!-- Mobile Layout (different from desktop) -->
    <div class="mobile-layout">
      <div class="platform-header-mobile">
        <div class="platform-icon">
          <i :class="icon"></i>
        </div>
        <div class="platform-info">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="downloads-list">
        <!-- Primary download -->
        <a
          v-if="primaryFile"
          :href="primaryFile.url"
          :class="['download-button', 'primary']"
          @click.prevent="downloadFile(primaryFile)"
          :download="primaryFile.name"
        >
          <i class="fas fa-download"></i>
          <div class="button-content">
            <span class="button-label">Download</span>
            <span class="button-size">{{ primaryFile.size }}</span>
          </div>
        </a>

        <!-- Secondary download (only for Linux) -->
        <a
          v-if="secondaryFile"
          :href="secondaryFile.url"
          class="secondary-link"
          @click.prevent="downloadFile(secondaryFile)"
          :download="secondaryFile.name"
        >
          Flatpak (not fully supported)
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DownloadFile {
  name: string
  url: string
  platform: string
  type: 'primary' | 'secondary'
  size: string
}

const props = defineProps<{
  title: string
  description: string
  icon: string
  files: DownloadFile[]
}>()

const primaryFile = computed(() => props.files.find(f => f.type === 'primary'))
const secondaryFile = computed(() => props.files.find(f => f.type === 'secondary'))

const downloadFile = (file: DownloadFile) => {
  window.location.href = file.url
}
</script>

<style scoped lang="scss">
@use '../../assets/styles/_variables' as *;

.platform-section {
  display: contents;
}

/* ===== DESKTOP LAYOUT ===== */
.desktop-layout {
  display: none;
  padding: 32px;
  border: 1px solid rgba(210, 188, 253, 0.1);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(210, 188, 253, 0.03) 0%, rgba(104, 84, 143, 0.01) 100%);
  transition: all 0.3s ease;
  grid-column: span 1;

  &:hover {
    border-color: rgba(210, 188, 253, 0.2);
    background: linear-gradient(135deg, rgba(210, 188, 253, 0.06) 0%, rgba(104, 84, 143, 0.02) 100%);
    box-shadow: 0 8px 24px rgba(210, 188, 253, 0.1);
  }
}

.platform-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 28px;
  gap: 16px;
}

.platform-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba($primary-color, 0.25), rgba($inverse-primary-color, 0.12));
  border-radius: 16px;
  color: $primary-color;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);

  i {
    font-size: 40px;
  }
}

.desktop-layout:hover .platform-icon {
  background: linear-gradient(135deg, rgba($primary-color, 0.35), rgba($inverse-primary-color, 0.18));
  transform: translateY(-4px);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(210, 188, 253, 0.15);
}

.platform-info h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: $text-color;
  letter-spacing: -0.5px;
}

.platform-info p {
  font-size: 14px;
  color: $on-surface-color;
  margin: 0;
  line-height: 1.6;
}

.downloads-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.download-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, $primary-color 0%, rgba($primary-color, 0.9) 100%);
  color: $on-primary-color;
  padding: 14px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(210, 188, 253, 0.2);
  width: fit-content;
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(210, 188, 253, 0.3);
  }

  &:active {
    transform: translateY(0px);
  }

  .button-content {
    display: flex;
    flex-direction: column;
    gap: 1px;
    align-items: center;
  }

  .button-label {
    font-size: 14px;
    font-weight: 600;
  }

  .button-size {
    font-size: 11px;
    opacity: 0.9;
  }
}

.secondary-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: $on-surface-color;
  text-decoration: none;
  padding: 8px 0;
  transition: all 0.3s ease;

  i {
    font-size: 12px;
  }

  &:hover {
    color: $primary-color;
    text-decoration: underline;
  }
}

/* ===== MOBILE LAYOUT ===== */
.mobile-layout {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid rgba(210, 188, 253, 0.08);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(210, 188, 253, 0.02) 0%, rgba(104, 84, 143, 0.01) 100%);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(210, 188, 253, 0.15);
    background: linear-gradient(135deg, rgba(210, 188, 253, 0.04) 0%, rgba(104, 84, 143, 0.02) 100%);
  }
}

.platform-header-mobile {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(210, 188, 253, 0.06);
}

.platform-header-mobile + .downloads-list {
  margin-top: 4px;
}

.mobile-layout .platform-icon {
  width: 56px;
  height: 56px;
  margin-top: 2px;

  i {
    font-size: 32px;
  }
}

.mobile-layout:hover .platform-icon {
  transform: scale(1.05);
}

.mobile-layout .platform-info h3 {
  font-size: 16px;
  margin-bottom: 4px;
}

.mobile-layout .platform-info p {
  font-size: 13px;
}

.mobile-layout .download-button {
  padding: 12px 16px;
  font-size: 13px;
  gap: 10px;
  width: 100%;

  .button-label {
    font-size: 13px;
  }

  .button-size {
    font-size: 10px;
  }
}

.mobile-layout .secondary-link {
  font-size: 12px;
  padding: 6px 0;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 769px) {
  .desktop-layout {
    display: block;
  }

  .mobile-layout {
    display: none;
  }
}

@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }

  .mobile-layout {
    display: flex;
  }
}
</style>
