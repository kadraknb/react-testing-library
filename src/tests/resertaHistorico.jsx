import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

function renderWithRouter(componente) {
  const customHistory = createMemoryHistory();

  const renderObject = render(
    <Router history={ customHistory }>
      { componente }
    </Router>,
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}

export default renderWithRouter;
