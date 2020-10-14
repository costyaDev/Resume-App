import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExp } from "../../actions/profile";

const Experiens = ({ experience, deleteExp }) => {
  const experiences = experience.map((item) => (
    <tr key={item._id}>
      <td>{item.company}</td>
      <td className="hide-sm">{item.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
        {!item?.to ? " Now " : <Moment format="YYYY/MM/DD">{item.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteExp(item._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experiens.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExp: PropTypes.func.isRequired,
};

export default connect(null, { deleteExp })(Experiens);
