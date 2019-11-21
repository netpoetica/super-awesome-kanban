/* eslint:global seedDB */
class KanbanCard extends React.Component {
  render() {
    const {
      card,
    } = this.props;

    const {
      name,
      description,
      status,
      created,
      lastUpdated,
    } = card;
    return (
      <div className="kanban-card">
        <h3>{name}</h3>
        <p>{description}</p>
        <select className="flex-12" value={status}>
          <option disabled value="NONE">Select one</option>
          <option value="TODO">To Do</option>
          <option value="DOING">In Progress</option>
          <option value="DONE">Completed</option>
        </select>
        <div className="grid-row kanban-card-timestamps">
          <div className="grid-col flex-6">
            <small>
              <h4>Created</h4>
              <p>{new Date(created).toDateString()}</p>
            </small>
          </div>
          <div className="grid-col flex-6">
            <small>
              <h4>Last Changed</h4>
              <p>{new Date(lastUpdated).toDateString()}</p>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

class KanbanColumn extends React.Component {
  render() {
    const {
      cards,
      header,
    } = this.props;

    return (
      <div className="tablet:grid-col">
        <div className="kanban-column">
          <h2>
            {header}
          </h2>
          {cards && cards.length > 0 ? cards.map((card) => (
            <KanbanCard
              card={card}
            />
          )) : undefined}
        </div>
      </div>
    );
  }
}

class KanbanApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    // Seed the local database with data.
    seedDB((cards) => {
      this.setState({
        cards,
      });
    });
  }

  render() {
    const {
      cards,
    } = this.state;

    return (
      <div className="grid-container">
        <div className="grid-row">
          <div className="tablet:grid-col">
            <h1>
              <span role="img" aria-label="logo">🎯</span>
              <span>super-awesome-kanban</span>
            </h1>
          </div>
        </div>
        <div className="grid-row grid-gap-1">
          <KanbanColumn header="todo" cards={cards} />
          <KanbanColumn header="in progress" />
          <KanbanColumn header="completed" />
        </div>
      </div>
    );
  }
}

(function App() {
  // Render to root element
  ReactDOM.render(<KanbanApp />, document.getElementById('root'));
}());
