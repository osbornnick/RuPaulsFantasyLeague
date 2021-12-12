import { useState, useEffect } from "react";
import { getRoster, newRoster } from "../../services/rosterService";
import { useNavigate } from "react-router";
import EditRoster from "./EditRoster";
import { useSelector, useDispatch } from "react-redux";

export const Rosters = (props) => {
    const { rosters } = props;
    return (
        <div className="row">
            <div className="col">
                <h1>Rosters</h1>
                <ul className="list-group">
                    {rosters.map((ros) => (
                        <li className="list-group-item" key={ros.id}>
                            <span>{ros.name}</span>
                            <Roster id={ros.id} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const Roster = (props) => {
    const { id } = props;
    const { roster } = useSelector((state) => state.roster);
    const { currentUser } = useSelector((state) => state.currentUser);
    const [editing, setEditing] = useState(false);
    useEffect(() => getRoster(dispatch, id), [id]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!roster) return "loading";
    if (editing) return <EditRoster roster={roster} setEditing={setEditing} />;

    return (
        <div className="card" style={{ width: "40rem" }}>
            <div className="card-body">
                <div className="card-title d-flex align-items-center">
                    <h5 className="m-0">{roster.name}</h5>
                    {currentUser && currentUser.id === roster.user ? (
                        <button
                            className="btn btn-info ms-auto"
                            onClick={() => setEditing(true)}
                        >
                            Edit Roster
                        </button>
                    ) : (
                        ""
                    )}
                </div>
                <div className="card-text">
                    <ul className="list-group list-group-flush rounded">
                        {roster.queens.map((queen, i) => (
                            <li
                                className="list-group-item list-group-item-action"
                                onClick={() =>
                                    navigate(`/details/queens/${queen.id}`)
                                }
                                key={i}
                            >
                                {queen.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const RosterList = (props) => {
    const { rosters } = props;
    const navigate = useNavigate();
    return (
        <ul className="list-group">
            {rosters.map((r) => (
                <li
                    className="list-group-item  list-group-item-action"
                    key={r.id}
                    onClick={() => navigate(`/details/rosters/${r.id}`)}
                >
                    {r.name}
                </li>
            ))}
        </ul>
    );
};

export const MyRosterList = (props) => {
    const { rosters } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <h4 className="m-0">My Rosters</h4>
            </li>
            {rosters.map((r) => (
                <li
                    className="list-group-item  list-group-item-action"
                    key={r.id}
                    onClick={() => navigate(`/details/rosters/${r.id}`)}
                >
                    {r.name}
                </li>
            ))}
            <li className="list-group-item text-center">
                <button
                    className="btn btn-primary"
                    onClick={() => newRoster(dispatch)}
                >
                    New Roster
                </button>
            </li>
        </ul>
    );
};
