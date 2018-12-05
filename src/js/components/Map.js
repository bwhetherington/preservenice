import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { object } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// This is an unbelievably janky solution but it works FOR NOW
// We are simply subtracting the height of the header from the height of the map.
// TODO figure out how to programmatically check the height of the header
const headerSize = 48;
const height = `calc(100% - ${headerSize}px)`;

function styles(theme) {
  return {
    map: {
      width: '100%',
      height
    },
    mapElement: {
      height: '100%'
    }
  };
}

const center = {
  lat: 45.44,
  lng: 12.32
};

const zoom = 14;

const options = {
  styles: [
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    // {
    //   featureType: 'water',
    //   elementType: 'labels',
    //   stylers: [{ visibility: 'off' }]
    // },
    // {
    //   featureType: 'road',
    //   elementType: 'labels',
    //   stylers: [{ visibility: 'off' }]
    // },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

// // These options enable a dark, featureless map
// const options = {
//   styles: [
//     {
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#212121'
//         }
//       ]
//     },
//     {
//       elementType: 'labels.icon',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       elementType: 'labels.text',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#757575'
//         }
//       ]
//     },
//     {
//       elementType: 'labels.text.stroke',
//       stylers: [
//         {
//           color: '#212121'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative',
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#757575'
//         },
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative',
//       elementType: 'geometry.fill',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative',
//       elementType: 'geometry.stroke',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative',
//       elementType: 'labels',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative.country',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#9e9e9e'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative.land_parcel',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'administrative.locality',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#bdbdbd'
//         }
//       ]
//     },
//     {
//       featureType: 'poi',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#757575'
//         }
//       ]
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#181818'
//         }
//       ]
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#616161'
//         }
//       ]
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'labels.text.stroke',
//       stylers: [
//         {
//           color: '#1b1b1b'
//         }
//       ]
//     },
//     {
//       featureType: 'road',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'road',
//       elementType: 'geometry.fill',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'road',
//       elementType: 'geometry.stroke',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'road',
//       elementType: 'labels.icon',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'road',
//       elementType: 'labels.text',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'road',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#8a8a8a'
//         }
//       ]
//     },
//     {
//       featureType: 'road.arterial',
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#373737'
//         }
//       ]
//     },
//     {
//       featureType: 'road.highway',
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#3c3c3c'
//         }
//       ]
//     },
//     {
//       featureType: 'road.highway.controlled_access',
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#4e4e4e'
//         }
//       ]
//     },
//     {
//       featureType: 'road.local',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#616161'
//         }
//       ]
//     },
//     {
//       featureType: 'transit',
//       stylers: [
//         {
//           visibility: 'off'
//         }
//       ]
//     },
//     {
//       featureType: 'transit',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#757575'
//         }
//       ]
//     },
//     {
//       featureType: 'water',
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#000000'
//         }
//       ]
//     },
//     {
//       featureType: 'water',
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#3d3d3d'
//         }
//       ]
//     }
//   ]
// };

const MapWrapper = withGoogleMap(props => (
  <GoogleMap defaultCenter={center} defaultZoom={zoom} {...props} />
));

function createSize(w, h) {
  return new google.maps.Size(w, h);
}

function createIcon(artifact) {
  const { type } = artifact;
  if (
    type === 'Coat of Arms' ||
    type === 'Cross' ||
    type === 'Decoration' ||
    type === 'Flagstaff Pedestal' ||
    type === 'Fountain' ||
    type === 'Symbol' ||
    type === 'Fragment' ||
    type === 'Inscription' ||
    type === 'Patera' ||
    type === 'Other' ||
    type === 'Sculpture' ||
    type === 'Street Altar' ||
    type === 'Relief'
  ) {
    // // Use this icon for dark map + gold circles visual
    // return `${iconUrlPrefix}/circle.svg`;

    // Use this for regular use
    return `${iconUrlPrefix}/${type}.svg`;
  } else {
    return undefined;
  }
}

const iconUrlPrefix = '/static/icons';

function renderArtifacts(artifacts, onArtifactClick) {
  return artifacts.map(artifact => {
    const { id, name, namePretty, position } = artifact;
    return (
      <Marker
        id={name}
        key={id}
        title={namePretty}
        position={position}
        onClick={onArtifactClick(artifact)}
        icon={createIcon(artifact)}
      />
    );
  });
}

/**
 * A dummy map component.
 * Google Maps API Key: <API KEY>
 * @param props
 */
function Map(props) {
  const { classes, onArtifactClick, artifacts = [] } = props;
  return (
    <MapWrapper
      containerElement={<div className={classes.map} />}
      mapElement={<div className={classes.mapElement} />}
      options={options}
    >
      {renderArtifacts(artifacts, onArtifactClick)}
    </MapWrapper>
  );
}

Map.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Map);
