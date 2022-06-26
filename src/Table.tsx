import { FC } from 'react';
import loader from './assets/loader.svg';
import './Spinner.scss';

const Table: FC = () => {
  return
  (<table>
    <tr>
      <th>Title</th>
      <th>Tournament</th>
      <th>Organizer</th>
      <th>Tier</th>
      <th>Start Date & Time</th>
      <th>End Date & Time</th>
    </tr>
    {tournaments.map((tournament, key) => {
        <tr key={key}>
          <td>{tournament.title}</td>
          {/* <td><img src={tournament.title} className="logo" alt="logo" /></td> */}
          <td>{tournament.name}</td>
          <td>{tournament.organizer}</td>
          <td>{tournament.tier}</td>
          <td>{tournament.start}</td>
          <td>{tournament.end}</td>
        </tr>
    })}
  </table>);
};

export default Table;
