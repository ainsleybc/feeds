import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const HomeButton = () => {
  const history = useHistory();

  return (
    <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
      Back to listing
    </Button>
  );
};
