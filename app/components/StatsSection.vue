<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">Free & Open Source</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">∞</div>
          <div class="stat-label">No Ads Ever</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">0</div>
          <div class="stat-label">Telemetry</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">3</div>
          <div class="stat-label">Platforms Supported</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '../../assets/styles/_variables' as *;

.stats-section {
  padding: 50px 0;
  background: linear-gradient(180deg, rgba($primary-color, 0.04) 0%, transparent 100%);
  border-top: 1px solid rgba(210, 188, 253, 0.08);
  border-bottom: 1px solid rgba(210, 188, 253, 0.08);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, $primary-color, $inverse-primary-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 14px;
  color: $on-surface-color;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: $breakpoint-md) {
  .stats-section {
    padding: 50px 0;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .stat-number {
    font-size: 32px;
  }
}
</style>
