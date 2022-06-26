import { useEffect, useState } from 'react';
import { EsportsTitle, Tournament, loadTournaments } from './api/tournamentsApi';
import './App.scss';
import logo from './assets/logo.svg';
import csgo from './assets/csgo.png';
import lol from './assets/lol.png';
import dota2 from './assets/dota2.png';
import Spinner from './Spinner';
import Table from "./Table";

const App = () => {
  const [isChecked, setIsChecked] = useState<Array<EsportsTitle>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tournaments, setTournaments] = useState<Array<Tournament>>([]);

  const handleOnChange = (title: string) => {
    setIsLoading(true);
    let changedCheckbox: any = Object.values(EsportsTitle).find(key => EsportsTitle[key] === title);
    const currentIndex = isChecked.indexOf(changedCheckbox);
    const newCheckedCategoryArray = [...isChecked];

    if (currentIndex === -1) {
      newCheckedCategoryArray.push(changedCheckbox);
    } else {
      newCheckedCategoryArray.splice(currentIndex, 1)
    }
    setIsChecked(newCheckedCategoryArray);
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

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Tournament",
      accessor: "name",
    },
    {
      header: "Organizer",
      accessor: "organizer",
    },
    {
      header: "Tier",
      accessor: "tier",
    },
    {
      header: "Start Date & Time",
      accessor: "start",
    },
    {
      header: "End Date & Time",
      accessor: "end"
    }
  ];

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
            <Table data={tournaments} headers={columns}/>
          }
        </main>
      </div>
    </div>
  );
};

export default App;
