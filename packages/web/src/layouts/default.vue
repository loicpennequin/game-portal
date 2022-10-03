<template>
  <div bg-light-5 font-sans p-y-6>
    <div max-w-screen-xl m="x-auto">
      <header space-y-4 bg-white bg-opacity-60 p-8 rounded-lg>
        <h1
          text-6xl
          font-bold
          bg="clip-text gradient-to-r"
          text-transparent
          from-violet-6
          to-cyan-5
        >
          Create D3 App
        </h1>

        <p text-lg>
          An opinionated stack based on Nuxt 3 for modern web applications.
        </p>

        <figure>
          <blockquote italic>
            <p>
              "It will help you ship value to your users as fast as possible...I
              should make a youtube short about this"
            </p>
          </blockquote>
          <figcaption>
            —Daria, Vue shill | Walmart Theo | "literally who"
          </figcaption>
        </figure>
      </header>

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
