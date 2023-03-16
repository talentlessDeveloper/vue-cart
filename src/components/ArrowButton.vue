<template>
  <button aria-label="explore">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0,0,256,256"
      style="fill: #000000"
    >
      <g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <g transform="scale(0.5,0.5)">
          <path
            d="M73.087,380.941c0,-5.15 1.36,-10.44 4.33,-15.391l62.721,-104.55l-62.721,-104.55c-12.01,-20 2.4,-45.45 25.73,-45.45c5.27,0 10.35,1.38 14.79,3.9c4.43,2.51 8.229,6.149 10.95,10.67l81.25,135.43l-81.25,135.431c-5.431,9.04 -15.2,14.569 -25.74,14.569c-17.549,0.001 -30.06,-14.409 -30.06,-30.059z"
            fill="#b6462f"
            style="--i: 0.1"
          ></path>
          <path
            d="M193.087,380.941c0,-5.15 1.36,-10.44 4.33,-15.391l62.721,-104.55l-62.721,-104.55c-12.01,-20 2.4,-45.45 25.73,-45.45c5.27,0 10.35,1.38 14.79,3.9c4.43,2.51 8.229,6.149 10.95,10.67l81.25,135.43l-81.25,135.431c-5.431,9.04 -15.2,14.569 -25.74,14.569c-17.549,0.001 -30.06,-14.409 -30.06,-30.059z"
            fill="#fe8b6f"
            style="--i: 0.1"
          ></path>
          <path
            d="M313.087,380.941c0,-5.15 1.36,-10.44 4.33,-15.391l62.721,-104.55l-62.721,-104.55c-12.01,-20 2.4,-45.45 25.73,-45.45c5.27,0 10.35,1.38 14.79,3.9c4.43,2.51 8.229,6.149 10.95,10.67l81.25,135.43l-81.25,135.431c-5.431,9.04 -15.2,14.569 -25.74,14.569c-17.549,0.001 -30.06,-14.409 -30.06,-30.059z"
            fill="#b6462f"
            style="--i: 0.1"
          ></path>
        </g>
      </g>
    </svg>
  </button>
</template>

<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

svg path:nth-child(1) {
  animation: pulsate-fwd 1s 0.2s ease-in-out infinite both;
}
svg path:nth-child(2) {
  animation: pulsate-fwd 1s 0.4s ease-in-out infinite both;
}
svg path:nth-child(3) {
  animation: pulsate-fwd 1s 0.6s ease-in-out infinite both;
}

.pulsate-fwd {
  -webkit-animation: pulsate-fwd 0.5s ease-in-out infinite both;
  animation: pulsate-fwd 0.5s ease-in-out infinite both;
}
</style>
