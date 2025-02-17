<script>
  import { onMount, beforeUpdate, afterUpdate, setContext } from 'svelte'
  import { pulsingDot } from './pulsingDot'

  import { Map, key, accessToken, Scale, Attribution } from './mapbox.js'
  import { createGeojson } from './util'
  import bbox from '@turf/bbox'

  export let hasPulsingDot
  export let data
  let map
  let scale

  setContext(key, {
    getMap: () => map,
  })

  export let lat = false
  export let lon = false
  export let zoom = false

  let container
  $: tType = 'bike'

  onMount(() => {
    map = new Map({
      container,
      style: 'mapbox://styles/juli84/ckmc46x3s9e8p17pgybrf1cwm',
      center: [lon, lat],
      zoom: zoom,
      dragPan: false,
      scrollZoom: false,
      attributionControl: false,
      accessToken,
      logoPosition: 'top-left'
    })

    scale = new Scale({
      maxWidth: 120,
      unit: 'imperial',
    })
    map.addControl(new Attribution(), 'top-right')
    map.addControl(scale, 'bottom-right')
    scale.setUnit('metric')

    map.doubleClickZoom.disable()

    map.on('load', () => {
      map.addSource('layers', { type: 'geojson', data: createGeojson() })

      map.addLayer({
        id: 'isoFills',
        type: 'fill',
        source: 'layers',
        paint: {
          'fill-color': ['get', 'fill'],
          'fill-opacity': ['get', 'fill-opacity'],
        },
        filter: ['==', 'id', 'iso-fill'],
      })

      map.addLayer({
        id: 'boundingFill',
        type: 'fill',
        source: 'layers',
        paint: {
          'fill-color': ['get', 'fill'],
          'fill-opacity': ['get', 'fill-opacity'],
        },
        filter: ['==', 'id', 'bounding-box'],
      })

      map.addLayer({
        id: 'isoContours',
        type: 'line',
        source: 'layers',
        paint: {
          'line-color': ['get', 'stroke'],
          'line-opacity': 0,
          'line-width': 1,
        },
        filter: ['==', 'id', 'iso-contour'],
      })

      map.addLayer({
        id: 'dist',
        type: 'line',
        source: 'layers',
        paint: {
          'line-color': ['get', 'stroke'],
          'line-dasharray': [2, 3],
          'line-opacity': 1,
          'line-width': 1,
        },
        filter: ['==', 'id', 'distance'],
      })

      if (hasPulsingDot) {
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'layers',
          layout: {
            'icon-image': 'pulsing-dot',
          },
          filter: ['==', '$type', 'Point'],
        })

        map.addLayer({
          id: 'icons',
          type: 'symbol',
          source: 'layers',
          layout: {
            'icon-image': tType,
            'icon-size': 0.6,
          },
          filter: ['==', '$type', 'Point'],
        })

        map.addImage('pulsing-dot', pulsingDot(map, 200, 'rgba(0,0,0,1)'), {
          pixelRatio: 2,
        })
      }
      updateMap()
    })

    return () => {
      map.remove()
    }
  })

  // prepare data fetch inside after update!
  afterUpdate(() => {
    updateMap()
  })

  const updateMap = () => {
    if (data && map) {
      const { geojson } = data

      const { centroid, travelType } = data

      const source = map.getSource('layers')

      if (source && centroid) {
        source.setData(geojson)

        map.setLayoutProperty('icons', 'icon-image', travelType)

        map.setPaintProperty('dist', 'line-opacity', ['get', 'stroke-opacity'])

        map.setPaintProperty('isoFills', 'fill-opacity', [
          'get',
          'fill-opacity',
        ])

        map.setPaintProperty('isoContours', 'line-opacity', [
          'get',
          'stroke-opacity',
        ])

        const boundGeoJson = JSON.parse(JSON.stringify(geojson))
        if (boundGeoJson.features.length > 3) {
          const remove = []
          boundGeoJson.features.forEach((f, fi) => {
            if (
              'id' in f.properties &&
              (f.properties.id === 'bounding-box' ||
                f.properties.id === 'pulsingDot' ||
                f.properties.id === 'distance')
            ) {
              remove.push(fi)
            }
          })
          for (let i = remove.length - 1; i >= 0; i -= 1) {
            boundGeoJson.features.splice(remove[i], 1)
          }
        }

        const padding = window.innerWidth < 500 ? 20 : 50

        map.fitBounds(bbox(boundGeoJson), {
          padding,
        })

        tType = travelType
      }
    }
  }
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
