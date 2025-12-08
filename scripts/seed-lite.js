const spells = [
  { index: 'magic-missile', name: 'Magic Missile', level: 1, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: '120 feet', duration: 'Instantaneous', classes: ['Wizard'], components: ['V','S'] },
  { index: 'cure-wounds', name: 'Cure Wounds', level: 1, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: 'Touch', duration: 'Instantaneous', classes: ['Cleric','Bard','Druid'], components: ['V','S'] },
  { index: 'fireball', name: 'Fireball', level: 3, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: '150 feet', duration: 'Instantaneous', classes: ['Wizard','Sorcerer'], components: ['V','S','M'] },
  { index: 'shield', name: 'Shield', level: 1, school: 'Abjuration', ritual: false, concentration: false, casting_time: '1 reaction', range: 'Self', duration: '1 round', classes: ['Wizard'], components: ['V','S'] },
  { index: 'invisibility', name: 'Invisibility', level: 2, school: 'Illusion', ritual: false, concentration: true, casting_time: '1 action', range: 'Touch', duration: 'Up to 1 hour', classes: ['Wizard','Sorcerer','Bard'], components: ['V','S','M'] },
  { index: 'mage-armor', name: 'Mage Armor', level: 1, school: 'Abjuration', ritual: false, concentration: false, casting_time: '1 action', range: 'Touch', duration: '8 hours', classes: ['Wizard','Sorcerer'], components: ['V','S','M'] },
  { index: 'detect-magic', name: 'Detect Magic', level: 1, school: 'Divination', ritual: true, concentration: true, casting_time: '1 action', range: 'Self', duration: 'Up to 10 minutes', classes: ['Cleric','Wizard','Druid'], components: ['V','S'] },
  { index: 'lightning-bolt', name: 'Lightning Bolt', level: 3, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: '100 feet line', duration: 'Instantaneous', classes: ['Wizard','Sorcerer'], components: ['V','S','M'] },
  { index: 'fly', name: 'Fly', level: 3, school: 'Transmutation', ritual: false, concentration: true, casting_time: '1 action', range: 'Touch', duration: 'Up to 10 minutes', classes: ['Wizard','Sorcerer'], components: ['V','S','M'] },
  { index: 'healing-word', name: 'Healing Word', level: 1, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 bonus action', range: '60 feet', duration: 'Instantaneous', classes: ['Cleric','Bard','Druid'], components: ['V'] }
];

const monsters = [
  { index: 'goblin', name: 'Goblin', size: 'Small', type: 'humanoid', alignment: 'neutral evil', armor_class: 15, hit_points: 7, challenge_rating: 0.25, languages: 'Common, Goblin' },
  { index: 'orc', name: 'Orc', size: 'Medium', type: 'humanoid', alignment: 'chaotic evil', armor_class: 13, hit_points: 15, challenge_rating: 0.5, languages: 'Common, Orc' },
  { index: 'kobold', name: 'Kobold', size: 'Small', type: 'humanoid', alignment: 'lawful evil', armor_class: 12, hit_points: 5, challenge_rating: 0.125, languages: 'Common, Draconic' },
  { index: 'skeleton', name: 'Skeleton', size: 'Medium', type: 'undead', alignment: 'lawful evil', armor_class: 13, hit_points: 13, challenge_rating: 0.25, languages: 'Understands Common but can’t speak' },
  { index: 'zombie', name: 'Zombie', size: 'Medium', type: 'undead', alignment: 'neutral evil', armor_class: 8, hit_points: 22, challenge_rating: 0.25, languages: 'Understands languages it knew in life' },
  { index: 'ogre', name: 'Ogre', size: 'Large', type: 'giant', alignment: 'chaotic evil', armor_class: 11, hit_points: 59, challenge_rating: 2, languages: 'Common, Giant' },
  { index: 'young-red-dragon', name: 'Young Red Dragon', size: 'Large', type: 'dragon', alignment: 'chaotic evil', armor_class: 18, hit_points: 178, challenge_rating: 10, languages: 'Common, Draconic' },
  { index: 'adult-red-dragon', name: 'Adult Red Dragon', size: 'Huge', type: 'dragon', alignment: 'chaotic evil', armor_class: 19, hit_points: 256, challenge_rating: 17, languages: 'Common, Draconic' },
  { index: 'troll', name: 'Troll', size: 'Large', type: 'giant', alignment: 'chaotic evil', armor_class: 15, hit_points: 84, challenge_rating: 5, languages: 'Giant' },
  { index: 'lich', name: 'Lich', size: 'Medium', type: 'undead', alignment: 'lawful evil', armor_class: 17, hit_points: 135, challenge_rating: 21, languages: 'Common, plus up to five others' }
];
