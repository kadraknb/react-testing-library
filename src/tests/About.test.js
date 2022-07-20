import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const h2About = screen.getByRole('heading', { name: /about/i });
    expect(h2About).toBeDefined();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const p1 = screen.getByText(/This application/);
    const p2 = screen.getByText(/One can filter Pokémons/);
    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
