<script>
  import { szenarienData, activeAnchor } from 'stores'

  import Map from 'components/Map/index.svelte'
  import Anchor from 'components/Navigation/Anchor.svelte'
  import Loading from 'components/Loading.svelte'
  import Legend from 'components/Legend.svelte'
  import IntersectionObserver from 'components/Intersectionobserver.svelte'
  import Tile from 'components/Tile.svelte'
  import * as animateScroll from 'svelte-scrollto'

  function handleActiveStep(e) {
    step = e.detail
    activeAnchor.set(e.detail)
  }

  let step

  $: data = $szenarienData ? $szenarienData : null

  $: currentData = $szenarienData
    ? $szenarienData.find((d) => d.step == step)
    : false
  
  $: {
    if (data) {
      animateScroll.scrollTo({
        element: `[id='anchor-3.1']`,
        offset: -60,
        duration: 1500,
        delay: 0,
      })
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .szenario {
    margin-left: 20px;
    height: 500px;
    width: 400px;

    @include respond-max-screen-phablet {
      width: calc(100% - 2em);
      margin-left: 10px;
      margin: auto;
    }
  }

  .tile-title {
    margin: 0px;
  }

  .tile-paragraph {
    margin: 7px 0;
  }

  .extra {
    margin-bottom: 75vh;
    overflow: scroll;

    @include respond-min-screen-tablet {
      margin-left: 0px;
      padding: 0 30px 0 20px;
    }
  }

  .sticky {
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    top: 0;
    position: sticky;
  }
</style>

<div class="container szenarien">
  {#if data}
    <div class="sticky">
      <Map
        data={currentData}
        hasPulsingDot={true}
        lat={51}
        lon={9}
        zoom={6} />
      <Legend {step} />
    </div>
    {#each data as item, i}
      <div class="szenario {i === data.length - 1 ? 'extra' : ''}">
        <Anchor anchorId={item.step}>
          <IntersectionObserver
            rootMargin={`-${0.25 * 100}% 0% -${100 - 0.55 * 100}% 0%`}
            on:step={handleActiveStep}
            bind:step={item.step}>
            {#if item.text}
              <Tile isMap={true} active={item.step === step}>
                <h3 class="tile-title">{item.text.title}</h3>
                <p class="tile-paragraph">
                  {@html item.text.paragraph}
                </p>
              </Tile>
            {/if}
          </IntersectionObserver>
        </Anchor>
      </div>
    {/each}
  {:else}
    <Loading />
  {/if}
</div>
