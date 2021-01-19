import { travelType } from 'stores'
import { get } from 'svelte/store'
import { colors, zoomLevels } from 'constants'

export default {
  emissionen: [
    {
      step: '1.1',
      text: {
        title: 'CO2 Emissionen in Europa',
        paragraph:
          '<strong>30%</strong> der gesamten europäischen CO2-Emissionen lassen sich auf den Verkehr zurückführen (Luft, Schiff, Eisenbahn & Straße).',
      },
      meta: {
        title: 'CO2-Emissionen des Verkehrs innerhalb der EU',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label:
          'CO-2 Emissionen aller Verkehrs- und Transportmittel innerhalb Europas',
        align: 'right',
        textAlign: 'right',
        x: 100,
      },
      d: [
        {
          type: 'Alle Verkehrsträger',
          value: 1,
          format: 'percent',
          fill: colors.car.main,
          showValue: true,
          showLabel: true,
        },
      ],
    },
    {
      step: '1.2',
      text: {
        title: 'Straßenverkehr',
        paragraph:
          '<strong class="highlight-orange">72%</strong> der europäischen Verkehrsemissionen entfallen auf den Straßenverkehr.',
      },
      meta: {
        title: 'CO2-Emissionen im Straßenverkehr',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Anteil der Emissionen verursacht durch Straßenverkehr',
        align: 'right',
        textAlign: 'right',
        x: 72,
      },
      d: [
        {
          type: 'Straßenverkehr',
          format: 'percent',
          value: 0.72,
          fill: colors.car.main,
          showLabel: true,
          showValue: true,
        },
        {
          type: 'Andere',
          value: 0.28,
          format: 'percent',
          fill: colors.neutral.light,
          showLabel: false,
        },
      ],
    },
    {
      step: '1.3',
      text: {
        title: 'Autos',
        paragraph:
          'Neben Motorrädern, LKWs und leichten Nutzfahrzeugen sind Autos mit <strong class="highlight-orange">60,7%</strong> für den Löwenanteil aller Emissionen im Bereich Verkehr verantwortlich.',
      },
      meta: {
        title: 'CO2-Emissionen im Straßenverkehr',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Anteil der Emissionen verursacht durch Autos im Straßenverkehr',
        align: 'left',
        x: 43,
      },
      d: [
        {
          type: 'Autos',
          value: 0.43,
          format: 'percent',
          customValue: '60,7&thinsp;%',
          fill: colors.car.main,
          showLabel: true,
          showValue: true,
        },
        {
          type: 'Straßenverkehr',
          value: 0.29,
          format: 'percent',
          fill: colors.car.light,
        },
        {
          type: 'Alle Verkehrsträger',
          value: 0.28,
          format: 'percent',
          fill: colors.neutral.light,
        },
      ],
    },
  ],
  sektoren: [
    {
      step: '2.1',
      text: {
        title: 'Ziele zum Schutz des Klimas',
        paragraph:
          'Die Europäische Union hat sich für die nächsten Jahrzehnte vorgenommen den Ausstoß klimaschädlicher Treibhausgase zu reduzieren.',
      },
      meta: {
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: [
        'Verkehr',
        'Abfall',
        'Landwirtschaft',
        'Industrie',
        'Energie',
      ],
    },
    {
      step: '2.2',
      text: {
        title: 'Langsamer Abbau von Emissionen',
        paragraph:
          'Viele Sektoren, wie z.B. <strong class="highlight-land">Landwirtschaft</strong>, <strong class="highlight-energy">Energie</strong>, <strong class="highlight-industry">Industrie</strong> oder <strong class="highlight-waste">Abfall</strong>, haben es seit 1990 geschafft ihren Ausstoß langsam zu verringern.',
      },
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: ['Landwirtschaft', 'Industrie', 'Energie', 'Abfall'],
    },
    {
      step: '2.3',
      text: {
        title: 'Steigende Tendenz im Sektor Verkehr',
        paragraph:
          'Während es in den Jahren 2008 bis 2013 eine kurzzeitige positive Tendenz gab, steigen die Zahlen seit 2014 wieder stetig an und liegen heute bei einem Plus von 23% gegenüber den Werten von 1990.',
      },
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: ['Verkehr'],
    },
  ],
  szenarien: [
    {
      step: '3.1',
      text: {
        title: 'Szenarien Titel 01',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        distance: 50,
        zoom: zoomLevels['step-3.1'][get(travelType)],
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.2',
      text: {
        title: 'Szenarien Titel 02',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        distance: 50,
        zoom: zoomLevels['step-3.2'][get(travelType)],
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.3',
      text: {
        title: 'Szenarien Titel 03',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        distance: 50,
        zoom: zoomLevels['step-3.3'][get(travelType)],
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.4',
      text: {
        title: 'Szenarien Titel 04',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        distance: 50,
        zoom: zoomLevels['step-3.4'][get(travelType)],
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.5',
      text: {
        title: 'Szenarien Titel 04',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        distance: 50,
        zoom: zoomLevels['step-3.5'][get(travelType)],
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.6',
      text: {
        title: 'Szenarien Titel 04',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        distance: 50,
        zoom: zoomLevels['step-3.6'][get(travelType)],
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
  ],
}
