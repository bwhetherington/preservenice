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
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

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
    type === 'Street Altar'
  ) {
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
