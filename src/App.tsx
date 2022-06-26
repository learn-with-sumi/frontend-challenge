import { useState } from 'react';
import { EsportsTitle, Tournament, loadTournaments } from './api/tournamentsApi';
import './App.scss';
import logo from './assets/logo.svg';
import csgo from './assets/csgo.png';
import lol from './assets/lol.png';
import dota2 from './assets/dota2.png';
import Spinner from './Spinner';

const App = () => {
  const [isChecked, setIsChecked] = useState<Array<EsportsTitle>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tournaments, setTournaments] = useState<Array<Tournament>>([]);

  const handleOnChange = (title: string) => {
    setIsLoading(true);
    // returns the first index or -1
    let changedCheckbox: any = Object.values(EsportsTitle).find(key => EsportsTitle[key] === title);
    const currentIndex = isChecked.indexOf(changedCheckbox);
    const newCheckedCategoryArray = [...isChecked];

    if(currentIndex === -1){
        //then push in default state or remove it if its already there.
        newCheckedCategoryArray.push(changedCheckbox);
    }
    else{
        newCheckedCategoryArray.splice(currentIndex, 1)
    }
    setIsChecked(newCheckedCategoryArray);
    loadTournaments(newCheckedCategoryArray).then((results) => {
      setTournaments(results);
      setIsLoading(false);
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Tournament Schedule</h1>
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className="container">
        <aside>
          <div className="inputs-caption">Title Selection</div>
          {Object.keys(EsportsTitle).map((title) => {
            const id = `check-${title}`;
            return (
              <div key={title} className="input-item">
                <input id={id} type="checkbox" onChange={() => handleOnChange(title)} />
                <label htmlFor={id}>{title}</label>
              </div>
            );
          })}
        </aside>
        <main>
          {isLoading ? <Spinner />
          : tournaments.length > 0 &&
            <table>
              <tr>
                <th>Title</th>
                <th>Tournament</th>
                <th>Organizer</th>
                <th>Tier</th>
                <th>Start Date & Time</th>
                <th>End Date & Time</th>
              </tr>
              {tournaments.map((tournament, key) => {
                return (
                  <tr key={key}>
                    <td>{tournament.title}</td>
                    {/* <td><img src={tournament.title} className="logo" alt="logo" /></td> */}
                    <td>{tournament.name}</td>
                    <td>{tournament.organizer}</td>
                    <td>{tournament.tier}</td>
                    <td>{tournament.start}</td>
                    <td>{tournament.end}</td>
                  </tr>
                )
              })}
            </table>
          }
          {/* TODO: Show Tournaments for selected Esports. */}
          {/* TODO: Show a spinner while new tournaments are being loaded */}
        </main>
      </div>
    </div>
  );
};

export default App;
