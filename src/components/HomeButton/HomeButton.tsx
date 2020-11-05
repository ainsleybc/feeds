import React from 'react';
import { useHistory } from 'react-router-dom';

export const HomeButton = () => {
  const history = useHistory();

  return (
    <button type="button" onClick={() => history.goBack()}>
      Back to listing
    </button>
  );
};
