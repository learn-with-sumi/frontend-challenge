import { useEffect, useState } from 'react';
import logo from './assets/logo.svg';
import Spinner from './Spinner';
import Table from "./Table";
import { EsportsTitle, Tournament, loadTournaments } from './api/tournamentsApi';
import './App.scss';

const App = () => {
  const [isChecked, setIsChecked] = useState<Array<EsportsTitle>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tournaments, setTournaments] = useState<Array<Tournament>>([]);

  const handleOnChange = (title: string) => {

    setIsLoading(true);
    let changedCheckbox: any = Object.values(EsportsTitle).find(key => EsportsTitle[key] === title);
    const currentIndex = isChecked.indexOf(changedCheckbox);
    const newCheckedTitleArray = [...isChecked];

    if (currentIndex === -1) {
      newCheckedTitleArray.push(changedCheckbox);
    } else {
      newCheckedTitleArray.splice(currentIndex, 1)
    }

    setIsChecked(newCheckedTitleArray);
  }

  useEffect(() => {
    loadTournaments(isChecked).then((results) => {
      setTournaments(results);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
  })
  }, [isChecked]);

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
              <div key={title} data-testid={id} className="input-item">
                <input id={id} type="checkbox" onChange={() => handleOnChange(title)} />
                <label htmlFor={id}>{title}</label>
              </div>
            );
          })}
        </aside>
        <main>
          {isLoading ? <Spinner />
          : tournaments.length > 0 ?
            <Table data={tournaments}/>
            : 'No data to show'
          }
        </main>
      </div>
    </div>
  );
};

export default App;
