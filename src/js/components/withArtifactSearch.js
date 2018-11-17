import React from 'react';


class ArtifactDialogWrapper extends React.Component {
  state = {
    showArtifact: false,
    currentArtifact: null
  };

  /**
   * Produces a click handler that causes the wrapper to display the specified artifact when
   * activated.
   * @param {object} artifact the artifact to display
   */

  onArtifactClick = artifact => () =>
    this.setState({
      ...this.state,
      showArtifact: true,
      currentArtifact: artifact
    });

  /**
   * Hides the currently displayed artifact.
   */
  hideSearch = () =>
    this.setState({
      ...this.state,
      showArtifact: false,
      currentArtifact: null
    });

  /**
   * Renders the artifact dialog if it is open, and the child component. All props are passed to
   * the child component.
   */
  render() {
    const { Container, componentProps } = this.props;
    const { showArtifact, currentArtifact } = this.state;

    const searchDialog = showSearch ? (
      <>
      </>
    ) : (
      <div />
    );

    return (
      <React.Fragment>
        {artifactDialog}
        <Container 
          openArtifactFilter={this.openArtifactFilter}

        {...componentProps} />
      </React.Fragment>
    );
  }
}

/**
 * Produces a new component that is equal to the specified component wrapped with a component that
 * displays an artifact dialog when the child's `onArtifactClick` handler is called.
 * @param component the component to wrap
 */
function withArtifactDialog(component) {
  return props => <ArtifactDialogWrapper Container={component} componentProps={props} />;
}

export default withArtifactDialog;
