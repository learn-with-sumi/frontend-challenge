import { render, screen } from '@testing-library/react';
import { EsportsTitle } from './api/tournamentsApi';

test('displays the spinner while loading', () => {
  // TODO: Implement me (verify that the spinner component is rendered while tournaments are being loaded).
});

test('hides the spinner when not loading', () => {
  // TODO: Implement me (verify that the spinner component is not rendered when tournaments are not being loaded).
});

test.each([
  [[EsportsTitle.CSGO]],
  [[EsportsTitle.LOL]],
  [[EsportsTitle.DOTA2]],
  [[EsportsTitle.CSGO, EsportsTitle.DOTA2]],
  [[EsportsTitle.CSGO, EsportsTitle.LOL, EsportsTitle.DOTA2]],
])('loads the tournaments for selected titles %p', async (titles) => {
  // TODO: Implement me (verify that the titles for the checked inputs are requested from the API).
});
