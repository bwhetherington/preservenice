import { iterator } from 'lazy-iters';

export const types = [
  'Coat of Arms',
  'Cross',
  'Decoration',
  'Fragment',
  'Inscription',
  'Other',
  'Patera',
  'Relief',
  'Sculpture',
  'Street Altar',
  'Symbol',
  'Fountain',
  'Flagstaff Pedestal'
];

export const sestieri = [
  'Cannaregio',
  'Castello',
  'Dorsoduro',
  'San Marco',
  'San Polo',
  'Santa Croce',
  'Murano',
  'Burano',
  'Vignole',
  'Torcello',
  'Marzzorbo'
];

import { groups } from './data';

function isVowel(char) {
  const c = char.toLowerCase();
  return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
}

function article(word) {
  if (word.length === 0) {
    return 'A';
  }
  return isVowel(word[0]) ? 'An' : 'A';
}

function createDefault(basicType, rawData) {
  const { content } = rawData;
  const { material, sestiere, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : basicType.toLowerCase();
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `${article(type)} ${type} made of ${material}${yearLabel} in ${sestiere}.`;
  return {
    type: basicType,
    sestiere,
    description,
    descriptionLong: description
  };
}

function createCoatOfArms(rawData) {
  const { content } = rawData;
  const { sestiere, family, approximate_year, material } = content;
  const familyLabel = isValidDatum(family) ? `${family} family ` : '';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `${article(
    familyLabel
  )} ${familyLabel}coat of arms${yearLabel} made of ${material} in ${sestiere}.`;
  return {
    type: 'Coat of Arms',
    sestiere,
    description,
    descriptionLong: description
  };
}

function createCross(rawData) {
  return createDefault('Cross', rawData);
}

function createDecoration(rawData) {
  return createDefault('Decoration', rawData);
}

function createFragment(rawData) {
  return createDefault('Fragment', rawData);
}

function createInscription(rawData) {
  return createDefault('Inscription', rawData);
}

function createOther(rawData) {
  const { content } = rawData;
  const { material, sestiere, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : 'artifact';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `${article(type)} ${type} made of ${material}${yearLabel} in ${sestiere}.`;
  return {
    type: 'Other',
    sestiere,
    description,
    descriptionLong: description
  };
}

function createPatera(rawData) {
  return createDefault('Patera', rawData);
}

function createRelief(rawData) {
  return createDefault('Relief', rawData);
}

function createSculpture(rawData) {
  return createDefault('Sculpture', rawData);
}

function createStreetAltar(rawData) {
  return createDefault('Street Altar', rawData);
}

function createSymbol(rawData) {
  return createDefault('Symbol', rawData);
}

function createFountain(rawData) {
  const { content } = rawData;
  const { material, sestiere_or_Island, approximate_year, subtype } = content;
  // const type = isValidDatum(subtype) ? subtype.toLowerCase() : 'fountain';
  const type = 'fountain';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `${article(
    type
  )} ${type} made of ${material}${yearLabel} in ${sestiere_or_Island}.`;
  return {
    type: 'Fountain',
    sestiere: sestiere_or_Island,
    description,
    descriptionLong: description
  };
}

function createFlagstaffPedestal(rawData) {
  const { content } = rawData;
  const { sestiere, body_material, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : 'flagstaff pedestal';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `${article(
    type
  )} ${type} made of ${body_material}${yearLabel} in ${sestiere}.`;
  return {
    type: 'Flagstaff Pedestal',
    sestiere,
    description,
    descriptionLong: description
  };
}

function isValidDatum(str) {
  return (
    str !== null &&
    str !== undefined &&
    str.length > 0 &&
    str.toLowerCase().localeCompare('unknown') !== 0 &&
    !str.endsWith('?')
  );
}

const placeholderImage = '/static/default-img.png';

export function createArtifact(rawData) {
  const { content } = rawData;
  let data = rawData;
  if (typeof content === 'string') {
    data = { ...rawData, content: JSON.parse(rawData.content) };
  }
  const {
    image_url,
    height_cm,
    distance_from_ground_cm,
    approximate_year,
    amount_donated,
    cost_estimate
  } = data.content;
  const imageUrl = isValidDatum(image_url) ? image_url : placeholderImage;
  const heightCM = isValidDatum(`${height_cm}`) ? height_cm : -1;
  const heightFromGroundCM = isValidDatum(`${distance_from_ground_cm}`)
    ? distance_from_ground_cm
    : -1;
  const year = isValidDatum(approximate_year) ? approximate_year : 'Unknown';
  const artifact = {
    data,
    newData: {
      year,
      id: data.ck_id,
      name: data.content.wiki_friendly_title,
      position: {
        lat: data.lat,
        lng: data.lng
      },
      type: data.content.type,
      subtype: data.content.subtype,
      amountNeeded: cost_estimate,
      amountDonated: amount_donated,
      coverImage: imageUrl,
      description: '',
      descriptionLong: '',
      heightCM,
      heightFromGroundCM
    }
  };
  const specific = createSpecificArtifact(artifact.data);
  return {
    ...artifact.newData,
    ...specific
  };
}

/**
 *
 * @param {*} rawData
 */
function createSpecificArtifact(rawData) {
  const group = rawData.item_type;
  switch (group) {
    case groups[0]:
      return createCoatOfArms(rawData);
    case groups[1]:
      return createCross(rawData);
    case groups[2]:
      return createDecoration(rawData);
    case groups[3]:
      return createFragment(rawData);
    case groups[4]:
      return createInscription(rawData);
    case groups[5]:
      return createOther(rawData);
    case groups[6]:
      return createPatera(rawData);
    case groups[7]:
      return createRelief(rawData);
    case groups[8]:
      return createSculpture(rawData);
    case groups[9]:
      return createStreetAltar(rawData);
    case groups[10]:
      return createSymbol(rawData);
    case groups[11]:
      return createFountain(rawData);
    case groups[12]:
      return createFlagstaffPedestal(rawData);
  }
}

export function containsKeyword(artifact, keyword) {
  const { name, description, descriptionLong } = artifact;
  const fields = iterator([name, description, descriptionLong]);
  return fields.map(field => field.toLowerCase()).any(field => field.indexOf(keyword) >= 0);
}

export const FilterType = {
  EQ: '=',
  NEQ: '≠',
  GT: '>',
  GTE: '≥',
  LT: '<',
  LTE: '≤'
};

function filterNumber(field, type, matches) {
  if (type === FilterType.EQ) {
    if (field != matches) {
      return false;
    }
  } else if (type === FilterType.NEQ) {
    if (field == matches) {
      return false;
    }
  } else if (type === FilterType.GT) {
    if (field <= matches) {
      return false;
    }
  } else if (type === FilterType.GTE) {
    if (field < matches) {
      return false;
    }
  } else if (type === FilterType.LT) {
    if (field >= matches) {
      return false;
    }
  } else if (type === FilterType.LTE) {
    if (field > matches) {
      return false;
    }
  }
  return true;
}

export function filterArtifact(artifact, filters, options = defaultOptions) {
  if (filters.length === 0 && options.hideAllIfNoFilters) {
    return false;
  }
  const types = [];
  const notTypes = [];
  const sestieri = [];
  const notSestieri = [];
  for (const { option, type, matches } of filters) {
    if (option === 'year') {
      const { year } = artifact;
      if (!filterNumber(year, type, matches)) {
        return false;
      }
    } else if (option === 'height') {
      const { heightCM } = artifact;
      if (!filterNumber(heightCM, type, matches)) {
        return false;
      }
    } else if (option === 'fromGround') {
      const { heightFromGroundCM } = artifact;
      if (!filterNumber(heightFromGroundCM, type, matches)) {
        return false;
      }
    } else if (option === 'type') {
      if (type === FilterType.EQ) {
        types.push(matches);
      } else if (type === FilterType.NEQ) {
        notTypes.push(matches);
      }
    } else if (option === 'sestiere') {
      if (type === FilterType.EQ) {
        sestieri.push(matches);
      } else if (type === FilterType.NEQ) {
        notSestieri.push(matches);
      }
    }
  }
  const { type, sestiere } = artifact;
  return (
    (types.length === 0 || types.indexOf(type) >= 0) &&
    (notTypes.length === 0 || notTypes.indexOf(type) < 0) &&
    (sestieri.length === 0 || sestieri.indexOf(sestiere) >= 0) &&
    (notSestieri.length === 0 || notSestieri.indexOf(sestiere) < 0)
  );
}

const defaultOptions = {
  hideAllIfNoFilters: true
};

export function filterArtifacts(artifacts, filters, options = defaultOptions) {
  if (filters.length === 0 && options.hideAllIfNoFilters) {
    return [];
  } else {
    return iterator(artifacts)
      .filter(artifact => filterArtifact(artifact, filters))
      .collect();
  }
}
