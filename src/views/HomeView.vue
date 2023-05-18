<script setup>
import { useRouter } from "vue-router";
import ArrowButton from "../components/ArrowButton.vue";
const router = useRouter();
</script>

<template>
  <!-- Inspiration from https://dribbble.com/shots/6617784-Glasses-landing-page/attachments/6617784-Glasses-landing-page?mode=media -->
  <main>
    <section>
      <div class="home">
        <div class="home-left">
          <h1>
            <span style="--d: 1s">The</span> <br />
            <span style="--d: 3.75s">visionary</span> <br />
            <span style="--d: 2s">collection</span>
          </h1>

          <div class="home-left-content">
            <img
              style="--d: 1s"
              src="../assets/vue-glasses-frame.webp"
              alt="glasses frames"
            />
            <div>
              <p style="--d: 2s">The Colanton</p>
              <p style="--d: 3s">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis optio, a quos ut minima libero consequatur
                exercitationem.
              </p>

              <div class="btn-container" @click="router.push('/products')">
                <ArrowButton />
              </div>
            </div>
          </div>
        </div>
        <div class="home-right">
          <img
            style="--d: 1s"
            src="../assets/vue-glasses-woman.webp"
            alt="woman in glasses"
          />
        </div>
      </div>
      <!-- <div class="message container">
        <p>
          <span>Notice!</span>
          As a result of using localstorage,your browser might scream your
          password is insecure, do not fret , just ignore it.
        </p>
      </div> -->
    </section>
  </main>
</template>

<style scoped>
.message {
  margin-block: 24px;
  max-width: 400px;
}

.message span {
  color: var(--accentClr);
  font-size: 1.75rem;
  margin-right: 6px;
}

section {
  margin-top: 112px;
}

h1 {
  font-size: clamp(1.5rem, 4vw + 0.85rem, 2.75rem);
  text-transform: uppercase;
  margin-bottom: 2rem;
  overflow-y: hidden;
}

h1 > span {
  display: inline-block;
  animation: slide-in-bottom 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  animation-delay: calc(0.5 * var(--d));
}

h1 > span:nth-of-type(2) {
  color: var(--accentClr);
  animation: tracking-in-expand-fwd 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  animation-delay: calc(0.5 * var(--d));
}

.home {
  display: flex;
  gap: 12px;
  padding-left: 20px;
  margin-inline: 0;
}

.home-left,
.home-right {
  flex: 1;
  overflow-y: hidden;
  position: relative;
}

.home-right::before {
  --d: 3s;
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  transform-origin: 0% 0%;
  animation: scale-in 5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation-delay: calc(0.75 * var(--d));
}

.home-right > img {
  max-height: 400px;
}

.home-left-content img,
.home-left-content p {
  visibility: hidden;
  height: 0;
}

@media (min-width: 48rem) {
  .home {
    width: min(90%, 1024px);
    padding-left: 0;
    margin-inline: auto;
  }
  h1 span:nth-of-type(2) {
    width: 216px;
  }

  br {
    display: none;
  }

  .home-left {
    flex: 1.5;
  }

  .home-left-content img,
  .home-left-content p {
    visibility: visible;
    height: auto;
    animation: slide-in-bottom 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    animation-delay: calc(0.5 * var(--d));
  }

  .home-left-content {
    display: flex;
    column-gap: 24px;
    overflow-y: hidden;
  }

  .home-left-content > img {
    width: 8rem;
    height: 11rem;
    object-fit: cover;
  }

  .home-left-content p {
    max-width: 380px;
    margin-bottom: 8px;
  }

  .home-left-content p:first-child {
    font-size: 1.5rem;
  }

  .btn-container svg {
    width: 64px;
    height: 64px;
  }

  .home-right {
    flex: 0.5;
    display: flex;
    justify-content: flex-end;
  }

  .home-right > img {
    height: 400px;
    object-fit: cover;
  }
}
</style>
