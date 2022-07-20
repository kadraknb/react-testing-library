import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

describe('Teste o componente <NotFound.js />', () => {
  test('se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/asdasd');

    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(h2).toBeDefined();
  });

  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/asdasd');

    const img = screen.getAllByRole('img');
    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
