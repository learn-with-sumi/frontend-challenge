const allTournaments: Tournament[] = require('../data/demo-tournaments.json');

export enum EsportsTitle {
  CSGO = 'CSGO',
  LOL = 'LOL',
  DOTA2 = 'DOTA2',
}

export type Tournament = {
  name: string;
  organizer: string;
  tier: string;
  start: string;
  end: string;
  title: EsportsTitle;
};

/**
 * Load tournaments for the specified titles.
 *
 * This function mocks an API by returning a promise that resolves after a short random amount of time.
 */
export const loadTournaments = (titles: EsportsTitle[]) => {
  if (!titles.length) {
    return Promise.resolve([]);
  }
  return new Promise<Tournament[]>((resolve) => {
    setTimeout(() => {
      resolve(
        allTournaments.filter((t) =>
          titles.includes(t.title.toUpperCase() as EsportsTitle)
        )
      );
    }, 500 + Math.random() * 500);
  });
};
