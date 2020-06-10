export default [
  {
    id: 'square_breathing',
    name: 'Square Breathing',
    description: 'Breathe in for 4, hold for 4, breathe out for 4, hold for\u00a04.',
    phases: [
      {
        name: 'in',
        units: 4,
        instruction: 'Breathe in',
      },
      {
        name: 'pause',
        units: 4,
        instruction: 'Hold',
      },
      {
        name: 'out',
        units: 4,
        instruction: 'Breathe out',
      },
      {
        name: 'pause',
        units: 4,
        instruction: 'Hold'
      },
    ]
  },
  {
    id: '4-7-8_breathing',
    name: '4-7-8 Breathing',
    description: 'Breathe in through the nose for 4, hold for 7, breathe out for 8 with a\u00a0"whoosh".',
    phases: [
      {
        name: 'in',
        units: 4,
        instruction: 'Breathe in through nose',
      },
      {
        name: 'pause',
        units: 7,
        instruction: 'Hold your breath',
      },
      {
        name: 'out',
        units: 8,
        instruction: 'Exhale with a WHOOSH',
      }
    ]
  },
  {
    id: 'equal_breathing',
    name: 'Equal Breathing',
    description: 'Breathe in for 5, breathe out for\u00a05.',
    phases: [
      {
        name: 'in',
        units: 5,
        instruction: 'Breathe in',
      },
      {
        name: 'out',
        units: 5,
        instruction: 'Breath out',
      }
    ]
  },
  {
    id: '7-11_breathing',
    name: '7-11 Breathing',
    description: 'Breathe in for 7, breathe out for\u00a011.',
    phases: [
      {
        name: 'in',
        units: 7,
        instruction: 'Breathe in',
      },
      {
        name: 'out',
        units: 11,
        instruction: 'Breath out',
      }
    ]
  }
];
