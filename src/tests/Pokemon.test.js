import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

const MoreDetails = 'More details';
const pokemons25 = 'pokemons/25';
describe('Teste o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
    const imgP = screen.getByRole('img');
    expect(imgP.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgP.alt).toBe('Pikachu sprite');
  });

  test('Teste se o card do pokémon indicado na Pokédex contém um link ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByRole('link', { name: MoreDetails }).href).toBe('http://localhost/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    userEvent.click(screen.getAllByRole('button')[1]);
    const pika = screen.getByTestId('pokemon-name').innerHTML;
    userEvent.click(screen.getByRole('link', { name: MoreDetails }));
    expect(pika).toBe('Pikachu');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste também se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByRole('link', { name: MoreDetails }).href).toBe('http://localhost/pokemons/25');
    userEvent.click(screen.getByRole('link', { name: MoreDetails }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemons25);
    userEvent.click(screen.getByRole('checkbox'));
    const img = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(img.src).toBe('http://localhost/star-icon.svg');
    expect(img.alt).toBe('Pikachu is marked as favorite');
  });
});
